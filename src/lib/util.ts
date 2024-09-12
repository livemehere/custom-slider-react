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
