import { buttonClass } from "../helpers/buttonClass";
import { ISortTypesProps } from "../helpers/interfaces";

export default function SortTypeButtons({
    sortType,
    setSortType,
}: ISortTypesProps) {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                margin: "30px auto 80px",
                flexFlow: "row wrap",
            }}>
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
    );
}
