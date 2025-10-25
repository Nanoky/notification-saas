import { BoxesIcon } from "lucide-react";
import type { Tenant } from "../../core/domain/models/tenant.model";

export function TenantLogo({ className }: { tenant: Tenant, className?: string }) {
    return (
        <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
            <BoxesIcon className={className} />
        </div>
    )
}