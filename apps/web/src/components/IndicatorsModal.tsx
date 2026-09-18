import { useState } from "react";
import { IndicatorType } from "@trading-master/indicators";
import { INDICATOR_CATALOG } from "../indicatorCatalog";
import { ActiveIndicator } from "../types";

export interface IndicatorsModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeIndicators: ActiveIndicator[];
  onAddIndicator: (type: IndicatorType) => void;
  onRemoveIndicator: (id: string) => void;
}

type SidebarTab =
  | "my_scripts"
  | "purchased"
  | "technicals"
  | "fundamentals"
  | "editors_picks"
  | "top"
  | "trending"
  | "marketplace";

type FilterPill = "indicators" | "strategies" | "profiles" | "patterns" | "options";

export function IndicatorsModal(props: IndicatorsModalProps) {
  const [search, setSearch] = useState("");
  const [activeSidebarTab, setActiveSidebarTab] = useState<SidebarTab>("technicals");
  const [activeFilterPill, setActiveFilterPill] = useState<FilterPill>("indicators");

  if (!props.isOpen) return null;

  const filtered = INDICATOR_CATALOG.filter((item) => {
    const matchesSearch =
      item.label.toLowerCase().includes(search.toLowerCase()) ||
      item.type.toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch) return false;

    if (activeFilterPill === "strategies") return item.category === "Strategies";
    if (activeFilterPill === "profiles") return item.category === "Profiles";
    if (activeFilterPill === "patterns") return item.category === "Patterns";

    if (activeSidebarTab === "fundamentals") return item.category === "Fundamentals";
    if (activeSidebarTab === "my_scripts" || activeSidebarTab === "purchased") return false;

    return true;
  });

  return (
    <div className="tv-modal-backdrop" onClick={props.onClose}>
      <div className="tv-modal-content tv-indicators-modal-main" onClick={(e) => e.stopPropagation()}>
        {/* Header Title & Close Button */}
        <div className="tv-ind-modal-top-header">
          <h2 className="tv-ind-modal-title">Indicators, metrics, and strategies</h2>
          <button className="tv-modal-close-btn" onClick={props.onClose} title="Close (Esc)">
            ✕
          </button>
        </div>

        {/* Full-width Search Input */}
        <div className="tv-ind-search-wrapper">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" className="tv-ind-search-icon">
            <circle cx="8" cy="8" r="5" />
            <line x1="12" y1="12" x2="16" y2="16" />
          </svg>
          <input
            type="text"
            className="tv-ind-search-input"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />
        </div>

        {/* 2-Column Body Content */}
        <div className="tv-ind-modal-body">
          {/* Left Sidebar Navigation */}
          <div className="tv-ind-sidebar-nav">
            {/* Section 1: PERSONAL */}
            <div className="tv-ind-sidebar-section">
              <span className="tv-ind-sidebar-section-title">PERSONAL</span>
              <button
                className={`tv-ind-sidebar-item ${activeSidebarTab === "my_scripts" ? "active" : ""}`}
                onClick={() => setActiveSidebarTab("my_scripts")}
              >
                <span className="tv-ind-sidebar-icon">👤</span>
                <span>My scripts</span>
              </button>
              <button
                className={`tv-ind-sidebar-item ${activeSidebarTab === "purchased" ? "active" : ""}`}
                onClick={() => setActiveSidebarTab("purchased")}
              >
                <span className="tv-ind-sidebar-icon">👛</span>
                <span>Purchased</span>
              </button>
            </div>

            {/* Section 2: BUILT-IN */}
            <div className="tv-ind-sidebar-section">
              <span className="tv-ind-sidebar-section-title">BUILT-IN</span>
              <button
                className={`tv-ind-sidebar-item ${activeSidebarTab === "technicals" ? "active" : ""}`}
                onClick={() => setActiveSidebarTab("technicals")}
              >
                <span className="tv-ind-sidebar-icon">📈</span>
                <span>Technicals</span>
              </button>
              <button
                className={`tv-ind-sidebar-item ${activeSidebarTab === "fundamentals" ? "active" : ""}`}
                onClick={() => setActiveSidebarTab("fundamentals")}
              >
                <span className="tv-ind-sidebar-icon">📊</span>
                <span>Fundamentals</span>
              </button>
            </div>

            {/* Section 3: COMMUNITY */}
            <div className="tv-ind-sidebar-section">
              <span className="tv-ind-sidebar-section-title">COMMUNITY</span>
              <button
                className={`tv-ind-sidebar-item ${activeSidebarTab === "editors_picks" ? "active" : ""}`}
                onClick={() => setActiveSidebarTab("editors_picks")}
              >
                <span className="tv-ind-sidebar-icon">🏷️</span>
                <span>Editors' picks</span>
              </button>
              <button
                className={`tv-ind-sidebar-item ${activeSidebarTab === "top" ? "active" : ""}`}
                onClick={() => setActiveSidebarTab("top")}
              >
                <span className="tv-ind-sidebar-icon">📊</span>
                <span>Top</span>
              </button>
              <button
                className={`tv-ind-sidebar-item ${activeSidebarTab === "trending" ? "active" : ""}`}
                onClick={() => setActiveSidebarTab("trending")}
              >
                <span className="tv-ind-sidebar-icon">🔥</span>
                <span>Trending</span>
              </button>
              <button
                className={`tv-ind-sidebar-item ${activeSidebarTab === "marketplace" ? "active" : ""}`}
                onClick={() => setActiveSidebarTab("marketplace")}
              >
                <span className="tv-ind-sidebar-icon">🛍️</span>
                <span>Marketplace</span>
              </button>
            </div>
          </div>

          {/* Right Main Script Area */}
          <div className="tv-ind-main-area">
            {/* Top Filter Pills Header */}
            <div className="tv-ind-filter-pills-bar">
              <button
                className={`tv-ind-filter-pill ${activeFilterPill === "indicators" ? "active" : ""}`}
                onClick={() => setActiveFilterPill("indicators")}
              >
                Indicators
              </button>
              <button
                className={`tv-ind-filter-pill ${activeFilterPill === "strategies" ? "active" : ""}`}
                onClick={() => setActiveFilterPill("strategies")}
              >
                Strategies
              </button>
              <button
                className={`tv-ind-filter-pill ${activeFilterPill === "profiles" ? "active" : ""}`}
                onClick={() => setActiveFilterPill("profiles")}
              >
                Profiles
              </button>
              <button
                className={`tv-ind-filter-pill ${activeFilterPill === "patterns" ? "active" : ""}`}
                onClick={() => setActiveFilterPill("patterns")}
              >
                Patterns
              </button>
              <button
                className={`tv-ind-filter-pill ${activeFilterPill === "options" ? "active" : ""}`}
                onClick={() => setActiveFilterPill("options")}
              >
                Options
              </button>
            </div>

            {/* Script Table Header */}
            <div className="tv-ind-table-header">
              <span>SCRIPT NAME</span>
            </div>

            {/* Script Items List */}
            <div className="tv-ind-script-list">
              {filtered.length === 0 ? (
                <div className="tv-ind-empty-state">No matching scripts or metrics found.</div>
              ) : (
                filtered.map((item) => {
                  const active = props.activeIndicators.find((a) => a.type === item.type);
                  return (
                    <div
                      key={item.type}
                      className={`tv-ind-script-row ${active ? "active-added" : ""}`}
                      onClick={() => {
                        if (active) props.onRemoveIndicator(active.id);
                        else props.onAddIndicator(item.type);
                      }}
                    >
                      <div className="tv-ind-script-title-group">
                        <span className="tv-ind-script-name">{item.label}</span>
                        {item.badge && <span className="tv-ind-beta-badge">{item.badge}</span>}
                      </div>

                      <div className="tv-ind-script-actions">
                        <span className="tv-ind-script-pane">{item.pane === "overlay" ? "Main" : "Pane"}</span>
                        <button
                          className={`tv-ind-toggle-btn ${active ? "active" : ""}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (active) props.onRemoveIndicator(active.id);
                            else props.onAddIndicator(item.type);
                          }}
                        >
                          {active ? "✓ Added" : "+ Add"}
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
