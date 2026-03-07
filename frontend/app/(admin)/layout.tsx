import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function AdminLayout({children,}:{children: React.ReactNode}) {
    return (
        <SidebarProvider>
      <AppSidebar />
      <div className="p-6">
        <SidebarTrigger />
        {children}
      </div>
    </SidebarProvider>
    )
}