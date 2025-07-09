import {MainSidebar} from '@/components/main-sidebar';
import {
  Sidebar,
  SidebarInset,
  SidebarProvider,
  SidebarRail,
} from '@/components/ui/sidebar';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <Sidebar
        collapsible="icon"
        variant="floating"
        side="right"
        className="hidden h-[320px] md:flex"
      >
        <MainSidebar />
        <SidebarRail />
      </Sidebar>
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
