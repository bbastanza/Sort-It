
// Bubble Sort | Time 0(n^2) | Space 0(1)

export function bubbleSort(array: number[]): number[] {

    // We will assume the array is not sorted
    let isSorted: boolean = false;

    while (!isSorted) {
        // Here we start by iterating the array. This is the outer loop.
        for (let i = 0; i < array.length; i++) {
            
            // We set isSorted to true; if the following statement do not make a 
                // swap we will exit the while loop.
            isSorted = true;

            // Here we iterate through the array again. This is the inner loop.
            // We do an small optimization here which is ```array.length - i```
            // By doing this we do not have to iterate through the end of the
                // array; that part is already sorted.
            for (let j = 1; j < array.length - i; j++) {

                // Is the number where looking at is greater than the number after it?
                // If so, we swap the numbers.
                if (array[j] > array[j + 1]) {

                    // Here we call the swap function to swap the two values in the array.
                    swap(array, j, j + 1);

                    // Did we perform a swap at any point during the iteration?
                    // If so, we must continue iterating.
                    isSorted = false;
                }
            }
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

