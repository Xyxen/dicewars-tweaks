'use strict';

var buttons = [];

// Register existing buttons.
dicewars.addEventListener('init', function() {
    buttons = buttons.concat(spr.slice(sn_btn, sn_btn + bmax));
});

hookFunction(check_button);
dicewars.addEventListener('pre-check_button', function(event) {
    // This is basically a reimplementation.
    event.preventDefault();

    var hit = -1;
    buttons.forEach((button, id) => {
        if (!button.visible) return;

        var pt = button.globalToLocal(stage.mouseX, stage.mouseY);
        if (button.hitTest(pt.x, pt.y)) {
            hit = id;
        }
    });

    // Do nothing if the active button hasn't changed.
    if (activebutton == hit) return;

    // Remove highlight from the old button.
    if (activebutton >= 0) {
        buttons[activebutton].getChildAt(0).gotoAndStop("btn");
    }

    activebutton = hit;

    // Add highlight to the new button.
    if (activebutton >= 0) {
        buttons[activebutton].getChildAt(0).gotoAndStop("press");
    }

    stage.update();
});

function addButtonWithLabel(label, func)
{
    var button = new createjs.Container();

    var background = new lib.mc();
    background.gotoAndStop("btn");
    button.addChildAt(background, 0);

    var txt = new createjs.Text(label, '32px Anton', 'Black');
    txt.textAlign = 'center';
    txt.textBaseline = 'middle';
    button.addChildAt(txt, 1);

    button.scaleX = nume/deno;
    button.scaleY = nume/deno;
    button.visible = false;

    var id = buttons.push(button) - 1;
    btn_func[id] = func;
    return addSprite(button);
}
