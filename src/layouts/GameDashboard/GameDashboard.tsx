import { useEffect, useRef, useState } from "react";
import GameHeader from "../../components/GameHeader/GameHeader";
import { GameBoard } from "../../components/GameBoard";
import { usePoints } from "../../context/PointsContext";
import { generateTargets } from "../../utils/generateTargets";

interface ITarget {
    value: number;
    top: number;
    left: number;
    clicked: boolean;
    countDown: number;
}

export default function GameDashboard() {
    const { points } = usePoints();
    const [time, setTime] = useState<number>(0);
    const [targets, setTargets] = useState<ITarget[]>([]);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [isAutoPlay, setIsAutoPlay] = useState<boolean>(false);
    const [title, setTitle] = useState<string>("LET'S PLAY");
    const [currentTarget, setCurrentTarget] = useState<number>(1);

    const startGame = () => {
        setTime(0);
        setTargets(generateTargets(points));
        setIsPlaying(true);
        setIsAutoPlay(false);
        setCurrentTarget(1);
        setTitle("LET'S PLAY");
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    // configs for timer
    useEffect(() => {
        let timer: any;
        if (isPlaying) {
            timer = setInterval(() => setTime((prev) => prev + 0.1), 100);
        } else {
            clearInterval(timer);
        }
        return () => clearInterval(timer);
    }, [isPlaying]);

    // reset current target while the game isn't playing
    useEffect(() => {
        if (!isPlaying) {
            setCurrentTarget(1);
        }
    }, [isPlaying]);

    const handleAutoPlay = (value: boolean) => {
        setIsAutoPlay(value);
    };

    useEffect(() => {
        let intervalAutoPlay: any;

        if (isAutoPlay && isPlaying) {
            intervalAutoPlay = setInterval(() => {
                handleTargetClick(currentTarget);
            }, 1000);
        }

        return () => {
            if (intervalAutoPlay) {
                clearInterval(intervalAutoPlay);
            }
        };
    }, [isAutoPlay, currentTarget, isPlaying]);

    const intervalRef = useRef<any | null>(null);

    const handleTargetClick = (value: number) => {
        setTargets((prevTargets) =>
            prevTargets.map((target) =>
                target.value === value ? { ...target, clicked: true } : target
            )
        );
        if (value === currentTarget) {
            setCurrentTarget(currentTarget + 1);
            if (value === points) {
                setTimeout(() => {
                    setTitle("ALL CLEARED");
                    setIsPlaying(false);
                }, 3000);
            }
            const intervalId = setInterval(() => {
                setTargets((prevTargets) => {
                    let updatedTargets = prevTargets.map((target) =>
                        target.value === value &&
                        target.countDown > 0 &&
                        isPlaying
                            ? { ...target, countDown: target.countDown - 0.1 }
                            : target
                    );
                    if (
                        updatedTargets.find(
                            (target) =>
                                target.value === value && target.countDown <= 0
                        ) ||
                        !isPlaying
                    ) {
                        clearInterval(intervalId);
                        intervalRef.current = null;
                    }
                    return updatedTargets;
                });
            }, 100);
            intervalRef.current = intervalId;
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
            setIsPlaying(false);
            setTitle("GAME OVER");
        }
    };

    return (
        <div className="w-full h-screen bg-slate-300 flex items-center justify-center font-mono">
            <div className="w-[30rem] h-[35rem] rounded-3xl bg-white p-8 flex flex-col gap-2">
                <GameHeader
                    title={title}
                    time={time}
                    isPlaying={isPlaying}
                    isAutoPlay={isAutoPlay}
                    onPlay={startGame}
                    onAutoPlay={handleAutoPlay}
                />
                <GameBoard
                    targets={targets}
                    isPlaying={isPlaying}
                    currentTarget={currentTarget}
                    onClick={handleTargetClick}
                />
            </div>
        </div>
    );
}
