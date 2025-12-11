"use client";

import { useState } from "react";

import { Button } from "../ui/button";
import ConfirmDeleteDialog from "../molecules/ConfirmDeleteDialog";

type ModalProps = {
  triggerLabel?: string;
  onConfirm?: () => void;
  triggerVariant?: React.ComponentProps<typeof Button>["variant"];
  triggerSize?: React.ComponentProps<typeof Button>["size"];
  className?: string;
};

const Modal = ({
  triggerLabel = "Delete item",
  onConfirm,
  triggerVariant = "destructive",
  triggerSize = "sm",
  className,
}: ModalProps) => {
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    onConfirm?.();
    setOpen(false);
  };

  return (
    <>
      <Button
        className={className}
        variant={triggerVariant}
        size={triggerSize}
        onClick={() => setOpen(true)}
      >
        {triggerLabel}
      </Button>
      <ConfirmDeleteDialog
        open={open}
        onCancel={() => setOpen(false)}
        onConfirm={handleConfirm}
      />
    </>
  );
};

export default Modal;
