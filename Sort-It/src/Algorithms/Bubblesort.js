"use strict";
exports.__esModule = true;
exports.bubbleSort = void 0;
function bubbleSort(array) {
    var isSorted = false;
    while (!isSorted) {
        for (var i = 0; i < array.length; i++) {
            isSorted = true;
            for (var j = 1; j < array.length - i; j++) {
                if (array[j] < array[j - 1]) {
                    swap(array, j, j - 1);
                    isSorted = false;
                }
            }
        }
    }
    return array;
}
exports.bubbleSort = bubbleSort;
function swap(array, index1, index2) {
    var temp = array[index1];
    array[index1] = array[index2];
    array[index2] = temp;
}
var array = [3, 5, 7, 4, 1, 9];
console.log(bubbleSort(array));
