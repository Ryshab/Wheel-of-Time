import { cn } from "@/lib/utils";

interface ResultDisplayProps {
  teamResult: string | null;
  decadeResult: string | null;
  isVisible: boolean;
}

export const ResultDisplay = ({ teamResult, decadeResult, isVisible }: ResultDisplayProps) => {
  if (!isVisible || (!teamResult && !decadeResult)) return null;

  return (
    <div className={cn(
      "mt-8 p-6 md:p-8 rounded-2xl bg-card/80 backdrop-blur-sm border border-secondary/30",
      "box-glow-gold result-reveal"
    )}>
      <h3 className="text-2xl md:text-3xl font-display text-secondary text-center mb-4 tracking-wider">
        🏏 YOUR RESULT 🏏
      </h3>
      
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
        {teamResult && (
          <div className="text-center">
            <p className="text-muted-foreground text-sm uppercase tracking-widest mb-1">Team</p>
            <p className="text-2xl md:text-4xl font-display text-primary text-glow">
              {teamResult}
            </p>
          </div>
        )}
        
        {teamResult && decadeResult && (
          <span className="text-4xl text-secondary hidden md:block">×</span>
        )}
        
        {decadeResult && (
          <div className="text-center">
            <p className="text-muted-foreground text-sm uppercase tracking-widest mb-1">Decade</p>
            <p className="text-2xl md:text-4xl font-display text-secondary text-glow">
              {decadeResult}
            </p>
          </div>
        )}
      </div>

      {teamResult && decadeResult && (
        <p className="text-center mt-6 text-lg text-foreground/80">
          Explore <span className="text-primary font-semibold">{teamResult}</span> cricket 
          in the <span className="text-secondary font-semibold">{decadeResult}</span>!
        </p>
      )}
    </div>
  );
};
