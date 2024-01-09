import { useEffect, useRef, useState } from "react";
import DotsSvg from "./dots.svg";

import "./dots.scss";

interface ThreeDotsContextMenuProps {
  onSelect: (value: string) => void;
}

const ContextMenu = ({ onSelect }: ThreeDotsContextMenuProps) => {
  return (
    <div className="dots-context-menu">
      <div className="menu-item" onClick={() => onSelect("Edit")}>
        Edit
      </div>
      <div className="menu-item red" onClick={() => onSelect("Delete")}>
        Delete
      </div>
    </div>
  );
};

const DotsMenu = () => {
  const [isVisible, setIsVisible] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const showMenu = () => {
    setIsVisible(true);
  };

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

  const handleSelectAction = () => {
    setIsVisible(false);
  };

  return (
    <div ref={menuRef} className="three-dots-container">
      <div onClick={showMenu} className="dots-button-wrapper">
        <img src={DotsSvg} alt="three dots" />
      </div>
      {isVisible && <ContextMenu onSelect={handleSelectAction} />}
    </div>
  );
};

export default DotsMenu;
