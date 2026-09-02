import { useEffect, useMemo, useState } from "react";
import useMenuData from "./hooks/useMenuData.js";
import Header from "./components/Header.jsx";
import BrandSheet from "./components/BrandSheet.jsx";
import IngredientPanel from "./components/IngredientPanel.jsx";
import MenuList from "./components/MenuList.jsx";
import DetailModal from "./components/DetailModal.jsx";

const BRAND_SLUGS = [
  { id: "elvinz", name: "엘빈즈" },
  { id: "lusol", name: "루솔" },
  { id: "nampyeong", name: "베이비본죽" },
];

export default function App() {
  const [currentBrand, setCurrentBrand] = useState("elvinz");
  const { loading, error, data: DATA, categoryMap, brands: dbBrands } = useMenuData(currentBrand);

  // DB에 아직 없는 브랜드도 "준비중"으로 보여주기 위해 하드코딩 목록과 합침
  const brands = useMemo(() => {
    return BRAND_SLUGS.map((b) => {
      const dbBrand = dbBrands.find((x) => x.slug === b.id);
      return { id: b.id, name: dbBrand?.name || b.name, ready: dbBrand?.status === "active" };
    });
  }, [dbBrands]);

  const allIngredientsBase = useMemo(() => {
    const freq = {};
    DATA.forEach((d) => d.ingredients.forEach((i) => { freq[i] = (freq[i] || 0) + 1; }));
    return Object.keys(freq).sort((a, b) => freq[b] - freq[a]);
  }, [DATA]);

  // 재료 상태: 'none' | 'exclude' | 'include'
  const [ingState, setIngState] = useState({});

  // 브랜드가 바뀌거나 재료 목록이 새로 로드되면, 새로 등장한 재료를 'none' 상태로 채워 넣는다
  useEffect(() => {
    if (!allIngredientsBase.length) return;
    setIngState((prev) => {
      const next = { ...prev };
      let changed = false;
      allIngredientsBase.forEach((i) => {
        if (!(i in next)) { next[i] = "none"; changed = true; }
      });
      return changed ? next : prev;
    });
  }, [allIngredientsBase]);

  const [openCategories, setOpenCategories] = useState(new Set(["채소"]));
  const [searchQuery, setSearchQuery] = useState("");
  const [modalItem, setModalItem] = useState(null);
  const [brandSheetOpen, setBrandSheetOpen] = useState(false);

  const cycleIngredient = (ing) => {
    setIngState((prev) => {
      const cur = prev[ing] || "none";
      const next = cur === "none" ? "exclude" : cur === "exclude" ? "include" : "none";
      return { ...prev, [ing]: next };
    });
  };

  const clearAll = () => {
    setIngState((prev) => {
      const next = {};
      Object.keys(prev).forEach((k) => { next[k] = "none"; });
      return next;
    });
  };

  const excludedList = useMemo(
    () => allIngredientsBase.filter((i) => ingState[i] === "exclude"),
    [allIngredientsBase, ingState]
  );
  const includedList = useMemo(
    () => allIngredientsBase.filter((i) => ingState[i] === "include"),
    [allIngredientsBase, ingState]
  );

  const byCategory = useMemo(() => {
    const map = {};
    allIngredientsBase.forEach((ing) => {
      const c = categoryMap[ing] || "기타";
      if (!map[c]) map[c] = [];
      map[c].push(ing);
    });
    return map;
  }, [allIngredientsBase, categoryMap]);

  const searchMatches = useMemo(() => {
    const q = searchQuery.trim();
    if (!q) return null;
    return allIngredientsBase.filter((i) => i.includes(q));
  }, [searchQuery, allIngredientsBase]);

  const safeMenus = useMemo(() => {
    const withInfo = DATA.filter((d) => d.ingredients.length > 0);
    return withInfo.filter((d) => {
      const hasExcluded = d.ingredients.some((i) => excludedList.includes(i));
      const missingRequired = includedList.some((req) => !d.ingredients.includes(req));
      return !hasExcluded && !missingRequired;
    });
  }, [DATA, excludedList, includedList]);

  const toggleCategory = (cat) => {
    setOpenCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  };

  return (
    <div className="app-bg">
      <div className="wrap">
        <Header />

        <BrandSheet
          brands={brands}
          currentBrand={currentBrand}
          onSelect={setCurrentBrand}
          open={brandSheetOpen}
          onOpen={() => setBrandSheetOpen(true)}
          onClose={() => setBrandSheetOpen(false)}
        />

        {error && (
          <p style={{ color: "var(--danger)", fontSize: 13, marginBottom: 12 }}>
            데이터를 불러오지 못했어요: {error.message}
          </p>
        )}

        {loading ? (
          <p style={{ fontSize: 13, color: "var(--ink-soft)" }}>불러오는 중...</p>
        ) : (
          <>
            <IngredientPanel
              ingState={ingState}
              cycleIngredient={cycleIngredient}
              clearAll={clearAll}
              byCategory={byCategory}
              openCategories={openCategories}
              toggleCategory={toggleCategory}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              searchMatches={searchMatches}
              excludedList={excludedList}
              includedList={includedList}
              onClearExcluded={() =>
                setIngState((prev) => {
                  const next = { ...prev };
                  excludedList.forEach((i) => { next[i] = "none"; });
                  return next;
                })
              }
              onClearIncluded={() =>
                setIngState((prev) => {
                  const next = { ...prev };
                  includedList.forEach((i) => { next[i] = "none"; });
                  return next;
                })
              }
            />

            <MenuList safeMenus={safeMenus} onSelect={setModalItem} />
          </>
        )}

        <p className="footnote">
          데이터는 Supabase에서 실시간으로 불러와요 · 메뉴 카드를 누르면 상세정보를 볼 수 있어요
        </p>
      </div>

      <DetailModal item={modalItem} onClose={() => setModalItem(null)} />
    </div>
  );
}
