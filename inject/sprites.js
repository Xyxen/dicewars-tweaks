'use strict';

// Name all of the anonymously-indexed buttons.
var BTN_START = 0;
var BTN_TOP = 1;
var BTN_YES = 2;
var BTN_NO = 3;
var BTN_ENDTURN = 4;
var BTN_TITLE = 5;
var BTN_HISTORY = 6;

// Shortcuts to reach button sprites.
var sn_btn_start, sn_btn_top, sn_btn_yes, sn_btn_no, sn_btn_endturn,
    sn_btn_title, sn_btn_history;
dicewars.addEventListener('init', function() {
    sn_btn_start = sn_btn + BTN_START;
    sn_btn_top = sn_btn + BTN_TOP;
    sn_btn_yes = sn_btn + BTN_YES;
    sn_btn_no = sn_btn + BTN_NO;
    sn_btn_endturn = sn_btn + BTN_ENDTURN;
    sn_btn_title = sn_btn + BTN_TITLE;
    sn_btn_history = sn_btn + BTN_HISTORY;
});

// Handles resolution-dependent scaling.
function sz(px)
{
    return Math.floor(px * nume / deno);
}

// Add a top-level sprite to the game's sprite list.
function addSprite(sprite)
{
    var sn_new = sn_max;
    spr[sn_new] = sprite;
    stage.addChild(sprite);
    sn_max++;
    return sn_new;
}
