'use strict';

var cpu_play = false;

window.addEventListener('game_init', function() {
    // Add a CPU-only toggle button to the title screen.
    var cpu_btn = new createjs.Text("CPU Play", sz(32)+'px Anton', '#aaa');
    cpu_btn.name = 'cpu';
    cpu_btn.x = view_w / 2 - sz(280) + 3 * sz(180);
    cpu_btn.y = view_h * 0.8 + sz(60);
    cpu_btn.textAlign = 'center';
    cpu_btn.textBaseline = 'middle';
    spr[sn_pmax].addChild(cpu_btn);
}, {once: true});

var click_pmax_old = click_pmax;
//OVERRIDE: We're adding another button to the title screen, so we hook this
//          function to handle pressing it.
click_pmax = function()
{
    var cpu_btn = spr[sn_pmax].getChildByName('cpu');
    var pt = cpu_btn.globalToLocal(stage.mouseX, stage.mouseY);
    if (Math.abs(pt.x) < sz(70) && Math.abs(pt.y) < sz(20)) {
        cpu_play = !cpu_play;
        cpu_btn.color = (cpu_play ? '#f00' : '#aaa');
        stage.update();
    } else {
        click_pmax_old();
    }
}

var start_man_old = start_man;
//OVERRIDE: When playing CPU-only, the player's turn is handled by the AI
//          routines as well.
start_man = function()
{
    if (cpu_play) {
        start_com();
    } else {
        start_man_old();
    }
}

function remaining_players()
{
    var players = 0;
    for (var i = 0; i < game.pmax; i++) {
        if (game.player[i].area_tc > 0) {
            players++;
        }
    }
    return players;
}

var start_gameover_old = start_gameover;
//OVERRIDE: Never lose in a CPU-only game.
start_gameover = function()
{
    if (cpu_play) {
        // Switch the fake player to the winner of this battle.
        var winner = game.adat[game.area_from].arm;
        game.user = winner;

		if (remaining_players() == 1) {
			draw_player_data();
			start_win();
		} else {
			start_player();
		}
    } else {
        start_gameover_old();
    }
}
