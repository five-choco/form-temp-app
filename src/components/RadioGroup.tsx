import React from 'react';

// ラジオボタンの単一の選択肢のデータ構造を定義する
type RadioOption = {
  value: string;
  label: string;
};

// RadioGroupコンポーネントが受け取るpropsの型を定義し、型安全性を確保する
type RadioGroupProps = {
  legend: string;
  name: string;
  options: RadioOption[];
  selectedValue: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

// 渡された選択肢の配列から、ラジオボタンのグループを動的に生成するコンポーネント
const RadioGroup = ({ legend, name, options, selectedValue, onChange }: RadioGroupProps) => {
  return (
    <fieldset className="form__fieldset">
      <legend className="form__label">
        {legend}<span className="form__required-indicator">必須</span>
      </legend>
      {options.map((option) => (
        <label key={option.value} className="form__radio-label" htmlFor={`${name}-${option.value}`}>
          <input
            type="radio"
            name={name}
            value={option.value}
            id={`${name}-${option.value}`}
            onChange={onChange}
            checked={selectedValue === option.value}
            className="form__radio-input"
          />
          {option.label}
        </label>
      ))}
    </fieldset>
  );
};

export default RadioGroup;