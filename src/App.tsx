import { Slider } from "./lib";
import { useState } from "react";

function App() {
  const [value, setValue] = useState(3);
  return (
    <div>
      <div
        style={{
          padding: 30,
          width: 300,
        }}
      >
        <Slider
          value={value}
          onChange={({ value }) => setValue(value)}
          min={0}
          max={10}
          step={0.1}
          height={30}
          renderThumb={({ ratio }) => (
            <div
              style={{
                width: 20,
                height: 20,
                borderRadius: "50%",
                background: `hsl(${ratio * 360}, 100%, 50%)`,
                border: "2px solid #64748b",
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  transform: "translateY(-24px)",
                  userSelect: "none",
                }}
              >
                {value}
              </div>
            </div>
          )}
          track={{
            size: 10,
            fillColor: "#334155",
            style: {
              background: "#D4D4D8",
              borderRadius: 8,
            },
          }}
          renderSnapValue={(v) =>
            v % 1 === 0 && (
              <div
                style={{
                  fontSize: 14,
                  color: "#94a3b8",
                }}
              >
                {v.toFixed(0)}
              </div>
            )
          }
        />
      </div>
    </div>
  );
}

export default App;
