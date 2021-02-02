import { useState, useRef, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import DotAnimation from "./DotAnimation";
import {
    shuffleArray,
    initialArray as initArray,
} from "../Algorithms/shuffleArray";
import { calculateTimeDelay } from "../helpers/calculateTimeDelay";
import { buttonClass } from "../helpers/buttonClass";
import { bubbleswap } from "../helpers/bubbleswap";
import { ChartData } from "../helpers/interfaces";

export default function Array() {
    const [isSorting, setIsSorting] = useState<boolean>(false);
    const [sortType, setSortType] = useState<string>("bubble");
    const initialArray = shuffleArray(initArray);
    const [dataArray, setDataArray] = useState<number[]>(initialArray);
    const [currentValue, setCurrentValue] = useState<number>(0);
    const [compareValue, setCompareValue] = useState<number>(0);
    const [chartData, setChartData] = useState<ChartData>({
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

    const arrayRef = useRef<number[]>([]);
    arrayRef.current = dataArray;

    useEffect(() => {
        let colors: any = [];

        if (!isSorting) colors = "#377E86";
        else {
            for (const number of arrayRef.current) {
                if (number === currentValue) colors.push("#FF7700");
                else if (number === compareValue) colors.push("#ff8686");
                else colors.push("#377E86");
            }
        }

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

    async function bubbleSort() {
        setIsSorting(true);
        let isSorted: boolean = false;
        while (!isSorted) {
            for (let i = 0; i < dataArray.length; i++) {
                isSorted = true;

                for (let j = 1; j < dataArray.length - i; j++) {
                    if (dataArray[j] < dataArray[j - 1]) {
                        const updatedArray = await bubbleswap(
                            dataArray,
                            j,
                            j - 1,
                            calculateTimeDelay(dataArray.length)
                        );
                        setCompareValue(dataArray[j + 1]);
                        setCurrentValue(dataArray[j]);
                        setDataArray([...updatedArray]);
                        isSorted = false;
                    }
                }
            }
        }
        setCurrentValue(0);
        setIsSorting(false);
    }

    async function insertionSort() {
        setIsSorting(true);
        // const newArray: number[] = dataArray;
        for (let i = 1; i < dataArray.length; i++) {
            let current: number = dataArray[i];
            let j: number = i - 1;
            setCurrentValue(current);
            setCompareValue(dataArray[i + 1]);

            while (j >= 0 && dataArray[j] > current)
                // eslint-disable-next-line
                await new Promise((resolve: any) =>
                    setTimeout(function () {
                        dataArray[j + 1] = dataArray[j];
                        j--;
                        dataArray[j + 1] = current;
                        resolve();
                    }, calculateTimeDelay(dataArray.length))
                );
            setDataArray([...dataArray]);
        }
        setIsSorting(false);
    }

    async function selectionSort() {
        setIsSorting(true);
        const length: number = dataArray.length;
        setCurrentValue(0);
        setCompareValue(1);
        for (let i = 0; i < length; i++) {
            let minimumIdx = i;
            for (let j = i + 1; j < length; j++) {
                // eslint-disable-next-line
                await new Promise((resolve: any) =>
                    setTimeout(function () {
                        if (dataArray[j] < dataArray[minimumIdx]) {
                            minimumIdx = j;
                        }
                        resolve();
                    }, calculateTimeDelay(dataArray.length))
                );
                setCurrentValue(dataArray[minimumIdx]);
                setCompareValue(dataArray[minimumIdx] + 1);
            }
            if (minimumIdx !== i) {
                const temp = dataArray[minimumIdx];
                dataArray[minimumIdx] = dataArray[i];
                dataArray[i] = temp;
            }
            setDataArray([...dataArray]);
        }
        setIsSorting(false);
    }

    function sortArray() {
        switch (sortType) {
            case "bubble":
                bubbleSort();
                break;
            case "insertion":
                insertionSort();
                break;
            case "merge":
                // mergeSort();
                break;
            case "quick":
                // quickSort();
                break;
            default:
                selectionSort();
        }
    }

    function changeSize(size: number) {
        const newArray: number[] = [];
        for (let i = 1; i <= size; i++) {
            newArray.push(i);
        }
        setDataArray([...shuffleArray(newArray)]);
    }

    return (
        <div style={{ marginTop: 20 }}>
            <h2 style={{ textTransform: "capitalize" }}>{sortType} Sort</h2>
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
            {!isSorting ? (
                <>
                    <div
                        style={{
                            margin: "15px 0 0",
                            display: "flex",
                            justifyContent: "center",
                        }}>
                        <button
                            className={"btn btn-lg btn-info sort-btn"}
                            onClick={sortArray}>
                            Sort It!
                        </button>
                        <button
                            className={"btn btn-secondary sort-btn"}
                            onClick={() =>
                                setDataArray([...shuffleArray(dataArray)])
                            }>
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
                        onChange={(e) => changeSize(parseInt(e.target.value))}
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
}
