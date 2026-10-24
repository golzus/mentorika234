import { j as jsxRuntimeExports } from "../_libs/react.mjs";
function ConfirmDialog({
  onConfirm,
  onCancel
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "fixed inset-0 z-[200] flex items-center justify-center bg-black/50",
      dir: "rtl",
      onClick: onCancel,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "w-[90vw] max-w-[280px] rounded-[16px] bg-white p-8 text-center shadow-2xl",
          onClick: (e) => e.stopPropagation(),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-7 text-[22px] font-bold text-[#222]", children: "בטוח?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-center gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: onConfirm,
                  className: "h-[42px] w-[90px] rounded-[8px] bg-[#f15a48] text-[17px] font-bold text-white shadow-[0_4px_10px_rgba(241,90,72,0.35)] transition-opacity hover:opacity-90",
                  children: "כן"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: onCancel,
                  className: "h-[42px] w-[90px] rounded-[8px] border border-[#222] bg-white text-[17px] font-medium text-[#222] transition-colors hover:bg-gray-50",
                  children: "לא"
                }
              )
            ] })
          ]
        }
      )
    }
  );
}
function getRange(page = 1, pageSize = 50) {
  const safePage = Math.max(1, page);
  const safePageSize = Math.min(Math.max(1, pageSize), 100);
  const from = (safePage - 1) * safePageSize;
  return { from, to: from + safePageSize - 1 };
}
export {
  ConfirmDialog as C,
  getRange as g
};
