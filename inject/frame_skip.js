'use strict';

var accum = 0;
// Skip frames if we're missing the 60FPS target.
hookFunction(battle_dice);
dicewars.addEventListener('pre-battle_dice', function(event) {
    // We manually run the game function here, so cancel the implicit call.
    event.preventDefault();

    // Keep track of how much real time has passed.
    var tickEvent = event.args[0];
    accum += tickEvent.delta;

    // Disable stage redraws.
    var update = stage.update;
    stage.update = new Function();

    // Tick the dice rolls forward as many times as necessary to catch up with
    // the ideal 60FPS rate.
	while (accum >= 1000/60 && timer_func === battle_dice) {
        event.callOriginal();
        accum -= 1000/60;
    }

    // Re-enable stage redraws, and paint.
    stage.update = update;
    stage.update();
});
