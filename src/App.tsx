import React from "react";
import Button, { ButtonSize, ButtonType } from "./components/Button/button";
import Menu, { MenuMode } from "./components/Menu/menu";
import MenuItem from "./components/Menu/menuItem";
import SubMenu from "./components/Menu/subMenu";

function App() {
  return (
    <div className="App">
      <Button>hello world</Button>
      <Button size={ButtonSize.Large} btnType={ButtonType.Primary}>
        hello world
      </Button>
      <Button size={ButtonSize.Small} btnType={ButtonType.Danger}>
        hello world
      </Button>
      <Button
        size={ButtonSize.Small}
        btnType={ButtonType.Primary}
        disabled={true}
      >
        hello world
      </Button>
      <Button href="#" size={ButtonSize.Small} btnType={ButtonType.Link}>
        hello world
      </Button>
      <Button
        href="#"
        size={ButtonSize.Small}
        btnType={ButtonType.Link}
        disabled={true}
      >
        hello world
      </Button>
      <hr />
      <Menu
        onSelect={console.log}
        mode={MenuMode.Vertical}
        defaultOpenSubMenus={["3"]}
      >
        <MenuItem>list item 1</MenuItem>
        <MenuItem disabled>list item 2</MenuItem>
        <MenuItem>list item 3</MenuItem>
        <SubMenu title="submenu">
          <MenuItem>submenu list item 1</MenuItem>
          <MenuItem>submenu list item 2</MenuItem>
        </SubMenu>
        <MenuItem>list item 4</MenuItem>
      </Menu>
      <hr />
    </div>
  );
}

export default App;
