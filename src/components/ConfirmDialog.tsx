export function ConfirmDialog({
  onConfirm,
  onCancel,
}: {
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50"
      dir="rtl"
      onClick={onCancel}
    >
      <div
        className="w-[90vw] max-w-[280px] rounded-[16px] bg-white p-8 text-center shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="mb-7 text-[22px] font-bold text-[#222]">בטוח?</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="h-[42px] w-[90px] rounded-[8px] bg-[#f15a48] text-[17px] font-bold text-white shadow-[0_4px_10px_rgba(241,90,72,0.35)] transition-opacity hover:opacity-90"
          >
            כן
          </button>
          <button
            onClick={onCancel}
            className="h-[42px] w-[90px] rounded-[8px] border border-[#222] bg-white text-[17px] font-medium text-[#222] transition-colors hover:bg-gray-50"
          >
            לא
          </button>
        </div>
      </div>
    </div>
  );
}
