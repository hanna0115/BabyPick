export default function MenuList({ safeMenus, onSelect }) {
  return (
    <>
      <div className="results-head">
        <h2>🍚 안심 메뉴</h2>
        <span className="count-badge">{safeMenus.length}개</span>
      </div>

      <div className="cards">
        {safeMenus.length === 0 ? (
          <div className="empty-state" style={{ gridColumn: "1/-1" }}>
            <div className="big-emoji">🍲</div>
            <p><span className="hand">앗,</span> 선택한 재료를 뺀 메뉴가 없어요</p>
            <p>필터를 조금 줄여볼까요?</p>
          </div>
        ) : (
          safeMenus.map((d) => (
            <div className="card" key={d.name} onClick={() => onSelect(d)}>
              <div className="card-top">
                <span className="stage-badge">{d.stage}</span>
              </div>
              <div className="card-name">{d.name}</div>
              <div className="ing-tags">
                {d.ingredients.map((i) => <span className="ing-tag" key={i}>{i}</span>)}
              </div>
              {d.allergy ? (
                <div className="allergy-line">⚠ 알레르기 주의: {d.allergy}</div>
              ) : (
                <div className="allergy-line none">알레르기 유발 재료 없음</div>
              )}
              <div className="volume-line">{d.volume}ml</div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
