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
    const [currentValue, setCurrentValue] = useState<number>(0);
    const [compareValue, setCompareValue] = useState<number>(0);
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
        // TODO fix linting issue HINT useRef
        // eslint-disable-next-line
    }, [dataArray, isSorting]);

    async function bubbleSort() {
        setCanSort(false);
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
        setCanSort(false);
        setIsSorting(true);
        setCurrentValue(0);
        for (let i = 1; i < dataArray.length; i++) {
            let current: number = dataArray[i];
            let j: number = i - 1;
            while (j >= 0 && dataArray[j] > current)
                // eslint-disable-next-line
                await new Promise((resolve: any) =>
                    setTimeout(function () {
                        dataArray[j + 1] = dataArray[j];
                        j--;
                        dataArray[j + 1] = current;
                        setCompareValue(dataArray[j]);
                        setCurrentValue(dataArray[j + 1]);
                        setDataArray([...dataArray]);
                        resolve();
                    }, calculateTimeDelay(dataArray.length))
                );
        }
        setDataArray([...dataArray]);
        setIsSorting(false);
    }

    async function selectionSort() {
        setCanSort(false);
        setIsSorting(true);
        setCompareValue(1);
        setCurrentValue(0);
        for (let i = 0; i < dataArray.length; i++) {
            let minimumIdx = i;
            for (let j = i + 1; j < dataArray.length; j++) {
                // eslint-disable-next-line
                await new Promise((resolve: any) =>
                    setTimeout(function () {
                        setCompareValue(dataArray[j]);
                        if (dataArray[j] < dataArray[minimumIdx]) {
                            minimumIdx = j;
                            setCurrentValue(dataArray[minimumIdx]);
                        }
                        resolve();
                    }, calculateTimeDelay(dataArray.length))
                );
                setDataArray([...dataArray]);
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

    function sortArray() {
        if (canSort) {
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
}
