import GameHeader from "../../components/GameHeader/GameHeader";
import { GameBoard } from "../../components/GameBoard";
import { usePoints } from "../../context/PointsContext";
import { useGameEngine } from "../../hooks/useGameEngine";

export default function GameDashboard() {
    const { points } = usePoints();
    const {
        time,
        targets,
        isPlaying,
        isAutoPlay,
        title,
        currentTarget,
        startGame,
        handleAutoPlay,
        handleTargetClick,
    } = useGameEngine(points);

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
