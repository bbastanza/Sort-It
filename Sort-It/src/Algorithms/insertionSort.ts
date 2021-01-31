// Insertion Sort 0(N^2)
export default function insertionSort(array: number[]) {
    for (let i = 1; i < array.length; i++) {
        let current: number = array[i];
        let j: number = i - 1;

        while (j >= 0 && array[j] > current) {
            array[j + 1] = array[j];
            j--;
        }

        array[j + 1] = current;
    }
    return array;
}

const array: number[] = [2, 5, 3, 6, 1, 4, 9, 8];

console.log(insertionSort(array))
