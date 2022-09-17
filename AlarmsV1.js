// ==UserScript==
// @name Geo-FS default tampermonkey
// @namespace http://tampermonkey.net/
// @version 0.2
// @description Geo-FS default tampermonkey
// @author Elon
// @match http:///geofs.php
// @match https:///geofs.php
// @run-at document-end
// @grant none
// ==/UserScript==
let itv = setInterval(
    function() {
        try {
            if (window.ui && window.flight) {
                main();
                clearInterval(itv);
            }
        } catch (err) {}
    }, 500);

function main() {
    const audio1 = new Audio("https://github.com/silverstar7815/geofs-alarms/sounds/stall.ogg")
    audio1.play()
};