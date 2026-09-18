import { IndicatorType } from "@trading-master/indicators";

export interface IndicatorCatalogEntry {
  type: IndicatorType;
  label: string;
  defaultParams: Record<string, number>;
  pane: "overlay" | "separate";
  lines: { key: string; color: string; style?: "line" | "histogram" }[];
  fixedRange?: { min: number; max: number };
  badge?: string;
  category?: "Technicals" | "Fundamentals" | "Strategies" | "Profiles" | "Patterns";
}

export const INDICATOR_CATALOG: IndicatorCatalogEntry[] = [
  { type: "VOLUME_24H", label: "24-hour Volume", defaultParams: { period: 24 }, pane: "separate", lines: [{ key: "average", color: "#2962ff" }], category: "Technicals" },
  { type: "ADL_ACCDIST", label: "Accumulation/Distribution", defaultParams: {}, pane: "separate", lines: [{ key: "average", color: "#00b4d8" }], category: "Technicals" },
  { type: "ADL_LINE", label: "Advance Decline Line", defaultParams: {}, pane: "separate", lines: [{ key: "average", color: "#7209b7" }], category: "Technicals" },
  { type: "ADL_RATIO", label: "Advance Decline Ratio", defaultParams: {}, pane: "separate", lines: [{ key: "average", color: "#f72585" }], category: "Technicals" },
  { type: "ALMA", label: "Arnaud Legoux Moving Average", defaultParams: { period: 9, offset: 0.85, sigma: 6 }, pane: "overlay", lines: [{ key: "sma", color: "#ff9f1c" }], category: "Technicals" },
  { type: "AROON", label: "Aroon", defaultParams: { period: 14 }, pane: "separate", lines: [{ key: "adx", color: "#2ec4b6" }, { key: "plusDI", color: "#e71d36" }], fixedRange: { min: 0, max: 100 }, category: "Technicals" },
  { type: "AROON_OSC", label: "Aroon Oscillator", defaultParams: { period: 14 }, pane: "separate", lines: [{ key: "adx", color: "#ff9f1c" }], fixedRange: { min: -100, max: 100 }, category: "Technicals" },
  { type: "AUTO_FIB_EXT", label: "Auto Fib Extension", defaultParams: {}, pane: "overlay", lines: [{ key: "sma", color: "#4cc9f0" }], category: "Technicals" },
  { type: "AUTO_FIB_RET", label: "Auto Fib Retracement", defaultParams: {}, pane: "overlay", lines: [{ key: "sma", color: "#f72585" }], category: "Technicals" },
  { type: "AUTO_KEY_LEVELS", label: "Auto Key Levels", defaultParams: {}, pane: "overlay", lines: [{ key: "sma", color: "#7209b7" }], badge: "BETA", category: "Technicals" },
  { type: "AUTO_PITCHFORK", label: "Auto Pitchfork", defaultParams: {}, pane: "overlay", lines: [{ key: "sma", color: "#3a0ca3" }], category: "Technicals" },
  { type: "AUTO_TRENDLINES", label: "Auto Trendlines", defaultParams: {}, pane: "overlay", lines: [{ key: "sma", color: "#4361ee" }], badge: "BETA", category: "Technicals" },
  { type: "ADR", label: "Average Daily Range", defaultParams: { period: 14 }, pane: "separate", lines: [{ key: "atr", color: "#ffb703" }], category: "Technicals" },
  { type: "ATR", label: "Average True Range", defaultParams: { period: 14 }, pane: "separate", lines: [{ key: "atr", color: "#8d6e63" }], category: "Technicals" },
  { type: "AO", label: "Awesome Oscillator", defaultParams: { fastPeriod: 5, slowPeriod: 34 }, pane: "separate", lines: [{ key: "histogram", color: "#06d6a0", style: "histogram" }], category: "Technicals" },
  {
    type: "BOLLINGER",
    label: "Bollinger Bands",
    defaultParams: { period: 20, stdDevMultiplier: 2 },
    pane: "overlay",
    lines: [
      { key: "upper", color: "rgba(120,144,156,0.9)" },
      { key: "middle", color: "rgba(120,144,156,0.5)" },
      { key: "lower", color: "rgba(120,144,156,0.9)" },
    ],
    category: "Technicals",
  },
  { type: "CMF", label: "Chaikin Money Flow", defaultParams: { period: 20 }, pane: "separate", lines: [{ key: "average", color: "#2ec4b6" }], fixedRange: { min: -1, max: 1 }, category: "Technicals" },
  { type: "CCI", label: "Commodity Channel Index", defaultParams: { period: 20 }, pane: "separate", lines: [{ key: "rsi", color: "#e71d36" }], category: "Technicals" },
  { type: "DONCHIAN", label: "Donchian Channels", defaultParams: { period: 20 }, pane: "overlay", lines: [{ key: "upper", color: "#4361ee" }, { key: "lower", color: "#4361ee" }], category: "Technicals" },
  { type: "EMA", label: "Exponential Moving Average", defaultParams: { period: 21 }, pane: "overlay", lines: [{ key: "ema", color: "#ffb74d" }], category: "Technicals" },
  { type: "HMA", label: "Hull Moving Average", defaultParams: { period: 9 }, pane: "overlay", lines: [{ key: "sma", color: "#e63946" }], category: "Technicals" },
  { type: "ICHIMOKU", label: "Ichimoku Cloud", defaultParams: { conversionPeriod: 9, basePeriod: 26, spanBPeriod: 52 }, pane: "overlay", lines: [{ key: "upper", color: "#06d6a0" }, { key: "lower", color: "#ef476f" }], category: "Technicals" },
  { type: "KELTNER", label: "Keltner Channels", defaultParams: { period: 20, multiplier: 2 }, pane: "overlay", lines: [{ key: "upper", color: "#118ab2" }, { key: "lower", color: "#118ab2" }], category: "Technicals" },
  {
    type: "MACD",
    label: "MACD",
    defaultParams: { fastPeriod: 12, slowPeriod: 26, signalPeriod: 9 },
    pane: "separate",
    lines: [
      { key: "macd", color: "#42a5f5" },
      { key: "signal", color: "#ff7043" },
      { key: "histogram", color: "rgba(120,144,156,0.6)", style: "histogram" },
    ],
    category: "Technicals",
  },
  { type: "MFI", label: "Money Flow Index", defaultParams: { period: 14 }, pane: "separate", lines: [{ key: "rsi", color: "#06d6a0" }], fixedRange: { min: 0, max: 100 }, category: "Technicals" },
  { type: "PSAR", label: "Parabolic SAR", defaultParams: { start: 0.02, increment: 0.02, maximum: 0.2 }, pane: "overlay", lines: [{ key: "value", color: "#ffd166" }], category: "Technicals" },
  { type: "PIVOT_HL", label: "Pivot Points High Low", defaultParams: { period: 15 }, pane: "overlay", lines: [{ key: "upper", color: "#06d6a0" }, { key: "lower", color: "#ef476f" }], category: "Technicals" },
  { type: "RSI", label: "Relative Strength Index", defaultParams: { period: 14 }, pane: "separate", lines: [{ key: "rsi", color: "#ab47bc" }], fixedRange: { min: 0, max: 100 }, category: "Technicals" },
  { type: "SMA", label: "Simple Moving Average", defaultParams: { period: 20 }, pane: "overlay", lines: [{ key: "sma", color: "#42a5f5" }], category: "Technicals" },
  { type: "STOCH", label: "Stochastic Oscillator", defaultParams: { kPeriod: 14, dPeriod: 3, slowing: 3 }, pane: "separate", lines: [{ key: "rsi", color: "#2196f3" }], fixedRange: { min: 0, max: 100 }, category: "Technicals" },
  { type: "SUPERTREND", label: "Supertrend", defaultParams: { period: 10, multiplier: 3 }, pane: "overlay", lines: [{ key: "value", color: "#66bb6a" }], category: "Technicals" },
  { type: "VOLUME", label: "Volume", defaultParams: {}, pane: "separate", lines: [{ key: "average", color: "#26a69a" }], category: "Technicals" },
  { type: "VOLUME_AVERAGE", label: "Volume Average", defaultParams: { period: 20 }, pane: "separate", lines: [{ key: "average", color: "#90a4ae" }], category: "Technicals" },
  { type: "VOLUME_OSC", label: "Volume Oscillator", defaultParams: { shortPeriod: 5, longPeriod: 10 }, pane: "separate", lines: [{ key: "macd", color: "#ff9800" }], category: "Technicals" },
  { type: "VOLUME_SPIKE", label: "Volume Spike", defaultParams: { period: 20, multiplier: 2 }, pane: "separate", lines: [{ key: "ratio", color: "#ffca28" }], category: "Technicals" },
  { type: "VWAP", label: "VWAP", defaultParams: {}, pane: "overlay", lines: [{ key: "vwap", color: "#26c6da" }], category: "Technicals" },
  { type: "WILLIAMS_R", label: "Williams %R", defaultParams: { period: 14 }, pane: "separate", lines: [{ key: "rsi", color: "#e91e63" }], fixedRange: { min: -100, max: 0 }, category: "Technicals" },
  { type: "WMA", label: "Weighted Moving Average", defaultParams: { period: 20 }, pane: "overlay", lines: [{ key: "wma", color: "#ba68c8" }], category: "Technicals" },
];

export function catalogEntry(type: IndicatorType): IndicatorCatalogEntry {
  const entry = INDICATOR_CATALOG.find((e) => e.type === type);
  if (!entry) return INDICATOR_CATALOG[0]!;
  return entry;
}
