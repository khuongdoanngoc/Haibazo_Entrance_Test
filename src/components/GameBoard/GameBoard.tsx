import { usePoints } from "../../context/PointsContext";
import { formatTime } from "../../utils/formatTime";

interface ITarget {
    value: number;
    top: number;
    left: number;
    clicked: boolean;
    countDown: number;
}

interface IGameBoardProps {
    targets: ITarget[];
    currentTarget: number;
    onClick: (value: number) => void;
}

export default function GameBoard({
    targets,
    currentTarget,
    onClick,
}: IGameBoardProps) {
    const { points } = usePoints();

    return (
        <div className="flex flex-col w-full h-full gap-2">
            <div className="w-full h-full border-2 rounded-md relative">
                {targets.map((target, index) => (
                    <div
                        className={`absolute text-xs transition-opacity w-9 h-9 rounded-[50%] border border-orange-600 cursor-default text-black flex items-center justify-center flex-col ${
                            target.clicked ? "bg-red-500" : "bg-white"
                        } ${target.countDown <= 0 && "hidden"}`}
                        style={{
                            top: `${target.top}%`,
                            left: `${target.left}%`,
                            zIndex: `${9999 - target.value}`,
                            opacity:
                                target.countDown > 0 && target.countDown < 3
                                    ? target.countDown / 3
                                    : 1,
                        }}
                        key={index}
                        onClick={() => onClick(target.value)}>
                        {target.value}
                        {target.countDown < 3 && target.countDown > 0 && (
                            <span>{formatTime(target.countDown)}</span>
                        )}
                    </div>
                ))}
            </div>
            <span>
                Next: {currentTarget <= points ? currentTarget : points}
            </span>
        </div>
    );
}
