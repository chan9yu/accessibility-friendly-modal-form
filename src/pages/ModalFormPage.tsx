import { FormModal, OpenModalButton } from "../components";
import { useFormModal, type FormData } from "../hooks";

export function ModalFormPage() {
  const { isModalOpen, openFormModal, closeFormModal } = useFormModal();

  const handleModalOpen = async () => {
    const result = await openFormModal();
    console.log("모달 결과:", result);
  };

  const handleFormSubmit = (data: FormData) => {
    closeFormModal(data);
  };

  const handleModalCancel = () => {
    closeFormModal(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <OpenModalButton openModal={handleModalOpen} />
      <FormModal isOpen={isModalOpen} onSubmit={handleFormSubmit} onCancel={handleModalCancel} />
    </div>
  );
}
