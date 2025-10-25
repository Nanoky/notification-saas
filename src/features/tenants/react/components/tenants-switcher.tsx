
import { ChevronsUpDown, Plus } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTenants } from "../hooks/use-tenants.hook"
import { TenantLogo } from "./tenant-logo"
import type { Tenant } from "../../core/domain/models/tenant.model"
import { Button } from "@/components/ui/button"

export function TenantsSwitcher() {
  const { tenants, selectedTenant, selectTenant, navigateAllTenants, handleAddTenant } = useTenants();

  const activeTeam = selectedTenant;

  if (activeTeam === null) {
    return null
  }

  const handleSelectTenant = (tenant: Tenant) => {
    selectTenant(tenant)
  }

  const handleAllTenants = () => {
    navigateAllTenants()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
            <TenantLogo tenant={activeTeam} className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{activeTeam.name}</span>
            <span className="truncate text-xs">{activeTeam.plan}</span>
          </div>
          <ChevronsUpDown className="ml-auto" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
        align="start"
        side={"bottom"}
        sideOffset={4}
      >
        <DropdownMenuLabel className="text-muted-foreground text-xs">
          Tenants
        </DropdownMenuLabel>
        {tenants.map((team, index) => (
          <DropdownMenuItem
            key={team.name}
            onClick={() => handleSelectTenant(team)}
            className="gap-2 p-2"
          >
            <div className="flex size-6 items-center justify-center rounded-md border">
              <TenantLogo tenant={team} className="size-3.5 shrink-0" />
            </div>
            {team.name}
            <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2 p-2" onClick={handleAllTenants}>
          <div className="text-muted-foreground font-medium">All tenants</div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2 p-2" onClick={handleAddTenant}>
          <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
            <Plus className="size-4" />
          </div>
          <div className="text-muted-foreground font-medium">Add tenant</div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
