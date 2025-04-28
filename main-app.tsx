import React, { useState, useEffect } from 'react';
import { Book, Calculator, User, BarChart3, Folder, Settings } from 'lucide-react';

// 検査データのサンプル
const clinicalTestData = [
  // 血液学的検査
  {
    id: 1,
    name: "赤血球数（RBC）",
    normalRange: "男性: 400～539万/μL\n女性: 370～489万/μL",
    significance: "赤血球は酸素を運搬する役割がある。増加は多血症や脱水、減少は貧血を示唆する。",
    mastered: false,
    category: "血液学的検査"
  },
  {
    id: 2,
    name: "白血球数（WBC）",
    normalRange: "3300～8600/μL",
    significance: "感染や炎症に対する免疫反応を示す。増加は感染症や炎症、減少は骨髄抑制や自己免疫疾患を示唆する。",
    mastered: false,
    category: "血液学的検査"
  },
  {
    id: 3,
    name: "血小板数（PLT）",
    normalRange: "15.8～34.8万/μL",
    significance: "止血に関与する。減少は出血傾向、増加は血栓形成リスクを示す。",
    mastered: false,
    category: "血液学的検査"
  },
  {
    id: 4,
    name: "ヘモグロビン（Hb）",
    normalRange: "男性: 13.7～16.8g/dL\n女性: 11.6～14.8g/dL",
    significance: "酸素運搬能を反映する。減少は貧血、増加は多血症を示唆する。",
    mastered: false,
    category: "血液学的検査"
  },
  {
    id: 5,
    name: "ヘマトクリット（Ht）",
    normalRange: "男性: 40.7～50.1%\n女性: 35.1～44.4%",
    significance: "全血液中の赤血球の容積比率を示す。減少は貧血、増加は多血症や脱水を示唆する。",
    mastered: false,
    category: "血液学的検査"
  },
  {
    id: 6,
    name: "MCV（平均赤血球容積）",
    normalRange: "83.6～98.2fL",
    significance: "赤血球の大きさを示す。増加は大球性貧血、減少は小球性貧血を示唆する。",
    mastered: false,
    category: "血液学的検査"
  },
  {
    id: 7,
    name: "MCH（平均赤血球血色素量）",
    normalRange: "27.5～33.2pg",
    significance: "赤血球1個あたりのヘモグロビン量。減少は低色素性貧血を示唆する。",
    mastered: false,
    category: "血液学的検査"
  },
  {
    id: 8,
    name: "MCHC（平均赤血球血色素濃度）",
    normalRange: "31.7～35.3%",
    significance: "赤血球中のヘモグロビン濃度。減少は低色素性貧血を示唆する。",
    mastered: false,
    category: "血液学的検査"
  },
  {
    id: 9,
    name: "網状赤血球数",
    normalRange: "0.5～2.0%",
    significance: "骨髄での赤血球産生能を反映。増加は溶血や急性出血後、減少は再生不良性貧血を示唆する。",
    mastered: false,
    category: "血液学的検査"
  },
  {
    id: 10,
    name: "好中球数",
    normalRange: "1500～6500/μL",
    significance: "細菌感染や炎症反応に関与。増加は細菌感染症や炎症、減少は無顆粒球症や抗がん剤の影響を示唆する。",
    mastered: false,
    category: "血液学的検査"
  },
  
  // 生化学的検査
  {
    id: 11,
    name: "AST（GOT）",
    normalRange: "10～40 U/L",
    significance: "肝臓や心筋の障害を反映する。肝炎、肝硬変、心筋梗塞などで上昇する。",
    mastered: false,
    category: "生化学的検査"
  },
  {
    id: 12,
    name: "ALT（GPT）",
    normalRange: "5～45 U/L",
    significance: "肝細胞障害を特異的に反映する。肝炎や薬剤性肝障害で上昇する。",
    mastered: false,
    category: "生化学的検査"
  },
  {
    id: 13,
    name: "血糖値（空腹時）",
    normalRange: "70～109 mg/dL",
    significance: "糖代謝を反映する。高値は糖尿病、低値は低血糖症を示唆する。",
    mastered: false,
    category: "生化学的検査"
  },
  {
    id: 14,
    name: "HbA1c（NGSP）",
    normalRange: "4.6～6.2%",
    significance: "過去1～2ヶ月の平均血糖値を反映。糖尿病の診断や血糖コントロールの指標となる。",
    mastered: false,
    category: "生化学的検査"
  },
  {
    id: 15,
    name: "総ビリルビン",
    normalRange: "0.2～1.2 mg/dL",
    significance: "肝・胆道系の障害や溶血を反映。増加は肝炎、胆道閉塞、溶血性貧血を示唆する。",
    mastered: false,
    category: "生化学的検査"
  },
  {
    id: 16,
    name: "直接ビリルビン",
    normalRange: "0～0.4 mg/dL",
    significance: "肝・胆道系の障害を反映。増加は肝内・肝外胆汁うっ滞を示唆する。",
    mastered: false,
    category: "生化学的検査"
  },
  {
    id: 17,
    name: "アルブミン",
    normalRange: "3.8～5.3 g/dL",
    significance: "肝臓での合成能や栄養状態を反映。減少は肝硬変、ネフローゼ症候群、低栄養状態を示唆する。",
    mastered: false,
    category: "生化学的検査"
  },
  {
    id: 18,
    name: "ALP（アルカリホスファターゼ）",
    normalRange: "104～338 U/L",
    significance: "肝・胆道系や骨の異常を反映。増加は閉塞性黄疸、骨代謝疾患を示唆する。",
    mastered: false,
    category: "生化学的検査"
  },
  {
    id: 19,
    name: "γ-GTP",
    normalRange: "男性: 13～64 U/L\n女性: 9～32 U/L",
    significance: "肝・胆道系障害やアルコール代謝を反映。増加は飲酒、薬剤性肝障害を示唆する。",
    mastered: false,
    category: "生化学的検査"
  },
  {
    id: 20,
    name: "LDH（乳酸脱水素酵素）",
    normalRange: "120～240 U/L",
    significance: "組織の破壊を広く反映。増加は心筋梗塞、肝障害、溶血、悪性腫瘍を示唆する。",
    mastered: false,
    category: "生化学的検査"
  },
  
  // 腎機能・電解質検査
  {
    id: 21,
    name: "尿素窒素（BUN）",
    normalRange: "8～20 mg/dL",
    significance: "腎機能を反映。増加は腎不全、脱水、消化管出血、減少は肝不全、低タンパク食を示唆する。",
    mastered: false,
    category: "腎機能・電解質検査"
  },
  {
    id: 22,
    name: "クレアチニン",
    normalRange: "男性: 0.6～1.1 mg/dL\n女性: 0.4～0.8 mg/dL",
    significance: "腎機能、特に糸球体濾過率を反映。増加は腎障害を示唆する。",
    mastered: false,
    category: "腎機能・電解質検査"
  },
  {
    id: 23,
    name: "eGFR（推算糸球体濾過量）",
    normalRange: "90 mL/分/1.73m²以上",
    significance: "腎機能の指標。60未満で慢性腎臓病を示唆する。",
    mastered: false,
    category: "腎機能・電解質検査"
  },
  {
    id: 24,
    name: "尿酸",
    normalRange: "男性: 3.8～7.0 mg/dL\n女性: 2.5～7.0 mg/dL",
    significance: "プリン体代謝を反映。増加は痛風、腎不全、減少はファンコニー症候群を示唆する。",
    mastered: false,
    category: "腎機能・電解質検査"
  },
  {
    id: 25,
    name: "ナトリウム（Na）",
    normalRange: "135～145 mEq/L",
    significance: "体液・電解質バランスを反映。増加は脱水、減少はADH分泌異常、利尿剤の過剰投与を示唆する。",
    mastered: false,
    category: "腎機能・電解質検査"
  },
  {
    id: 26,
    name: "カリウム（K）",
    normalRange: "3.5～5.0 mEq/L",
    significance: "細胞内外の電解質バランスを反映。増加は腎不全、アジソン病、減少は嘔吐、下痢、利尿剤を示唆する。",
    mastered: false,
    category: "腎機能・電解質検査"
  },
  {
    id: 27,
    name: "クロール（Cl）",
    normalRange: "98～108 mEq/L",
    significance: "酸塩基平衡を反映。増加は脱水、減少は嘔吐、下痢を示唆する。",
    mastered: false,
    category: "腎機能・電解質検査"
  },
  {
    id: 28,
    name: "カルシウム（Ca）",
    normalRange: "8.5～10.2 mg/dL",
    significance: "骨代謝、神経筋機能を反映。増加は副甲状腺機能亢進症、減少は腎不全、ビタミンD欠乏を示唆する。",
    mastered: false,
    category: "腎機能・電解質検査"
  },
  {
    id: 29,
    name: "リン（P）",
    normalRange: "2.5～4.5 mg/dL",
    significance: "骨代謝、エネルギー代謝を反映。増加は腎不全、減少は栄養不良、ビタミンD欠乏を示唆する。",
    mastered: false,
    category: "腎機能・電解質検査"
  },
  {
    id: 30,
    name: "マグネシウム（Mg）",
    normalRange: "1.8～2.6 mg/dL",
    significance: "神経筋機能、酵素活性を反映。減少は利尿剤の使用、アルコール依存症を示唆する。",
    mastered: false,
    category: "腎機能・電解質検査"
  },
  
  // 脂質検査
  {
    id: 31,
    name: "総コレステロール",
    normalRange: "130～219 mg/dL",
    significance: "脂質代謝を反映。増加は動脈硬化リスク、甲状腺機能低下症を示唆する。",
    mastered: false,
    category: "脂質検査"
  },
  {
    id: 32,
    name: "HDLコレステロール",
    normalRange: "40～80 mg/dL",
    significance: "善玉コレステロール。減少は動脈硬化リスクを高める。",
    mastered: false,
    category: "脂質検査"
  },
  {
    id: 33,
    name: "LDLコレステロール",
    normalRange: "70～139 mg/dL",
    significance: "悪玉コレステロール。増加は動脈硬化リスクを高める。",
    mastered: false,
    category: "脂質検査"
  },
  {
    id: 34,
    name: "中性脂肪（トリグリセリド）",
    normalRange: "30～149 mg/dL",
    significance: "脂質代謝を反映。増加は動脈硬化リスク、膵炎リスクを高める。",
    mastered: false,
    category: "脂質検査"
  },
  
  // 血清蛋白・免疫学的検査
  {
    id: 35,
    name: "総蛋白（TP）",
    normalRange: "6.5～8.2 g/dL",
    significance: "栄養状態、肝機能、免疫状態を反映。減少は低栄養、肝硬変、ネフローゼ症候群を示唆する。",
    mastered: false,
    category: "血清蛋白・免疫学的検査"
  },
  {
    id: 36,
    name: "CRP（C反応性蛋白）",
    normalRange: "0.3 mg/dL以下",
    significance: "急性炎症反応を反映。増加は感染症、炎症性疾患、組織壊死を示唆する。",
    mastered: false,
    category: "血清蛋白・免疫学的検査"
  },
  {
    id: 37,
    name: "RF（リウマトイド因子）",
    normalRange: "15 IU/mL未満",
    significance: "自己免疫疾患を反映。増加は関節リウマチ、膠原病を示唆する。",
    mastered: false,
    category: "血清蛋白・免疫学的検査"
  },
  {
    id: 38,
    name: "抗核抗体（ANA）",
    normalRange: "40倍未満",
    significance: "自己免疫疾患を反映。増加は全身性エリテマトーデス、強皮症などを示唆する。",
    mastered: false,
    category: "血清蛋白・免疫学的検査"
  },
  
  // 内分泌検査
  {
    id: 39,
    name: "TSH（甲状腺刺激ホルモン）",
    normalRange: "0.35～4.94 μIU/mL",
    significance: "甲状腺機能を反映。増加は甲状腺機能低下症、減少は甲状腺機能亢進症を示唆する。",
    mastered: false,
    category: "内分泌検査"
  },
  {
    id: 40,
    name: "FT4（遊離サイロキシン）",
    normalRange: "0.70～1.48 ng/dL",
    significance: "甲状腺機能を反映。増加は甲状腺機能亢進症、減少は甲状腺機能低下症を示唆する。",
    mastered: false,
    category: "内分泌検査"
  },
  
  // 腫瘍マーカー
  {
    id: 41,
    name: "AFP（α-フェトプロテイン）",
    normalRange: "10 ng/mL以下",
    significance: "肝細胞癌、胚細胞腫瘍のマーカー。増加は肝細胞癌、胎児性腫瘍を示唆する。",
    mastered: false,
    category: "腫瘍マーカー"
  },
  {
    id: 42,
    name: "CEA（癌胎児性抗原）",
    normalRange: "5.0 ng/mL以下",
    significance: "大腸癌、肺癌、胃癌などのマーカー。増加は悪性腫瘍、慢性炎症性疾患を示唆する。",
    mastered: false,
    category: "腫瘍マーカー"
  },
  {
    id: 43,
    name: "CA19-9",
    normalRange: "37 U/mL以下",
    significance: "膵臓癌、胆道癌のマーカー。増加は膵癌、胆道癌、胃癌を示唆する。",
    mastered: false,
    category: "腫瘍マーカー"
  },
  {
    id: 44,
    name: "PSA（前立腺特異抗原）",
    normalRange: "4.0 ng/mL以下",
    significance: "前立腺癌のマーカー。増加は前立腺癌、前立腺肥大症を示唆する。",
    mastered: false,
    category: "腫瘍マーカー"
  },
  
  // 凝固系検査
  {
    id: 45,
    name: "PT（プロトロンビン時間）",
    normalRange: "10～13秒",
    significance: "外因系凝固能を反映。延長は肝疾患、ビタミンK欠乏症、ワルファリン治療を示唆する。",
    mastered: false,
    category: "凝固系検査"
  },
  {
    id: 46,
    name: "APTT（活性化部分トロンボプラスチン時間）",
    normalRange: "25～40秒",
    significance: "内因系凝固能を反映。延長は血友病、ヘパリン治療を示唆する。",
    mastered: false,
    category: "凝固系検査"
  },
  {
    id: 47,
    name: "D-ダイマー",
    normalRange: "1.0 μg/mL未満",
    significance: "血栓症の指標。増加は深部静脈血栓症、肺塞栓症、DICを示唆する。",
    mastered: false,
    category: "凝固系検査"
  },
  
  // 尿検査
  {
    id: 48,
    name: "尿蛋白",
    normalRange: "陰性",
    significance: "腎臓の糸球体や尿細管の障害を反映。陽性はネフローゼ症候群、糸球体腎炎を示唆する。",
    mastered: false,
    category: "尿検査"
  },
  {
    id: 49,
    name: "尿糖",
    normalRange: "陰性",
    significance: "血糖値の上昇や腎臓の再吸収障害を反映。陽性は糖尿病、腎性糖尿を示唆する。",
    mastered: false,
    category: "尿検査"
  },
  {
    id: 50,
    name: "尿潜血",
    normalRange: "陰性",
    significance: "腎・尿路系の出血を反映。陽性は尿路感染症、腎炎、尿路結石、腫瘍を示唆する。",
    mastered: false,
    category: "尿検査"
  }
];

