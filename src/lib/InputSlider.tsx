import { useEffect, useMemo, useRef, useState } from "react";
import { map, getTranslateXY } from "./util";

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
};

export default function InputSlider({
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
}: Props) {
  const [data, setData] = useState({
    ratio: map(value, min, max, 0, 1),
    value,
  });
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);

  const trackStyle = track.style || {};
  const pointerState = useRef({
    isDown: false,
    startX: 0,
    startTx: 0,
  });

  const snapIndexArr = useMemo(
    () =>
      Array.from({ length: (max - min) / step + 1 }, (_, i) => min + i * step),
    [min, max, step],
  );
  const getTrackWidth = () => {
    const trackEl = trackRef.current;
    if (!trackEl) return 0;
    return trackEl.clientWidth;
  };
  const [width, setWidth] = useState(getTrackWidth());

  useEffect(() => {
    updateData(value, false, true);
  }, [value]);

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

  useEffect(() => {
    const thumbEl = thumbRef.current;
    const handleEl = handleRef.current;
    if (!thumbEl || !handleEl) return;

    const handlePointerDown = (e: PointerEvent) => {
      pointerState.current.isDown = true;
      const { translateX } = getTranslateXY(thumbEl);
      pointerState.current.startX = e.clientX;
      pointerState.current.startTx = translateX;
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!pointerState.current.isDown) return;
      const thumbEl = thumbRef.current;
      if (!thumbEl) return;
      const dx = e.clientX - pointerState.current.startX;
      const nextTx = Math.max(
        0,
        Math.min(getTrackWidth(), pointerState.current.startTx + dx),
      );
      const ratio = nextTx / getTrackWidth();
      updateData(ratio, true);
    };

    const handlePointerUp = () => {
      pointerState.current.isDown = false;
    };

    handleEl.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      handleEl.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [snap, step, min, max, data]);

  /** update thumb y position when thumb component is updated. */
  useEffect(() => {
    const thumbEl = thumbRef.current;
    if (!thumbEl) return;
    updateData(data.value, false, true);
  }, [renderThumb]);

  const updateData = (v: number, ratio?: boolean, isExternal?: boolean) => {
    const _restrictedV = ratio
      ? Math.max(0, Math.min(1, v))
      : Math.max(min, Math.min(max, v));
    const newValue = ratio ? map(_restrictedV, 0, 1, min, max) : _restrictedV;
    const newRatio = ratio ? _restrictedV : map(_restrictedV, min, max, 0, 1);

    const decimalPlaces = step.toString().split(".")[1]?.length || 0;
    const newSnappedValue = +(Math.round(newValue / step) * step).toFixed(
      decimalPlaces,
    );
    const newSnappedRatio = map(newSnappedValue, min, max, 0, 1);
    const finalValue = snap ? newSnappedValue : newValue;
    const finalRatio = snap ? newSnappedRatio : newRatio;
    const newData = {
      value: finalValue,
      ratio: finalRatio,
    };

    // prevent duplicated event
    if (finalValue === data.value) return;
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
    >
      <div
        ref={trackRef}
        className={"ir-track"}
        style={{
          ...trackStyle,
          position: "absolute",
          width: "100%",
          height: `${track.size}px`,
          top: `${height / 2 - track.size / 2}px`,
        }}
        onPointerDown={(e) => {
          const tx = e.clientX - trackRef.current!.getBoundingClientRect().left;
          const ratio = tx / getTrackWidth();
          updateData(ratio, true);
          pointerState.current.isDown = true;
        }}
      />
      <div
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
      <div
        ref={thumbRef}
        className={"ir-thumb"}
        style={{
          position: "absolute",
          left: 0,
          top: "50%",
          transform: `translateY(-50%) translateX(${map(data.value, min, max, 0, getTrackWidth())}px)`,
        }}
      >
        <div
          className={"ir-handle"}
          ref={handleRef}
          style={{
            transform: "translateX(-50%)",
          }}
        >
          {renderThumb(data)}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
        }}
      >
        {renderSnapValue &&
          snapIndexArr
            .filter((v) => !!renderSnapValue(v))
            .map((v) => {
              return (
                <div
                  key={v}
                  style={{
                    position: "absolute",
                    left: `${map(v, min, max, 0, width)}px`,
                    transform: "translateX(-50%)",
                  }}
                >
                  {renderSnapValue(v)}
                </div>
              );
            })}
      </div>
    </div>
  );
}
