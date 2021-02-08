import { changeSize } from "../helpers/changesize";
import { ISizeSliderProps } from "../helpers/interfaces";

export default function SizeSlider({
    value,
    setCanSort,
    setDataArray,
}: ISizeSliderProps) {
    return (
        <>
            <h2>Size</h2>
            <input
                type="range"
                min="25"
                max="125"
                step="20"
                value={value}
                className="slider"
                onChange={(e) => {
                    setCanSort(true);
                    setDataArray([...changeSize(parseInt(e.target.value))]);
                }}
                style={{ width: "20vw", minWidth: 250,marginTop: 10 }}
            />
        </>
    );
}
