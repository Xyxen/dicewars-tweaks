'use strict';

var fast_play = false;

var sn_btn_fastgame;
window.addEventListener('game_init', function() {
    var fast_btn = new createjs.Text("Fast Game", sz(32)+'px Anton', '#aaa');
    fast_btn.name = 'fast_game';
    fast_btn.x = view_w * 0.1;
    fast_btn.y = ypos_mes + sz(60);
    fast_btn.textAlign = 'center';
    fast_btn.textBaseline = 'middle';
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

var start_title_old = start_title;
//OVERRIDE: Reset the fast play flag each time a new game is started.
start_title = function()
{
    start_title_old();

    // Reset fast play flag.
    btn_func[0] = function()
    {
        fast_play = false;
        make_map();
    }
}

var make_map_old = make_map;
//OVERRIDE: Show the fast play button on the map selection screen.
make_map = function()
{
    make_map_old();
    click_func = click_gameopts;
    spr[sn_btn_fastgame].visible = true;
    stage.update();
}

var start_battle_old = start_battle;
//OVERRIDE: Don't show dice rolls for AI players when in fast play mode.
start_battle = function()
{
    start_battle_old();

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
    }
}
