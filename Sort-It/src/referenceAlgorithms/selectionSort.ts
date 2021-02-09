// Selection Sort O(N^2)
export function selectionSort(array: number[]): number[] {
    for (let i = 0; i < array.length; i++) {

        let minimumIdx = i;

        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[minimumIdx]) {
                minimumIdx = j;
            }
        }

        if (minimumIdx !== i) {
            const temp = array[minimumIdx];
            array[minimumIdx] = array[i];
            array[i] = temp;
        }
    }

    return array;
}

// TODO add explanation
