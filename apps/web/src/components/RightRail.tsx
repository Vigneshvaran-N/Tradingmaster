import React from "react";

export type RightRailTab = "watchlist" | "alerts" | "news" | "datawindow" | "hotlist" | "orders" | "objecttree" | null;

export interface RightRailProps {
  activeTab: RightRailTab;
  onSelectTab: (tab: RightRailTab) => void;
}

export function RightRail(props: RightRailProps) {
  function handleTabClick(tab: RightRailTab) {
    props.onSelectTab(props.activeTab === tab ? null : tab);
  }

  return (
    <aside className="tv-right-rail">
      {/* 1. Watchlist and Details (Bookmark Document) */}
      <button
        className={`tv-rail-btn ${props.activeTab === "watchlist" ? "active" : ""}`}
        title="Watchlist and Details (Alt+W)"
        onClick={() => handleTabClick("watchlist")}
      >
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <rect x="4" y="3" width="14" height="16" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M4 3H18V19L11 14.5L4 19V3Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
      </button>

      {/* 2. Alerts Manager (Clock) */}
      <button
        className={`tv-rail-btn ${props.activeTab === "alerts" ? "active" : ""}`}
        title="Alerts Manager"
        onClick={() => handleTabClick("alerts")}
      >
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.5" />
          <polyline points="11 6 11 11 14.5 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      {/* 3. Object Tree & Layers (3 Stacked Isometric Diamonds) */}
      <button
        className={`tv-rail-btn ${props.activeTab === "objecttree" ? "active" : ""}`}
        title="Object Tree & Drawings Layer Manager"
        onClick={() => handleTabClick("objecttree")}
      >
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M11 2.5L19.5 7L11 11.5L2.5 7L11 2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M2.5 11.5L11 16L19.5 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M2.5 15.5L11 19.5L19.5 15.5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      </button>

      {/* 4. Hotlists / Screener (Target Wheel) */}
      <button
        className={`tv-rail-btn ${props.activeTab === "hotlist" ? "active" : ""}`}
        title="Hotlists (Top Gainers & Losers)"
        onClick={() => handleTabClick("hotlist")}
      >
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="11" cy="11" r="4" stroke="currentColor" strokeWidth="1.5" />
          <line x1="11" y1="2" x2="11" y2="4" stroke="currentColor" strokeWidth="1.5" />
          <line x1="11" y1="18" x2="11" y2="20" stroke="currentColor" strokeWidth="1.5" />
          <line x1="2" y1="11" x2="4" y2="11" stroke="currentColor" strokeWidth="1.5" />
          <line x1="18" y1="11" x2="20" y2="11" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>

      {/* 5. Calendar */}
      <button
        className={`tv-rail-btn ${props.activeTab === "news" ? "active" : ""}`}
        title="Economic Calendar & News"
        onClick={() => handleTabClick("news")}
      >
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <rect x="3" y="4.5" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <line x1="3" y1="8.5" x2="19" y2="8.5" stroke="currentColor" strokeWidth="1.5" />
          <line x1="7" y1="2.5" x2="7" y2="5" stroke="currentColor" strokeWidth="1.5" />
          <line x1="15" y1="2.5" x2="15" y2="5" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="7.5" cy="12" r="1" fill="currentColor" />
          <circle cx="11" cy="12" r="1" fill="currentColor" />
          <circle cx="14.5" cy="12" r="1" fill="currentColor" />
          <circle cx="7.5" cy="15.5" r="1" fill="currentColor" />
          <circle cx="11" cy="15.5" r="1" fill="currentColor" />
        </svg>
      </button>

      {/* 6. Notifications (Bell) */}
      <button
        className="tv-rail-btn"
        title="Notifications"
        onClick={() => alert("No new notifications")}
      >
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M11 3C7.5 3 5 5.5 5 9.5V13.5L3 15.5H19L17 13.5V9.5C17 5.5 14.5 3 11 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M9 18.5C9.5 19.5 10.2 20 11 20C11.8 20 12.5 19.5 13 18.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      {/* 7. Chat / Messages */}
      <button
        className="tv-rail-btn"
        title="Public Chat & Streams"
        onClick={() => alert("TradingMaster Community Chat")}
      >
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M4 5.5C4 4.12 5.12 3 6.5 3H15.5C16.88 3 18 4.12 18 5.5V12.5C18 13.88 16.88 15 15.5 15H9L5 18.5V15H4V5.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      </button>

      {/* 8. App Launcher (9-Dot Grid) */}
      <button
        className="tv-rail-btn"
        title="App Launcher & Extras"
        onClick={() => alert("TradingMaster App Tools")}
      >
        <svg width="22" height="22" viewBox="0 0 22 22" fill="currentColor">
          <circle cx="5" cy="5" r="1.8" />
          <circle cx="11" cy="5" r="1.8" />
          <circle cx="17" cy="5" r="1.8" />
          <circle cx="5" cy="11" r="1.8" />
          <circle cx="11" cy="11" r="1.8" />
          <circle cx="17" cy="11" r="1.8" />
          <circle cx="5" cy="17" r="1.8" />
          <circle cx="11" cy="17" r="1.8" />
          <circle cx="17" cy="17" r="1.8" />
        </svg>
      </button>
    </aside>
  );
}
