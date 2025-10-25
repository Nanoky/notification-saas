import { TenantsPage } from '@/features/tenants/react/pages/tenants.page'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/tenants/')({
  component: TenantsPage,
})
