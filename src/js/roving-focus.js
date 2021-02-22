(function() {
    'use strict';

    // Define values for keycodes
    var VK_LEFT = 37;
    // var VK_UP = 38;
    var VK_RIGHT = 39;
    // var VK_DOWN = 40;

    // Helper function to convert NodeLists to Arrays
    function slice(nodes) {
        return Array.prototype.slice.call(nodes);
    }

    function RadioGroup(id) {
        this.el = document.querySelector(id);
        this.buttons = slice(this.el.querySelectorAll('.nav-tab'));
        this.selected = 0;
        this.focusedButton = this.buttons[this.selected];

        this.el.addEventListener('keydown', this.handleKeyDown.bind(this));
        this.el.addEventListener('click', this.handleClick.bind(this));
    }

    RadioGroup.prototype.handleKeyDown = function(e) {
        switch(e.keyCode) {
            // case VK_UP:
            case VK_LEFT: {
                e.preventDefault();

                if (this.selected === 0) {
                    this.selected = this.buttons.length - 1;
                } else {
                    this.selected--;
                }
                break;
            }

            // case VK_DOWN:
            case VK_RIGHT: {
                e.preventDefault();

                if (this.selected === this.buttons.length - 1) {
                    this.selected = 0;
                } else {
                    this.selected++;
                }
                break;
            }
        }
        this.changeFocus(this.selected);
    };

    RadioGroup.prototype.handleClick = function(e) {
        var children = e.target.parentNode.children
        for (var i = 0; i < children.length; i++) {
            if (e.target == children[i]) break;
        }
        this.selected = i;
        this.changeFocus(this.selected);
    }

    RadioGroup.prototype.changeFocus = function(idx) {
        // Set the old button to tabindex -1
        this.focusedButton.tabIndex = -1;
        // this.focusedButton.setAttribute("tabindex", "-1");

        // Set the new button to tabindex 0 and focus it
        this.focusedButton = this.buttons[idx];
        this.focusedButton.tabIndex = 0;
        this.focusedButton.focus();
        // this.focusedButton.setAttribute("tabindex", "0");
    };

    var group1 = new RadioGroup('#tablist-1');
    var group2 = new RadioGroup('#tablist-2');
}());