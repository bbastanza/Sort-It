import { useState, useRef, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
    shuffleArray,
    initialArray as initArray,
} from "../Algorithms/shuffleArray";
import { calculateTimeDelay } from "../helpers/calculateTimeDelay";
import { buttonClass } from "../helpers/buttonClass";
import { bubbleswap } from "../helpers/bubbleswap";

export default function Array() {
    const [isSorting, setIsSorting] = useState<boolean>(false);
    const [sortType, setSortType] = useState<string>("simple");
    const initialArray = initArray;
    const [dataArray, setDataArray] = useState<number[]>(
        shuffleArray(initialArray)
    );

    const [chartData, setChartData] = useState<object>({
        labels: dataArray,
        datasets: [
            {
                label: "value",
                data: dataArray,
                backgroundColor: "#377E86",
            },
        ],
    });

    const arrayRef = useRef<number[]>([]);
    arrayRef.current = dataArray;

    useEffect(() => {
        setChartData({
            labels: arrayRef.current,
            datasets: [
                {
                    label: "value",
                    data: arrayRef.current,
                    backgroundColor: "#377E86",
                },
            ],
        });
    }, [dataArray]);

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
                        setDataArray([...updatedArray]);
                        isSorted = false;
                    }
                }
            }
        }
        setIsSorting(false);
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
            <h2 style={{ textTransform: "capitalize"}}>{sortType} Sort</h2>
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
                    }}
                />
            </div>
            {!isSorting ? (
                <>
                    <div style={{ margin: "15px 0 10px", display: "flex", justifyContent: "center" }}>
                        <button
                            className={"btn btn-lg btn-info sort-btn"}
                            onClick={bubbleSort}>
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
                    <h2>Array Size</h2>
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
                    <br />
                    <br />
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <button
                            className={buttonClass("simple", sortType)}
                            onClick={() => setSortType("simple")}>
                            Simple Sort
                        </button>
                        <button
                            className={buttonClass("bubble", sortType)}
                            onClick={() => setSortType("bubble")}>
                            Bubble Sort
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
            ) : null}
        </div>
    );
}
