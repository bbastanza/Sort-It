// export function quickSort(
//     array: number[],
//     start: number = 0,
//     end: number = array.length - 1
// ) {
//     if (start >= end) return;
//     let index = partition(array, start, end);
//     quickSort(array, start, index - 1);
//     quickSort(array, index + 1, end);
// }

// function partition(array: number[], start: number, end: number) {
//     let pivotIndex = start;
//     let pivotValue = array[end];
//     for (let i = start; i < end; i++) {
//         if (array[i] < pivotValue) {
//             swap(array, i, pivotIndex);
//             pivotIndex++;
//         }
//     }
//     swap(array, pivotIndex, end);
//     return pivotIndex;
// }
export let something = 0;
