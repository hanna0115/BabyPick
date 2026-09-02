// 메뉴 데이터 + 재료 카테고리 매핑
// 새 재료가 추가되어도 CATEGORY_MAP에 없으면 자동으로 '기타'로 분류됩니다.

export const DATA = [
  { name: "한우무죽", stage: "중기1", volume: "180", allergy: "소고기", ingredients: ["무", "소고기", "쌀", "양파", "찹쌀", "청경채"] },
  { name: "한우듬뿍브로콜리죽", stage: "중기1", volume: "180", allergy: "소고기", ingredients: ["무", "브로콜리", "소고기", "쌀", "양파", "찹쌀"] },
  { name: "한우듬뿍양배추죽", stage: "중기2", volume: "180", allergy: "소고기", ingredients: ["무", "소고기", "쌀", "양배추", "양파", "찹쌀"] },
  { name: "한우듬뿍밤죽", stage: "중기1", volume: "180", allergy: "소고기", ingredients: ["무", "밤", "소고기", "쌀", "양파", "찹쌀"] },
  { name: "한우듬뿍아욱죽", stage: "중기2", volume: "180", allergy: "소고기", ingredients: ["무", "소고기", "쌀", "아욱", "양파", "찹쌀"] },
  { name: "한우듬뿍사과죽", stage: "중기2", volume: "180", allergy: "소고기", ingredients: ["무", "사과퓨레", "소고기", "쌀", "양파", "찹쌀"] },
  { name: "닭살고구마죽", stage: "중기2", volume: "180", allergy: "닭고기", ingredients: ["고구마", "닭고기", "당근", "쌀", "찹쌀"] },
  { name: "한우두부브로콜리죽", stage: "중기2", volume: "180", allergy: "대두, 소고기", ingredients: ["두부", "무", "브로콜리", "소고기", "쌀", "양파", "참깨가루", "청경채"] },
  { name: "한우블루베리죽", stage: "중기2", volume: "180", allergy: "소고기", ingredients: ["감자", "단호박", "무", "블루베리농축액", "소고기", "쌀", "양파", "오이", "찹쌀"] },
  {
    name: "흑미영양죽", stage: "중기2", volume: "180", allergy: "",
    ingredients: ["고구마", "단호박", "쌀", "조", "흑미분말"],
    rawIngredients: "정제수, 단호박(국산), 고구마(국산), 유기농쌀(국산) 7.49%, 단호박수[정제수, 단호박(국산)], 흑미분말[흑미(국산)100%] 4.49%, 조(국산)",
    nutrition: { serving: "1팩(180g)", kcal: 150, sodium: "21mg (6%)", carbs: "33g (37%)", sugar: "8g", fat: "0.7g (3%)", transFat: "0g", satFat: "0g", cholesterol: "0mg", protein: "3g (20%)" },
    link: "https://alvins.co.kr/product/%ED%9D%91%EB%AF%B8%EC%98%81%EC%96%91%EC%A3%BD-%EC%A4%91%EA%B8%B02/6791/category/32/display/1/",
  },
  { name: "배사과한우죽", stage: "중기2", volume: "180", allergy: "소고기", ingredients: ["단호박", "무", "배퓨레", "사과퓨레", "소고기", "양파"] },
  { name: "한우새송이죽", stage: "중기2", volume: "180", allergy: "소고기", ingredients: ["당근", "무", "배추", "새송이버섯", "소고기", "쌀", "양파", "찹쌀", "청경채"] },
  { name: "감자미음", stage: "초기1", volume: "140", allergy: "", ingredients: ["감자", "쌀"] },
  { name: "고구마미음", stage: "초기1", volume: "140", allergy: "", ingredients: ["고구마", "쌀"] },
  { name: "브로콜리미음", stage: "초기1", volume: "140", allergy: "", ingredients: ["브로콜리", "쌀"] },
  { name: "양배추미음", stage: "초기1", volume: "140", allergy: "", ingredients: ["쌀", "양배추"] },
  { name: "사과미음", stage: "초기1", volume: "140", allergy: "", ingredients: ["사과퓨레", "쌀", "찹쌀"] },
  { name: "배미음", stage: "초기1", volume: "140", allergy: "", ingredients: ["배퓨레", "쌀", "찹쌀"] },
  { name: "단호박미음", stage: "초기1", volume: "140", allergy: "", ingredients: ["단호박", "쌀"] },
  { name: "초유쌀미음", stage: "초기1", volume: "140", allergy: "우유", ingredients: ["쌀", "초유분말"] },
  { name: "한우양배추묽은죽", stage: "초기2", volume: "160", allergy: "소고기", ingredients: ["무", "소고기", "쌀", "양배추", "양파", "찹쌀"] },
  { name: "감자시금치묽은죽", stage: "초기2", volume: "160", allergy: "", ingredients: ["감자", "시금치", "쌀", "찹쌀"] },
  { name: "닭가슴살비트묽은죽", stage: "초기2", volume: "160", allergy: "닭고기", ingredients: ["닭고기", "당근", "비타민채", "비트", "쌀", "찹쌀"] },
  { name: "바나나단호박묽은죽", stage: "초기2", volume: "160", allergy: "", ingredients: ["단호박", "바나나퓨레", "쌀", "찹쌀"] },
  { name: "한우무묽은죽", stage: "초기2", volume: "160", allergy: "소고기", ingredients: ["무", "소고기", "쌀", "양파", "찹쌀", "청경채"] },
  { name: "닭가슴살브로콜리묽은죽", stage: "초기2", volume: "160", allergy: "닭고기", ingredients: ["닭고기", "브로콜리", "쌀", "애호박", "찹쌀"] },
  { name: "아보카도당근묽은죽", stage: "초기2", volume: "160", allergy: "", ingredients: ["당근", "배퓨레", "쌀", "아보카도", "찹쌀"] },
  { name: "한우사과묽은죽", stage: "초기2", volume: "160", allergy: "소고기", ingredients: ["무", "사과퓨레", "소고기", "쌀", "양파", "오이", "찹쌀"] },
  { name: "콜리플라워고구마묽은죽", stage: "초기2", volume: "160", allergy: "", ingredients: ["고구마", "단호박", "쌀", "찹쌀", "콜리플라워"] },
  { name: "한우애호박죽", stage: "중기1", volume: "180", allergy: "소고기", ingredients: ["무", "소고기", "쌀", "애호박", "양파", "찹쌀"] },
  { name: "한우감자죽", stage: "중기1", volume: "180", allergy: "소고기", ingredients: ["감자", "무", "소고기", "쌀", "양파", "찹쌀"] },
  { name: "닭가슴살바나나죽", stage: "중기1", volume: "180", allergy: "닭고기", ingredients: ["닭고기", "바나나퓨레", "브로콜리", "비타민채", "사과퓨레", "쌀", "찹쌀"] },
  { name: "한우곤드레죽", stage: "중기1", volume: "180", allergy: "소고기", ingredients: ["곤드레", "느타리버섯", "당근", "무", "소고기", "쌀", "양파", "찹쌀"] },
  { name: "고구마닭가슴살사과죽", stage: "중기1", volume: "180", allergy: "닭고기", ingredients: ["고구마", "닭고기", "당근", "브로콜리", "사과퓨레", "쌀", "찹쌀"] },
  { name: "닭가슴살비타민채죽", stage: "중기1", volume: "180", allergy: "닭고기", ingredients: ["닭고기", "비타민채", "비트", "쌀", "양파", "찹쌀"] },
  { name: "단호박닭가슴살죽", stage: "중기1", volume: "180", allergy: "닭고기", ingredients: [] },
  { name: "오트밀흑미죽", stage: "중기1", volume: "180", allergy: "", ingredients: [] },
  { name: "한우배추죽", stage: "중기1", volume: "180", allergy: "", ingredients: [] },
  { name: "한우브로콜리죽", stage: "중기1", volume: "180", allergy: "", ingredients: [] },
  { name: "한우배사과죽", stage: "중기1", volume: "180", allergy: "", ingredients: [] },
  { name: "우리콩두부고구마맛죽", stage: "중기1", volume: "180", allergy: "", ingredients: [] },
  { name: "밤배죽", stage: "중기1", volume: "180", allergy: "", ingredients: [] },
  { name: "흑임자누룽지죽", stage: "중기1", volume: "180", allergy: "", ingredients: [] },
  { name: "고구마브로콜리죽", stage: "중기1", volume: "180", allergy: "", ingredients: [] },
  { name: "초유시금치당근죽", stage: "중기1", volume: "180", allergy: "", ingredients: [] },
  { name: "한우듬뿍콜리플라워죽", stage: "중기1", volume: "180", allergy: "소고기", ingredients: ["무", "소고기", "쌀", "양파", "찹쌀", "콜리플라워"] },
  { name: "한우듬뿍백일송이죽", stage: "중기1", volume: "180", allergy: "소고기", ingredients: ["무", "백일송이버섯", "새송이버섯", "소고기", "쌀", "양파", "찹쌀"] },
];

