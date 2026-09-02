import { useRef, useState } from "react";

// 바텀시트를 아래로 드래그하면 닫히는 훅.
// 반환된 handleHandlers는 반드시 "손잡이(drag-handle)"에만 붙이세요.
// 시트 전체에 붙이면 버튼을 탭할 때 손가락이 살짝만 움직여도
// 드래그로 인식되어 onClick이 씹히는 버그가 생깁니다.
export default function useDragToClose(onClose) {
  const sheetRef = useRef(null);
  const startY = useRef(0);
  const dragging = useRef(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [transitionOn, setTransitionOn] = useState(true);

  const onTouchStart = (e) => {
    startY.current = e.touches[0].clientY;
    dragging.current = true;
    setTransitionOn(false);
  };
  const onTouchMove = (e) => {
    if (!dragging.current) return;
    const delta = e.touches[0].clientY - startY.current;
    if (delta > 0) setDragOffset(delta);
  };
  const onTouchEnd = () => {
    dragging.current = false;
    setTransitionOn(true);
    if (dragOffset > 90) {
      setDragOffset(9999);
      setTimeout(() => {
        onClose();
        setDragOffset(0);
      }, 150);
    } else {
      setDragOffset(0);
    }
  };

  const style = {
    transition: transitionOn ? "transform .2s ease" : "none",
    transform: dragOffset > 500 ? "translateY(100%)" : `translateY(${dragOffset}px)`,
  };

  return { sheetRef, style, handleHandlers: { onTouchStart, onTouchMove, onTouchEnd } };
}
