export interface ActionButtonProps {
    performSort: Function;
    setCanSort: Function;
    setDataArray: Function;
    dataArray: number[];
    canSort: boolean;
}

export interface SizeSliderProps {
    setCanSort: Function;
    setDataArray: Function;
    value: number;
}

export interface SortTypesProps {
    setSortType: Function;
    sortType: string;
}

export interface ChartProps {
    data: ChartData;
}

export interface ChartData {
    labels: number[];
    datasets: DataSets[];
}

interface DataSets {
    label: string;
    data: number[];
    backgroundColor: any;
}

export interface DotStyle {
    width: number;
    height: number;
    display: string;
    margin: number;
    borderRadius: string;
}

export interface ContainerStyle {
    width: number;
    margin: string;
}
