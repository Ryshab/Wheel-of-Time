import { useState } from "react";
import { SpinningWheel } from "@/components/SpinningWheel";
import { ResultDisplay } from "@/components/ResultDisplay";

const CRICKET_TEAMS = [
  "India",
  "Australia",
  "England",
  "Pakistan",
  "South Africa",
  "New Zealand",
  "West Indies",
  "Sri Lanka",
  "Bangladesh",
  "Afghanistan",
];

const DECADES = [
  "1970s",
  "1980s",
  "1990s",
  "2000s",
  "2010s",
  "2020s",
];

const Index = () => {
  const [teamResult, setTeamResult] = useState<string | null>(null);
  const [decadeResult, setDecadeResult] = useState<string | null>(null);
  const [isTeamSpinning, setIsTeamSpinning] = useState(false);
  const [isDecadeSpinning, setIsDecadeSpinning] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleTeamResult = (result: string) => {
    setTeamResult(result);
    updateResultsVisibility(result, decadeResult);
  };

  const handleDecadeResult = (result: string) => {
    setDecadeResult(result);
    updateResultsVisibility(teamResult, result);
  };

  const updateResultsVisibility = (team: string | null, decade: string | null) => {
    if (team || decade) {
      setShowResults(true);
    }
  };

  const resetResults = () => {
    setTeamResult(null);
    setDecadeResult(null);
    setShowResults(false);
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-secondary/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <header className="text-center mb-10 md:mb-16">
          <h1 className="text-5xl md:text-7xl font-display text-secondary text-glow mb-4 tracking-wider">
            CRICKET SPINNER
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Spin the wheels to discover a random cricket team and decade combination!
          </p>
        </header>

        {/* Wheels Container */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">
          <SpinningWheel
            items={CRICKET_TEAMS}
            title="TEAMS"
            onResult={handleTeamResult}
            isSpinning={isTeamSpinning}
            onSpinStart={() => setIsTeamSpinning(true)}
            onSpinEnd={() => setIsTeamSpinning(false)}
          />

          <SpinningWheel
            items={DECADES}
            title="DECADES"
            onResult={handleDecadeResult}
            isSpinning={isDecadeSpinning}
            onSpinStart={() => setIsDecadeSpinning(true)}
            onSpinEnd={() => setIsDecadeSpinning(false)}
          />
        </div>

        {/* Results Display */}
        <div className="max-w-2xl mx-auto">
          <ResultDisplay
            teamResult={teamResult}
            decadeResult={decadeResult}
            isVisible={showResults}
          />
        </div>

        {/* Reset Button */}
        {showResults && (
          <div className="text-center mt-8">
            <button
              onClick={resetResults}
              className="px-6 py-2 text-sm font-medium rounded-full border border-muted-foreground/30 text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-all duration-200"
            >
              Reset Results
            </button>
          </div>
        )}

        {/* Footer */}
        <footer className="text-center mt-16 text-muted-foreground text-sm">
          <p>🏏 Spin both wheels for the ultimate cricket challenge!</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
