import { useState } from "react";
import { Timeframe } from "@trading-master/market-data";
import { ThemeName } from "@trading-master/chart-engine";
import {
  IconCandlestick,
  IconIndicators,
  IconAlert,
  IconReplay,
  IconUndo,
  IconRedo,
  IconSettings,
  IconFullscreen,
  IconCamera,
  IconChevronDown,
  IconPlus,
  IconStar,
  IconStarOutline,
} from "./icons";

export type ChartType = "candles" | "hollow" | "heikin-ashi" | "line" | "area" | "bars";

const TIMEFRAME_GROUPS: { category: string; items: { tf: Timeframe; label: string }[] }[] = [
  {
    category: "TICKS",
    items: [
      { tf: "1t", label: "1 tick" },
      { tf: "10t", label: "10 ticks" },
      { tf: "100t", label: "100 ticks" },
      { tf: "1000t", label: "1000 ticks" },
    ],
  },
  {
    category: "SECONDS",
    items: [
      { tf: "1s", label: "1 second" },
      { tf: "5s", label: "5 seconds" },
      { tf: "10s", label: "10 seconds" },
      { tf: "15s", label: "15 seconds" },
      { tf: "30s", label: "30 seconds" },
      { tf: "45s", label: "45 seconds" },
    ],
  },
  {
    category: "MINUTES",
    items: [
      { tf: "1m", label: "1 minute" },
      { tf: "2m", label: "2 minutes" },
      { tf: "3m", label: "3 minutes" },
      { tf: "5m", label: "5 minutes" },
      { tf: "10m", label: "10 minutes" },
      { tf: "15m", label: "15 minutes" },
      { tf: "30m", label: "30 minutes" },
      { tf: "45m", label: "45 minutes" },
    ],
  },
  {
    category: "HOURS",
    items: [
      { tf: "1H", label: "1 hour" },
      { tf: "2H", label: "2 hours" },
      { tf: "3H", label: "3 hours" },
      { tf: "4H", label: "4 hours" },
    ],
  },
  {
    category: "DAYS",
    items: [
      { tf: "1D", label: "1 day" },
      { tf: "1W", label: "1 week" },
      { tf: "1M", label: "1 month" },
      { tf: "3M", label: "3 months" },
      { tf: "6M", label: "6 months" },
      { tf: "12M", label: "12 months" },
    ],
  },
  {
    category: "RANGES",
    items: [
      { tf: "1r", label: "1 range" },
      { tf: "10r", label: "10 ranges" },
      { tf: "100r", label: "100 ranges" },
      { tf: "1000r", label: "1000 ranges" },
    ],
  },
];

export interface TopBarProps {
  symbol: string;
  timeframe: Timeframe;
  onTimeframeChange: (tf: Timeframe) => void;
  chartType: ChartType;
  onChartTypeChange: (type: ChartType) => void;
  themeName: ThemeName;
  onThemeToggle: () => void;
  onOpenSymbolSearch: () => void;
  onOpenIndicators: () => void;
  onOpenAlerts: () => void;
  onOpenSettings: () => void;
  onTakeSnapshot: () => void;
  onUndo?: () => void;
  onRedo?: () => void;
  replayActive: boolean;
  onToggleReplay: () => void;
}

