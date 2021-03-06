import { Bar } from "react-chartjs-2";
import { ChartProps } from "./../helpers/interfaces";

export default function Chart({ data }: ChartProps) {
    return (
        <div
            style={{
                width: "70vw",
                height: "50vh",
                display: "flex",
                justifyContent: "center",
                margin: "10px auto 30px",
                minWidth: 320,
            }}>
            <Bar
                redraw={true}
                data={data}
                options={{
                    maintainAspectRatio: false,
                    animation: false,
                    legend: {
                        display: false,
                    },
                }}
            />
        </div>
    );
}
