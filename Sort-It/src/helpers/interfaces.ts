
export interface ChartData {
    labels: number[];
    datasets: DataSets[];
}
interface DataSets{
    label: string;
    data?: number[];
    backgroundColor?: any;
    borderColor?: string;
}
