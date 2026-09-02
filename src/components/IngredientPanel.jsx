import { CATEGORY_ORDER } from "../data/menuData.js";

function Chip({ ing, state, onToggle }) {
  const cls = "chip" + (state === "exclude" ? " active" : "") + (state === "include" ? " include" : "");
  return (
    <button type="button" className={cls} onClick={() => onToggle(ing)}>
      {ing}
    </button>
  );
}

export default function IngredientPanel({
  ingState,
  cycleIngredient,
  clearAll,
  byCategory,
  openCategories,
  toggleCategory,
  searchQuery,
  setSearchQuery,
  searchMatches,
  excludedList,
  includedList,
  onClearExcluded,
  onClearIncluded,
}) {
  return (
    <div className="panel">
      <div className="panel-title">
        <h2>🥕 재료 필터</h2>
        <button className="clear-btn" onClick={clearAll}>전체 해제</button>
      </div>

      <div className="hint-banner">
        <p className="hint-title">💡 재료를 탭하면 순서대로 바뀌어요</p>
        <div className="hint-legend">
          <span className="legend-chip neutral">재료</span>
          <span className="legend-arrow">→</span>
          <span className="legend-chip ex">❌ 빼기</span>
          <span className="legend-arrow">→</span>
          <span className="legend-chip inc">✅ 꼭 넣기</span>
        </div>
      </div>

      <div className="search-box">
        <span>🔍</span>
        <input
          type="text"
          placeholder="재료 이름으로 검색 (예: 양파)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className={"search-clear" + (searchQuery ? " show" : "")}
          onClick={() => setSearchQuery("")}
        >
          ✕
        </button>
      </div>

      {(excludedList.length > 0 || includedList.length > 0) && (
        <div className="summary-bar">
          {excludedList.length > 0 && (
            <span className="summary-pill ex" onClick={onClearExcluded}>
              빼기: {excludedList.join(", ")} <span className="x">전체 해제 ✕</span>
            </span>
          )}
          {includedList.length > 0 && (
            <span className="summary-pill inc" onClick={onClearIncluded}>
              꼭 넣기: {includedList.join(", ")} <span className="x">전체 해제 ✕</span>
            </span>
          )}
        </div>
      )}

      {searchMatches ? (
        <div className="chip-grid" style={{ marginBottom: 4 }}>
          {searchMatches.length === 0 ? (
            <span style={{ fontSize: 12.5, color: "var(--ink-soft)" }}>검색 결과가 없어요</span>
          ) : (
            searchMatches.map((ing) => (
              <Chip key={ing} ing={ing} state={ingState[ing]} onToggle={cycleIngredient} />
            ))
          )}
        </div>
      ) : (
        <div>
          {CATEGORY_ORDER.filter((cat) => byCategory[cat]?.length).map((cat) => (
            <div key={cat} className={"category" + (openCategories.has(cat) ? " open" : "")}>
              <div className="category-head" onClick={() => toggleCategory(cat)}>
                <h3>
                  {cat}
                  <span className="category-count">({byCategory[cat].length})</span>
                </h3>
                <span className="arrow">▾</span>
              </div>
              <div className="category-body">
                {byCategory[cat].map((ing) => (
                  <Chip key={ing} ing={ing} state={ingState[ing]} onToggle={cycleIngredient} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
