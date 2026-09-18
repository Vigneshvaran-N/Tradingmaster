/** Structurally compatible with @trading-master/market-data's CandleBatch, without a hard dependency. */
export interface OHLCVSeriesView {
  time: Float64Array;
  open: Float64Array;
  high: Float64Array;
  low: Float64Array;
  close: Float64Array;
  volume: Float64Array;
  length: number;
}

export interface OHLCVBar {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export type IndicatorOutput = Record<string, Float64Array>;

export type PaneKind = "overlay" | "separate";

/**
 * One running instance of an indicator (e.g. "EMA 21 on close"). Holds its
 * own rolling state so a new/updated bar can be folded in without touching
 * the rest of the series.
 */
export interface IndicatorInstance {
  readonly id: string;
  readonly type: IndicatorType;
  readonly keys: string[];
  readonly pane: PaneKind;
  params: Record<string, number>;

  /** Full recompute over the whole series; also primes rolling state to the last bar. */
  seed(series: OHLCVSeriesView): IndicatorOutput;

  /**
   * Folds one bar in. `replacing = true` means this bar overwrites the
   * still-forming last bar (a live tick update); `false` means it is a
   * newly closed bar appended after the last one.
   */
  update(bar: OHLCVBar, replacing: boolean): Record<string, number>;
}

export type IndicatorType =
  | "SMA"
  | "EMA"
  | "WMA"
  | "HMA"
  | "ALMA"
  | "VWAP"
  | "RSI"
  | "MACD"
  | "ATR"
  | "ADX"
  | "SUPERTREND"
  | "BOLLINGER"
  | "VOLUME_AVERAGE"
  | "VOLUME_SPIKE"
  | "VOLUME"
  | "VOLUME_24H"
  | "VOLUME_OSC"
  | "ADL_ACCDIST"
  | "ADL_LINE"
  | "ADL_RATIO"
  | "AROON"
  | "AROON_OSC"
  | "AUTO_FIB_EXT"
  | "AUTO_FIB_RET"
  | "AUTO_KEY_LEVELS"
  | "AUTO_PITCHFORK"
  | "AUTO_TRENDLINES"
  | "ADR"
  | "AO"
  | "CMF"
  | "CCI"
  | "DONCHIAN"
  | "ICHIMOKU"
  | "KELTNER"
  | "MFI"
  | "PSAR"
  | "PIVOT_HL"
  | "STOCH"
  | "WILLIAMS_R";

export const DEFAULT_PANE: Record<IndicatorType, PaneKind> = {
  SMA: "overlay",
  EMA: "overlay",
  WMA: "overlay",
  HMA: "overlay",
  ALMA: "overlay",
  VWAP: "overlay",
  BOLLINGER: "overlay",
  SUPERTREND: "overlay",
  AUTO_FIB_EXT: "overlay",
  AUTO_FIB_RET: "overlay",
  AUTO_KEY_LEVELS: "overlay",
  AUTO_PITCHFORK: "overlay",
  AUTO_TRENDLINES: "overlay",
  DONCHIAN: "overlay",
  ICHIMOKU: "overlay",
  KELTNER: "overlay",
  PSAR: "overlay",
  PIVOT_HL: "overlay",

  RSI: "separate",
  MACD: "separate",
  ATR: "separate",
  ADX: "separate",
  VOLUME_AVERAGE: "separate",
  VOLUME_SPIKE: "separate",
  VOLUME: "separate",
  VOLUME_24H: "separate",
  VOLUME_OSC: "separate",
  ADL_ACCDIST: "separate",
  ADL_LINE: "separate",
  ADL_RATIO: "separate",
  AROON: "separate",
  AROON_OSC: "separate",
  ADR: "separate",
  AO: "separate",
  CMF: "separate",
  CCI: "separate",
  MFI: "separate",
  STOCH: "separate",
  WILLIAMS_R: "separate",
};
