import { Fragment, memo, useMemo } from "react";
import { createSnapIndexArray, map } from "../util";

type Props = {
  min: number;
  max: number;
  step: number;
  renderSnapValue: (value: number) => React.ReactNode;
  reverse?: boolean;
};

const SnapValues = memo(
  ({ min, max, step, renderSnapValue, reverse }: Props) => {
    const snapIndexArr = useMemo(() => {
      const arr = createSnapIndexArray(min, max, step);
      return reverse ? arr.reverse() : arr;
    }, [min, max, step, reverse]);
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {snapIndexArr
          .filter((v) => !!renderSnapValue(v))
          .map((v) => {
            return <Fragment key={v}>{renderSnapValue(v)}</Fragment>;
          })}
      </div>
    );
  },
);

export default SnapValues;
