import { Button } from "@/components/ui/button";
import { DialogHeader, DialogFooter, Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useState } from "react";
import type { DialogComponentProps } from "./state-management";

export function ConfirmDialog({ 
  title = 'Confirm Action',
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'default',
  onClose,
}: DialogComponentProps<boolean> & {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'default' | 'destructive';
}) {
  const [open, setOpen] = useState(true);

  const handleClose = (result: boolean) => {
    setOpen(false);
    setTimeout(() => onClose(result), 150);
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && handleClose(false)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{message}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => handleClose(false)}>
            {cancelText}
          </Button>
          <Button 
            variant={variant === 'destructive' ? 'destructive' : 'default'}
            onClick={() => handleClose(true)}
          >
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}