import React, { useContext } from "react";
import classNames from "classnames";
import { MenuContext } from "./menu";

export interface MenuItemProps {
  disabled?: boolean;
  index?: string;
  className?: string;
  style?: React.CSSProperties;
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
  const { className, style, children, disabled, index } = props;
  const context = useContext(MenuContext);
  const classes = classNames("menu-item", className, {
    "is-disabled": disabled,
    "is-active": index === context.index,
  });
  const handleClick = () => {
    if (context.onSelect && !disabled && index !== undefined) {
      context.onSelect(index);
    }
  };
  return (
    <li style={style} className={classes} onClick={handleClick}>
      {children}
    </li>
  );
};

MenuItem.displayName = "MenuItem";
MenuItem.defaultProps = {
  disabled: false,
};

export default MenuItem;
