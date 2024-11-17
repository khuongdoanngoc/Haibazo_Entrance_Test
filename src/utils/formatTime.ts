export const formatTime = (time: number): string => {
    const formattedTime = time.toFixed(1);
    return `${formattedTime}s`;
};
