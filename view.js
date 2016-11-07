// TODO: register onclose method when unload components for cleanup

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
        var utilityView = new UtilityComponent({ 
            text: "Utility Panel", 
            info:{
                Name: "Name",
                Description: "Description",
                Length: "Length",
                Height: "Height",
                Weight: "Weight",
                Value: "Value" //in US Dollars
            },
            domInfo: {
                domClassName: "inputBox",
                domTag: "form"
            }
        });
        utilityView.load();
        utilityView.render();
        $('body').append(utilityView._$el);
    }

    var UtilityComponent = FW.Component.extend('UtilityComponent', {
        init: function (options) {
            options.template = '<div class="utilityPanel"><span>' + options.text + '</span><form class="utilityPanelLevel1"></form></div>';
            UtilityComponent.parent.init.call(this, options);
            this.text = options.text;
            this.info = options.info;
            options.domInfo.domTag = "p";
            this.domInfo = options.domInfo;
            this.listenTo(this, 'load', this._onLoad);
        },
        _onLoad: function() {
            var idx = 0;
            _.each(this.info, function(infoEntry) {
                this.components().append(this.text + idx++, new InputBoxComponent({ text: infoEntry, domInfo: this.domInfo }), ".utilityPanelLevel1");
            }.bind(this));
            // this.components().append(this.text, new Component({ text: 'SubComponent' }), ".utilityPanelLevel1");
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
        }),

        InputBoxComponent = FW.Component.extend('InputBoxComponent', {
            init: function (options) {
              var domInfo = options.domInfo;
              // options.template = '<form class="inputBox"></form>';
              // options.template = '<' + domInfo.domTag + ' ' + 'class="inputBox"></'+ domInfo.domTag + '>';
              options.template = '<' + domInfo.domTag + ' ' + 'class='+ domInfo.domClassName + '></'+ domInfo.domTag + '>';
              console.log(options);
              Component.parent.init.call(this, options);
              this.text = options.text;
              this.listenTo(this, 'load', this._onLoad);
            },
            _onLoad: function () {
                this.components().append('Component2', new FW.Component({
                    template: '<label' + ' ' + 'for=' + this.text.toLowerCase() + '>' + this.text + ':' + '</lable>'
                }), '.inputBox');

                this.components().append('component1', new FW.Component({
                    template: '<input type="text"' + 'name=' + this.text + 'value=' + ">"
                }), '.inputBox');
            }
        });

      createRootView();
      createUtilityView();
}());
