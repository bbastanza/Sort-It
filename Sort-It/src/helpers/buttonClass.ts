export function buttonClass(type: string, sortType: string): string {
    return type === sortType
        ? "btn btn-info sort-btn"
        : "btn btn-secondary sort-btn";
}
