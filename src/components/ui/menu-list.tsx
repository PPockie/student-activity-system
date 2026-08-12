import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export interface MenuListItem {
  key: string;
  label: string;
  to?: string;
  onClick?: () => void;
  danger?: boolean;
}

export interface MenuListProps {
  items: MenuListItem[];
  className?: string;
}

function MenuList({ items, className = "" }: MenuListProps) {
  return (
    <nav
      className={`border-ink-100 divide-ink-100 divide-y overflow-hidden rounded-2xl border bg-white ${className}`}
    >
      {items.map(({ key, label, to, onClick, danger }) => {
        const rowClass = danger
          ? "text-danger hover:bg-danger/5 flex w-full items-center justify-center px-4 py-4 text-sm font-semibold transition-colors"
          : "text-ink-900 hover:bg-ink-50 flex w-full items-center justify-between gap-3 px-4 py-4 text-sm font-semibold transition-colors";

        const content = (
          <>
            <span className="min-w-0 truncate">{label}</span>
            {!danger && (
              <ChevronRight
                className="text-ink-300 size-5 shrink-0"
                strokeWidth={2}
                aria-hidden
              />
            )}
          </>
        );

        if (to) {
          return (
            <Link key={key} to={to} className={rowClass}>
              {content}
            </Link>
          );
        }

        return (
          <button
            key={key}
            type="button"
            onClick={onClick}
            className={`${rowClass} cursor-pointer text-left`}
          >
            {content}
          </button>
        );
      })}
    </nav>
  );
}

export default MenuList;
