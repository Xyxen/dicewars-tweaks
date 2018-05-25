'use strict';

// Injects and executes the given function.
function injectExecutable(func)
{
    var code = '(' + func + ')();';
    var script = document.createElement('script');
    script.textContent = code;
    document.body.appendChild(script);
    script.remove();
}

// Injects a whole file. Must be web accessible.
function injectFile(path)
{
    var url = chrome.runtime.getURL(path);
    console.log("Injecting " + url + "...");

    var script = document.createElement('script');
    script.src = url;
    script.addEventListener('load', function() {
        script.remove();
    });
    document.body.appendChild(script);
}

injectFile("inject/sprites.js");

injectFile("inject/resume_soundctx.js");
injectFile("inject/frame_skip.js");
injectFile("inject/real_loading.js");
injectFile("inject/cpu_play.js");
injectFile("inject/fast_ai_battles.js");

injectFile("inject/init_event.js");
