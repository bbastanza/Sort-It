export async function bubbleswap(
    array: number[],
    index1: number,
    index2: number,
    timeDelay: number
) {
    await new Promise((resolve: any) =>
        setTimeout(async function () {
            const temp: number = array[index1];
            array[index1] = array[index2];
            array[index2] = temp;
            resolve();
        }, timeDelay)
    );
    return array;
}
