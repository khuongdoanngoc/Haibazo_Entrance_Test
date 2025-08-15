import { getRandomPosition } from "./getRandomPosition";
import type { ITarget } from "../types/target";

export const generateTargets = (count: number): ITarget[] => {
    return Array.from({ length: count }, (_, i) => ({
        value: i + 1,
        ...getRandomPosition(),
        clicked: false,
        countDown: 3,
    }));
};
