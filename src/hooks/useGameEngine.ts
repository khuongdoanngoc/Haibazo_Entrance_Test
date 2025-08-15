import { useEffect, useRef, useState } from "react";
import type { ITarget } from "../types/target";
import { generateTargets } from "../utils/generateTargets";

export const useGameEngine = (points: number) => {
    const [time, setTime] = useState<number>(0);
    const [targets, setTargets] = useState<ITarget[]>([]);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [isAutoPlay, setIsAutoPlay] = useState<boolean>(false);
    const [title, setTitle] = useState<string>("LET'S PLAY");
    const [currentTarget, setCurrentTarget] = useState<number>(1);

    const countdownIntervalsRef = useRef<Set<number>>(new Set());
    const winTimeoutRef = useRef<number | null>(null);

    const startGame = () => {
        if (winTimeoutRef.current) {
            clearTimeout(winTimeoutRef.current);
            winTimeoutRef.current = null;
        }
        setTime(0);
        setTargets(generateTargets(points));
        setIsPlaying(true);
        setIsAutoPlay(false);
        setCurrentTarget(1);
        setTitle("LET'S PLAY");
        countdownIntervalsRef.current.forEach((id) => clearInterval(id));
        countdownIntervalsRef.current.clear();
    };

    useEffect(() => {
        let timerId: number | undefined;
        if (isPlaying) {
            timerId = window.setInterval(() => setTime((prev) => prev + 0.1), 100);
        } else if (timerId) {
            clearInterval(timerId);
        }
        return () => {
            if (timerId) clearInterval(timerId);
        };
    }, [isPlaying]);

    useEffect(() => {
        if (!isPlaying) {
            setCurrentTarget(1);
        }
    }, [isPlaying]);

    const handleAutoPlay = (value: boolean) => {
        setIsAutoPlay(value);
    };

    useEffect(() => {
        let intervalAutoPlay: number | undefined;
        if (isAutoPlay && isPlaying) {
            intervalAutoPlay = window.setInterval(() => {
                handleTargetClick(currentTarget);
            }, 1000);
        }
        return () => {
            if (intervalAutoPlay) {
                clearInterval(intervalAutoPlay);
            }
        };
    }, [isAutoPlay, currentTarget, isPlaying]);

    const handleTargetClick = (value: number) => {
        setTargets((prevTargets) =>
            prevTargets.map((target) =>
                target.value === value ? { ...target, clicked: true } : target
            )
        );

        if (value === currentTarget) {
            setCurrentTarget(currentTarget + 1);
            if (value === points) {
                if (winTimeoutRef.current) {
                    clearTimeout(winTimeoutRef.current);
                }
                winTimeoutRef.current = window.setTimeout(() => {
                    setTitle("ALL CLEARED");
                    setIsPlaying(false);
                    winTimeoutRef.current = null;
                }, 3000);
            }

            const intervalId = window.setInterval(() => {
                setTargets((prevTargets) => {
                    const updatedTargets = prevTargets.map((target) =>
                        target.value === value && target.countDown > 0 && isPlaying
                            ? { ...target, countDown: target.countDown - 0.1 }
                            : target
                    );
                    if (
                        updatedTargets.find(
                            (target) => target.value === value && target.countDown <= 0
                        ) || !isPlaying
                    ) {
                        clearInterval(intervalId);
                        countdownIntervalsRef.current.delete(intervalId);
                    }
                    return updatedTargets;
                });
            }, 100);
            countdownIntervalsRef.current.add(intervalId);
        } else {
            if (winTimeoutRef.current) {
                clearTimeout(winTimeoutRef.current);
                winTimeoutRef.current = null;
            }
            countdownIntervalsRef.current.forEach((id) => clearInterval(id));
            countdownIntervalsRef.current.clear();
            setIsPlaying(false);
            setTitle("GAME OVER");
        }
    };

    return {
        time,
        targets,
        isPlaying,
        isAutoPlay,
        title,
        currentTarget,
        startGame,
        handleAutoPlay,
        handleTargetClick,
    } as const;
};


