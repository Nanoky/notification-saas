
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useTenants } from "../hooks/use-tenants.hook"
import { Card, CardContent } from "@/components/ui/card"

const schema = z.object({
    name: z.string(),
})

export function TenantsPage() {
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: "",
        },
    });

    const { tenants, search, handleAddTenant, selectTenant } = useTenants()

    const handleSearchTenants = (data: z.infer<typeof schema>) => {
        search(data)
    }

    return (
        <div className="flex flex-col gap-8 px-16 pt-16">
            <div className="text-xl">Tenants</div>
            <div className="flex flex-row justify-between">
                <form onSubmit={form.handleSubmit(handleSearchTenants)}>
                    <Field>
                        <Input {...form.register("name")} placeholder="Search tenants" />
                    </Field>
                </form>
                <Button onClick={handleAddTenant}>Add Tenant</Button>
            </div>
            <div className="grid grid-cols-4 gap-4">
                {
                    tenants.map(tenant => (
                        <Card key={tenant.id} onClick={() => selectTenant(tenant)}>
                            <CardContent>
                                <div>{tenant.name}</div>
                            </CardContent>
                        </Card>
                    ))
                }
            </div>
        </div>
    )
}