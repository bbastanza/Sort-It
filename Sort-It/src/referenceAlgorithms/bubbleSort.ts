// Bubble Sort 0(N^2)
export function bubbleSort(array: number[]): number[] {
    let isSorted: boolean = false;
    while (!isSorted) {
        for (let i = 0; i < array.length; i++) {
            isSorted = true;

            for (let j = 1; j < array.length - i; j++) {
                if (array[j] < array[j - 1]) {
                    swap(array, j, j - 1);
                    isSorted = false;
                }
            }
        }
    }
    return array;
}

function swap(array: number[], index1: number, index2: number) {
    const temp: number = array[index1];
    array[index1] = array[index2];
    array[index2] = temp;
}
