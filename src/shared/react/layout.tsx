import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";


export function Layout() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header>

                </header>
                <main>
                    <Outlet />
                </main>
                <footer></footer>
                <TanStackRouterDevtools />
            </SidebarInset>
        </SidebarProvider>
    )
}