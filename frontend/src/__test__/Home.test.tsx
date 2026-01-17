import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "antd-mobile/es/global";
import Home from "../pages/Home";

describe("Home Component", () => {
  it("should render Tailwind success message", () => {
    render(<Home />);

    // 检查文本是否存在
    expect(
      screen.getByText("Tailwind v4 Install successfully!"),
    ).toBeInTheDocument();
  });

  it("should render the first button with correct text", () => {
    render(<Home />);

    // 检查按钮是否存在
    expect(screen.getByText("1 Button")).toBeInTheDocument();
  });

  it("should render Test component button", () => {
    render(<Home />);

    // 检查内部组件的按钮
    expect(screen.getByText("Test")).toBeInTheDocument();
  });

  it("should render None button from antd-mobile", () => {
    render(<Home />);

    // 检查 antd-mobile 按钮
    expect(screen.getByText("None")).toBeInTheDocument();
  });
});
