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
    const soundsURL = "https://raw.githubusercontent.com/SilverStar7815/0x78156896/blob/main/sons/"
    var s1000 = "1000.wav"
    var sound = soundsURL + s1000
    s1000.play()
};
