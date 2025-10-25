import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TenantsSwitcher } from "@/features/tenants/react/components/tenants-switcher";
import { useTenants } from "@/features/tenants/react/hooks/use-tenants.hook";
import { Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { MessageCircleIcon } from "lucide-react";


export function Layout() {
    const { selectedTenant } = useTenants()
    return (
        <div>
            <header className="flex flex-row justify-between px-8 py-4">
                <div className="flex flex-row gap-4">
                    <MessageCircleIcon />
                    {
                        selectedTenant ? (
                            <TenantsSwitcher />
                        ) : (
                            <span>Tenants</span>
                        )
                    }
                </div>
                <div>

                </div>
            </header>
            <SidebarProvider>
                {
                    selectedTenant && (
                        <AppSidebar />
                    )
                }
                <SidebarInset>
                    <main>
                        <Outlet />
                    </main>
                </SidebarInset>
            </SidebarProvider>
            <TanStackRouterDevtools />
        </div>
    )
}