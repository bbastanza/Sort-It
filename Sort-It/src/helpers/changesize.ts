import {shuffleArray} from "./shuffleArray"

export function changeSize(size: number) {
    const newArray: number[] = [];
    for (let i = 1; i <= size; i++) {
        newArray.push(i);
    }
    return shuffleArray(newArray)
}
