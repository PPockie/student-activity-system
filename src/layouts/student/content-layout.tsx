import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface StudentContentLayoutProps {
  back?: boolean | (() => void);
  pageLabel?: string;
  children: React.ReactNode;
  className?: string;
  scroll?: boolean;
}

function StudentContentLayout({
  back,
  pageLabel,
  children,
  className = "",
  scroll = true,
}: StudentContentLayoutProps) {
  const navigate = useNavigate();
  const handleBack = () => (typeof back === "function" ? back() : navigate(-1));

  return (
    <div className={`flex h-full min-h-0 flex-col gap-4 ${className}`}>
      {(back || pageLabel) && (
        <div className="flex shrink-0 items-center gap-1 pl-2">
          {back && (
            <button
              type="button"
              onClick={handleBack}
              aria-label="ย้อนกลับ"
              className="text-ink-600 hover:bg-ink-50 hover:text-ink-900 -ml-2 flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors"
            >
              <ChevronLeft className="size-6" strokeWidth={2} />
            </button>
          )}
          {pageLabel && <h1 className="truncate text-2xl font-bold">{pageLabel}</h1>}
        </div>
      )}

      <div
        className={
          scroll
            ? "min-h-0 flex-1 space-y-4 overflow-y-auto pb-4"
            : "flex min-h-0 flex-1 flex-col gap-4"
        }
      >
        {children}
      </div>
    </div>
  );
}

export default StudentContentLayout;
