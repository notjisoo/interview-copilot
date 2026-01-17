import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "antd-mobile/es/global";
import UserProfileForm from "@/components/UserProfileForm";
import type { UserProfile } from "@/components/UserProfileForm";

describe("UserProfileForm Component", () => {
  // 每个测试前重置所有 mock
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("组件渲染测试", () => {
    it("应该正确渲染表单元素", () => {
      render(<UserProfileForm />);

      // 验证标题
      expect(screen.getByText("用户资料表单")).toBeInTheDocument();

      // 验证表单字段
      expect(screen.getByTestId("username-input")).toBeInTheDocument();
      expect(screen.getByTestId("email-input")).toBeInTheDocument();
      expect(screen.getByTestId("age-input")).toBeInTheDocument();

      // 验证按钮
      expect(screen.getByTestId("submit-button")).toBeInTheDocument();
      expect(screen.getByTestId("reset-button")).toBeInTheDocument();
    });

    it("应该使用初始数据渲染", () => {
      const initialData = {
        username: "testuser",
        email: "test@example.com",
        age: 25,
      };

      render(<UserProfileForm initialData={initialData} />);

      const usernameInput = screen
        .getByTestId("username-input")
        .querySelector("input");
      const emailInput = screen
        .getByTestId("email-input")
        .querySelector("input");
      const ageInput = screen.getByTestId("age-input").querySelector("input");

      expect(usernameInput).toHaveValue("testuser");
      expect(emailInput).toHaveValue("test@example.com");
      expect(ageInput).toHaveValue(25);
    });

    it("应该使用自定义提交按钮文本", () => {
      render(<UserProfileForm submitButtonText="保存" />);
      expect(screen.getByText("保存")).toBeInTheDocument();
    });

    it("当提供了 onCancel 回调时应该显示取消按钮", () => {
      const onCancel = vi.fn();
      render(<UserProfileForm onCancel={onCancel} />);
      expect(screen.getByTestId("cancel-button")).toBeInTheDocument();
    });

    it("当没有提供 onCancel 回调时不应该显示取消按钮", () => {
      render(<UserProfileForm />);
      expect(screen.queryByTestId("cancel-button")).not.toBeInTheDocument();
    });
  });

  describe("表单输入测试", () => {
    it("应该能够输入用户名", async () => {
      render(<UserProfileForm />);
      const input = screen
        .getByTestId("username-input")
        .querySelector("input")!;

      await userEvent.type(input, "张三丰");
      expect(input).toHaveValue("张三丰");
    });

    it("应该能够输入邮箱", async () => {
      render(<UserProfileForm />);
      const input = screen.getByTestId("email-input").querySelector("input")!;

      await userEvent.type(input, "zhangsan@example.com");
      expect(input).toHaveValue("zhangsan@example.com");
    });

    it("应该能够输入年龄", async () => {
      render(<UserProfileForm />);
      const input = screen.getByTestId("age-input").querySelector("input")!;

      await userEvent.type(input, "30");
      expect(input).toHaveValue(30);
    });
  });

  describe("表单验证测试", () => {
    it("空用户名应该显示错误", async () => {
      render(<UserProfileForm />);
      const submitButton = screen.getByTestId("submit-button");

      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByTestId("username-error")).toHaveTextContent(
          "用户名不能为空",
        );
      });
    });

    it("用户名少于3个字符应该显示错误", async () => {
      render(<UserProfileForm />);
      const input = screen
        .getByTestId("username-input")
        .querySelector("input")!;
      const submitButton = screen.getByTestId("submit-button");

      await userEvent.type(input, "ab");
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByTestId("username-error")).toHaveTextContent(
          "用户名至少需要3个字符",
        );
      });
    });

    it("空邮箱应该显示错误", async () => {
      render(<UserProfileForm />);
      const submitButton = screen.getByTestId("submit-button");

      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByTestId("email-error")).toHaveTextContent(
          "邮箱不能为空",
        );
      });
    });

    it("无效的邮箱格式应该显示错误", async () => {
      render(<UserProfileForm />);
      const input = screen.getByTestId("email-input").querySelector("input")!;
      const submitButton = screen.getByTestId("submit-button");

      await userEvent.type(input, "invalid-email");
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByTestId("email-error")).toHaveTextContent(
          "邮箱格式不正确",
        );
      });
    });

    it("空年龄应该显示错误", async () => {
      render(<UserProfileForm />);
      const submitButton = screen.getByTestId("submit-button");

      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByTestId("age-error")).toHaveTextContent(
          "年龄不能为空",
        );
      });
    });

    it("年龄超出范围应该显示错误", async () => {
      render(<UserProfileForm />);
      const input = screen.getByTestId("age-input").querySelector("input")!;
      const submitButton = screen.getByTestId("submit-button");

      await userEvent.type(input, "999");
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByTestId("age-error")).toHaveTextContent(
          "年龄必须在1-150之间",
        );
      });
    });

    it("输入内容后应该清除对应字段的错误", async () => {
      render(<UserProfileForm />);
      const submitButton = screen.getByTestId("submit-button");

      // 先触发验证错误
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByTestId("username-error")).toBeInTheDocument();
      });

      // 输入内容
      const input = screen
        .getByTestId("username-input")
        .querySelector("input")!;
      await userEvent.type(input, "testuser");

      // 错误应该被清除
      await waitFor(() => {
        expect(screen.queryByTestId("username-error")).not.toBeInTheDocument();
      });
    });
  });

  describe("表单提交测试", () => {
    it("有效表单应该成功提交", async () => {
      const onSubmit = vi.fn();
      render(<UserProfileForm onSubmit={onSubmit} />);

      // 填写表单
      const usernameInput = screen
        .getByTestId("username-input")
        .querySelector("input")!;
      const emailInput = screen
        .getByTestId("email-input")
        .querySelector("input")!;
      const ageInput = screen.getByTestId("age-input").querySelector("input")!;

      await userEvent.type(usernameInput, "张三丰");
      await userEvent.type(emailInput, "zhangsan@example.com");
      await userEvent.type(ageInput, "30");

      // 提交表单
      const submitButton = screen.getByTestId("submit-button");
      fireEvent.click(submitButton);

      // 验证回调被调用
      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit).toHaveBeenCalledWith({
          username: "张三丰",
          email: "zhangsan@example.com",
          age: 30,
        });
      });
    });

    it("提交时应该显示 loading 状态", async () => {
      render(<UserProfileForm />);

      // 填写有效表单
      const usernameInput = screen
        .getByTestId("username-input")
        .querySelector("input")!;
      const emailInput = screen
        .getByTestId("email-input")
        .querySelector("input")!;
      const ageInput = screen.getByTestId("age-input").querySelector("input")!;

      await userEvent.type(usernameInput, "张三丰");
      await userEvent.type(emailInput, "zhangsan@example.com");
      await userEvent.type(ageInput, "30");

      const submitButton = screen.getByTestId("submit-button");
      fireEvent.click(submitButton);

      // 应该立即显示 loading
      expect(submitButton).toBeDisabled();
    });

    it("提交成功后应该显示成功消息", async () => {
      render(<UserProfileForm />);

      // 填写有效表单
      const usernameInput = screen
        .getByTestId("username-input")
        .querySelector("input")!;
      const emailInput = screen
        .getByTestId("email-input")
        .querySelector("input")!;
      const ageInput = screen.getByTestId("age-input").querySelector("input")!;

      await userEvent.type(usernameInput, "张三丰");
      await userEvent.type(emailInput, "zhangsan@example.com");
      await userEvent.type(ageInput, "30");

      const submitButton = screen.getByTestId("submit-button");
      fireEvent.click(submitButton);

      // 等待成功消息出现
      await waitFor(
        () => {
          expect(screen.getByTestId("success-message")).toBeInTheDocument();
        },
        { timeout: 1000 },
      );
    });
  });

  describe("重置功能测试", () => {
    it("点击重置按钮应该清空表单", async () => {
      render(<UserProfileForm />);

      // 填写表单
      const usernameInput = screen
        .getByTestId("username-input")
        .querySelector("input")!;
      const emailInput = screen
        .getByTestId("email-input")
        .querySelector("input")!;
      const ageInput = screen.getByTestId("age-input").querySelector("input")!;

      await userEvent.type(usernameInput, "张三丰");
      await userEvent.type(emailInput, "zhangsan@example.com");
      await userEvent.type(ageInput, "30");

      // 点击重置
      const resetButton = screen.getByTestId("reset-button");
      fireEvent.click(resetButton);

      // 验证表单被清空
      expect(usernameInput).toHaveValue("");
      expect(emailInput).toHaveValue("");
      expect(ageInput).toHaveValue(null);
    });

    it("重置应该清除错误信息", async () => {
      render(<UserProfileForm />);

      // 先触发验证错误
      const submitButton = screen.getByTestId("submit-button");
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByTestId("username-error")).toBeInTheDocument();
      });

      // 点击重置
      const resetButton = screen.getByTestId("reset-button");
      fireEvent.click(resetButton);

      // 错误应该被清除
      expect(screen.queryByTestId("username-error")).not.toBeInTheDocument();
      expect(screen.queryByTestId("email-error")).not.toBeInTheDocument();
      expect(screen.queryByTestId("age-error")).not.toBeInTheDocument();
    });
  });

  describe("取消功能测试", () => {
    it("点击取消按钮应该调用 onCancel 回调", () => {
      const onCancel = vi.fn();
      render(<UserProfileForm onCancel={onCancel} />);

      const cancelButton = screen.getByTestId("cancel-button");
      fireEvent.click(cancelButton);

      expect(onCancel).toHaveBeenCalledTimes(1);
    });

    it("提交中时取消按钮应该被禁用", async () => {
      const onCancel = vi.fn();
      render(<UserProfileForm onCancel={onCancel} />);

      // 填写有效表单
      const usernameInput = screen
        .getByTestId("username-input")
        .querySelector("input")!;
      const emailInput = screen
        .getByTestId("email-input")
        .querySelector("input")!;
      const ageInput = screen.getByTestId("age-input").querySelector("input")!;

      await userEvent.type(usernameInput, "张三丰");
      await userEvent.type(emailInput, "zhangsan@example.com");
      await userEvent.type(ageInput, "30");

      const submitButton = screen.getByTestId("submit-button");
      fireEvent.click(submitButton);

      // 提交中时取消按钮应该被禁用
      const cancelButton = screen.getByTestId("cancel-button");
      expect(cancelButton).toBeDisabled();
    });
  });
});
