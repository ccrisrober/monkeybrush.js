
interface Stats {
    domElement: HTMLElement;
    REVISION: number;
    setMode: (mode: number) => void;

    begin(): void;
    end(): number;
    update(): void;
}

interface StatsConstructor {
    new (): Stats;
}

declare var Stats: StatsConstructor;