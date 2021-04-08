import { shuffleArray } from "../helpers/shuffleArray";
import { ActionButtonProps } from "../helpers/interfaces";

export default function ActionButtons({
    performSort,
    setCanSort,
    setDataArray,
    dataArray,
    canSort,
}: ActionButtonProps) {
    return (
        <div
            style={{
                margin: "15px 0 0",
                display: "flex",
                justifyContent: "center",
            }}>
            {canSort && (
                <button className={"btn btn-lg btn-info sort-btn"} onClick={() => performSort()}>
                    Sort It!
                </button>
            )}
            <button
                className={"btn btn-secondary sort-btn"}
                onClick={() => {
                    setCanSort(true);
                    setDataArray([...shuffleArray(dataArray)]);
                }}>
                Shuffle Array
            </button>
        </div>
    );
}
