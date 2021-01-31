"use strict";
exports.__esModule = true;
function insertionSort(array) {
    for (var i = 1; i < array.length; i++) {
        var current = array[i];
        var j = i - 1;
        while (j >= 0 && array[j] > current) {
            array[j + 1] = array[j];
            j--;
        }
        array[j + 1] = current;
    }
    return array;
}
exports["default"] = insertionSort;
var array = [2, 5, 3, 6, 1, 4, 9, 8];
console.log(insertionSort(array));
