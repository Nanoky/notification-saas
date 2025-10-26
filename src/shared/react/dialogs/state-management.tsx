/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext } from "react";

export type DialogConfig<T = any> = {
    id: string;
    component: React.ComponentType<DialogComponentProps<T>>;
    props: any;
    resolve: (value: T) => void;
    reject: (reason?: any) => void;
};

export type DialogComponentProps<T = any> = {
    onClose: (result?: T) => void;
    onCancel: () => void;
} & Record<string, any>;

type DialogContextType = {
    openDialog: <T = any>(dialogId: string, props?: any) => Promise<T>;
    closeDialog: (id: string, result?: any) => void;
    closeAll: () => void;
};

export const DialogContext = createContext<DialogContextType | null>(null);

export const useDialog = () => {
    const context = useContext(DialogContext);
    if (!context) {
        throw new Error('useDialog must be used within DialogProvider');
    }
    return context;
};