import { useRef, useState, useEffect } from "react";

import "./custom-select.scss";

export type SelectOption = "All" | "Done" | "Undone";

type Props = {
  selectedOption: SelectOption;
  onSelectChange: (selected: SelectOption) => void;
};

type SelectMenuProps = {
  onSelect: (option: SelectOption) => void;
};

const ContextMenu = ({ onSelect }: SelectMenuProps) => {
  return (
    <div className="select-context-menu">
      <div className="menu-item" onClick={() => onSelect("All")}>
        All
      </div>
      <div className="menu-item" onClick={() => onSelect("Done")}>
        Done
      </div>
      <div className="menu-item" onClick={() => onSelect("Undone")}>
        Undone
      </div>
    </div>
  );
};

const CustomSelect = ({ selectedOption, onSelectChange }: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hideMenu = () => {
      setIsVisible(false);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        hideMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const showMenu = () => {
    setIsVisible(true);
  };

  const handleSelectChange = (option: SelectOption) => {
    onSelectChange(option);
    setIsVisible(false);
  };

  return (
    <div ref={menuRef} className="select-container">
      <div className="custom-select" onClick={showMenu}>
        <div>{selectedOption}</div>
        <div></div>
      </div>
      {isVisible && <ContextMenu onSelect={handleSelectChange} />}
    </div>
  );
};

export default CustomSelect;
