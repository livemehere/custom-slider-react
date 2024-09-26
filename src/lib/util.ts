import { Data } from "./types";

export function getTranslateXY(element: HTMLElement) {
  const style = window.getComputedStyle(element);
  const matrix = new DOMMatrixReadOnly(style.transform);
  return {
    translateX: matrix.m41,
    translateY: matrix.m42,
  };
}

export function map(
  value: number,
  min: number,
  max: number,
  newMin: number,
  newMax: number,
) {
  return ((value - min) * (newMax - newMin)) / (max - min) + newMin;
}

export function safeValue(v: number | undefined) {
  return v === undefined || isNaN(v) ? 0 : v;
}

export function calcDataFromValue(
  v: number,
  min: number,
  max: number,
  step: number,
  isSnap: boolean,
  isRatio?: boolean,
): Data {
  const _restrictedV = isRatio
    ? Math.max(0, Math.min(1, v))
    : Math.max(min, Math.min(max, v));
  const newValue = isRatio ? map(_restrictedV, 0, 1, min, max) : _restrictedV;
  const newRatio = isRatio ? _restrictedV : map(_restrictedV, min, max, 0, 1);

  const decimalPlaces = step.toString().split(".")[1]?.length || 0;
  const newSnappedValue = +(Math.round(newValue / step) * step).toFixed(
    decimalPlaces,
  );
  const newSnappedRatio = map(newSnappedValue, min, max, 0, 1);
  const finalValue = isSnap ? newSnappedValue : newValue;
  const finalRatio = isSnap ? newSnappedRatio : newRatio;
  return {
    value: finalValue,
    ratio: finalRatio,
  };
}

export function createSnapIndexArray(min: number, max: number, step: number) {
  return Array.from(
    { length: (max - min) / step + 1 },
    (_, i) => min + i * step,
  );
}
