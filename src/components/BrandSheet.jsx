import useDragToClose from "../hooks/useDragToClose.js";

// 브랜드 선택 버튼 + 바텀시트를 한 컴포넌트에서 관리합니다.
export default function BrandSheet({ brands, currentBrand, onSelect, open, onOpen, onClose }) {
  const drag = useDragToClose(onClose);
  const brandLabel = brands.find((b) => b.id === currentBrand)?.name || "브랜드 선택";

  return (
    <>
      <button className="brand-select-btn" onClick={onOpen}>
        🏷️ <span>{brandLabel}</span> <span className="arrow">▾</span>
      </button>

      {open && (
        <div className="modal-overlay show" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
          <div className="modal-sheet" ref={drag.sheetRef} style={drag.style}>
            <div className="sheet-sticky-header">
              <div className="drag-handle" {...drag.handleHandlers} />
              <button className="modal-close" onClick={onClose}>✕</button>
            </div>
            <h2 style={{ marginBottom: 14 }}>브랜드 선택</h2>
            <div className="brand-list">
              {brands.map((b) => (
                <button
                  key={b.id}
                  className={"brand-list-item" + (b.id === currentBrand ? " active" : "") + (!b.ready ? " soon" : "")}
                  onClick={() => {
                    if (!b.ready) return;
                    onSelect(b.id);
                    onClose();
                  }}
                >
                  <span>{b.name}</span>
                  {b.id === currentBrand ? (
                    <span className="check">✓</span>
                  ) : !b.ready ? (
                    <span className="tag">준비중</span>
                  ) : null}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
