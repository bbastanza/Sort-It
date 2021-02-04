export function calculateTimeDelay(length: number, sortType: string): number {
    let timeDelay: number;
    if (sortType === "merge") timeDelay = 40;
    else {
        switch (true) {
            case length <= 25:
                timeDelay = 80;
                break;
            case length <= 45:
                timeDelay = 40;
                break;
            case length <= 65:
                timeDelay = 15;
                break;
            case length <= 85:
                timeDelay = 2;
                break;
            default:
                timeDelay = 1;
                break;
        }
    }
    return timeDelay;
}
