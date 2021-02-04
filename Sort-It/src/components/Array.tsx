import { useState, useRef, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import DotAnimation from "./DotAnimation";
import {
    shuffleArray,
    initialArray as initArray,
} from "../helpers/shuffleArray";
import { calculateTimeDelay } from "../helpers/calculateTimeDelay";
import { changeSize } from "../helpers/changesize";
import { buttonClass } from "../helpers/buttonClass";
import { bubbleswap } from "../helpers/bubbleswap";
import { IChartData } from "../helpers/interfaces";

export default function Array() {
    const initialArray = shuffleArray(initArray);
    const [isSorting, setIsSorting] = useState<boolean>(false);
    const [sortType, setSortType] = useState<string>("bubble");
    const [canSort, setCanSort] = useState<boolean>(true);
    const [dataArray, setDataArray] = useState<number[]>(initialArray);
    const orangeValueRef = useRef<number>(5);
    const pinkValueRef = useRef<number>(10);
    const arrayRef = useRef<number[]>(dataArray);
    arrayRef.current = dataArray;
    const [chartData, setChartData] = useState<IChartData>({
        labels: initialArray,
        datasets: [
            {
                label: "value",
                data: initialArray,
                backgroundColor: "#377E86",
                borderColor: "#313131",
            },
        ],
    });

    useEffect((): void => {
        let colors: any = [];
        if (isSorting) {
            for (const number of arrayRef.current) {
                if (number === orangeValueRef.current) colors.push("#FF7700");
                else if (number === pinkValueRef.current)
                    colors.push("#ff8686");
                else colors.push("#377E86");
            }
        } else colors = "#377E86";

        setChartData({
            labels: arrayRef.current,
            datasets: [
                {
                    label: "value",
                    data: arrayRef.current,
                    backgroundColor: colors,
                    borderColor: "#313131",
                },
            ],
        });
    }, [dataArray, isSorting]);

    async function updateAndPause(
        pinkValue: number,
        orangeValue: number
    ): Promise<void> {
        await new Promise((resolve: any) =>
            setTimeout(resolve, calculateTimeDelay(dataArray.length, sortType))
        );
        const tempArray: number[] = [];
        for (const number of dataArray) {
            if (!!number) tempArray.push(number);
        }
        pinkValueRef.current = pinkValue;
        orangeValueRef.current = orangeValue;
        setDataArray([...tempArray]);
    }

    async function bubbleSort(): Promise<void> {
        setCanSort(false);
        setIsSorting(true);
        let isSorted: boolean = false;
        while (!isSorted) {
            for (let i = 0; i < dataArray.length; i++) {
                isSorted = true;
                for (let j = 1; j < dataArray.length - i; j++) {
                    await updateAndPause(dataArray[j], dataArray[j - 1]);
                    if (dataArray[j] < dataArray[j - 1]) {
                        bubbleswap(dataArray, j, j - 1);
                        isSorted = false;
                    }
                }
            }
        }
        setIsSorting(false);
    }

    async function insertionSort(): Promise<void> {
        setCanSort(false);
        setIsSorting(true);
        orangeValueRef.current = 0;
        for (let i = 1; i < dataArray.length; i++) {
            let current: number = dataArray[i];
            let j: number = i - 1;
            while (j >= 0 && dataArray[j] > current) {
                dataArray[j + 1] = dataArray[j];
                j--;
                dataArray[j + 1] = current;
                await updateAndPause(dataArray[j], dataArray[j + 1]);
            }
        }
        setDataArray([...dataArray]);
        setIsSorting(false);
    }

    async function selectionSort(): Promise<void> {
        setCanSort(false);
        setIsSorting(true);
        for (let i = 0; i < dataArray.length; i++) {
            let minimumIdx = i;
            for (let j = i + 1; j < dataArray.length; j++) {
                if (dataArray[j] < dataArray[minimumIdx]) {
                    minimumIdx = j;
                }
                await updateAndPause(dataArray[j], dataArray[minimumIdx]);
            }
            if (minimumIdx !== i) {
                const temp = dataArray[minimumIdx];
                dataArray[minimumIdx] = dataArray[i];
                dataArray[i] = temp;
            }
        }
        setDataArray([...dataArray]);
        setIsSorting(false);
    }

    async function mergeSort(): Promise<void> {
        setCanSort(false);
        setIsSorting(true);
        const length: number = dataArray.length;
        for (
            let currentSize: number = 1;
            currentSize <= length - 1;
            currentSize = currentSize * 2
        ) {
            for (
                let leftStart = 0;
                leftStart < length - 1;
                leftStart += currentSize * 2
            ) {
                const middle = leftStart + currentSize - 1;
                const rightEnd = Math.min(
                    leftStart + currentSize * 2 - 1,
                    length - 1
                );
                await merge(dataArray, leftStart, middle, rightEnd);
            }
        }
        setIsSorting(false);
        setCanSort(true);
    }

    async function merge(
        array: number[],
        left: number,
        middle: number,
        right: number
    ): Promise<void> {
        const firstNumber: number = middle - left + 1;
        const secondNumber: number = right - middle;
        let i: number;
        let j: number;

        const leftTempArray: number[] = [firstNumber];
        const rightTempArray: number[] = [secondNumber];

        for (i = 0; i < firstNumber; i++) {
            leftTempArray[i] = array[left + i];
            await updateAndPause(0, 0);
        }
        for (j = 0; j < secondNumber; j++) {
            rightTempArray[j] = array[middle + 1 + j];
            await updateAndPause(0, 0);
        }

        i = 0;
        j = 0;
        while (i < firstNumber && j < secondNumber) {
            if (leftTempArray[i] <= rightTempArray[j]) {
                array[left] = leftTempArray[i];
                i++;
                await updateAndPause(dataArray[left], rightTempArray[j]);
            } else {
                array[left] = rightTempArray[j];
                j++;
                await updateAndPause(dataArray[left], leftTempArray[i]);
            }
            left++;
        }
        while (i < firstNumber) {
            array[left] = leftTempArray[i];
            i++;
            left++;
            await updateAndPause(dataArray[left], 0);
        }
        await updateAndPause(0, 0);
        while (j < secondNumber) {
            array[left] = rightTempArray[j];
            j++;
            left++;
            await updateAndPause(dataArray[left], 0);
        }
    }

    function sortArray(): void {
        if (canSort) {
            switch (sortType) {
                case "bubble":
                    bubbleSort();
                    break;
                case "insertion":
                    insertionSort();
                    break;
                case "merge":
                    mergeSort();
                    break;
                case "quick":
                    // quickSort();
                    break;
                default:
                    selectionSort();
            }
        }
    }

    return (
        <div style={{ marginTop: 20 }}>
            <div
                style={{
                    width: "70vw",
                    height: "60vh",
                    display: "flex",
                    justifyContent: "center",
                    margin: "auto",
                }}>
                <Bar
                    data={chartData}
                    options={{
                        maintainAspectRatio: false,
                        animation: false,
                        legend: {
                            display: false,
                        },
                    }}
                />
            </div>
            {/* TODO put all buttons in their own components}*/}
            {!isSorting ? (
                <>
                    <h2 style={{ textTransform: "capitalize" }}>
                        {sortType} Sort
                    </h2>
                    <div
                        style={{
                            margin: "15px 0 0",
                            display: "flex",
                            justifyContent: "center",
                        }}>
                        {canSort ? (
                            <button
                                className={"btn btn-lg btn-info sort-btn"}
                                onClick={sortArray}>
                                Sort It!
                            </button>
                        ) : null}
                        <button
                            className={"btn btn-secondary sort-btn"}
                            onClick={() => {
                                setCanSort(true);
                                const newArray = shuffleArray(dataArray);
                                setDataArray([...newArray]);
                            }}>
                            Shuffle Array
                        </button>
                    </div>
                    <h3>Array Size</h3>
                    <input
                        type="range"
                        min="25"
                        max="125"
                        step="20"
                        value={dataArray.length}
                        className="slider"
                        onChange={(e) => {
                            setCanSort(true);
                            setDataArray([
                                ...changeSize(parseInt(e.target.value)),
                            ]);
                        }}
                        style={{ width: "20vw" }}
                    />
                    <hr />
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <button
                            className={buttonClass("bubble", sortType)}
                            onClick={() => setSortType("bubble")}>
                            Bubble Sort
                        </button>
                        <button
                            className={buttonClass("insertion", sortType)}
                            onClick={() => setSortType("insertion")}>
                            Insertion Sort
                        </button>
                        <button
                            name="selection"
                            className={buttonClass("selection", sortType)}
                            onClick={() => setSortType("selection")}>
                            Selection Sort
                        </button>
                        <button
                            className={buttonClass("merge", sortType)}
                            onClick={() => setSortType("merge")}>
                            Merge Sort
                        </button>
                        <button
                            className={buttonClass("quick", sortType)}
                            onClick={() => setSortType("quick")}>
                            Quick Sort
                        </button>
                    </div>
                </>
            ) : (
                <DotAnimation />
            )}
        </div>
    );
    // ***********
}
