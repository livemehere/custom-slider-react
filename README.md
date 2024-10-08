# custom-slider-react

**[npm](https://www.npmjs.com/package/custom-slider-react)**

A input slider component for React with fully customizable.

![full-example.gif](docs%2Ffull-example.gif)

> Must bind the value and onChange props.

## Installation

```bash
npm install custom-slider-react
yarn add custom-slider-react
pnpm add custom-slider-react
```


## RangeSlider Example

```tsx
import { RangeSlider } from "custom-slider-react";

const [minV, setMinV] = useState(0);
const [maxV, setMaxV] = useState(10);

<RangeSlider
    minValue={minV}
    maxValue={maxV}
    onChangeMin={(value) => setMinV(value)}
    onChangeMax={(value) => setMaxV(value)}
    min={-10}
    max={10}
    step={1}
    height={30}
    renderMinThumb={Thumb} // or (value:number)=> <div>{value}</div>
    renderMaxThumb={Thumb}
    track={track}
    renderSnapValue={Snap} // or (v:number) => <div>{v}</div>
/>
```

## Slider Example

```tsx
import { Slider } from "custom-slider-react";

const [inputV, setInputV] = useState(0);

<Slider
    min={-10}
    max={10}
    step={1}
    height={30}
    track={track}
    renderThumb={Thumb}
    renderSnapValue={Snap}
    value={inputV}
    onChange={(value) => setInputV(value)}
/>
```

## Reverse Slider Example

![reverse-example.gif](docs%2Freverse-example.gif)

```tsx
<Slider
    reverse={true}
    // ...
/>
```


## Interface

```ts
type Data = {
    ratio: number;
    value: number;
};

type RangeSliderProps = {
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
  onChange?: (value: number) => void;
  value: number;
  disabled?: boolean;
  reverse?: boolean;
  snapYOffset?: number;
};

type SliderProps = {
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
    renderMinThumb: (value: number) => React.ReactNode;
    renderMaxThumb: (value: number) => React.ReactNode;
    renderSnapValue?: (value: number) => React.ReactNode;
    minValue: number;
    maxValue: number;
    onChangeMin?: (value: number) => void;
    onChangeMax?: (value: number) => void;
    maxDisabled?: boolean;
    minDisabled?: boolean;
    snapYOffset?: number;
};
```

## Options and Components Examples
> If you need to optimize rendering, memorize `renderThumb` and `renderSnapValue` functions. Especially `renderSnapValue` function.
> Do not render all of snap value if step is too small.

- Tips for fill track color reverse is simply change the `fillColor` and `background` color of track style.

```tsx
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
```

## Each element class name for styling if you need

![classNames.png](docs%2FclassNames.png)