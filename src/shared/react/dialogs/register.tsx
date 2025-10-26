/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from "react";
import { DialogContext, type DialogConfig } from "./state-management";
import { ConfirmDialog } from "./confirm-dialog";
import { PromptDialog } from "./prompt-dialog";
import { FormDialog } from "./form-dialog";
import { AlertDialog } from "./alert-dialog";


const dialogRegistry: Record<string, React.ComponentType<any>> = {
    confirm: ConfirmDialog,
    prompt: PromptDialog,
    form: FormDialog,
    alert: AlertDialog,
};

export const DialogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [dialogs, setDialogs] = useState<DialogConfig[]>([]);

    const openDialog = useCallback(<T = any>(dialogId: string, props: any = {}): Promise<T> => {
        return new Promise((resolve, reject) => {
            const component = dialogRegistry[dialogId];
            if (!component) {
                reject(new Error(`Dialog "${dialogId}" not found in registry`));
                return;
            }

            const id = `${dialogId}-${Date.now()}`;
            setDialogs((prev) => [...prev, { id, component, props, resolve, reject }]);
        });
    }, []);

    const closeDialog = useCallback((id: string, result?: any) => {
        setDialogs((prev) => {
            const dialog = prev.find((d) => d.id === id);
            if (dialog) {
                dialog.resolve(result);
            }
            return prev.filter((d) => d.id !== id);
        });
    }, []);

    const closeAll = useCallback(() => {
        setDialogs((prev) => {
            prev.forEach((d) => d.reject(new Error('Dialog closed')));
            return [];
        });
    }, []);

    return (
        <DialogContext.Provider value={{ openDialog, closeDialog, closeAll }}>
            {children}
            {dialogs.map((dialog) => {
                const DialogComponent = dialog.component;
                return (
                    <DialogComponent
                        key={dialog.id}
                        {...dialog.props}
                        onClose={(result: any) => closeDialog(dialog.id, result)}
                        onCancel={() => closeDialog(dialog.id, undefined)}
                    />
                );
            })}
        </DialogContext.Provider>
    );
};