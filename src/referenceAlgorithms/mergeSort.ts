// Merge Sort O(N log N)
export function mergeSort(array: number[]): number[] {
    for (
        let currentSize: number = 1;
        currentSize <= array.length - 1;
        currentSize = currentSize * 2
    ) {

        for (
            let leftStart = 0;
            leftStart < array.length - 1;
            leftStart += currentSize * 2
        ) {
            const middle = leftStart + currentSize - 1;
            const rightEnd = Math.min(
                leftStart + currentSize * 2 - 1,
                array.length - 1
            );

            merge(array, leftStart, middle, rightEnd);
        }
    }

    return array;
}

function merge(
    array: number[],
    left: number,
    middle: number,
    right: number
): void {
    const firstNumber: number = middle - left + 1;
    const secondNumber: number = right - middle;

    let i: number;
    let j: number;

    const leftTempArray: number[] = [firstNumber];
    const rightTempArray: number[] = [secondNumber];

    for (i = 0; i < firstNumber; i++) {
        leftTempArray[i] = array[left + i];
    }

    for (j = 0; j < secondNumber; j++) {
        rightTempArray[j] = array[middle + 1 + j];
    }

    i = 0;
    j = 0;
    while (i < firstNumber && j < secondNumber) {
        if (leftTempArray[i] <= rightTempArray[j]) {
            if (!!leftTempArray[i]) array[left] = leftTempArray[i];
            i++;
        } else {
            if (!!leftTempArray[i]) array[left] = rightTempArray[j];
            j++;
        }
        left++;
    }

    while (i < firstNumber) {
        if (!!leftTempArray[i]) array[left] = leftTempArray[i];
        i++;
        left++;
    }

    while (j < secondNumber) {
        if (!!leftTempArray[i]) array[left] = rightTempArray[j];
        j++;
        left++;
    }
}

// TODO add explanation
