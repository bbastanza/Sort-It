export function calculateTimeDelay(length: number, sortType: string): number {
    if (sortType === "merge" || sortType === "quick") {
        switch (true) {
            case length <= 25:
                return 120;
            case length <= 45:
                return 80;
            case length <= 65:
                return 60;
            default:
                return 40;
        }
    }

    switch (true) {
        case length <= 25:
            return 80;
        case length <= 45:
            return 40;
        case length <= 65:
            return 15;
        case length <= 85:
            return 2;
        default:
            return 1;
    }
}
