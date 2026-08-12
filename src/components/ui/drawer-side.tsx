import { Drawer } from "antd";

export interface DrawerSideProps {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  placement?: "left" | "right";
  size?: number | string;
  extra?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
}

function DrawerSide({
  open,
  onClose,
  title,
  placement = "right",
  size = 480,
  extra,
  footer,
  children,
}: DrawerSideProps) {
  return (
    <Drawer
      open={open}
      onClose={onClose}
      placement={placement}
      size={size}
      destroyOnHidden
      title={title}
      extra={extra}
      footer={footer}
      styles={{ body: { paddingInline: 20 } }}
    >
      {children}
    </Drawer>
  );
}

export default DrawerSide;
