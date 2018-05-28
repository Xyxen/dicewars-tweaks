'use strict';

// Add a title button to the map selection screen.
hookFunction(make_map);
dicewars.addEventListener('post-make_map', function() {
    // Position is a bit ugly, but it should keep anyone from accidentally
    // clicking it instead of "yes."
    spr[sn_btn_title].x = sz(725);
    spr[sn_btn_title].y = ypos_mes + sz(90);
    spr[sn_btn_title].visible = true;
    btn_func[BTN_TITLE] = start_title;
    stage.update();
});
