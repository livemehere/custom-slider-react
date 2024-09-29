import { useMemo, useState } from "react";
import { RangeSlider, Slider } from "./lib";

function App() {
  const [minV, setMinV] = useState(0);
  const [maxV, setMaxV] = useState(2);
  const [curSetIdx, setCurSetIdx] = useState(0);
  const sets = [
    {
      min: 0,
      max: 10,
      value: 7,
    },
    {
      min: 0,
      max: 5,
      value: 3,
    },
    {
      min: 0,
      max: 12,
      value: 1,
    },
  ];

  const curSet = sets[curSetIdx];

  const track = {
    size: 10,
    fillColor: "#334155",
    style: {
      background: "#D4D4D8",
    },
  };

  const reverseTrack = {
    size: 10,
    fillColor: "#D4D4D8",
    style: {
      background: "#334155",
    },
  };

  const Thumb = useMemo(
    () =>
      ({ color }: { color?: string }) => {
        return (
          <div
            style={{
              width: 6,
              height: 15,
              background: color ?? "#fff",
              border: "2px solid #64748b",
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          ></div>
        );
      },
    [],
  );

  const Snap = useMemo(
    () => (v: number) => {
      return (
        v % 2 === 0 && (
          <div
            style={{
              fontSize: 14,
              color: "#94a3b8",
            }}
          >
            {v.toFixed(0)}
          </div>
        )
      );
    },
    [],
  );
  return (
    <div>
      <div
        style={{
          padding: 30,
          width: 300,
        }}
      >
        <div>
          <div>current max : {curSet.max}</div>
          <div>current min : {curSet.min}</div>
          <div>current value : {curSet.value}</div>
        </div>
        <h2>RangeSlider</h2>
        <RangeSlider
          minValue={minV}
          maxValue={maxV}
          onChangeMin={(v) => setMinV(v)}
          onChangeMax={(v) => setMaxV(v)}
          min={curSet.min}
          max={curSet.max}
          step={1}
          height={30}
          renderMinThumb={() => <Thumb color={"red"} />}
          renderMaxThumb={() => <Thumb color={"#fff"} />}
          track={track}
          renderSnapValue={Snap}
        />
        <div style={{ marginTop: 40 }}>
          <h2>InputSlider</h2>

          <Slider
            min={curSet.min}
            max={curSet.max}
            step={1}
            height={30}
            track={track}
            renderThumb={() => <Thumb color={"#fff"} />}
            renderSnapValue={Snap}
            value={curSet.value}
          />
        </div>
        <div style={{ marginTop: 40 }}>
          <h2>InputSlider Reverse</h2>
          <Slider
            reverse
            min={curSet.min}
            max={curSet.max}
            step={1}
            height={30}
            track={reverseTrack}
            renderThumb={() => <Thumb color={"#fff"} />}
            renderSnapValue={Snap}
            value={curSet.value}
            onChange={(v) => {
              console.log(v);
            }}
          />
          <div>
            <button
              style={{
                marginTop: 40,
              }}
            >
              reset
            </button>
            <button
              onClick={() => {
                setCurSetIdx((prev) => (prev + 1) % sets.length);
              }}
            >
              change sets
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
