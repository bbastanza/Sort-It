import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { shuffleArray } from "../Algorithms/ShuffleArray";

export default function Array() {
    const [shuffledArray, setShuffledArray] = useState<number[]>([
        3,
        6,
        2,
        7,
        8,
        5,
        1,
        9,
        4,
        10,
    ]);
    const [sortType, setSortType] = useState<string>("simple");

    const chartData = {
        labels: shuffledArray,
        datasets: [
            {
                label: "value",
                data: shuffledArray,
                backgroundColor: "#377E86",
            },
        ],
    };

    useEffect(() => {
        chartData.labels = shuffledArray;
        chartData.datasets[0].data = shuffledArray;
    }, [shuffledArray]);

    function changeSize(size: number) {
        const newArray: number[] = [];
        for (let i = 1; i <= size; i++) {
            newArray.push(i);
        }
        setShuffledArray(shuffleArray(newArray));
    }

    async function reverseArray() {
        const newArray: number[] = shuffledArray;
        let firstIdx = 0;
        let lastIdx = newArray.length - 1;
        while (firstIdx < lastIdx) {
            await new Promise((resolve: any) =>
                setTimeout(async function () {
                    let temp = newArray[firstIdx];
                    newArray[firstIdx] = newArray[lastIdx];
                    newArray[lastIdx] = temp;
                    firstIdx++;
                    lastIdx--;
                    setShuffledArray(newArray);
                    console.log(chartData);
                    resolve();
                }, 300)
            );
            setShuffledArray(newArray);
        }
    }

    function buttonClass(type: string) {
        return type === sortType ? "btn btn-primary" : "btn btn-info";
    }

    const chartOptions = {
        title: { display: true, text: sortType, fontSize: 25 },
        maintainAspectRatio: false,
    };

    return (
        <div>
            <div
                style={{
                    width: "70vw",
                    height: "60vh",
                    display: "flex",
                    justifyContent: "center",
                    margin: "auto",
                }}>
                <Bar data={chartData} options={chartOptions} />
            </div>
            <br />
            <h2>Array Size</h2>
            <input
                type="range"
                min="10"
                max="310"
                step="25"
                value={shuffledArray.length}
                className="slider"
                onChange={(e) => changeSize(parseInt(e.target.value))}
            />
            <br />
            <br />
            <h2 style={{ textTransform: "capitalize" }}>{sortType} Sort</h2>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <button
                    className={buttonClass("simple")}
                    onClick={() => setSortType("simple")}>
                    Simple Sort
                </button>
                <button
                    className={buttonClass("bubble")}
                    onClick={() => setSortType("bubble")}>
                    Bubble Sort
                </button>
                <button
                    className={buttonClass("selection")}
                    onClick={() => setSortType("selection")}>
                    Selection Sort
                </button>
                <button
                    className={buttonClass("merge")}
                    onClick={() => setSortType("merge")}>
                    Merge Sort
                </button>
                <button
                    className={buttonClass("quick")}
                    onClick={() => setSortType("quick")}>
                    Quick Sort
                </button>
            </div>
            <button onClick={reverseArray}>click me!</button>
        </div>
    );
}
