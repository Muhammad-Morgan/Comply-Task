"use client";

import React from "react";
import { useState } from "react";
import SuccessModalDialog from "../organisms/SuccessModalDialog";
import { Button } from "../ui/button";
import { Check } from "lucide-react";

type ModalProps = {
  triggerLabel?: React.JSX.Element;
  onConfirm?: () => void;
  triggerVariant?: React.ComponentProps<typeof Button>["variant"];
  triggerSize?: React.ComponentProps<typeof Button>["size"];
  className?: string;
};
const ModalSuccess = ({
  triggerLabel,
  onConfirm,
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
        size={triggerSize}
        onClick={() => setOpen(true)}
      >
        {triggerLabel ?? (
          <>
            <Check className="size-5" /> Submit user
          </>
        )}
      </Button>
      <SuccessModalDialog
        open={open}
        onCancel={() => setOpen(false)}
        onConfirm={handleConfirm}
      />
    </>
  );
};

export default ModalSuccess;
