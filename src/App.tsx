import { useState } from "react";
import FormField from "./components/FormField";
import RadioGroup from "./components/RadioGroup";

function App() {
  // Appコンポーネントに特化した設定データのため、コンポーネント内に定義
  const genderOptions = [
    { value: '男性', label: '男性' },
    { value: '女性', label: '女性' },
    { value: '無回答・その他', label: '無回答・その他' },
  ];

  // フォーム全体の入力値を一元的に管理するための状態
  const [formData, setFormData] = useState({
    sei: "",
    mei: "",
    seiKana: "",
    meiKana: "",
    gender: "",
    age: "",
  });

  // 各入力フィールドのバリデーションエラーを保持するための状態
  const [errors, setErrors] = useState({
    sei: "",
    mei: "",
    seiKana: "",
    meiKana: "",
    age: "",
  });

  // --- バリデーション関数 ---
  // 特定の入力形式を強制するための再利用可能な検証ロジック
  const validateName = (name: string) => {
    // 記号と数字を許可しない正規表現
    const regex = /^[^\d!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]*$/;
    return regex.test(name);
  };

  const validateAge = (age: string) => {
    const regex = /^[0-9]*$/;
    return regex.test(age);
  };

  // 各入力フィールドのバリデーションルールとエラーメッセージを宣言的に管理する
  const validationRules = {
    sei: { validate: validateName, message: '記号・数字は使用できません' },
    mei: { validate: validateName, message: '記号・数字は使用できません' },
    seiKana: { validate: validateName, message: '記号・数字は使用できません' },
    meiKana: { validate: validateName, message: '記号・数字は使用できません' },
    age: { validate: validateAge, message: '半角数字以外は使用できません' },
  };

  // 全ての入力変更イベントを一元的に処理し、値の更新とバリデーションを効率的に行う
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, name } = e.target;

    // 値を更新（テキスト入力はid、ラジオボタンはnameで識別）
    const fieldName = name === 'gender' ? 'gender' : id;
    setFormData((prev) => ({ ...prev, [fieldName]: value }));

    // バリデーションを実行（ルールが存在するフィールドのみ）
    const rule = validationRules[id as keyof typeof validationRules];
    if (rule) {
      const isValid = rule.validate(value);
      setErrors((prev) => ({
        ...prev,
        [id]: isValid ? '' : rule.message,
      }));
    }
  };

  // isSubmittableはformDataとerrorsから計算できる派生状態のため、
  // レンダリングの都度計算することで、不要なstate更新と再レンダリングループを防ぐ
  const { sei, mei, seiKana, meiKana, gender, age } = formData;
  const allRequiredFilled = !!(
    sei &&
    mei &&
    seiKana &&
    meiKana &&
    gender &&
    age
  );
  const noErrors = Object.values(errors).every((error) => error === "");
  const isSubmittable = allRequiredFilled && noErrors;

  // フォームのUI構造を定義し、各コンポーネントに必要なデータとロジックを渡す
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // ページの再読み込みを防ぐ
    if (isSubmittable) {
      alert("complete"); // アラートメッセージを表示
      console.log("Form Data:", formData); // デバッグ用にフォームデータをコンソール出力
      // 実際のアプリケーションでは、ここでデータをサーバーに送信するなどの処理を行います。
    } else {
      console.log("フォームに未入力項目またはエラーがあります。");
    }
  };

  return (
    <div className="form__container">
      <h1 className="page__title">あなたの情報を入力してください</h1>
      <form className="form" onSubmit={handleSubmit}>
        <section className="form__section">
          <h2 className="form__section-title">名前</h2>
          <FormField
            id="sei"
            label="姓"
            value={formData.sei}
            onChange={handleChange}
            error={errors.sei}
          />

          <FormField
            id="mei"
            label="名"
            value={formData.mei}
            onChange={handleChange}
            error={errors.mei}
          />

          <FormField
            id="seiKana"
            label="セイ"
            value={formData.seiKana}
            onChange={handleChange}
            error={errors.seiKana}
          />

          <FormField
            id="meiKana"
            label="メイ"
            value={formData.meiKana}
            onChange={handleChange}
            error={errors.meiKana}
          />
        </section>

        <section className="form__section">
          <h2 className="form__section-title">年齢・性別</h2>
          <RadioGroup
            legend="性別"
            name="gender"
            options={genderOptions}
            selectedValue={formData.gender}
            onChange={handleChange}
          />
          <FormField
            id="age"
            label="年齢"
            value={formData.age}
            onChange={handleChange}
            error={errors.age}
            type="text"
          />
        </section>

        <div className="form__actions">
          <button type="submit" className="form__button form__button--primary" disabled={!isSubmittable}>
            次へ
          </button>
          <button type="button" className="form__button form__button--secondary">戻る</button>
        </div>
      </form>
    </div>
  );
}


export default App;
