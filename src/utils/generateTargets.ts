import { getRandomPosition } from "./getRandomPosition";

interface ITarget {
    value: number;
    top: number;
    left: number;
    clicked: boolean;
    countDown: number;
}

export const generateTargets = (count: number): ITarget[] => {
    return Array.from({ length: count }, (_, i) => ({
        value: i + 1,
        ...getRandomPosition(),
        clicked: false,
        countDown: 3,
    }));
};
