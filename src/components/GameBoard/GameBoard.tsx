import { formatTime } from "../../utils/formatTime";

interface ITarget {
    value: number;
    top: number;
    left: number;
    complete: boolean;
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
    return (
        <div className="flex flex-col w-full h-full gap-2">
            <div className="w-full h-full border-2 rounded-md relative">
                {targets.map((target, index) => (
                    <div
                        className={`absolute text-xs w-9 h-9 rounded-[50%] border border-orange-600 cursor-default text-black flex items-center justify-center flex-col ${
                            target.complete
                                ? "hidden"
                                : target.countDown < 3
                                ? "bg-red-500 fade-out"
                                : "bg-white"
                        }`}
                        style={{
                            top: `${target.top}%`,
                            left: `${target.left}%`,
                            zIndex: `${9999 - target.value}`,
                            opacity:
                                target.countDown > 0 ? target.countDown / 3 : 1,
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
            <span>Next: {currentTarget}</span>
        </div>
    );
}
