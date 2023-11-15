import React from 'react';

enum RecipeStatus {
  Oczekujący = 0,
  Zweryfikowany,
  Zablokowany,
  Wszystkie,
}

interface SelectProps {
  value: RecipeStatus;
  onChange: (value: RecipeStatus) => void;
}

const RecipeStatusSelect: React.FC<SelectProps> = ({ value, onChange }) => {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = parseInt(event.target.value, 10);
    onChange(selectedValue as RecipeStatus);
  };

  return (
    <select value={value} onChange={handleSelectChange}>
      {Object.values(RecipeStatus)
        .filter((val) => typeof val === 'number')
        .slice(0, -1)
        .map((val) => (
          <option key={val} value={val}>
            {RecipeStatus[val as keyof typeof RecipeStatus]}
          </option>
        ))}
    </select>
  );
};

export default RecipeStatusSelect;
