import React, {
  createContext,
  useContext,
  useId,
  useMemo,
  forwardRef,
} from "react";
import { ResponsiveContainer, Tooltip, Legend } from "recharts";

const ChartContext = createContext(null);

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function useChart() {
  const context = useContext(ChartContext);

  if (!context) {
    throw new Error("useChart must be used inside ChartContainer");
  }

  return context;
}

export const ChartContainer = forwardRef(
  ({ id, className, children, config, ...props }, ref) => {
    const uniqueId = useId();
    const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

    return (
      <ChartContext.Provider value={{ config }}>
        <div
          ref={ref}
          data-chart={chartId}
          className={cn("flex justify-center text-xs", className)}
          {...props}
        >
          <ChartStyle id={chartId} config={config} />

          <ResponsiveContainer width="100%" height="100%">
            {children}
          </ResponsiveContainer>
        </div>
      </ChartContext.Provider>
    );
  },
);

ChartContainer.displayName = "ChartContainer";

const THEMES = {
  light: "",
  dark: ".dark",
};

export function ChartStyle({ id, config }) {
  const colorConfig = Object.entries(config).filter(
    ([, item]) => item.color || item.theme,
  );

  if (!colorConfig.length) return null;

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart="${id}"] {
${colorConfig
  .map(([key, item]) => {
    const color = item.theme?.[theme] || item.color;

    return color ? `--color-${key}: ${color};` : "";
  })
  .join("\n")}
}
`,
          )
          .join("\n"),
      }}
    />
  );
}

export const ChartTooltip = Tooltip;

export const ChartTooltipContent = forwardRef(
  (
    {
      active,
      payload,
      hideLabel = false,
      hideIndicator = false,
      indicator = "dot",
      className,
      label,
      formatter,
      color,
    },
    ref,
  ) => {
    const { config } = useChart();

    if (!active || !payload?.length) return null;

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg border bg-white p-3 shadow-md text-xs",
          className,
        )}
      >
        {!hideLabel && <div className="font-semibold mb-2">{label}</div>}

        {payload.map((item, index) => {
          const itemConfig = config[item.dataKey] || {};

          const indicatorColor = color || item.color;

          return (
            <div
              key={index}
              className="flex items-center justify-between gap-2 mb-1"
            >
              <div className="flex items-center gap-2">
                {!hideIndicator && (
                  <div
                    style={{
                      backgroundColor: indicatorColor,
                      width: indicator === "line" ? 10 : 8,
                      height: 8,
                      borderRadius: indicator === "dot" ? "50%" : "2px",
                    }}
                  />
                )}

                <span>{itemConfig.label || item.name}</span>
              </div>

              <span>
                {formatter ? formatter(item.value, item.name) : item.value}
              </span>
            </div>
          );
        })}
      </div>
    );
  },
);

ChartTooltipContent.displayName = "ChartTooltipContent";

export const ChartLegend = Legend;

export const ChartLegendContent = forwardRef(
  ({ payload, className, hideIcon = false }, ref) => {
    const { config } = useChart();

    if (!payload?.length) return null;

    return (
      <div
        ref={ref}
        className={cn("flex flex-wrap justify-center gap-4", className)}
      >
        {payload.map((item) => {
          const itemConfig = config[item.dataKey] || {};

          return (
            <div key={item.value} className="flex items-center gap-2">
              {!hideIcon && (
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 2,
                    backgroundColor: item.color,
                  }}
                />
              )}

              <span>{itemConfig.label || item.value}</span>
            </div>
          );
        })}
      </div>
    );
  },
);

ChartLegendContent.displayName = "ChartLegendContent";
