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
        var utilityView = new UtilityComponent({ text: "utility" });
        utilityView.load();
        utilityView.render();
        $('body').append(utilityView._$el);
    }

    var UtilityComponent = FW.Component.extend('UtilityComponent', {
        init: function (options) {
            options.template = '<div class="utilityPanel"><span>' + options.text + '</span><div class="utilityPanelLevel1"></div></div>';
            UtilityComponent.parent.init.call(this, options);
            this.text = options.text;
            this.listenTo(this, 'load', this._onLoad);
        },
        _onLoad: function() {
            // this.components().append(this.text, new Component({ text: 'SubComponent' }), ".utilityPanelLevel1");
            this.components().append(this.text + 1, new FW.Component({ template: 'SubComponent1' }), ".utilityPanelLevel1");
            this.components().append(this.text + 2, new FW.Component({ template: 'SubComponent2' }), ".utilityPanelLevel1");
            this.components().append(this.text + 3, new FW.Component({ template: 'SubComponent3' }), ".utilityPanelLevel1");
        }
    });

    // Control box subView


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
//                this.components().append('component4', new CustomComponent({ text: 'Component 4'}), '.hookLevel1');
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

    createRootView();
    createUtilityView();
}());
