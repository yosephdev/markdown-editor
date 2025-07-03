import React, { useState } from 'react';
import { useThemeInitializer } from '@/hooks/useThemeInitializer';
import { useInitialFileCreator } from '@/hooks/useInitialFileCreator';
import { useThemeInitializer } from '@/hooks/useThemeInitializer';
import { useInitialFileCreator } from '@/hooks/useInitialFileCreator';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toolbar } from '@/components/layout/Toolbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import { StatusBar } from '@/components/layout/StatusBar';
import { EditorLayout } from '@/components/editor/EditorLayout';
import { ExportModal } from '@/components/modals/ExportModal';
import { SettingsModal } from '@/components/modals/SettingsModal';
import { useEditorStore } from '@/store/useEditorStore';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient();

const MainEditor: React.FC = () => {
  const { sidebarOpen, toggleSidebar } = useEditorStore();
  useThemeInitializer();
  useInitialFileCreator();
  const isMobile = useIsMobile();
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);

  useThemeInitializer();

  

  return (
    <div className="flex flex-col h-screen bg-background">
      <header>
        <Toolbar
          onOpenExport={() => setExportModalOpen(true)}
          onOpenSettings={() => setSettingsModalOpen(true)}
        />
      </header>
      
      <main className="flex flex-1 overflow-hidden">
        {isMobile ? (
          <Sheet open={sidebarOpen} onOpenChange={toggleSidebar}>
            <SheetContent side="left" size="sm" className="p-0">
              <aside>
                <Sidebar isMobile={isMobile} onFileSelect={() => toggleSidebar()} />
              </aside>
            </SheetContent>
          </Sheet>
        ) : (
          sidebarOpen && (
            <aside>
              <Sidebar />
            </aside>
          )
        )}
        <EditorLayout />
      </main>
      
      <footer>
        <StatusBar />
      </footer>
      
      <ExportModal open={exportModalOpen} onOpenChange={setExportModalOpen} />
      <SettingsModal open={settingsModalOpen} onOpenChange={setSettingsModalOpen} />
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainEditor />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;