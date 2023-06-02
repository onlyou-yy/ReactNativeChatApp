import React from "react";
import { waitFor, cleanup, fireEvent, render } from "@testing-library/react";
import Menu, { MenuMode, MenuProps } from "./menu";
import MenuItem from "./menuItem";
import SubMenu from "./subMenu";

const testProps = {
  defaultIndex: "0",
  onSelect: jest.fn(),
  className: "test",
};

function generateMenu(props: MenuProps) {
  return (
    <Menu {...props}>
      <MenuItem>active</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem>xyz</MenuItem>
      <SubMenu title="dropdown">
        <MenuItem>drop1</MenuItem>
      </SubMenu>
      <SubMenu title="opened">
        <MenuItem>opened1</MenuItem>
      </SubMenu>
    </Menu>
  );
}

function createCssFile() {
  const cssFile = `
    .submenu{
      display: none;  
    }
    .submenu.menu-opened{
      display: block;
    }
  `;
  const styleEl = document.createElement("style");
  styleEl.type = "text/css";
  styleEl.innerHTML = cssFile;
  return styleEl;
}

let view: HTMLElement,
  wrapper: HTMLElement,
  activeElement: HTMLElement,
  disabledElement: HTMLElement,
  defaultElement: HTMLElement;

describe("测试Menu和MenuItem组件", () => {
  beforeEach(() => {
    view = render(generateMenu(testProps));
    view.container.append(createCssFile());
    wrapper = view.getByTestId("menu-test");
    activeElement = view.getByText("active");
    disabledElement = view.getByText("disabled");
    defaultElement = view.getByText("xyz");
  });
  it("是否能正确渲染默认的 Menu 和 MenuItem 组件", () => {
    expect(wrapper).toBeInTheDocument();
    expect(wrapper).toHaveClass("menu test");
    expect(wrapper.querySelectorAll(":scope > li").length).toEqual(5);
    expect(activeElement).toHaveClass(...["menu-item", "is-active"]);
    expect(disabledElement).toHaveClass("menu-item is-disabled");
  });

  it("点击 MenuItem 组件是否能正确调用事件回调", () => {
    fireEvent.click(defaultElement);
    expect(defaultElement).toHaveClass("is-active");
    expect(activeElement).not.toHaveClass("is-active");
    expect(testProps.onSelect).toHaveBeenCalledWith("2");
    fireEvent.click(disabledElement);
    expect(disabledElement).not.toHaveClass("is-active");
    expect(testProps.onSelect).not.toHaveBeenCalledWith("1");
  });

  it("是否能正确渲染纵向的 Menu 和 MenuItem 组件", () => {
    cleanup(); //每次 it 之后都会调用，这里要调用，如果不调用就会有多个wrapper
    const view = render(
      generateMenu({ ...testProps, mode: MenuMode.Vertical })
    );
    wrapper = view.getByTestId("menu-test");
    expect(wrapper).toBeInTheDocument();
    expect(wrapper).toHaveClass(...["menu-vertical", "menu", "test"]);
    expect(wrapper).not.toHaveClass("menu-horizontal");
    expect(wrapper.querySelectorAll(":scope > li").length).toEqual(5);
    expect(activeElement).toHaveClass(...["menu-item", "is-active"]);
    expect(disabledElement).toHaveClass("menu-item is-disabled");
  });

  it("SubMenu 是否正常显示", async () => {
    expect(view.queryByText("drop1")).not.toBeVisible();
    const dropdownElement = view.getByText("dropdown");
    fireEvent.mouseEnter(dropdownElement);
    await waitFor(() => {
      expect(view.queryByText("drop1")).toBeVisible();
    });
    fireEvent.click(view.getByText("drop1"));
    expect(testProps.onSelect).toHaveBeenCalledWith("3-0");
    fireEvent.mouseLeave(dropdownElement);
    await waitFor(() => {
      expect(view.queryByText("drop1")).not.toBeVisible();
    });
  });
});
