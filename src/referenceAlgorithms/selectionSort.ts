// Selection Sort | Time O(n^2) | Space O(1)
export function selectionSort(array: number[]): number[] {
    // This is the outer loop. For this algorithm we must loop through the array
        // twice.
    for (let i = 0; i < array.length; i++) {

        // We start by assuming the smallest number is the first one in the array.
        let minimumIdx = i;

        // Here we are looping through the array a second time.
        // We start with j = i + 1 because everything up to i has already been 
            // sorted and i is already the minimum idx.
        for (let j = i + 1; j < array.length; j++) {
            // Here we are keeping track of the idx with the lowest value as
            // we iterate
            if (array[j] < array[minimumIdx]) {
                minimumIdx = j;
            }
        }

        // if a number smaller than array[i] is found we swap the values.
        if (minimumIdx !== i) {
            swap(array, minimumIdx, i)
        }
    }

    return array;
}

// This is a simple swapping function two switch two elements in a given array.
function swap(array: number[], index1: number, index2: number): void {
    const temp: number = array[index1];
    array[index1] = array[index2];
    array[index2] = temp;
}

