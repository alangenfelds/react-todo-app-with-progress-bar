import "./item-menu.scss";
import { useEffect, useRef, useState } from "react";

import DotsSvg from "./dots.svg";
import { Todo } from "../../types";

export type ItemAction = "Edit" | "Delete";

interface ItemMenuContextMenuProps {
  disableEdit: boolean;
  onSelect: (value: ItemAction) => void;
}

const ContextMenu = ({ onSelect, disableEdit }: ItemMenuContextMenuProps) => {
  return (
    <div className={`dots-context-menu ${disableEdit ? "disabled" : ""}`}>
      {!disableEdit && (
        <div className="menu-item" onClick={() => onSelect("Edit")}>
          Edit
        </div>
      )}
      <div className="menu-item red" onClick={() => onSelect("Delete")}>
        Delete
      </div>
    </div>
  );
};

interface ItemMenuProps {
  todo: Todo;
  onActionSelect: (value: ItemAction) => void;
}

const ItemMenu = ({ todo, onActionSelect }: ItemMenuProps) => {
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

  const handleSelectAction = (value: ItemAction) => {
    onActionSelect(value);
    setIsVisible(false);
  };

  return (
    <div ref={menuRef} className="three-dots-container">
      <div onClick={showMenu} className="dots-button-wrapper">
        <img src={DotsSvg} alt="three dots" />
      </div>
      {isVisible && (
        <ContextMenu
          onSelect={handleSelectAction}
          disableEdit={todo.completed}
        />
      )}
    </div>
  );
};

export default ItemMenu;
