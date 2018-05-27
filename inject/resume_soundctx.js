'use strict';

function resumeSound()
{
    // Must run on a user gesture, as interacting with the page is considered
    // consent for autoplay.
    createjs.Sound.activePlugin.context.resume();
}

dicewars.addEventListener('init', function() {
    // Enable sound on the mousedown event. We want it available before the
    // click event, or there'll be no sound if the first click is on a button.
    stage.canvas.addEventListener('mousedown', resumeSound, {once: true});
}, {once: true});
