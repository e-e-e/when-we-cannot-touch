"use strict";
function wait(t) {
    return new Promise(function (resolve) {
        setTimeout(resolve, t);
    });
}
function addImageToDom(img) {
    var _a;
    var div = document.createElement('div');
    div.appendChild(img);
    div.style.position = 'absolute';
    div.style.top = Math.random() * 80 + 10 + "%";
    div.style.left = Math.random() * 100 + "%";
    div.style.zIndex = '-1';
    div.className = 'security';
    var scale = window.screen.width < 660 ? 0.75 : 1;
    var rotation = Math.random() * 360;
    div.style.transform = "translateX(-" + img.width * scale + "px) rotate(" + rotation + "deg) scale(" + scale + ")";
    (_a = document.getElementById('signatures')) === null || _a === void 0 ? void 0 : _a.appendChild(div);
}
function createSecurity(index) {
    return new Promise(function (resolve, reject) {
        console.log('create');
        var img = new Image();
        img.onload = function () {
            addImageToDom(img);
            resolve();
        };
        img.onerror = function (e) {
            console.log(e);
            reject();
        };
        img.src = "./imgs/WWCT_01_Security-Window" + index + ".png";
    });
}
function startAnimation() {
    var promises = Promise.resolve();
    var _loop_1 = function (i) {
        promises = promises.then(function () { return createSecurity(i); }).then(function () { return wait(750); });
    };
    for (var i = 1; i <= 7; i++) {
        _loop_1(i);
    }
}
startAnimation();
//# sourceMappingURL=client.js.map