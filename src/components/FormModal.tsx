import { useState, type FormEvent } from "react";

import type { FormData } from "../hooks";
import { validateForm } from "../utils";
import { Modal } from "./Modal";

type ErrorType = {
  [key: string]: string;
};

type FormModalProps = {
  isOpen: boolean;
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
};

export function FormModal({ isOpen, onSubmit, onCancel }: FormModalProps) {
  const [errors, setErrors] = useState<ErrorType>({});

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      experience: formData.get("experience") as string,
      github: (formData.get("github") as string) || undefined,
    };

    const newErrors: ErrorType = validateForm(data);

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onSubmit(data);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onCancel}
      title="신청 폼"
      description="이메일과 FE 경력 연차 등 간단한 정보를 입력해주세요."
    >
      <form onSubmit={handleFormSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            이름 / 닉네임
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            aria-invalid={errors.name ? "true" : "false"}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.name && (
            <p id="name-error" role="alert" aria-live="polite" className="text-red-600 text-sm mt-1">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            이메일
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.email ? "border-red-500" : "border-blue-500"
            }`}
          />
          {errors.email && (
            <p id="email-error" role="alert" aria-live="polite" className="text-red-600 text-sm mt-1">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
            FE 경력 연차
          </label>
          <select
            id="experience"
            name="experience"
            required
            aria-invalid={errors.experience ? "true" : "false"}
            aria-describedby={errors.experience ? "experience-error" : undefined}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.experience ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">선택해주세요</option>
            <option value="0">0-3년</option>
            <option value="1">4-7년</option>
            <option value="2">8년 이상</option>
          </select>
          {errors.experience && (
            <p id="experience-error" role="alert" aria-live="polite" className="text-red-600 text-sm mt-1">
              {errors.experience}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="github" className="block text-sm font-medium text-gray-700 mb-1">
            GitHub 링크 (선택)
          </label>
          <input
            id="github"
            name="github"
            type="url"
            placeholder="https://github.com/username"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
          >
            취소
          </button>
          <button
            type="submit"
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            제출하기
          </button>
        </div>
      </form>
    </Modal>
  );
}
