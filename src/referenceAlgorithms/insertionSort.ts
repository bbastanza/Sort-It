// Insertion Sort | Time 0(n^2) | Space 0(1)

export default function insertionSort(array: number[]): number[] {
    // We start here looping through the array; we start at 1 because the one we
    // are comparing it to is i - 1
    for (let i = 1; i < array.length; i++) {
        // Here we are setting the initial comparison value.
        let j: number = i;

        // We are checking the following conditions:
        // The value of array[j] is greater than the array[j - 1]
        // AND the j > 0
        // If these are true we swap each value.
        while (j > 0 && array[j] < array[j - 1]) {
            swap(array, j, j - 1);
            j--;
        }
    }
    return array;
}

function swap(array: number[], idx1: number, idx2: number) {
    const temp = array[idx1];
    array[idx1] = array[idx2];
    array[idx2] = temp;
}
// The essence of this algorithm is to INSERT the each value to where it belongs
// in the array. We do this by incrementing i and decrementing j. The result
// is the beginning of the array is sorted first.
