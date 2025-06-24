import React, { useEffect, useState } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toolbar } from '@/components/layout/Toolbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { StatusBar } from '@/components/layout/StatusBar';
import { EditorLayout } from '@/components/editor/EditorLayout';
import { ExportModal } from '@/components/modals/ExportModal';
import { SettingsModal } from '@/components/modals/SettingsModal';
import { useEditorStore } from '@/store/useEditorStore';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient();

const MainEditor: React.FC = () => {
  const { sidebarOpen, theme, createFile, files } = useEditorStore();
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);

  // Initialize theme
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  // Create initial file if no files exist
  useEffect(() => {
    if (files.length === 0) {
      createFile('Welcome', `# Welcome to Markdown Editor

This is a modern, feature-rich markdown editor built with React and TypeScript.

## Features

- 🔄 **Real-time Preview**: See your markdown rendered instantly
- ✨ **Split-pane UI**: Resizable editor and preview panels
- 💡 **Syntax Highlighting**: Rich editing experience with CodeMirror
- 📁 **File Management**: Create, save, rename, and delete files
- 📤 **Export Options**: Export as HTML, PDF, or Markdown
- 📱 **Responsive Design**: Works great on mobile and desktop
- 🎨 **Themes**: Light and dark mode support
- ⚡ **Keyboard Shortcuts**: Efficient workflow with shortcuts
- 💾 **Auto-save**: Never lose your work

## Getting Started

1. Create a new file using **Ctrl+N** or the "New File" button
2. Start typing in the editor on the left
3. See the live preview on the right
4. Use **Ctrl+B** to toggle the sidebar
5. Use **Ctrl+P** to cycle through view modes

## Keyboard Shortcuts

- **Ctrl+N**: New file
- **Ctrl+B**: Toggle sidebar
- **Ctrl+P**: Cycle preview modes
- **Ctrl+Shift+E**: Editor only
- **Ctrl+Shift+R**: Preview only

## Markdown Support

This editor supports GitHub Flavored Markdown including:

- Headers
- **Bold** and *italic* text
- \`inline code\` and code blocks
- Lists and checkboxes
- Tables
- Links and images
- Blockquotes

> Start writing and see the magic happen!

Happy writing! 🚀`);
    }
  }, [files.length, createFile]);

  return (
    <div className="flex flex-col h-screen bg-background">
      <Toolbar />
      
      <div className="flex flex-1 overflow-hidden">
        {sidebarOpen && <Sidebar />}
        <EditorLayout />
      </div>
      
      <StatusBar />
      
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