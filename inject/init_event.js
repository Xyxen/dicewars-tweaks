'use strict';

function waitForInit()
{
    // stage is defined in the game's init function, so its presence indicates
    // that the game has initialized.
    if (typeof stage !== 'undefined') {
        window.dispatchEvent(new Event('game_init'));
    } else {
        setTimeout(waitForInit, 100);
    }
}
window.addEventListener('load', waitForInit, {once: true});
