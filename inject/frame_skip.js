'use strict';

//OVERRIDE: We want to thread the event through to the timer function.
function onTick(event)
{
    if (timer_func !== null) {
        timer_func(event);
    }
    check_button();
}

var battle_dice_old = battle_dice;
var accum = 0;
//OVERRIDE: Skip frames if we're missing the 60FPS target.
battle_dice = function(event)
{
    accum += event.delta;

    // Disable stage redraws.
    var update = stage.update;
    stage.update = new Function();

    // Tick the dice rolls forward as many times as necessary to catch up with
    // the ideal 60FPS rate.
	while (accum >= 1000/60 && timer_func == battle_dice) {
        battle_dice_old();
        accum -= 1000/60;
    }

    // Re-enable stage redraws, and paint.
    stage.update = update;
    stage.update();
}
