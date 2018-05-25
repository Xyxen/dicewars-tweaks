'use strict';

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
