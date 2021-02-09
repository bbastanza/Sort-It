// Quicksort O(N log N)
export function quickSort(
    array: number[],
    start: number = 0,
    end: number = array.length - 1
) {
    if (start >= end) return;

    let index = partition(array, start, end);

    quickSort(array, start, index - 1);
    quickSort(array, index + 1, end);
}

function partition(array: number[], start: number, end: number) {
    let pivotIndex = start;
    let pivotValue = array[end];

    for (let i = start; i < end; i++) {
        if (array[i] < pivotValue) {
            swap(array, i, pivotIndex);
            pivotIndex++;
        }
    }

    swap(array, pivotIndex, end);
    return pivotIndex;
}

function swap(array: number[], index1: number, index2: number): void {
    const temp: number = array[index1];
    array[index1] = array[index2];
    array[index2] = temp;
}

// TODO add explanation
