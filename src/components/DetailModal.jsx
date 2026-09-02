import useDragToClose from "../hooks/useDragToClose.js";

export default function DetailModal({ item, onClose }) {
  const drag = useDragToClose(onClose);
  if (!item) return null;

  return (
    <div className="modal-overlay show" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-sheet" ref={drag.sheetRef} style={drag.style}>
        <div className="sheet-sticky-header">
          <div className="drag-handle" {...drag.handleHandlers} />
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <h2>{item.name}</h2>
        <div className="modal-badges">
          <span className="stage-badge">{item.stage}</span>
          <span className="stage-badge">{item.volume}ml</span>
        </div>

        <div className="modal-section">
          <h4>🥗 재료</h4>
          <div className="modal-tags">
            {item.ingredients.length ? (
              item.ingredients.map((i) => <span className="ing-tag" key={i}>{i}</span>)
            ) : (
              <p className="placeholder">재료 정보 준비중</p>
            )}
          </div>
          {item.rawIngredients && (
            <div className="raw-ing-box">
              <span className="raw-label">원재료 함량 전체</span>
              {item.rawIngredients}
            </div>
          )}
        </div>

        <div className="modal-section">
          <h4>⚠️ 알레르기 주의</h4>
          <p className={item.allergy ? "" : "placeholder"}>{item.allergy || "해당 없음"}</p>
        </div>

        <div className="modal-section">
          <h4>📊 영양정보</h4>
          {item.nutrition ? (
            <>
              <div className="nutri-kcal">
                <span className="num">{item.nutrition.kcal}</span>
                <span className="unit">Kcal</span>
                <span className="serving">{item.nutrition.serving} 기준</span>
              </div>
              <div className="nutri-grid">
                <div className="nutri-item"><span className="label">나트륨</span><span className="value">{item.nutrition.sodium}</span></div>
                <div className="nutri-item"><span className="label">탄수화물</span><span className="value">{item.nutrition.carbs}</span></div>
                <div className="nutri-item"><span className="label">당류</span><span className="value">{item.nutrition.sugar}</span></div>
                <div className="nutri-item"><span className="label">지방</span><span className="value">{item.nutrition.fat}</span></div>
                <div className="nutri-item"><span className="label">단백질</span><span className="value">{item.nutrition.protein}</span></div>
                <div className="nutri-item"><span className="label">콜레스테롤</span><span className="value">{item.nutrition.cholesterol}</span></div>
              </div>
            </>
          ) : (
            <p className="placeholder">정보 준비중 · 제조사 페이지 데이터 연동 예정</p>
          )}
        </div>

        <div className="modal-section">
          <h4>🔗 구매 링크</h4>
          {item.link ? (
            <p>
              <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ color: "var(--sage-dark)", fontWeight: 700 }}>
                제품 페이지 보러가기 →
              </a>
            </p>
          ) : (
            <p className="placeholder">정보 준비중</p>
          )}
        </div>
      </div>
    </div>
  );
}
