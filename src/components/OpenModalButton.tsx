type OpenModalButtonProps = {
  openModal: () => void;
};

export function OpenModalButton({ openModal }: OpenModalButtonProps) {
  return (
    <button
      onClick={openModal}
      className="inline-flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all shadow-lg"
    >
      🚀 신청 폼 작성하기
    </button>
  );
}
