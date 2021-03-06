'use strict';

dicewars.addEventListener('init', function() {
    // Add a CPU-only toggle button to the title screen.
    var cpu_btn = new createjs.Text("CPU Play", sz(32)+'px Anton', '#aaa');
    cpu_btn.name = 'cpu';
    cpu_btn.x = view_w / 2 - sz(280) + 3 * sz(180);
    cpu_btn.y = view_h * 0.8 + sz(60);
    cpu_btn.textAlign = 'center';
    cpu_btn.textBaseline = 'middle';
    spr[sn_pmax].addChild(cpu_btn);
}, {once: true});

var cpu_play = new ObservableVar(false);
cpu_play.addEventListener('set', function(event) {
    // Keep the button in sync with the backing variable.
    var cpu_btn = spr[sn_pmax].getChildByName('cpu');
    cpu_btn.color = (event.newValue ? '#f00' : '#aaa');
});

// We're adding another button to the title screen, so we hook this function
// to handle pressing it.
hookFunction(click_pmax);
dicewars.addEventListener('pre-click_pmax', function(event) {
    var cpu_btn = spr[sn_pmax].getChildByName('cpu');
    var pt = cpu_btn.globalToLocal(stage.mouseX, stage.mouseY);
    if (Math.abs(pt.x) < sz(70) && Math.abs(pt.y) < sz(20)) {
        cpu_play.value = !cpu_play.value;
        stage.update();
        event.preventDefault();
    }
});

// When playing CPU-only, the player's turn is also handled by the AI routines.
hookFunction(start_man);
dicewars.addEventListener('pre-start_man', function(event) {
    if (cpu_play.value) {
        event.preventDefault();
        start_com();
    }
});

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

// Never lose in a CPU-only game.
hookFunction(start_gameover);
dicewars.addEventListener('pre-start_gameover', function(event) {
    if (cpu_play.value) {
        event.preventDefault();

        // Switch the fake player to the winner of this battle.
        var winner = game.adat[game.area_from].arm;
        game.user = winner;

		if (remaining_players() == 1) {
			draw_player_data();
			start_win();
		} else {
			start_player();
		}
    }
});

// Set the player-controlled army back to purple so you don't end up playing
// as the last colour to win a cpu-only game.
hookFunction(start_title);
dicewars.addEventListener('pre-start_title', function(event) {
    game.user = 0;
});
