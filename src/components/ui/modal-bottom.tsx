import { Modal } from "antd";
import { X } from "lucide-react";

export interface ModalBottomProps {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  hideCloseButton?: boolean;
  maxHeight?: string;
  bodyClassName?: string;

  footer?: React.ReactNode;
  children: React.ReactNode;
}

function ModalBottom({
  open,
  onClose,
  title,
  hideCloseButton = false,
  maxHeight = "95vh",
  bodyClassName = "",
  footer,
  children,
}: ModalBottomProps) {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      closable={false}
      destroyOnHidden
      width="100%"
      title={null}
      transitionName="modal-slide-up"
      maskTransitionName="ant-fade"
      style={{ top: "auto", margin: 0, maxWidth: "100%", paddingBottom: 0, maxHeight }}
      styles={{
        container: {
          maxHeight,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          padding: 0,
        },
        body: {
          display: "flex",
          flexDirection: "column",
          flex: 1,
          minHeight: 0,
          padding: 0,
        },
      }}
      classNames={{
        wrapper: "flex items-end",
        container: "rounded-b-none!",
      }}
    >
      <div className="relative shrink-0 px-5 pt-3 pb-2">
        <span className="bg-ink-200 mx-auto block h-1 w-10 rounded-full" aria-hidden />

        {title && (
          <h2 className="text-ink-900 mt-2 pr-10 text-lg font-semibold">{title}</h2>
        )}

        {!hideCloseButton && (
          <button
            type="button"
            onClick={onClose}
            aria-label="ปิด"
            className="text-ink-500 hover:bg-ink-50 absolute top-2 right-3 flex size-9 cursor-pointer items-center justify-center rounded-full transition-colors"
          >
            <X className="size-5" />
          </button>
        )}
      </div>

      <div className={`min-h-0 flex-1 overflow-y-auto px-5 py-5 ${bodyClassName}`}>
        {children}
      </div>

      {footer && (
        <div className="border-ink-100 shrink-0 border-t bg-white px-5 pt-4 pb-[max(2rem,env(safe-area-inset-bottom))]">
          {footer}
        </div>
      )}
    </Modal>
  );
}

export default ModalBottom;
