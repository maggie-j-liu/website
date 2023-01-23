import { ReactNode } from "react";
import { Dialog } from "@headlessui/react";

const Modal = ({
  children,
  open,
  onClose,
}: {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
}) => {
  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/90" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center px-4 py-8 md:px-8">
        <Dialog.Panel className="relative h-full">{children}</Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default Modal;
