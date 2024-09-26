import { memo, useMemo } from "react";
import { createSnapIndexArray, map } from "../util";

type Props = {
  min: number;
  max: number;
  step: number;
  renderSnapValue: (value: number) => React.ReactNode;
  trackWidth: number;
};

const SnapValues = memo(
  ({ min, max, step, renderSnapValue, trackWidth }: Props) => {
    const snapIndexArr = useMemo(
      () => createSnapIndexArray(min, max, step),
      [min, max, step],
    );
    return snapIndexArr
      .filter((v) => !!renderSnapValue(v))
      .map((v) => {
        return (
          <div
            key={v}
            style={{
              position: "absolute",
              left: `${map(v, min, max, 0, trackWidth)}px`,
              transform: "translateX(-50%)",
            }}
          >
            {renderSnapValue(v)}
          </div>
        );
      });
  },
);

export default SnapValues;
