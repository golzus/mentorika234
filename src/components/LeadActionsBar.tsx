import {
  BellIcon,
  ChatIcon,
  DiamondIcon,
  EnvelopeIcon,
  LinkIcon,
  PencilIcon,
  PhoneIcon,
  TrashIcon,
} from "@/components/icons/lead-row-icons";
import type { Lead, LeadStatus } from "@/lib/db/schemas";

/**
 * 8-icon lead-row action bar, matching the Figma design (node 5157:764):
 * diamond / link / chat quick-set the lead's status, phone / email open
 * tel: and mailto: links, the pencil and trash edit/delete the lead, and
 * the bell is a visual placeholder for a future reminder feature.
 */
export function LeadActionsBar({
  lead,
  onEdit,
  onDelete,
  onStatusChange,
  highlight = false,
  className = "",
}: {
  lead: Lead;
  onEdit: () => void;
  onDelete: () => void;
  /** Omit to hide the diamond/link/chat status-shortcut buttons (compact contexts). */
  onStatusChange?: (status: LeadStatus) => void;
  highlight?: boolean;
  className?: string;
}) {
  const activeBg = highlight ? "bg-white/30" : "bg-[#0d0221]/10";
  const hoverBg = highlight ? "hover:bg-white/20" : "hover:bg-[#0d0221]/5";

  const iconButtonClass = (isActive: boolean) =>
    `flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full text-[#0d0221] transition-colors ${
      isActive ? activeBg : hoverBg
    }`;

  return (
    <div className={`flex shrink-0 items-center gap-[10px] sm:gap-[14px] ${className}`} dir="ltr">
      {onStatusChange && (
        <>
          <button
            type="button"
            onClick={() => onStatusChange("closed")}
            title='העברה ל"לידים שסגרו"'
            aria-label='העברה ל"לידים שסגרו"'
            className={iconButtonClass(lead.status === "closed")}
          >
            <DiamondIcon className="h-[15px] w-[16px]" />
          </button>

          <button
            type="button"
            onClick={() => onStatusChange("new")}
            title='העברה ל"לידים שיצרו קשר"'
            aria-label='העברה ל"לידים שיצרו קשר"'
            className={iconButtonClass(lead.status === "new")}
          >
            <LinkIcon className="h-[15px] w-[15px]" />
          </button>

          <button
            type="button"
            onClick={() => onStatusChange("in_progress")}
            title='העברה ל"לידים במו״מ"'
            aria-label='העברה ל"לידים במו״מ"'
            className={iconButtonClass(lead.status === "in_progress")}
          >
            <ChatIcon className="h-[16px] w-[17px]" />
          </button>
        </>
      )}

      {lead.phone ? (
        <a
          href={`tel:${lead.phone}`}
          title="חיוג"
          aria-label="חיוג"
          className={iconButtonClass(false)}
        >
          <PhoneIcon className="h-[17px] w-[18px]" />
        </a>
      ) : (
        <span className="flex h-[26px] w-[26px] shrink-0 cursor-default items-center justify-center text-[#0d0221]/30">
          <PhoneIcon className="h-[17px] w-[18px]" />
        </span>
      )}

      {lead.email ? (
        <a
          href={`mailto:${lead.email}`}
          title="שליחת מייל"
          aria-label="שליחת מייל"
          className={iconButtonClass(false)}
        >
          <EnvelopeIcon className="h-[14px] w-[18px]" />
        </a>
      ) : (
        <span className="flex h-[26px] w-[26px] shrink-0 cursor-default items-center justify-center text-[#0d0221]/30">
          <EnvelopeIcon className="h-[14px] w-[18px]" />
        </span>
      )}

      <button
        type="button"
        onClick={onDelete}
        title="מחיקת ליד"
        aria-label="מחיקת ליד"
        className={`${iconButtonClass(false)} hover:text-[#d94e3e]`}
      >
        <TrashIcon className="h-[16px] w-[14px]" />
      </button>

      <button
        type="button"
        onClick={onEdit}
        title="עריכת ליד"
        aria-label="עריכת ליד"
        className={iconButtonClass(false)}
      >
        <PencilIcon className="h-[15px] w-[15px]" />
      </button>

      {onStatusChange && (
        <span
          title="תזכורות — בקרוב"
          aria-label="תזכורות — בקרוב"
          className="flex h-[26px] w-[26px] shrink-0 cursor-default items-center justify-center text-[#0d0221]/30"
        >
          <BellIcon className="h-[14px] w-[13px]" />
        </span>
      )}
    </div>
  );
}
