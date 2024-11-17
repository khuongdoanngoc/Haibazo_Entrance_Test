import { useEffect, useState } from "react";
import GameHeader from "../../components/GameHeader/GameHeader";
import { GameBoard } from "../../components/GameBoard";
import { usePoints } from "../../context/PointsContext";
import { generateTargets } from "../../utils/generateTargets";

interface ITarget {
    value: number;
    top: number;
    left: number;
    complete: boolean;
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

        // Clear tất cả intervals
        for (let i = 1; i < 3000; i++) {
            window.clearInterval(i);
        }
        // Clear tất cả timeouts
        for (let i = 1; i < 3000; i++) {
            window.clearTimeout(i);
        }
    };

    console.log("test re-render");

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

    const handleTargetClick = (value: number) => {
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
                        target.value === value && target.countDown > 0
                            ? { ...target, countDown: target.countDown - 0.1 }
                            : target
                    );
                    if (
                        updatedTargets.find(
                            (target) =>
                                target.value === value && target.countDown <= 0
                        )
                    ) {
                        updatedTargets = prevTargets.map((target) =>
                            target.value === value
                                ? { ...target, complete: true }
                                : target
                        );
                        clearInterval(intervalId);
                    }
                    return updatedTargets;
                });
            }, 100);
        } else {
            setTitle("GAME OVER");
            setIsPlaying(false);
            setIsAutoPlay(false);
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
                    currentTarget={currentTarget}
                    onClick={handleTargetClick}
                />
            </div>
        </div>
    );
}