export const CATEGORY_MAP = {
  무: "채소", 브로콜리: "채소", 양배추: "채소", 양파: "채소", 애호박: "채소", 당근: "채소",
  청경채: "채소", 배추: "채소", 시금치: "채소", 콜리플라워: "채소", 비트: "채소",
  비타민채: "채소", 아욱: "채소", 오이: "채소", 곤드레: "채소",
  느타리버섯: "채소", 새송이버섯: "채소", 백일송이버섯: "채소",
  소고기: "고기·단백질", 닭고기: "고기·단백질", 두부: "고기·단백질",
  초유분말: "유제품",
  사과퓨레: "과일", 배퓨레: "과일", 바나나퓨레: "과일", 블루베리농축액: "과일", 아보카도: "과일",
  쌀: "곡물·구황작물", 찹쌀: "곡물·구황작물", 조: "곡물·구황작물", 흑미분말: "곡물·구황작물",
  감자: "곡물·구황작물", 고구마: "곡물·구황작물", 단호박: "곡물·구황작물", 밤: "곡물·구황작물",
  참깨가루: "기타",
};

export const CATEGORY_ORDER = ["채소", "고기·단백질", "유제품", "과일", "곡물·구황작물", "기타"];

export const categoryOf = (ing) => CATEGORY_MAP[ing] || "기타";

export const BRANDS = [
  { id: "elvinz", name: "엘빈즈", ready: true },
  { id: "lusol", name: "루솔", ready: false },
  { id: "nampyeong", name: "베이비본죽", ready: false },
];
