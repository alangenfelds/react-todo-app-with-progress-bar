import { ChangeEvent } from "react";

import "./select.scss";

export type SelectOption = "All" | "Done" | "Undone";

type Props = {
  selectedOption: SelectOption;
  onSelectChange: (selected: SelectOption) => void;
};

const Select = ({ selectedOption, onSelectChange }: Props) => {
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onSelectChange(e.target.value as SelectOption);
  };
  return (
    <select
      className="custom-select"
      value={selectedOption}
      onChange={handleSelectChange}
    >
      <option value="All">All</option>
      <option value="Done">Done</option>
      <option value="Undone">Undone</option>
    </select>
  );
};

export default Select;
