import { useState, useRef, useEffect } from "react";
import {
    initialArray as initArray,
    initialChartValue as initChart,
} from "./../helpers/initialValues";
import { calculateTimeDelay } from "../helpers/calculateTimeDelay";
import { bubbleswap } from "../helpers/bubbleswap";
import { IChartData } from "../helpers/interfaces";
import { delayUpdate } from "./../helpers/delayUpdate";
import DotAnimation from "./DotAnimation";
import SortTypeButtons from "./SortTypeButtons";
import SizeSlider from "./SizeSlider";
import ActionButtons from "./ActionButtons";
import Chart from "./Chart";

export default function Visualizer() {
    const [isSorting, setIsSorting] = useState<boolean>(false);
    const [canSort, setCanSort] = useState<boolean>(false);
    const [sortType, setSortType] = useState<string>("bubble");
    const [dataArray, setDataArray] = useState<number[]>(initArray);
    const [chartData, setChartData] = useState<IChartData>(initChart);
    const orangeValueRef = useRef<number>(0);
    const pinkValueRef = useRef<number>(0);
    const timeDelayRef = useRef<number>(80);
    const arrayRef = useRef<number[]>(dataArray);
    arrayRef.current = dataArray;

    useEffect((): void => {
        timeDelayRef.current = calculateTimeDelay(dataArray.length, sortType);
    }, [dataArray.length, sortType]);

    useEffect((): void => {
        let colors: any = [];
        if (isSorting) {
            for (const number of arrayRef.current) {
                if (number === orangeValueRef.current) colors.push("#FF7700");
                else if (number === pinkValueRef.current)
                    colors.push("#ff8686");
                else colors.push("#377E86");
            }
        } else {
            orangeValueRef.current = 0;
            pinkValueRef.current = 0;
            colors = "#377E86";
        }

        setChartData({
            labels: arrayRef.current,
            datasets: [
                {
                    label: "value",
                    data: arrayRef.current,
                    backgroundColor: colors,
                },
            ],
        });
    }, [dataArray, isSorting]);

    async function updateVisualization(
        pinkValue: number,
        orangeValue: number = 0
    ): Promise<void> {
        await delayUpdate(timeDelayRef.current);
        pinkValueRef.current = pinkValue;
        orangeValueRef.current = orangeValue;
        setDataArray([...dataArray]);
    }

    async function bubbleSort(): Promise<void> {
        let isSorted: boolean = false;
        while (!isSorted) {
            for (let i = 0; i < dataArray.length; i++) {
                isSorted = true;
                for (let j = 1; j < dataArray.length - i; j++) {
                    await updateVisualization(dataArray[j], dataArray[j - 1]);
                    if (dataArray[j] < dataArray[j - 1]) {
                        bubbleswap(dataArray, j, j - 1);
                        isSorted = false;
                    }
                }
            }
        }
    }

    async function insertionSort(): Promise<void> {
        orangeValueRef.current = 0;
        for (let i = 1; i < dataArray.length; i++) {
            let current: number = dataArray[i];
            let j: number = i - 1;
            while (j >= 0 && dataArray[j] > current) {
                dataArray[j + 1] = dataArray[j];
                j--;
                dataArray[j + 1] = current;
                await updateVisualization(dataArray[j], dataArray[j + 1]);
            }
        }
        setDataArray([...dataArray]);
    }

    async function selectionSort(): Promise<void> {
        for (let i = 0; i < dataArray.length; i++) {
            let minimumIdx = i;
            for (let j = i + 1; j < dataArray.length; j++) {
                if (dataArray[j] < dataArray[minimumIdx]) {
                    minimumIdx = j;
                }
                await updateVisualization(dataArray[j], dataArray[minimumIdx]);
            }
            if (minimumIdx !== i) {
                const temp = dataArray[minimumIdx];
                dataArray[minimumIdx] = dataArray[i];
                dataArray[i] = temp;
            }
        }
        setDataArray([...dataArray]);
    }

    async function mergeSort(): Promise<void> {
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
                await updateVisualization(array[left - 1]);
            } else {
                if (!!leftTempArray[i]) array[left] = rightTempArray[j];
                j++;
                await updateVisualization(0, array[left - 1]);
            }
            left++;
        }
        while (i < firstNumber) {
            if (!!leftTempArray[i]) array[left] = leftTempArray[i];
            i++;
            left++;
            await updateVisualization(array[left - 1]);
        }
        while (j < secondNumber) {
            if (!!leftTempArray[i]) array[left] = rightTempArray[j];
            j++;
            left++;
            await updateVisualization(0, array[left - 1]);
        }
        await updateVisualization(0);
    }

    async function quickSort() {}

    async function performSort(): Promise<void> {
        setCanSort(false);
        setIsSorting(true);
        switch (sortType) {
            case "bubble":
                await bubbleSort();
                break;
            case "insertion":
                await insertionSort();
                break;
            case "merge":
                await mergeSort();
                break;
            case "quick":
                await quickSort();
                break;
            default:
                await selectionSort();
        }
        setIsSorting(false);
    }

    return (
        <div style={{ marginTop: 20 }}>
            <Chart data={chartData} />
            <h2 style={{ textTransform: "capitalize" }}>{sortType} Sort</h2>
            {!isSorting ? (
                <>
                    <ActionButtons
                        performSort={performSort}
                        setCanSort={setCanSort}
                        dataArray={dataArray}
                        setDataArray={setDataArray}
                        canSort={canSort}
                    />
                    <SizeSlider
                        value={dataArray.length}
                        setCanSort={setCanSort}
                        setDataArray={setDataArray}
                    />
                    <SortTypeButtons
                        setSortType={setSortType}
                        sortType={sortType}
                    />
                </>
            ) : (
                <DotAnimation />
            )}
        </div>
    );
}
