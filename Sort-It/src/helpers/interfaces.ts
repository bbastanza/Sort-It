export interface IActionButtonProps {
    performSort: Function;
    setCanSort: Function;
    setDataArray: Function;
    dataArray: number[];
    canSort: boolean;
}

export interface ISizeSliderProps {
    setCanSort: Function;
    setDataArray: Function;
    value: number;
}

export interface ISortTypesProps{
    setSortType: Function;
    sortType: string;
}

export interface IChartProps{
    data: IChartData
}

export interface IChartData {
    labels: number[];
    datasets: IDataSets[];
}

interface IDataSets {
    label: string;
    data: number[];
    backgroundColor: any;
}

