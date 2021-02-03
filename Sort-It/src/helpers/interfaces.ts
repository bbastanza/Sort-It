export interface IChartData {
    labels: number[];
    datasets: IDataSets[];
}
interface IDataSets{
    label: string;
    data?: number[];
    backgroundColor?: any;
    borderColor?: string;
}
