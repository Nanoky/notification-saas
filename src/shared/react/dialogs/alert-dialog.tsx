import { useState } from "react";
import type { DialogComponentProps } from "./state-management";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function AlertDialog({
  title = 'Alert',
  message,
  buttonText = 'OK',
  onClose,
}: DialogComponentProps<void> & {
  title?: string;
  message: string;
  buttonText?: string;
}) {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => onClose(), 150);
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{message}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={handleClose}>{buttonText}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}