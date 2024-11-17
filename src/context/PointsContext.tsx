import React, { createContext, useState, useContext } from "react";

interface PointsContextProps {
    points: number;
    setPoints: React.Dispatch<React.SetStateAction<number>>;
}

const PointsContext = createContext<PointsContextProps | undefined>(undefined);

export const PointsProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [points, setPoints] = useState<number>(5);

    return (
        <PointsContext.Provider value={{ points, setPoints }}>
            {children}
        </PointsContext.Provider>
    );
};

export const usePoints = (): PointsContextProps => {
    const context = useContext(PointsContext);
    if (context === undefined) {
        throw new Error("usePoints must be used within a PointsProvider");
    }
    return context;
};
