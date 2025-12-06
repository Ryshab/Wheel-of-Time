import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface SpinningWheelProps {
  items: string[];
  title: string;
  onResult: (result: string) => void;
  isSpinning: boolean;
  onSpinStart: () => void;
  onSpinEnd: () => void;
}

const WHEEL_COLORS = [
  "hsl(142, 76%, 36%)",   // Green
  "hsl(45, 93%, 47%)",    // Gold
  "hsl(199, 89%, 48%)",   // Blue
  "hsl(280, 87%, 65%)",   // Purple
  "hsl(0, 84%, 60%)",     // Red
  "hsl(25, 95%, 53%)",    // Orange
  "hsl(173, 80%, 40%)",   // Teal
  "hsl(330, 81%, 60%)",   // Pink
  "hsl(262, 83%, 58%)",   // Violet
  "hsl(16, 85%, 57%)",    // Coral
];

export const SpinningWheel = ({
  items,
  title,
  onResult,
  isSpinning,
  onSpinStart,
  onSpinEnd,
}: SpinningWheelProps) => {
  const [rotation, setRotation] = useState(0);
  const wheelRef = useRef<HTMLDivElement>(null);
  const segmentAngle = 360 / items.length;

  const spin = () => {
    if (isSpinning) return;

    onSpinStart();

    // Random number of full rotations (5-8) plus random segment
    const fullRotations = 5 + Math.floor(Math.random() * 4);
    const randomSegment = Math.floor(Math.random() * items.length);
    const extraDegrees = randomSegment * segmentAngle + segmentAngle / 2;
    const totalRotation = fullRotations * 360 + extraDegrees;

    // Calculate which item will be selected (at top/12 o'clock position)
    const finalAngle = (rotation + totalRotation) % 360;
    const selectedIndex = Math.floor((360 - finalAngle + segmentAngle / 2) / segmentAngle) % items.length;

    setRotation(rotation + totalRotation);

    // Wait for animation to complete
    setTimeout(() => {
      onResult(items[selectedIndex]);
      onSpinEnd();
    }, 4000);
  };

  const createWheelSegments = () => {
    return items.map((item, index) => {
      const startAngle = index * segmentAngle;
      const endAngle = startAngle + segmentAngle;
      const midAngle = startAngle + segmentAngle / 2;

      // Convert to radians
      const startRad = (startAngle - 90) * (Math.PI / 180);
      const endRad = (endAngle - 90) * (Math.PI / 180);
      const midRad = (midAngle - 90) * (Math.PI / 180);

      const radius = 140;
      const textRadius = 95;

      // Path for segment
      const x1 = 150 + radius * Math.cos(startRad);
      const y1 = 150 + radius * Math.sin(startRad);
      const x2 = 150 + radius * Math.cos(endRad);
      const y2 = 150 + radius * Math.sin(endRad);

      // Text position
      const textX = 150 + textRadius * Math.cos(midRad);
      const textY = 150 + textRadius * Math.sin(midRad);

      const largeArcFlag = segmentAngle > 180 ? 1 : 0;

      const pathD = `M 150 150 L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

      const color = WHEEL_COLORS[index % WHEEL_COLORS.length];

      return (
        <g key={index}>
          <path
            d={pathD}
            fill={color}
            stroke="hsl(222, 47%, 11%)"
            strokeWidth="2"
          />
          <text
            x={textX}
            y={textY}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="white"
            fontSize="10"
            fontWeight="bold"
            transform={`rotate(${midAngle}, ${textX}, ${textY})`}
            style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}
          >
            {item.length > 12 ? item.substring(0, 10) + ".." : item}
          </text>
        </g>
      );
    });
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <h2 className="text-3xl md:text-4xl font-display text-glow text-secondary tracking-wider">
        {title}
      </h2>

      <div className="relative">
        {/* Pointer */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-10">
          <div
            className={cn(
              "w-0 h-0 border-l-[15px] border-r-[15px] border-t-[30px] border-l-transparent border-r-transparent border-t-secondary drop-shadow-lg",
              isSpinning && "pointer-animate"
            )}
          />
        </div>

        {/* Wheel container */}
        <div className="relative w-[300px] h-[300px] md:w-[320px] md:h-[320px]">
          {/* Outer glow ring */}
          <div className="absolute inset-0 rounded-full box-glow-gold" />

          {/* Wheel */}
          <div
            ref={wheelRef}
            className="w-full h-full transition-none"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: isSpinning ? "transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)" : "none",
            }}
          >
            <svg viewBox="0 0 300 300" className="w-full h-full drop-shadow-2xl">
              {/* Outer ring */}
              <circle
                cx="150"
                cy="150"
                r="148"
                fill="none"
                stroke="hsl(45, 93%, 47%)"
                strokeWidth="4"
              />
              {createWheelSegments()}
              {/* Center circle */}
              <circle
                cx="150"
                cy="150"
                r="25"
                fill="hsl(222, 47%, 15%)"
                stroke="hsl(45, 93%, 47%)"
                strokeWidth="3"
              />
              <circle
                cx="150"
                cy="150"
                r="12"
                fill="hsl(45, 93%, 47%)"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Spin button */}
      <button
        onClick={spin}
        disabled={isSpinning}
        className={cn(
          "px-8 py-3 text-xl font-display tracking-wider rounded-full",
          "bg-primary text-primary-foreground",
          "box-glow transition-all duration-300",
          "hover:scale-105 hover:brightness-110",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
          "active:scale-95"
        )}
      >
        {isSpinning ? "SPINNING..." : "SPIN!"}
      </button>
    </div>
  );
};
