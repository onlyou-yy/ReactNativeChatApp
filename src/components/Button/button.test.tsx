import React from "react";
// render 是渲染在内存中，screen是当前页面的
import { fireEvent, render, screen } from "@testing-library/react";
import Button, { ButtonSize, ButtonType } from "./button";

const defaultProps = {
  onClick: jest.fn(),
};

const testProps = {
  btnType: ButtonType.Primary,
  size: ButtonSize.Large,
  className: "klass",
};

const disabledBtnProps = {
  disabled: true,
  onClick: jest.fn(),
};

test("our first react test case", () => {
  const view = render(<Button>Nice</Button>);
  const element = view.queryByText("Nice") as HTMLButtonElement;
  expect(element).toBeTruthy();
  expect(element).toBeInTheDocument();
});

describe("test button component", () => {
  // it 和 test 是一样的
  it("should render the correct default button", () => {
    const view = render(<Button {...defaultProps}>Nice</Button>);
    const element = view.getByText("Nice") as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual("BUTTON");
    expect(element).toHaveClass("btn btn-default");
    expect(element.disabled).toBeFalsy();
    fireEvent.click(element);
    expect(defaultProps.onClick).toHaveBeenCalled();
  });

  it("should render the correct component based on different props", () => {
    const view = render(<Button {...testProps}>Nice</Button>);
    const element = view.getByText("Nice") as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual("BUTTON");
    expect(element).toHaveClass(...["btn", "btn-primary", "btn-lg", "klass"]);
  });

  it("should render a link when btnType equals link and href is provided", () => {
    const view = render(
      <Button btnType={ButtonType.Link} href="#">
        Nice
      </Button>
    );
    const element = view.getByText("Nice") as HTMLAnchorElement;
    expect(element).toBeInTheDocument();
    expect(element.href).toBeTruthy();
    expect(element.tagName).toEqual("A");
    expect(element).toHaveClass(...["btn", "btn-link"]);
  });

  it("should render a link when disabled is true,link can not be click", () => {
    const view = render(
      <Button btnType={ButtonType.Link} {...disabledBtnProps}>
        Nice
      </Button>
    );
    const element = view.getByText("Nice") as HTMLAnchorElement;
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual("A");
    expect(element).toHaveClass(...["btn-link", "disabled"]);
    fireEvent.click(element);
    expect(disabledBtnProps.onClick).not.toHaveBeenCalled();
  });
});
