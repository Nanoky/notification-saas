import { useState } from "react"
import type { Tenant } from "../../core/domain/models/tenant.model"


export function useTenants() {
    const tenants: Tenant[] = [
        {
            id: "1",
            logo: "",
            name: "Tenant 1",
            plan: "Free"
        }
    ]
    const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null)

    function search(params: { name: string }) {
        console.log(params)
    }

    function selectTenant(tenant: Tenant) {
        setSelectedTenant(tenant)
    }

    function navigateAllTenants() {
        console.log("navigate all tenants")
    }

    function handleAddTenant() {
        console.log("add tenant")
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