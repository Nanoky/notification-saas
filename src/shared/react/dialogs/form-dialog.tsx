/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import type { DialogComponentProps } from "./state-management";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export function FormDialog({
    title = 'Form',
    description,
    schema,
    fields,
    defaultValues,
    confirmText = 'Submit',
    cancelText = 'Cancel',
    onClose,
}: DialogComponentProps<Record<string, any> | null> & {
    title?: string;
    description?: string;
    schema: z.ZodObject<any>;
    fields: Array<{
        name: string;
        label: string;
        type?: string;
        placeholder?: string;
        description?: string;
        defaultValue?: any
    }>;
    defaultValues?: Record<string, any>;
    confirmText?: string;
    cancelText?: string;
}) {
    const [open, setOpen] = useState(true);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues,
    });

    const handleClose = (result: z.infer<typeof schema> | null) => {
        setOpen(false);
        setTimeout(() => onClose(result), 150);
    };

    const onSubmit = async (data: z.infer<typeof schema>) => {
        handleClose(data);
    };

    return (
        <Dialog open={open} onOpenChange={(open) => !open && handleClose(null)}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    {description && <DialogDescription>{description}</DialogDescription>}
                </DialogHeader>
                <div className="space-y-4 py-4">
                    {fields.map((field) => (
                        <Field key={field.name}>
                            <FieldLabel htmlFor={field.name}>{field.label}</FieldLabel>
                            {field.type === 'textarea' ? (
                                <Textarea
                                    id={field.name}
                                    {...register(field.name)}
                                    placeholder={field.placeholder}
                                    className={errors[field.name] ? 'border-red-500' : ''}
                                />
                            ) : (
                                <Input
                                    id={field.name}
                                    type={field.type || 'text'}
                                    {...register(field.name)}
                                    placeholder={field.placeholder}
                                    className={errors[field.name] ? 'border-red-500' : ''}
                                />
                            )}
                            {field.description && !errors[field.name] && (
                                <FieldDescription className="text-sm text-slate-500">
                                    {field.description}
                                </FieldDescription>
                            )}
                            {errors[field.name] && (
                                <FieldError>{errors[field.name]?.message as string}</FieldError>
                            )}

                        </Field>
                    ))}
                </div>
                <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => handleClose(null)}>
                        {cancelText}
                    </Button>
                    <Button type="button" onClick={handleSubmit(onSubmit)} className="ml-2" disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : confirmText}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}