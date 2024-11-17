import "./App.css";
import { PointsProvider } from "./context/PointsContext";
import GameDashboard from "./layouts/GameDashboard/GameDashboard";

function App() {
    return (
        <PointsProvider>
            <GameDashboard />
        </PointsProvider>
    );
}

export default App;
