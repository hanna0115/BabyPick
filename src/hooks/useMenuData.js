import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient.js";

// Supabase에서 브랜드/제품/재료/알레르기를 가져와
// 기존 컴포넌트들이 쓰던 것과 같은 모양(DATA, CATEGORY_MAP, BRANDS)으로 조립합니다.
// → App.jsx 이하 컴포넌트는 거의 그대로 두고 데이터 출처만 바꿀 수 있어요.
export default function useMenuData(brandSlug) {
  const [state, setState] = useState({ loading: true, error: null, data: [], categoryMap: {}, brands: [] });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setState((s) => ({ ...s, loading: true, error: null }));

      const [{ data: brands, error: brandsErr }, { data: ingredients, error: ingErr }] = await Promise.all([
        supabase.from("brands").select("id, name, slug, status").order("name"),
        supabase.from("ingredients").select("id, name, category"),
      ]);
      if (brandsErr || ingErr) {
        if (!cancelled) setState((s) => ({ ...s, loading: false, error: brandsErr || ingErr }));
        return;
      }

      const categoryMap = {};
      ingredients.forEach((i) => { categoryMap[i.name] = i.category; });

      const brand = brands.find((b) => b.slug === brandSlug);
      if (!brand) {
        if (!cancelled) setState({ loading: false, error: null, data: [], categoryMap, brands });
        return;
      }

      const { data: products, error: prodErr } = await supabase
        .from("products")
        .select(`
          id, name, stage, volume_ml, raw_ingredients_text, product_link,
          serving_label, kcal, sodium_mg, carbs_g, sugar_g, fat_g, trans_fat_g, sat_fat_g, cholesterol_mg, protein_g,
          product_ingredients ( sort_order, ingredients ( name ) ),
          product_allergens ( allergens ( name ) )
        `)
        .eq("brand_id", brand.id)
        .eq("review_status", "published");

      if (prodErr) {
        if (!cancelled) setState((s) => ({ ...s, loading: false, error: prodErr }));
        return;
      }

      const shaped = products.map((p) => ({
        name: p.name,
        stage: p.stage,
        volume: p.volume_ml != null ? String(p.volume_ml) : "",
        allergy: (p.product_allergens || []).map((pa) => pa.allergens.name).join(", "),
        ingredients: (p.product_ingredients || [])
          .sort((a, b) => a.sort_order - b.sort_order)
          .map((pi) => pi.ingredients.name),
        rawIngredients: p.raw_ingredients_text || undefined,
        link: p.product_link || undefined,
        nutrition: p.kcal == null ? undefined : {
          serving: p.serving_label,
          kcal: p.kcal,
          sodium: p.sodium_mg,
          carbs: p.carbs_g,
          sugar: p.sugar_g,
          fat: p.fat_g,
          transFat: p.trans_fat_g,
          satFat: p.sat_fat_g,
          cholesterol: p.cholesterol_mg,
          protein: p.protein_g,
        },
      }));

      if (!cancelled) setState({ loading: false, error: null, data: shaped, categoryMap, brands });
    }

    load();
    return () => { cancelled = true; };
  }, [brandSlug]);

  return state;
}
