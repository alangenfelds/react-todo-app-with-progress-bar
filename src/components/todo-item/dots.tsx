import { useEffect, useRef, useState } from "react";
import DotsSvg from "./dots.svg";

import "./dots.scss";

const ContextMenu = () => {
  return (
    <div className="dots-context-menu">
      <div className="menu-item">Edit</div>
      <div className="menu-item red">Delete</div>
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

  return (
    <div ref={menuRef} className="three-dots-container" onClick={showMenu}>
      <img src={DotsSvg} alt="three dots" />
      {isVisible && <ContextMenu />}
    </div>
  );
};

export default DotsMenu;
