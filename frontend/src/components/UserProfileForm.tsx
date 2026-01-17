import { useState } from "react";
import { Button, Input, Toast } from "antd-mobile";
import "antd-mobile/es/global";

export interface UserProfile {
  username: string;
  email: string;
  age: number;
}

export interface UserProfileFormProps {
  initialData?: Partial<UserProfile>;
  onSubmit?: (data: UserProfile) => void;
  onCancel?: () => void;
  submitButtonText?: string;
}

/**
 * UserProfileForm - 用户资料表单组件
 *
 * 这是一个复杂的表单组件，包含：
 * - 表单状态管理
 * - 输入验证
 * - 用户交互处理
 * - 条件渲染
 * - 错误提示
 */
export default function UserProfileForm({
  initialData = {},
  onSubmit,
  onCancel,
  submitButtonText = "提交",
}: UserProfileFormProps) {
  // 表单状态
  const [username, setUsername] = useState(initialData.username || "");
  const [email, setEmail] = useState(initialData.email || "");
  const [age, setAge] = useState(initialData.age?.toString() || "");

  // UI 状态
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // 验证函数
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // 验证用户名
    if (!username.trim()) {
      newErrors.username = "用户名不能为空";
    } else if (username.length < 3) {
      newErrors.username = "用户名至少需要3个字符";
    }

    // 验证邮箱
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = "邮箱不能为空";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "邮箱格式不正确";
    }

    // 验证年龄
    const ageNum = parseInt(age);
    if (!age) {
      newErrors.age = "年龄不能为空";
    } else if (isNaN(ageNum)) {
      newErrors.age = "年龄必须是数字";
    } else if (ageNum < 1 || ageNum > 150) {
      newErrors.age = "年龄必须在1-150之间";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 提交处理
  const handleSubmit = async () => {
    if (!validateForm()) {
      Toast.show({
        content: "请修正表单错误",
        icon: "fail",
        duration: 2000, // 设置为0表示不自动消失，需要手动关闭
        position: "center",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // 模拟异步提交
      await new Promise((resolve) => setTimeout(resolve, 500));

      const userData: UserProfile = {
        username: username.trim(),
        email: email.trim(),
        age: parseInt(age),
      };

      onSubmit?.(userData);

      setShowSuccessMessage(true);
      Toast.show({
        content: "提交成功！",
        icon: "success",
      });

      // 3秒后隐藏成功消息
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    } catch (error) {
      Toast.show({
        content: "提交失败，请重试",
        icon: "fail",
        duration: 2000,
        position: "center",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // 重置表单
  const handleReset = () => {
    setUsername("");
    setEmail("");
    setAge("");
    setErrors({});
    setShowSuccessMessage(false);
  };

  return (
    <div className="user-profile-form p-4" data-testid="user-profile-form">
      <h2 className="text-xl font-bold mb-4">用户资料表单</h2>

      {/* 成功消息 */}
      {showSuccessMessage && (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4"
          data-testid="success-message"
        >
          表单提交成功！
        </div>
      )}

      {/* 用户名输入 */}
      <div className="mb-4">
        <label className="block mb-2 font-semibold">用户名</label>
        <Input
          placeholder="请输入用户名"
          value={username}
          onChange={(val) => {
            setUsername(val);
            // 清除该字段的错误
            if (errors.username) {
              setErrors({ ...errors, username: "" });
            }
          }}
          data-testid="username-input"
        />
        {errors.username && (
          <div
            className="text-red-500 text-sm mt-1"
            data-testid="username-error"
          >
            {errors.username}
          </div>
        )}
      </div>

      {/* 邮箱输入 */}
      <div className="mb-4">
        <label className="block mb-2 font-semibold">邮箱</label>
        <Input
          placeholder="请输入邮箱"
          value={email}
          onChange={(val) => {
            setEmail(val);
            if (errors.email) {
              setErrors({ ...errors, email: "" });
            }
          }}
          data-testid="email-input"
        />
        {errors.email && (
          <div className="text-red-500 text-sm mt-1" data-testid="email-error">
            {errors.email}
          </div>
        )}
      </div>

      {/* 年龄输入 */}
      <div className="mb-4">
        <label className="block mb-2 font-semibold">年龄</label>
        <Input
          placeholder="请输入年龄"
          type="number"
          value={age}
          onChange={(val) => {
            setAge(val);
            if (errors.age) {
              setErrors({ ...errors, age: "" });
            }
          }}
          data-testid="age-input"
        />
        {errors.age && (
          <div className="text-red-500 text-sm mt-1" data-testid="age-error">
            {errors.age}
          </div>
        )}
      </div>

      {/* 操作按钮 */}
      <div className="flex gap-2 mt-6">
        <Button
          color="primary"
          fill="solid"
          onClick={handleSubmit}
          loading={isSubmitting}
          disabled={isSubmitting}
          data-testid="submit-button"
          className="flex-1"
        >
          {submitButtonText}
        </Button>

        <Button
          color="default"
          fill="outline"
          onClick={handleReset}
          disabled={isSubmitting}
          data-testid="reset-button"
        >
          重置
        </Button>

        {onCancel && (
          <Button
            color="default"
            fill="outline"
            onClick={onCancel}
            disabled={isSubmitting}
            data-testid="cancel-button"
          >
            取消
          </Button>
        )}
      </div>
    </div>
  );
}
