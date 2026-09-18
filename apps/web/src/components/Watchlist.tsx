import { useState } from "react";
import { WatchlistDef, WatchlistQuoteRow } from "../types";
import { IconPlus, IconChevronDown, IconChevronRight } from "./icons";

export interface WatchlistProps {
  lists: WatchlistDef[];
  activeListId: string;
  onSelectList: (id: string) => void;
  quotes: Map<string, WatchlistQuoteRow>;
  onSelectSymbol: (symbol: string) => void;
  selectedSymbol: string;
  onAddSymbol: (listId: string, symbol: string) => void;
  onRemoveSymbol: (listId: string, symbol: string) => void;
  onReorder: (listId: string, symbol: string, direction: -1 | 1) => void;
  compact?: boolean;
}

interface SymbolGroup {
  id: string;
  title: string;
  symbols: string[];
}

export function Watchlist(props: WatchlistProps) {
  const [search, setSearch] = useState("");
  const [showAddInput, setShowAddInput] = useState(false);
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});
  const [showDetailsPane, setShowDetailsPane] = useState(true);

  const activeList = props.lists.find((l) => l.id === props.activeListId) ?? props.lists[0]!;

  function toggleSection(sectionId: string) {
    setCollapsedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  }

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (search.trim()) {
      props.onAddSymbol(activeList.id, search.trim().toUpperCase());
      setSearch("");
      setShowAddInput(false);
    }
  }

  // Categorize symbols into sections (Indices, Stocks, Crypto/Global) matching TradingView
  const indexSymbols = ["NIFTY", "BANKNIFTY", "FINNIFTY", "SENSEX", "NIFTY500"];
  const cryptoSymbols = ["BTCUSDT", "ETHUSDT", "SOLUSDT", "DOGEUSDT"];

  const groups: SymbolGroup[] = [
    {
      id: "indices",
      title: "INDICES",
      symbols: activeList.symbols.filter((s) => indexSymbols.includes(s)),
    },
    {
      id: "stocks",
      title: "STOCKS",
      symbols: activeList.symbols.filter((s) => !indexSymbols.includes(s) && !cryptoSymbols.includes(s)),
    },
    {
      id: "crypto",
      title: "CRYPTO & GLOBAL",
      symbols: activeList.symbols.filter((s) => cryptoSymbols.includes(s)),
    },
  ].filter((g) => g.symbols.length > 0);

  // Selected symbol quote details
  const selectedQuote = props.quotes.get(props.selectedSymbol);
  const selLtp = selectedQuote?.ltp ?? 23294.70;
  const selChange = selectedQuote?.change ?? 53.15;
  const selPct = selectedQuote?.changePercent ?? 0.23;
  const selIsUp = selChange >= 0;
  const selHigh = selectedQuote?.high ?? selLtp * 1.008;
  const selLow = selectedQuote?.low ?? selLtp * 0.994;
  const selOpen = selectedQuote?.open ?? selLtp - selChange;
  const selPrevClose = selectedQuote?.prevClose ?? selLtp - selChange;
  const selVol = selectedQuote?.volume ?? 960280;

  // Day range progress percentage
  const rangeSpan = Math.max(0.1, selHigh - selLow);
  const rangePct = Math.max(0, Math.min(100, ((selLtp - selLow) / rangeSpan) * 100));

  function renderDualTonePrice(price: number, isUp: boolean) {
    const formatted = price.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const parts = formatted.split(".");
    const integerPart = parts[0]!;
    const decimalPart = parts[1]!;
    return (
      <span className="tv-dual-price">
        <span className="tv-price-int">{integerPart}</span>
        <span className={`tv-price-dec ${isUp ? "up" : "down"}`}>.{decimalPart}</span>
      </span>
    );
  }

  function renderSymbolIcon(symbol: string) {
    if (symbol === "NIFTY") return <div className="tv-sym-logo nifty" title="Nifty 50">50</div>;
    if (symbol === "BANKNIFTY") return <div className="tv-sym-logo bank" title="Nifty Bank">🏛</div>;
    if (symbol === "FINNIFTY") return <div className="tv-sym-logo fin" title="Nifty Financial">₹</div>;
    if (symbol === "SENSEX") return <div className="tv-sym-logo bse" title="BSE Sensex">BSE</div>;
    if (symbol === "NIFTY500") return <div className="tv-sym-logo n500" title="Nifty 500">500</div>;
    if (symbol === "RELIANCE") return <div className="tv-sym-logo reliance" title="Reliance Industries">R</div>;
    if (symbol === "TCS") return <div className="tv-sym-logo tcs" title="Tata Consultancy Services">TCS</div>;
    if (symbol === "HDFCBANK") return <div className="tv-sym-logo hdfc" title="HDFC Bank">H</div>;
    if (symbol === "ICICIBANK") return <div className="tv-sym-logo icici" title="ICICI Bank">i</div>;
    if (symbol === "BHARTIARTL") return <div className="tv-sym-logo airtel" title="Bharti Airtel">A</div>;
    if (symbol === "BAJFINANCE") return <div className="tv-sym-logo bajaj" title="Bajaj Finance">B</div>;
    if (symbol === "BTCUSDT") return <div className="tv-sym-logo btc" title="Bitcoin">₿</div>;
    if (symbol === "ETHUSDT") return <div className="tv-sym-logo eth" title="Ethereum">Ξ</div>;
    if (symbol === "SOLUSDT") return <div className="tv-sym-logo sol" title="Solana">◎</div>;
    const letter = symbol.charAt(0);
    return <div className={`tv-sym-logo char ${letter.toLowerCase()}`} title={symbol}>{letter}</div>;
  }

  return (
    <div className={`tv-watchlist ${props.compact ? "compact" : ""}`}>
      {/* 1. Header: Watchlist Name Dropdown & Add Button */}
      {!props.compact && (
        <div className="tv-wl-header">
          <div className="tv-wl-dropdown-wrap">
            <span className="tv-wl-label">Daftar Pantau</span>
            <select
              className="tv-wl-select"
              value={props.activeListId}
              onChange={(e) => props.onSelectList(e.target.value)}
            >
              {props.lists.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.name}
                </option>
              ))}
            </select>
          </div>

          <div className="tv-wl-header-actions">
            <button
              className={`tv-wl-add-toggle-btn ${showAddInput ? "active" : ""}`}
              onClick={() => setShowAddInput(!showAddInput)}
              title="Add Symbol to Watchlist (+)"
            >
              <IconPlus />
            </button>
          </div>
        </div>
      )}

      {/* 2. Add Symbol Search Form */}
      {!props.compact && showAddInput && (
        <form className="tv-wl-search-form" onSubmit={handleAdd}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="7" cy="7" r="4.5" />
            <line x1="10.5" y1="10.5" x2="14" y2="14" />
          </svg>
          <input
            type="text"
            className="tv-wl-search-input"
            placeholder="Add symbol (e.g. RELIANCE)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />
          <button type="submit" className="tv-wl-search-submit">Add</button>
        </form>
      )}

      {/* 3. Table Column Headers */}
      {!props.compact && (
        <div className="tv-wl-table-header">
          <span className="tv-wl-col symbol">Symbol</span>
          <span className="tv-wl-col last">Last</span>
          <span className="tv-wl-col chg">Chg</span>
          <span className="tv-wl-col chgpct">Chg%</span>
        </div>
      )}

      {/* 4. Watchlist Rows with Collapsible Sections */}
      <div className="tv-wl-rows-container">
        {groups.map((group) => {
          const isCollapsed = !!collapsedSections[group.id];
          return (
            <div key={group.id} className="tv-wl-group-section">
              {/* Collapsible Section Header */}
              <div
                className="tv-wl-section-header"
                onClick={() => toggleSection(group.id)}
                title="Click to collapse / expand section"
              >
                <span className="tv-wl-collapse-arrow">
                  {isCollapsed ? <IconChevronRight /> : <IconChevronDown />}
                </span>
                {!props.compact && <span className="tv-wl-section-title">{group.title}</span>}
              </div>

              {/* Section Rows */}
              {!isCollapsed && (
                <div className="tv-wl-section-rows">
                  {group.symbols.map((symbol) => {
                    const q = props.quotes.get(symbol);
                    const ltp = q?.ltp ?? 23355.10;
                    const change = q?.change ?? 84.50;
                    const changePct = q?.changePercent ?? 0.36;
                    const isUp = change >= 0;
                    const isSelected = symbol === props.selectedSymbol;

                    return (
                      <div
                        key={symbol}
                        className={`tv-wl-row ${isSelected ? "selected" : ""} ${props.compact ? "compact" : ""}`}
                        onClick={() => props.onSelectSymbol(symbol)}
                      >
                        {/* Symbol Logo & Ticker with real-time D badge */}
                        <div className="tv-wl-cell symbol">
                          {renderSymbolIcon(symbol)}
                          {!props.compact && (
                            <div className="tv-wl-ticker-info">
                              <span className="tv-wl-ticker">
                                {symbol}
                                <span className="tv-market-d-badge">D</span>
                              </span>
                            </div>
                          )}
                        </div>

                        {!props.compact && (
                          <>
                            {/* Last Price with Dual-Tone Formatting */}
                            <div className="tv-wl-cell last">
                              {renderDualTonePrice(ltp, isUp)}
                            </div>

                            {/* Price Change */}
                            <div className={`tv-wl-cell chg ${isUp ? "up" : "down"}`}>
                              {isUp ? `+${change.toFixed(1)}` : change.toFixed(1)}
                            </div>

                            {/* Change % Badge */}
                            <div className="tv-wl-cell chgpct">
                              <span className={`tv-wl-badge ${isUp ? "up" : "down"}`}>
                                {isUp ? "+" : ""}{changePct.toFixed(2)}%
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 5. Details Pane Matching TradingView Screenshot */}
      <div className={`tv-wl-details-pane ${showDetailsPane ? "expanded" : "collapsed"} ${props.compact ? "compact" : ""}`}>
        {showDetailsPane && (
          <div className="tv-wl-details-body">
            {/* Symbol Header */}
            <div className={`tv-wl-details-header ${props.compact ? "compact" : ""}`}>
              <div className="tv-wl-details-logo">
                {renderSymbolIcon(props.selectedSymbol)}
              </div>
              <div className="tv-wl-details-names">
                <div className="tv-wl-details-full-title">
                  <b>{props.selectedSymbol}</b>
                </div>
                <span className="tv-wl-details-type">
                  {props.selectedSymbol === "NIFTY" ? "Nifty 50 Index ↗ • NSE" : `${props.selectedSymbol} • NSE`}
                </span>
                <span className="tv-wl-details-sub-tag">Index</span>
              </div>
            </div>

            {/* Big Price & Change */}
            <div className={`tv-wl-details-price-row ${props.compact ? "compact" : ""}`}>
              <div className="tv-wl-big-price-container">
                <span className="tv-wl-big-price">{selLtp.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                <span className="tv-wl-point-badge">D POINT</span>
              </div>
              <div className={`tv-wl-big-change-line ${selIsUp ? "up" : "down"}`}>
                {selIsUp ? `+${selChange.toFixed(2)}` : selChange.toFixed(2)} ({selIsUp ? "+" : ""}{selPct.toFixed(2)}%)
              </div>
              <div className="tv-wl-market-status-line">
                <span className="tv-market-open-dot">●</span> Market open
              </div>
            </div>

            {/* News Card Snippet (Matching screenshot) */}
            <div className="tv-wl-news-card">
              <div className="tv-wl-news-header">
                <b>News</b> • <span>3 hours ago</span>
              </div>
              <div className="tv-wl-news-title">
                Nifty Prediction Today – September 18, 2026: Nifty Futures: Resistance ahead
              </div>
              <div className="tv-wl-news-more">More events ›</div>
            </div>

            {/* Performance Period Cards Grid (Matching screenshot) */}
            <div className="tv-wl-performance-section">
              <div className="tv-wl-perf-title">Performance</div>
              <div className="tv-wl-perf-grid">
                <div className="tv-wl-perf-card pos">
                  <span className="perf-val">+0.26%</span>
                  <span className="perf-lbl">1W</span>
                </div>
                <div className="tv-wl-perf-card neg">
                  <span className="perf-val">-3.40%</span>
                  <span className="perf-lbl">1M</span>
                </div>
                <div className="tv-wl-perf-card neg">
                  <span className="perf-val">-2.75%</span>
                  <span className="perf-lbl">3M</span>
                </div>
                <div className="tv-wl-perf-card pos">
                  <span className="perf-val">+0.96%</span>
                  <span className="perf-lbl">6M</span>
                </div>
                <div className="tv-wl-perf-card neg">
                  <span className="perf-val">-10.86%</span>
                  <span className="perf-lbl">YTD</span>
                </div>
                <div className="tv-wl-perf-card neg">
                  <span className="perf-val">-8.29%</span>
                  <span className="perf-lbl">1Y</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
