(function () {
    'use strict';
    // load the audio clips
    let stickShake;
    GM.getResourceUrl("stall").then(
        (data)=>{
            stickShake = new Audio(data);
            stickShake.loop = true;
        }
    );
    let overspeedClacker;
    GM.getResourceUrl("overspeed").then(
        (data) => {
            overspeedClacker = new Audio(data);
            overspeedClacker.loop = true;
        }
    );
    // wait until flight sim is fully loaded
    let itv = setInterval(
        function(){
            if(unsafeWindow.ui && unsafeWindow.flight){
                main();
                clearInterval(itv);
            }
        }
    ,500);
    function main(){
        // monkey-patch the stall.setVisibility method
        let prevStalled = false;
        unsafeWindow.ui.hud.stall.setVisOld = unsafeWindow.ui.hud.stall.setVisibility;
        unsafeWindow.ui.hud.stall.setVisibility = function (a) {
            if (a) {
                stickShake.play();
            } else if (prevStalled) {
                stickShake.pause();
            }
            prevStalled = a;
            this.setVisOld(a);
        }
        // monkey-patch the setAnimationValue method
        let prevOversped = false;
        unsafeWindow.flight.setAniValOld = unsafeWindow.flight.setAnimationValues;
        unsafeWindow.flight.setAnimationValues = function(a) {
            this.setAniValOld(a);
            let hasOversped = unsafeWindow.geofs.animation.values.kias >= 350;
            if (hasOversped && !prevOversped){
                overspeedClacker.play();
            } else if (!hasOversped && prevOversped){
                overspeedClacker.pause();
            }
            prevOversped = hasOversped;
        }
    }
})();