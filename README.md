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

## Full Example

```tsx
<Slider
    value={value}
    onChange={({ value }) => setValue(value)}
    min={0}
    max={10}
    step={0.1}
    height={30}
    renderThumb={({ ratio }) => (
        <div
            style={{
                width: 20,
                height: 20,
                borderRadius: "50%",
                background: `hsl(${ratio * 360}, 100%, 50%)`,
                border: "2px solid #64748b",
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div
                style={{
                    transform: "translateY(-24px)",
                    userSelect: "none",
                }}
            >
                {value}
            </div>
        </div>
    )}
    track={{
        size: 10,
        fillColor: "#334155",
        style: {
            background: "#D4D4D8",
            borderRadius: 8,
        },
    }}
    renderSnapValue={(v) =>
        v % 1 === 0 && (
            <div
                style={{
                    fontSize: 14,
                    color: "#94a3b8",
                }}
            >
                {v.toFixed(0)}
            </div>
        )
    }
/>
```

## API

```ts
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
```
