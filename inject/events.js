'use strict';

// All game-related events are dispatched through this.
var dicewars = new EventTarget();

// A variable that fires events when modified.
class ObservableVar extends EventTarget
{
    constructor(value)
    {
        super();
        var _value = value;
        Object.defineProperty(this, 'value', {
            get: () => {
                return _value;
            },
            set: (newValue) => {
                var event = new Event('set');
                event.oldValue = _value;
                event.newValue = newValue;
                this.dispatchEvent(event);
                _value = newValue;
            }
        });
    }
}

window.addEventListener('load', function waitForInit() {
    // stage is defined in the game's init function, so its presence indicates
    // that the game has initialized.
    if (typeof stage !== 'undefined') {
        dicewars.dispatchEvent(new Event('init'));
    } else {
        setTimeout(waitForInit, 100);
    }
}, {once: true});

//OVERRIDE: We want to thread the event through to the timer function.
function onTick(event)
{
    if (timer_func !== null) {
        timer_func(event);
    }
    check_button();
}

// Represents an event fired from a wrapped game function.
class HookedFuncEvent extends Event
{
    constructor(name, eventInit, func, args)
    {
        super(name, eventInit);

        // Try to keep these from being tweaked. They're mutable, so this
        // isn't perfect.
        Object.defineProperty(this, 'func', {value: func, writable: false});
        Object.defineProperty(this, 'args', {value: args, writable: false});
    }

    // Invoke the original function with its original arguments.
    callOriginal()
    {
        return this.func.apply(null, this.args);
    }
}

var hookedFuncs = {};
// Wrap a function so that it fires pre- and post- events, allowing behaviour
// to be modified.
function hookFunction(func)
{
    var name = func.name;

    // Don't double-hook functions.
    if (name in hookedFuncs) {
        return;
    }
    hookedFuncs[name] = func;

    // Wrap the function with an event dispatcher.
    window[name] = function(/*...*/) {
        var preEvent = new HookedFuncEvent('pre-' + name, {cancelable: true},
            func, arguments);

        // Allow the call to be cancelled. This allows listeners to call it
        // themselves in different ways.
        if (dicewars.dispatchEvent(preEvent)) {
            func.apply(null, arguments);
        }

        var postEvent = new HookedFuncEvent('post-' + name, null, func,
            arguments);
        dicewars.dispatchEvent(postEvent);
    }
}
