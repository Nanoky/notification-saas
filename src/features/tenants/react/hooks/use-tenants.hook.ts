import { useState } from "react"
import type { Tenant } from "../../core/domain/models/tenant.model"
import z from "zod"
import { useDialog } from "@/shared/react/dialogs/state-management";


export function useTenants() {
    const tenants: Tenant[] = [
        {
            id: "1",
            logo: "",
            name: "Tenant 1",
            plan: "Free"
        }
    ]
    const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);

    const {openDialog} = useDialog();

    function search(params: { name: string }) {
        console.log(params)
    }

    function selectTenant(tenant: Tenant) {
        setSelectedTenant(tenant)
    }

    function navigateAllTenants() {
        console.log("navigate all tenants")
    }

    async function handleAddTenant() {
        const createSchema = z.object({
            name: z.string().min(3, "Name must be at least 3 characters"),
        });

        const result = await openDialog("form", {
            title: "Create Tenant",
            confirmText: "Create",
            cancelText: "Cancel",
            schema: createSchema,
            defaultValues: {
                name: "",
            },
            fields: [
                {
                    name: "name",
                    label: "Name",
                    type: "text",
                    placeholder: "Enter name",
                },
            ],
        });

        console.log("result add tenant", result)
    }

    return {
        tenants,
        selectedTenant,
        search,
        selectTenant,
        navigateAllTenants,
        handleAddTenant
    }
}