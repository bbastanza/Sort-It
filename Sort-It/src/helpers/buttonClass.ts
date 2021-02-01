export function buttonClass(type: string, sortType: string) {
    return type === sortType
        ? "btn btn-primary sort-btn"
        : "btn btn-info sort-btn";
}
