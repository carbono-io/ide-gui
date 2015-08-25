// jshint unused:false
'use strict';
var CarboComponentsPalette = Polymer({
    is: 'carbo-components-palette',
    handleComponentMouseOver: function(event) {

        event = Polymer.dom(event)

        var componentTarget = event.rootTarget;

        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;

        var previewWidth = this.$.preview.offsetWidth;
        var previewHeight = this.$.preview.offsetHeight;

        var componentTargetWidth = componentTarget.offsetWidth;
        var componentTargetHeight = componentTarget.offsetHeight;
        var componentTargetLeftPosition = componentTarget.offsetLeft;
        var componentTargetTopPosition = componentTarget.offsetTop;

//        var distanceToBorderRight = componentTargetRightPosition - componentTargetWidth;
        var distanceToBottom = windowHeight - componentTargetTopPosition;

        if (previewWidth <= componentTargetLeftPosition) {
            console.log("espaço menor");
            this.$.preview.style.right = componentTargetLeftPosition + "px";
            console.log(componentTargetLeftPosition);
        } else {
            console.log("espaço maior");
            this.$.preview.style.right = componentTargetLeftPosition - previewWidth + "px";
            console.log(componentTargetLeftPosition);
        }

//        if (previewHeight <= distanceToBottom) {
//            this.$.preview.style.top = windowHeight - previewHeight + "px";
//            console.log("altura menor");
//            console.log("y:" + componentTargetTopPosition);
//            console.log(previewHeight);
//        } else {
//            this.$.preview.style.top = componentTargetTopPosition + "px";
//            console.log("altura maior");
//            console.log(previewHeight);
//        }
    }
});
