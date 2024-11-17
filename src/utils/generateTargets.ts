import { getRandomPosition } from "./getRandomPosition";

interface ITarget {
    value: number;
    top: number;
    left: number;
    complete: boolean;
    countDown: number;
}

export const generateTargets = (count: number): ITarget[] => {
    return Array.from({ length: count }, (_, i) => ({
        value: i + 1,
        ...getRandomPosition(),
        complete: false,
        countDown: 3,
    }));
};
