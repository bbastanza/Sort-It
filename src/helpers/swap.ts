export function swap(
    array: number[],
    index1: number,
    index2: number,
): void {
    const temp: number = array[index1];
    array[index1] = array[index2];
    array[index2] = temp;
}
