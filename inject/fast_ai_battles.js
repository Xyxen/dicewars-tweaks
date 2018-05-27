'use strict';

var fast_play = false;

var sn_btn_fastgame;
dicewars.addEventListener('init', function() {
    var fast_btn = new createjs.Text("Fast Game", sz(32)+'px Anton', '#aaa');
    fast_btn.name = 'fast_game';
    fast_btn.x = view_w * 0.1;
    fast_btn.y = ypos_mes + sz(60);
    fast_btn.textAlign = 'center';
    fast_btn.textBaseline = 'middle';
    fast_btn.visible = false;
    sn_btn_fastgame = addSprite(fast_btn);
}, {once: true});

// Handle mouse presses for the fast play button.
function click_gameopts()
{
    var fast_btn = spr[sn_btn_fastgame];
    var pt = fast_btn.globalToLocal(stage.mouseX, stage.mouseY);
    if (Math.abs(pt.x) < sz(70) && Math.abs(pt.y) < sz(20)) {
        fast_play = !fast_play;
        fast_btn.color = (fast_play ? '#f00' : '#aaa');
        stage.update();
    }
}

// Reset the fast play flag each time a new game is started.
hookFunction(start_title);
dicewars.addEventListener('post-start_title', function() {
    fast_play = false;
    spr[sn_btn_fastgame].color = (fast_play ? '#f00' : '#aaa');
});

// Show the fast play button on the map selection screen.
hookFunction(make_map);
dicewars.addEventListener('post-make_map', function() {
    click_func = click_gameopts;
    spr[sn_btn_fastgame].visible = true;
    stage.update();
});

var start_battle_old = start_battle;
// Don't show dice rolls for AI players when in fast play mode.
hookFunction(start_battle);
dicewars.addEventListener('post-start_battle', function() {
    // If we're not in fast play, do nothing.
    if (!fast_play) {
        return;
    }

    // Check if the player is even involved in this fight.
    var from = game.adat[game.area_from].arm;
    var to = game.adat[game.area_to].arm;
    if ((from != game.user && to != game.user) || cpu_play) {
        // Skip the dice animation if they're not.
        waitcount = 15;
        timer_func = after_battle;

        // Draw the territory counts at the bottom so it's not just blank.
        spr[sn_battle].visible = false;
        draw_player_data();
        stage.update();
    }
});
