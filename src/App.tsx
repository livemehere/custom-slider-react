import { useMemo, useState } from "react";
import { RangeSlider, Slider } from "./lib";

function App() {
  const [minV, setMinV] = useState(0);
  const [maxV, setMaxV] = useState(10);

  const [inputV, setInputV] = useState(0);

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
    () => () => {
      return (
        <div
          style={{
            width: 6,
            height: 15,
            background: "#fff",
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
        <h2>RangeSlider</h2>
        <div>
          <span>min: {minV} / </span>
          <span>max: {maxV}</span>
        </div>
        <RangeSlider
          minValue={minV}
          maxValue={maxV}
          onChangeMin={(value) => setMinV(value.value)}
          onChangeMax={(value) => setMaxV(value.value)}
          min={-10}
          max={10}
          step={1}
          height={30}
          renderMinThumb={Thumb}
          renderMaxThumb={Thumb}
          track={track}
          renderSnapValue={Snap}
        />
        <div style={{ marginTop: 40 }}>
          <h2>InputSlider</h2>
          <div>
            <span>value: {inputV}</span>
          </div>
          <Slider
            min={-10}
            max={10}
            step={1}
            height={30}
            track={track}
            renderThumb={Thumb}
            renderSnapValue={Snap}
            value={inputV}
            onChange={(data) => setInputV(data.value)}
          />
        </div>
        <div style={{ marginTop: 40 }}>
          <h2>InputSlider Reverse</h2>
          <div>
            <span>value: {inputV}</span>
          </div>
          <Slider
            min={-10}
            max={10}
            step={1}
            height={30}
            track={reverseTrack}
            renderThumb={Thumb}
            renderSnapValue={Snap}
            value={inputV}
            onChange={(data) => setInputV(data.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
