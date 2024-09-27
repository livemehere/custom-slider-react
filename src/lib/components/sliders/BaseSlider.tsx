import { useEffect, useRef, useState } from "react";
import { map, calcDataFromValue } from "../../util";
import Thumb from "../Thumb";
import { usePointerRef } from "../../hooks/usePointerRef";
import SnapValues from "../SnapValues";
import { Data, TOnUpdateData } from "../../types";

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
  renderThumb: (value: number) => React.ReactNode;
  renderSnapValue?: (value: number) => React.ReactNode;
  snapYOffset?: number;
  onChange?: (value: number) => void;
  value: number;
  disabled?: boolean;
  reverse?: boolean;
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
  reverse,
  snapYOffset,
}: Props) {
  const [data, setData] = useState<Data>({
    ratio: map(value, min, max, 0, 1),
    value,
    reverseValue: min + max - value,
    reverseRatio: map(min + max - value, min, max, 0, 1),
  });

  const uiValue = reverse ? data.reverseValue : data.value;
  const uiRatio = reverse ? data.reverseRatio : data.ratio;

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

  const updateData: TOnUpdateData = (
    v: number,
    isRatio?: boolean,
    isExternal?: boolean,
    isReverse?: boolean,
  ) => {
    if (disabled) return;
    const newData = calcDataFromValue(
      v,
      min,
      max,
      step,
      snap!,
      isRatio,
      isReverse,
    );
    // prevent duplicated event
    if (newData.value === data.value) return;
    setData(newData);

    if (!isExternal) {
      onChange?.(newData.value);
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
        updateData(ratio, true, false, reverse);
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
          width: `${uiRatio * 100}%`,
          height: `${track.size}px`,
          background: track.fillColor,
          top: `${height / 2 - track.size / 2}px`,
          pointerEvents: "none",
          borderRadius: trackStyle.borderRadius,
        }}
      ></div>
      <Thumb
        reverse={reverse}
        pointerRef={pointerRef}
        min={min}
        max={max}
        trackWidth={width}
        value={uiValue}
        onUpdateData={updateData}
      >
        {renderThumb(data.value)}
      </Thumb>
      <div
        style={{
          position: "absolute",
          top: "100%",
          width: "100%",
          transform: `translateY(${snapYOffset ?? 0}px)`,
        }}
      >
        {renderSnapValue && (
          <SnapValues
            reverse={reverse}
            min={min}
            max={max}
            step={step}
            renderSnapValue={renderSnapValue}
          />
        )}
      </div>
    </div>
  );
}
