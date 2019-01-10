var x = [0, '1', null, undefined];
var a = [1, 3, 5, 7, 9];
var _loop_1 = function (i) {
    setTimeout(function () {
        console.log(i);
    }, 100);
};
for (var i = 0; i < a.length; i++) {
    _loop_1(i);
}
