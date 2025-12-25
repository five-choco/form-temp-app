import React from "react";

// FormFieldコンポーネントが受け取るpropsの型を定義し、型安全性を確保する
type FormFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  type?: string;
};

// ラベル、入力欄、エラーメッセージを一つの単位としてカプセル化し、再利用を容易にするコンポーネント
const FormField = ({ id, label, value, onChange, error, type = 'text' }: FormFieldProps) => {
  // エラー状態に応じてinputのクラス名を動的に変更する
  const inputClassName = `form__input ${error ? 'form__input--error' : ''}`.trim();

  return (
    <>
      <label className="form__label" htmlFor={id}>
        {label}<span className="form__required-indicator">必須</span>
      </label>
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        className={inputClassName}
      />
      {error && <p className="form__error-text">{error}</p>}
    </>
  );
};

export default FormField;
