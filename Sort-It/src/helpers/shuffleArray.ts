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

export const initialArray: number[] = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
];
