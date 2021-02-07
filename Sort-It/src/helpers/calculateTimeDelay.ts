export function calculateTimeDelay(length: number, sortType: string): number {
    let timeDelay: number;
    if (sortType === "merge" || sortType === "quick") {
        switch (true) {
            case length <= 25:
                timeDelay = 120;
                break;
            case length <= 45:
                timeDelay = 80;
                break;
            case length <= 65:
                timeDelay = 60;
                break;
            default:
                timeDelay = 40;
                break;
        }
    } else {
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
    console.log(timeDelay)
    return timeDelay;
}
