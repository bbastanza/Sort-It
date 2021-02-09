export async function pauseExecution(timeDelay: number) {
    await new Promise((resolve: any) => setTimeout(resolve, timeDelay));
}
