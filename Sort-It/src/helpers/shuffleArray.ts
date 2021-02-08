export function shuffleArray(array: number[]): number[] {
    let currentIdx: number = array.length;
    while (currentIdx !== 0) {
        let randomIdx: number = Math.floor(Math.random() * currentIdx);
        currentIdx -= 1;
        let tmp: number = array[currentIdx];
        array[currentIdx] = array[randomIdx];
        array[randomIdx] = tmp;
    }
    return array;
}
