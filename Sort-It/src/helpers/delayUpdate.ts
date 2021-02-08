export async function delayUpdate(timeDelay: number) {
    await new Promise((resolve: any) => setTimeout(resolve, timeDelay));
}
