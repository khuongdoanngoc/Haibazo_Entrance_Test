import { ChangeEvent } from "react";
import { formatTime } from "../../utils/formatTime";
import { usePoints } from "../../context/PointsContext";

interface IGameHeaderProps {
    title: string;
    time: number;
    isPlaying: boolean;
    isAutoPlay: boolean;
    onPlay: () => void;
    onAutoPlay: (value: boolean) => void;
}

export default function GameHeader({
    title,
    time,
    isPlaying,
    isAutoPlay,
    onPlay,
    onAutoPlay,
}: IGameHeaderProps) {
    const { points } = usePoints();
    const { setPoints } = usePoints();

    const handleChangePoints = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === "" || !isNaN(Number(value))) {
            setPoints(Number(value));
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <h1
                className={`${title === "GAME OVER" ? "text-red-500" : ""}
      ${title === "ALL CLEARED" ? "text-green-500" : ""}`}>
                {title}
            </h1>
            <div className="w-[55%] flex justify-between">
                <span>Points:</span>
                <input
                    className="w-28 pl-1 rounded-md border-2  border-slate-300 appearance-none"
                    type="number"
                    onChange={handleChangePoints}
                    min={0}
                    value={points}
                />
            </div>
            <div className="w-[55%] flex justify-between">
                <span>Time:</span>
                <span className="w-28">{formatTime(time)}</span>
            </div>
            {!isPlaying ? (
                <button
                    className="w-fit rounded-md border bg-slate-300 py-1 px-4"
                    onClick={onPlay}>
                    Play
                </button>
            ) : (
                <div className="flex gap-2">
                    <button
                        onClick={onPlay}
                        className="w-fit rounded-md border bg-slate-300 py-1 px-4">
                        Restart
                    </button>
                    {!isAutoPlay ? (
                        <button
                            onClick={() => onAutoPlay(true)}
                            className="w-fit rounded-md border bg-slate-300 py-1 px-4">
                            Auto Play ON
                        </button>
                    ) : (
                        <button
                            onClick={() => onAutoPlay(false)}
                            className="w-fit rounded-md border bg-slate-300 py-1 px-4">
                            Auto Play OFF
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
