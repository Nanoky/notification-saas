import { useState } from "react";
import type { DialogComponentProps } from "./state-management";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function PromptDialog({
    title = 'Input Required',
    message,
    placeholder = '',
    defaultValue = '',
    confirmText = 'Submit',
    cancelText = 'Cancel',
    onClose,
}: DialogComponentProps<string | null> & {
    title?: string;
    message?: string;
    placeholder?: string;
    defaultValue?: string;
    confirmText?: string;
    cancelText?: string;
}) {
    const [open, setOpen] = useState(true);
    const [value, setValue] = useState(defaultValue);

    const handleClose = (result: string | null) => {
        setOpen(false);
        setTimeout(() => onClose(result), 150);
    };

    const handleSubmit = () => {
        handleClose(value);
    };

    return (
        <Dialog open={open} onOpenChange={(open) => !open && handleClose(null)}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    {message && <DialogDescription>{message}</DialogDescription>}
                </DialogHeader>
                <div className="py-4">
                    <Input
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder={placeholder}
                        autoFocus
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSubmit();
                            }
                        }}
                    />
                </div>
                <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => handleClose(null)}>
                        {cancelText}
                    </Button>
                    <Button type="button" onClick={handleSubmit}>{confirmText}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}