// フラッシュカードコンポーネント
const FlashCardApp = () => {
  const [cards, setCards] = useState(clinicalTestData);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('すべて');
  const [filteredCards, setFilteredCards] = useState(clinicalTestData);

  // カードデータをカテゴリでフィルタリングする
  useEffect(() => {
    // カテゴリによるフィルタリング
    const filtered = selectedCategory === 'すべて' 
      ? clinicalTestData 
      : clinicalTestData.filter(card => card.category === selectedCategory);
    
    setFilteredCards(filtered);
    setCurrentIndex(0);
    setIsFlipped(false);
    
    // 選択されたカテゴリの進捗率を計算
    const masteredCount = filtered.filter(card => card.mastered).length;
    setProgress(filtered.length > 0 ? (masteredCount / filtered.length) * 100 : 0);
  }, [selectedCategory]);

  // カードをクリックして裏返す
  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  // 次のカードへ移動
  const handleNext = () => {
    if (currentIndex < filteredCards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  };

  // 前のカードへ移動
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  // 覚えたとマーク
  const markAsMastered = () => {
    if (filteredCards.length === 0 || currentIndex >= filteredCards.length) return;
    
    const currentCardId = filteredCards[currentIndex].id;
    
    // 全カード配列内の対象カードを更新
    const updatedCards = cards.map(card => 
      card.id === currentCardId ? {...card, mastered: true} : card
    );
    setCards(updatedCards);
    
    // フィルター済み配列も更新
    const updatedFilteredCards = filteredCards.map(card => 
      card.id === currentCardId ? {...card, mastered: true} : card
    );
    setFilteredCards(updatedFilteredCards);
    
    // 進捗率を更新
    const masteredCount = updatedFilteredCards.filter(card => card.mastered).length;
    setProgress((masteredCount / updatedFilteredCards.length) * 100);
  };

  // リセット機能
  const resetProgress = () => {
    // すべてのカードのmasteredフラグをリセット
    const resetCards = clinicalTestData.map(card => ({...card, mastered: false}));
    setCards(resetCards);
    
    // フィルター済み配列も更新
    const resetFilteredCards = selectedCategory === 'すべて' 
      ? resetCards 
      : resetCards.filter(card => card.category === selectedCategory);
    
    setFilteredCards(resetFilteredCards);
    setProgress(0);
  };

  // カテゴリ一覧を取得
  const getCategories = () => {
    const categories = clinicalTestData.map(card => card.category);
    const uniqueCategories = [...new Set(categories)];
    return uniqueCategories;
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h2 className="text-xl font-bold text-center text-blue-800 mb-4">検査データフラッシュカード</h2>
      <div className="w-full max-w-md">
        {/* カテゴリ選択 */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            カテゴリ選択
          </label>
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="すべて">すべてのカテゴリ</option>
              {getCategories().map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
          </div>
        </div>
        
        {/* 進捗バー */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>学習進捗</span>
            <span>{Math.round(progress)}% ({filteredCards.filter(card => card.mastered).length}/{filteredCards.length})</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        {filteredCards.length > 0 ? (
          <>
            {/* カード */}
            <div 
              className="relative h-64 w-full cursor-pointer mb-4"
              onClick={toggleFlip}
            >
              {/* 表面 */}
              <div className={`absolute w-full h-full rounded-xl shadow-lg p-6 transition-opacity duration-300 ${isFlipped ? 'opacity-0' : 'opacity-100'}`}
                style={{ backgroundColor: filteredCards[currentIndex]?.mastered ? '#e6fffa' : 'white', borderLeft: filteredCards[currentIndex]?.mastered ? '4px solid #38b2ac' : '4px solid #4299e1' }}>
                <div className="flex flex-col justify-center items-center h-full">
                  {filteredCards[currentIndex]?.category && (
                    <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mb-3">
                      {filteredCards[currentIndex].category}
                    </div>
                  )}
                  <h2 className="text-2xl font-bold text-center text-gray-800">
                    {filteredCards[currentIndex]?.name || "データを読み込み中..."}
                  </h2>
                </div>
                {filteredCards[currentIndex]?.mastered && 
                  <div className="absolute top-2 right-2 bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded-full flex items-center">
                    覚えた
                  </div>
                }
              </div>
              
              {/* 裏面 */}
              <div className={`absolute w-full h-full rounded-xl shadow-lg p-6 bg-white transition-opacity duration-300 ${isFlipped ? 'opacity-100' : 'opacity-0'}`}
                style={{ borderLeft: '4px solid #4299e1' }}>
                <div className="flex flex-col h-full">
                  {filteredCards[currentIndex]?.category && (
                    <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full self-start mb-2">
                      {filteredCards[currentIndex].category}
                    </div>
                  )}
                  <h3 className="text-lg font-semibold text-blue-700 mb-2">基準値</h3>
                  <p className="text-gray-800 whitespace-pre-line mb-4">{filteredCards[currentIndex]?.normalRange}</p>
                  
                  <h3 className="text-lg font-semibold text-blue-700 mb-2">臨床的意義</h3>
                  <p className="text-gray-800">{filteredCards[currentIndex]?.significance}</p>
                </div>
              </div>
            </div>

            {/* カード番号表示 */}
            <div className="text-center text-gray-600 mb-4">
              {currentIndex + 1} / {filteredCards.length}
            </div>

            {/* ナビゲーションと操作ボタン */}
            <div className="flex justify-between mt-4">
              <button 
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className={`px-4 py-2 rounded-lg ${currentIndex === 0 ? 'bg-gray-200 text-gray-400' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
              >
                前へ
              </button>
              
              <button
                onClick={markAsMastered}
                disabled={filteredCards[currentIndex]?.mastered}
                className={`px-4 py-2 rounded-lg ${filteredCards[currentIndex]?.mastered ? 'bg-gray-200 text-gray-400' : 'bg-teal-600 text-white hover:bg-teal-700'}`}
              >
                覚えた！
              </button>
              
              <button 
                onClick={handleNext}
                disabled={currentIndex === filteredCards.length - 1}
                className={`px-4 py-2 rounded-lg ${currentIndex === filteredCards.length - 1 ? 'bg-gray-200 text-gray-400' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
              >
                次へ
              </button>
            </div>
            
            {/* リセットボタン */}
            <div className="flex justify-center mt-4">
              <button 
                onClick={resetProgress}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
              >
                進捗をリセット
              </button>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600">選択したカテゴリのカードがありません。</p>
          </div>
        )}
      </div>
      
      <div className="mt-6 text-sm text-gray-500 text-center">
        <p>カードをクリックして裏表を切り替えます。覚えたカードは「覚えた！」ボタンで記録できます。</p>
      </div>
    </div>
  );
};

// 投薬計算問題コンポーネント
const MedicationCalculatorApp = () => {
  // 投薬計算アプリのロジック
  const [problemType, setProblemType] = useState('薬用量計算');
  const [stats, setStats] = useState({
    attempted: 0,
    correct: 0
  });
  
  // 問題タイプ選択のハンドラ
  const handleProblemTypeChange = (type) => {
    setProblemType(type);
  };
  
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h2 className="text-xl font-bold text-center text-blue-800 mb-4">投薬計算練習ツール</h2>
      <div className="w-full max-w-md">
        {/* 問題タイプ選択 */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            問題タイプ
          </label>
          <div className="grid grid-cols-2 gap-2">
            {['薬用量計算', '点滴速度計算', '希釈計算', '小児投与量'].map((type) => (
              <button
                key={type}
                onClick={() => handleProblemTypeChange(type)}
                className={`py-2 px-4 rounded ${problemType === type 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-blue-700 border border-blue-300 hover:bg-blue-50'}`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
        
        {/* 問題表示プレースホルダー */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">問題:</h2>
          <p className="text-gray-700 mb-6">
            {problemType}タイプの問題が表示されます。回答を入力してください。
          </p>
          
          {/* 回答入力フォーム */}
          <div className="flex mb-4">
            <input
              type="number"
              step="0.1"
              placeholder="あなたの答え"
              className="flex-grow p-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="bg-gray-100 p-2 border border-l-0 border-gray-300 rounded-r text-gray-700">
              単位
            </span>
          </div>
          
          <button
            className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => {
              alert('回答を受け付けました！');
              setStats({
                attempted: stats.attempted + 1,
                correct: stats.correct + 1
              });
            }}
          >
            回答する
          </button>
        </div>
        
        {/* 統計 */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-gray-700 font-medium">解答統計</h3>
              <p className="text-sm text-gray-600">
                正解率: {stats.attempted > 0 ? Math.round((stats.correct / stats.attempted) * 100) : 0}%
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">試行回数: {stats.attempted}</p>
              <p className="text-sm text-gray-600">正解数: {stats.correct}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// メインアプリケーション
const NursingLearningApp = () => {
  const [activeTab, setActiveTab] = useState('flashcard');
  const [studyTime, setStudyTime] = useState(0);
  const [userName, setUserName] = useState('');
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  // ローカルストレージからユーザー情報をロード
  useEffect(() => {
    const savedUserName = localStorage.getItem('nursingAppUserName');
    const savedStudyTime = localStorage.getItem('nursingAppStudyTime');
    const visitedBefore = localStorage.getItem('nursingAppVisited');
    
    if (savedUserName) {
      setUserName(savedUserName);
      setIsFirstVisit(false);
    }
    
    if (savedStudyTime) {
      setStudyTime(parseInt(savedStudyTime));
    }
    
    if (visitedBefore) {
      setIsFirstVisit(false);
    }
    
    setIsLoaded(true);
  }, []);

  // 学習時間の追跡
  useEffect(() => {
    const timer = setInterval(() => {
      setStudyTime(prevTime => {
        const newTime = prevTime + 1;
        localStorage.setItem('nursingAppStudyTime', newTime.toString());
        return newTime;
      });
    }, 60000); // 1分ごとに更新
    
    return () => clearInterval(timer);
  }, []);

  // 学習時間のフォーマット (時間:分)
  const formatStudyTime = () => {
    const hours = Math.floor(studyTime / 60);
    const minutes = studyTime % 60;
    return `${hours}時間${minutes}分`;
  };

  // データ読み込み中の表示
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-blue-50">
        <div className="text-blue-600">データを読み込み中...</div>
      </div>
    );
  }

  // 初回訪問時のウェルカム画面
  if (isFirstVisit) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50 p-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold text-center text-blue-800 mb-6">看護学習アシスタントへようこそ！</h1>
          
          <p className="text-gray-600 mb-6">
            このアプリは、検査データの暗記と投薬計算の練習をサポートします。あなたの学習をより効果的にするため、名前を教えてください。
          </p>
          
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
              あなたの名前
            </label>
            <input
              type="text"
              id="username"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="名前を入力してください"
            />
          </div>
          
          <button
            onClick={() => {
              const nameInput = document.getElementById('username');
              const name = nameInput.value || 'ゲスト';
              setUserName(name);
              localStorage.setItem('nursingAppUserName', name);
              localStorage.setItem('nursingAppVisited', 'true');
              setIsFirstVisit(false);
            }}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            始める
          </button>
          
          {/* スキップボタン */}
          <div className="mt-4 text-center">
            <button
              onClick={() => {
                setUserName('ゲスト');
                localStorage.setItem('nursingAppUserName', 'ゲスト');
                localStorage.setItem('nursingAppVisited', 'true');
                setIsFirstVisit(false);
              }}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              スキップしてゲストとして利用する
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50">
      <header className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-800">看護学習アシスタント</h1>
          
          <div className="flex items-center text-sm text-gray-600">
            <User size={18} className="mr-1" />
            <span>{userName}さん</span>
            <span className="mx-2">|</span>
            <span>累計学習時間: {formatStudyTime()}</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4">
        <div className="bg-white rounded-lg shadow-md">
          {/* カスタムタブナビゲーション */}
          <div className="flex border-b border-gray-200">
            <button
              className={`py-3 px-6 flex items-center ${activeTab === 'flashcard' 
                ? 'border-b-2 border-blue-600 text-blue-700 font-medium' 
                : 'text-gray-600 hover:text-blue-700'}`}
              onClick={() => {
                setActiveTab('flashcard');
              }}
            >
              <Book size={18} className="mr-2" /> 検査データフラッシュカード
            </button>
            <button
              className={`py-3 px-6 flex items-center ${activeTab === 'calculator' 
                ? 'border-b-2 border-blue-600 text-blue-700 font-medium' 
                : 'text-gray-600 hover:text-blue-700'}`}
              onClick={() => {
                setActiveTab('calculator');
              }}
            >
              <Calculator size={18} className="mr-2" /> 投薬計算練習ツール
            </button>
          </div>

          {/* タブコンテンツ */}
          <div className="p-4">
            {activeTab === 'flashcard' && <FlashCardApp />}
            {activeTab === 'calculator' && <MedicationCalculatorApp />}
          </div>
        </div>
      </main>

      <footer className="bg-white mt-8 py-4 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-600 mb-2 md:mb-0">
              © 2025 看護学習アシスタント - すべての看護学生をサポートします
            </div>
            
            <div className="flex space-x-4">
              <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
                <BarChart3 size={16} className="mr-1" /> 学習統計
              </button>
              <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
                <Folder size={16} className="mr-1" /> 学習資料
              </button>
              <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
                <Settings size={16} className="mr-1" /> 設定
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NursingLearningApp;