export function TopBar(props: TopBarProps) {
  const [favoriteTimeframes, setFavoriteTimeframes] = useState<Timeframe[]>(["1m", "5m", "15m", "1H", "1D"]);
  const [showTfDropdown, setShowTfDropdown] = useState(false);
  const [collapsedCategories, setCollapsedCategories] = useState<Record<string, boolean>>({});
  const [showChartTypeDropdown, setShowChartTypeDropdown] = useState(false);
  const [showTemplateDropdown, setShowTemplateDropdown] = useState(false);

  function toggleCategory(category: string, e: React.MouseEvent) {
    e.stopPropagation();
    setCollapsedCategories((prev) => ({ ...prev, [category]: !prev[category] }));
  }

  function toggleFavorite(tf: Timeframe, e: React.MouseEvent) {
    e.stopPropagation();
    setFavoriteTimeframes((prev) =>
      prev.includes(tf) ? prev.filter((t) => t !== tf) : [...prev, tf]
    );
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }

  return (
    <header className="tv-topbar">
      {/* Left side: Avatar, Symbol Search, Compare */}
      <div className="tv-topbar-section">
        <div className="tv-avatar-btn" title="User Profile (Elanchezhian)">
          <span>E</span>
        </div>

        <div className="tv-topbar-divider" />

        <button className="tv-symbol-btn" onClick={props.onOpenSymbolSearch} title="Search Symbol (Alt+S)">
          <span className="tv-symbol-name">{props.symbol}</span>
          <span className="tv-symbol-market">NSE</span>
          <IconChevronDown />
        </button>

        <button className="tv-icon-btn" onClick={props.onOpenSymbolSearch} title="Compare or Add Symbol">
          <IconPlus />
        </button>

        <div className="tv-topbar-divider" />

        {/* Timeframes Section */}
        <div className="tv-tf-section">
          {/* Quick Favorite Buttons */}
          <div className="tv-tf-list">
            {favoriteTimeframes.map((tf) => (
              <button
                key={tf}
                className={`tv-tf-btn ${tf === props.timeframe ? "active" : ""}`}
                onClick={() => props.onTimeframeChange(tf)}
                title={`Select ${tf} Timeframe`}
              >
                {tf}
              </button>
            ))}
          </div>

          {/* Timeframe Dropdown Selector */}
          <div className="tv-dropdown-container">
            <button
              className={`tv-tf-dropdown-btn ${showTfDropdown ? "active" : ""}`}
              onClick={() => setShowTfDropdown(!showTfDropdown)}
              title="Select Timeframe Interval (Dropdown)"
            >
              <span>{props.timeframe}</span>
              <IconChevronDown />
            </button>

            {showTfDropdown && (
              <div className="tv-tf-menu-dropdown" onMouseLeave={() => setShowTfDropdown(false)}>
                {/* Header: Add custom interval */}
                <div className="tv-tf-custom-item" onClick={() => alert("Custom interval generator: Enter your desired interval in minutes/hours.")}>
                  <IconPlus />
                  <span>Add custom interval...</span>
                </div>
                <div className="tv-tf-menu-divider" />

                {TIMEFRAME_GROUPS.map((group) => {
                  const isCollapsed = Boolean(collapsedCategories[group.category]);
                  return (
                    <div key={group.category} className="tv-tf-group">
                      <div className="tv-tf-group-header" onClick={(e) => toggleCategory(group.category, e)}>
                        <span>{group.category}</span>
                        <span className={`tv-tf-category-chevron ${isCollapsed ? "collapsed" : ""}`}>∧</span>
                      </div>
                      {!isCollapsed &&
                        group.items.map((item) => {
                          const isFav = favoriteTimeframes.includes(item.tf);
                          const isActive = item.tf === props.timeframe;
                          return (
                            <div
                              key={item.tf}
                              className={`tv-tf-menu-item ${isActive ? "active" : ""}`}
                              onClick={() => {
                                props.onTimeframeChange(item.tf);
                                setShowTfDropdown(false);
                              }}
                            >
                              <div className="tv-tf-item-left">
                                <span className="tv-tf-check-mark">{isActive ? "✓" : ""}</span>
                                <span className="tv-tf-item-label">{item.label}</span>
                              </div>
                              <button
                                className={`tv-tf-star-btn ${isFav ? "active-star" : ""}`}
                                onClick={(e) => toggleFavorite(item.tf, e)}
                                title={isFav ? "Remove from topbar favorites" : "Add to topbar favorites"}
                              >
                                {isFav ? <IconStar /> : <IconStarOutline />}
                              </button>
                            </div>
                          );
                        })}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="tv-topbar-divider" />

        {/* Chart Style Dropdown */}
        <div className="tv-dropdown-container">
          <button
            className={`tv-icon-btn with-chevron ${showChartTypeDropdown ? "active" : ""}`}
            onClick={() => setShowChartTypeDropdown(!showChartTypeDropdown)}
            title="Chart Style"
          >
            <IconCandlestick />
            <IconChevronDown />
          </button>
          {showChartTypeDropdown && (
            <div className="tv-menu-dropdown" onMouseLeave={() => setShowChartTypeDropdown(false)}>
              <div className={`tv-menu-item ${props.chartType === "candles" ? "active" : ""}`} onClick={() => { props.onChartTypeChange("candles"); setShowChartTypeDropdown(false); }}>
                <span>Candles</span>
              </div>
              <div className={`tv-menu-item ${props.chartType === "hollow" ? "active" : ""}`} onClick={() => { props.onChartTypeChange("hollow"); setShowChartTypeDropdown(false); }}>
                <span>Hollow Candles</span>
              </div>
              <div className={`tv-menu-item ${props.chartType === "heikin-ashi" ? "active" : ""}`} onClick={() => { props.onChartTypeChange("heikin-ashi"); setShowChartTypeDropdown(false); }}>
                <span>Heikin Ashi</span>
              </div>
              <div className={`tv-menu-item ${props.chartType === "line" ? "active" : ""}`} onClick={() => { props.onChartTypeChange("line"); setShowChartTypeDropdown(false); }}>
                <span>Line</span>
              </div>
              <div className={`tv-menu-item ${props.chartType === "area" ? "active" : ""}`} onClick={() => { props.onChartTypeChange("area"); setShowChartTypeDropdown(false); }}>
                <span>Area</span>
              </div>
              <div className={`tv-menu-item ${props.chartType === "bars" ? "active" : ""}`} onClick={() => { props.onChartTypeChange("bars"); setShowChartTypeDropdown(false); }}>
                <span>Bars</span>
              </div>
            </div>
          )}
        </div>

        <div className="tv-topbar-divider" />

        {/* Indicators Button */}
        <button className="tv-pill-btn" onClick={props.onOpenIndicators} title="Technical Indicators (/)">
          <IconIndicators />
          <span>Indicators</span>
        </button>

        {/* Indicator Templates Button */}
        <div className="tv-dropdown-container">
          <button
            className="tv-icon-btn"
            onClick={() => setShowTemplateDropdown(!showTemplateDropdown)}
            title="Indicator Templates"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="2" width="6" height="6" rx="1" />
              <rect x="10" y="2" width="6" height="6" rx="1" />
              <rect x="2" y="10" width="6" height="6" rx="1" />
              <rect x="10" y="10" width="6" height="6" rx="1" />
            </svg>
          </button>
          {showTemplateDropdown && (
            <div className="tv-menu-dropdown" onMouseLeave={() => setShowTemplateDropdown(false)}>
              <div className="tv-menu-header">Indicator Templates</div>
              <div className="tv-menu-item" onClick={() => setShowTemplateDropdown(false)}>Default Setup (Vol + EMA)</div>
              <div className="tv-menu-item" onClick={() => setShowTemplateDropdown(false)}>Trend Following (EMA 20/50/200 + Supertrend)</div>
              <div className="tv-menu-item" onClick={() => setShowTemplateDropdown(false)}>Momentum Scalping (RSI + MACD + VWAP)</div>
              <div className="tv-menu-item" onClick={() => setShowTemplateDropdown(false)}>Volatility Breakout (Bollinger Bands + ATR)</div>
            </div>
          )}
        </div>

        {/* Alert Button */}
        <button className="tv-pill-btn" onClick={props.onOpenAlerts} title="Create Price Alert (Alt+A)">
          <IconAlert />
          <span>Alert</span>
        </button>

        {/* Replay Button */}
        <button
          className={`tv-pill-btn ${props.replayActive ? "active-accent" : ""}`}
          onClick={props.onToggleReplay}
          title="Bar Replay Mode"
        >
          <IconReplay />
          <span>Replay</span>
        </button>

        <div className="tv-topbar-divider" />

        {/* Undo / Redo */}
        <button className="tv-icon-btn" onClick={props.onUndo} title="Undo (Ctrl+Z)">
          <IconUndo />
        </button>
        <button className="tv-icon-btn" onClick={props.onRedo} title="Redo (Ctrl+Y)">
          <IconRedo />
        </button>
      </div>

      {/* Right side: Save, Settings, Fullscreen, Snapshot, Theme */}
      <div className="tv-topbar-section right">
        <div className="tv-save-badge" title="Auto-saved to Cloud">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#26a69a" strokeWidth="1.5">
            <path d="M4 12H12C13.66 12 15 10.66 15 9C15 7.42 13.78 6.13 12.23 6.01C11.75 3.72 9.72 2 7.3 2C4.54 2 2.3 4.24 2.3 7C1 7.5 0 8.64 0 10C0 11.66 1.34 13 3 13H4" />
          </svg>
          <span>Save</span>
        </div>

        <button className="tv-icon-btn" onClick={props.onOpenSettings} title="Chart Settings">
          <IconSettings />
        </button>

        <button className="tv-icon-btn" onClick={toggleFullscreen} title="Fullscreen (F11)">
          <IconFullscreen />
        </button>

        <button className="tv-icon-btn" onClick={props.onTakeSnapshot} title="Take a snapshot">
          <IconCamera />
        </button>

        <button className="tv-icon-btn" onClick={props.onThemeToggle} title={`Switch to ${props.themeName === "dark" ? "Light" : "Dark"} Mode`}>
          {props.themeName === "dark" ? "☀️" : "🌙"}
        </button>

        <button className="tv-publish-btn" onClick={props.onTakeSnapshot} title="Share chart snapshot">
          Publish
        </button>
      </div>
    </header>
  );
}
