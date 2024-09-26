import { useEffect, useRef, useState } from "react";
import { map, calcDataFromValue } from "../../util";
import Thumb from "../Thumb";
import { usePointerRef } from "../../hooks/usePointerRef";
import SnapValues from "../SnapValues";

type Data = {
  ratio: number;
  value: number;
};
type Props = {
  min: number;
  max: number;
  step: number;
  height: number;
  snap?: boolean;
  track: {
    size: number;
    style?: React.CSSProperties;
    fillColor?: string;
  };
  renderThumb: (data: Data) => React.ReactNode;
  renderSnapValue?: (value: number) => React.ReactNode;
  onChange?: (data: Data) => void;
  value: number;
  disabled?: boolean;
};

export default function BaseSlider({
  height,
  track,
  renderThumb,
  min,
  max,
  step,
  snap = true,
  renderSnapValue,
  onChange,
  value,
  disabled,
}: Props) {
  const [data, setData] = useState({
    ratio: map(value, min, max, 0, 1),
    value,
  });

  useEffect(() => {
    updateData(value, false, true);
  }, [value]);

  const pointerRef = usePointerRef();
  const trackRef = useRef<HTMLDivElement>(null);

  const trackStyle = track.style || {};

  const getTrackWidth = () => {
    const trackEl = trackRef.current;
    if (!trackEl) return 0;
    return trackEl.clientWidth;
  };
  const [width, setWidth] = useState(getTrackWidth());

  /** update total width state for rendering labels. */
  useEffect(() => {
    const resize = () => {
      setWidth(getTrackWidth());
    };

    setTimeout(() => {
      setWidth(getTrackWidth());
    }, 100);
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  const updateData = (v: number, isRatio?: boolean, isExternal?: boolean) => {
    if (disabled) return;
    const newData = calcDataFromValue(v, min, max, step, snap!, isRatio);
    // prevent duplicated event
    if (newData.value === data.value) return;
    setData(newData);

    if (!isExternal) {
      onChange?.(newData);
    }
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: `${height}px`,
      }}
      onPointerDown={(e) => {
        const tx = e.clientX - e.currentTarget.getBoundingClientRect().left;
        const ratio = tx / getTrackWidth();
        updateData(ratio, true);
        pointerRef.current.isDown = true;
        pointerRef.current.startX = e.clientX;
        pointerRef.current.startTx = tx;
      }}
    >
      <div
        ref={trackRef}
        className={"slider-track"}
        style={{
          ...trackStyle,
          position: "absolute",
          width: "100%",
          height: `${track.size}px`,
          top: `${height / 2 - track.size / 2}px`,
        }}
      />
      <div
        className={"slider-fill"}
        style={{
          position: "absolute",
          width: `${data.ratio * 100}%`,
          height: `${track.size}px`,
          background: track.fillColor,
          top: `${height / 2 - track.size / 2}px`,
          pointerEvents: "none",
          borderRadius: trackStyle.borderRadius,
        }}
      ></div>
      <Thumb
        pointerRef={pointerRef}
        min={min}
        max={max}
        trackWidth={width}
        value={data.value}
        onUpdateData={updateData}
      >
        {renderThumb(data)}
      </Thumb>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
        }}
      >
        {renderSnapValue && (
          <SnapValues
            min={min}
            max={max}
            step={step}
            renderSnapValue={renderSnapValue}
            trackWidth={width}
          />
        )}
      </div>
    </div>
  );
}
