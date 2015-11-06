(function () {
    'use strict';

    function createRootView () {
        var rootView = new RootComponent({});
        rootView.load();
        rootView.render();
        $('body').append(rootView._$el);
        return rootView;
    }

    function createUtilityView() {
        var utilityView = new  CustomComponent({
        });
        utilityView.load();
        utilityView.render();
        $('body').append(utilityView._$el);
    }

    var CustomComponent = FW.Component.extend('customComponent', {
        init: function (options) {
            CustomComponent.parent.init.call(this, options);
            this.text = options.text;
            this.listenTo(this, 'load', this._onLoad);
        },
        // TODO: Validation in template engine
        templateEngine: function(options) {
        },
        _onLoad: function() {
//            this.components().append(this.text, this, "hookLevel");
        }
    });

    var RootComponent = FW.Component.extend('RootComponent', {
            init: function (options) {
                options.template = '<div class="hookLevel1"></div>';
                RootComponent.parent.init.call(this, options);
                this.listenTo(this, 'load', this._onLoad);
            },
            _onLoad: function () {
                this.components().append('component1', new Component({ text: 'Component 1' }), '.hookLevel1');
                this.components().append('component2', new Component({ text: 'Component 2' }), '.hookLevel1');
                this.components().append('component3', new Component({ text: 'Component 3' }), '.hookLevel1');
            }
        }),

        Component = FW.Component.extend('Component', {
            init: function (options) {
                options.template = '<div class="component"><span>' + options.text + '</span><div class="hookLevel2"></div></div>';
                Component.parent.init.call(this, options);
                this.text = options.text;
                this.listenTo(this, 'load', this._onLoad);
            },
            _onLoad: function () {
                this.components().append('component1', new FW.Component({
                    template: 'Sub-component of ' + this.text
                }), '.hookLevel2');
            }
        });

    // Create a subview for popup product window
    createRootView();
    createUtilityView();
}());
