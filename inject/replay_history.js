'use strict';

var sn_btn_replay_history;
dicewars.addEventListener('init', function() {
    sn_btn_replay_history = addButtonWithLabel("REPLAY", start_history);
}, {once: true});

hookFunction(start_history);
dicewars.addEventListener('pre-start_history', function(event) {
    event.preventDefault();

    // Disable stage redraws.
    var update = stage.update;
    stage.update = new Function();

    event.callOriginal();

    // Modify the layout and add the replay button.
    spr[sn_btn_title].x = view_w / 2 - sz(150);
    spr[sn_btn_top].x = view_w / 2 + sz(150);

    var btn_replay = spr[sn_btn_replay_history];
    btn_replay.x = view_w / 2;
    btn_replay.y = spr[sn_btn_title].y;
    btn_replay.visible = true;

    // Re-enable stage redraws, and paint.
    stage.update = update;
    stage.update();
});
