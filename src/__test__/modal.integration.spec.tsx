import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { ModalFormPage } from "../pages";

describe("모달 폼 요구사항", () => {
  describe("모달 닫기", () => {
    it("ESC 키로 모달을 닫을 수 있다", async () => {
      const user = userEvent.setup();
      render(<ModalFormPage />);

      const openButton = screen.getByRole("button", { name: "🚀 신청 폼 작성하기" });
      await user.click(openButton);

      const modal = screen.getByRole("dialog");
      expect(modal).toBeVisible();

      await user.keyboard("{Escape}");

      expect(modal).not.toBeVisible();
    });

    it("바깥 영역(overlay) 클릭으로 모달을 닫을 수 있다", async () => {
      const user = userEvent.setup();
      render(<ModalFormPage />);

      const openButton = screen.getByRole("button", { name: "🚀 신청 폼 작성하기" });
      await user.click(openButton);

      const modal = screen.getByRole("dialog");
      expect(modal).toBeVisible();

      const overlay = screen.getByTestId("modal-overlay");
      await user.click(overlay);

      expect(modal).not.toBeVisible();
    });
  });
});
