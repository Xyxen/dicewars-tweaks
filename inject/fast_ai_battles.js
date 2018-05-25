'use strict';

var start_battle_old = start_battle;
start_battle = function()
{
    start_battle_old();

    // Check if the player is even involved in this fight.
    var from = game.adat[game.area_from].arm;
    var to = game.adat[game.area_to].arm;
    if (from != game.user && to != game.user) {
        // Skip the dice animation if they're not.
        waitcount = 15;
        timer_func = after_battle;
    }
}
