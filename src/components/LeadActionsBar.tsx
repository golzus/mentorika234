import leadActionsSvg from "@/assets/figma/lead-actions.svg";

/**
 * Renders the original lead-actions.svg with 4 invisible click zones on top:
 *  1. Phone (green)  — opens tel: link
 *  2. Email (red)    — opens mailto: link
 *  3. Edit  (dark)   — calls onEdit
 *  4. Trash (dark)   — calls onDelete
 *
 * The SVG viewBox is 0 0 93 25, with icons at approximately:
 *  phone  0–26%, email 26–54%, pencil 54–78%, trash 78–100%
 */
export function LeadActionsBar({
  phone,
  email,
  onEdit,
  onDelete,
  className = "h-[34px] w-[130px]",
}: {
  phone?: string | null;
  email?: string | null;
  onEdit: () => void;
  onDelete: () => void;
  className?: string;
}) {
  return (
    <div className={`relative shrink-0 ${className}`}>
      <img src={leadActionsSvg} alt="" className="h-full w-full object-contain" />

      {/* Phone */}
      {phone ? (
        <a
          href={`tel:${phone}`}
          className="absolute inset-y-0 left-0 w-[26%] cursor-pointer"
          aria-label="חייג"
        />
      ) : (
        <span className="absolute inset-y-0 left-0 w-[26%] cursor-default" />
      )}

      {/* Email */}
      {email ? (
        <a
          href={`mailto:${email}`}
          className="absolute inset-y-0 left-[26%] w-[28%] cursor-pointer"
          aria-label="שלח מייל"
        />
      ) : (
        <span className="absolute inset-y-0 left-[26%] w-[28%] cursor-default" />
      )}

      {/* Edit */}
      <button
        onClick={onEdit}
        className="absolute inset-y-0 left-[54%] w-[24%] cursor-pointer"
        aria-label="עריכה"
      />

      {/* Delete */}
      <button
        onClick={onDelete}
        className="absolute inset-y-0 right-0 w-[22%] cursor-pointer"
        aria-label="מחיקה"
      />
    </div>
  );
}
