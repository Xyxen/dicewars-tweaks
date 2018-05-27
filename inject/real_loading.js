'use strict';

// Instead of waiting a fixed time, wait for the sounds and fonts to load.
hookFunction(fake_loading);
dicewars.addEventListener('pre-fake_loading', function(event) {
    // Full override.
    event.preventDefault();

    // Draw loading screen. Set waitcount high so the game code doesn't decide
    // loading is done with.
    waitcount = 1e9;
    event.callOriginal();

    // No further ticking necessary. Everything is callback-driven from here.
    waitcount = 0;
    timer_func = null;

    // When sound is off, handleComplete won't be called, so we need to
    // register the fonts callback right away from here.
    if (!soundon) {
        waitForFonts();
    }
});

// By default, the game only shows the loading screen AFTER sounds have
// loaded. We'll show it right away instead.
dicewars.addEventListener('init', function() {
    timer_func = fake_loading;
}, {once: true});

function waitForFonts()
{
    document.fonts.ready.finally(start_title);
}

//OVERRIDE: Loading screen is already showing at this point, so wait on fonts.
handleComplete = waitForFonts;
