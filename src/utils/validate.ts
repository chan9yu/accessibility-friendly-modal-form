import type { FormData } from "../hooks";

export type ErrorType = {
  [key: string]: string;
};

export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export function validateForm(data: FormData) {
  const errors: ErrorType = {};

  if (!data.name.trim()) {
    errors.name = "이름을 입력해주세요.";
  }

  if (!data.email.trim()) {
    errors.email = "이메일을 입력해주세요.";
  } else if (!validateEmail(data.email)) {
    errors.email = "올바른 이메일 형식이 아닙니다.";
  }

  if (!data.experience) {
    errors.experience = "경력 연차를 선택해주세요.";
  }

  return errors;
}
