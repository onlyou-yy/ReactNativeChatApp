import classNames from "classnames";
import React, { useContext, useState } from "react";
import { MenuContext, MenuMode } from "./menu";
import { MenuItemProps } from "./menuItem";

export interface SubMenuProps {
  title: string;
  index?: string;
  className?: string;
  style?: React.CSSProperties;
}

type TimerType = string | number | NodeJS.Timeout | undefined;

const SubMenu: React.FC<SubMenuProps> = (props) => {
  const { title, index: parentIndex, children, className, style } = props;
  const context = useContext(MenuContext);
  const openSubMenus = context.defaultOpenSubMenus as string[];
  const isOpened =
    parentIndex && context.mode === MenuMode.Vertical
      ? openSubMenus.includes(parentIndex!)
      : false;
  const [menuOpen, setMenuOpen] = useState(isOpened);
  const classes = classNames("menu-item submenu-item", className, {
    "is-active": parentIndex === context.index,
  });
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(!menuOpen);
  };
  let timer: TimerType;
  const handleHover = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer);
    e.preventDefault();
    timer = setTimeout(() => {
      setMenuOpen(toggle);
    }, 300);
  };
  const clickEvents =
    context.mode === "vertical"
      ? {
          onClick: handleClick,
        }
      : {};
  const hoverEvents =
    context.mode !== "vertical"
      ? {
          onMouseEnter: (e: React.MouseEvent) => {
            handleHover(e, true);
          },
          onMouseLeave: (e: React.MouseEvent) => {
            handleHover(e, false);
          },
        }
      : {};

  const renderChildren = () => {
    const subMenuClasses = classNames("submenu", {
      "menu-opened": menuOpen,
    });
    const childrenComponent = React.Children.map(children, (child, index) => {
      const childElement =
        child as React.FunctionComponentElement<MenuItemProps>;
      const { displayName } = childElement.type;
      if (displayName === "MenuItem" || displayName === "SubMenu") {
        return React.cloneElement(childElement, {
          index: parentIndex + "-" + index,
        });
      } else {
        console.error(
          "Warning: Menu has a child which is not a MenuItem component"
        );
      }
    });
    return <ul className={subMenuClasses}>{childrenComponent}</ul>;
  };
  return (
    <li key={parentIndex} className={classes} style={style} {...hoverEvents}>
      <div className="submenu-title" {...clickEvents}>
        {title}
      </div>
      {renderChildren()}
    </li>
  );
};

SubMenu.displayName = "SubMenu";

export default SubMenu;
