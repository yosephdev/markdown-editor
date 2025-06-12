
import React, { useState, useCallback } from 'react';
import { EditorPane } from './EditorPane';
import { PreviewPane } from './PreviewPane';
import { Toolbar } from './Toolbar';
import { Sidebar } from './Sidebar';
import { StatusBar } from './StatusBar';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';

const MarkdownEditor = () => {
  const [content, setContent] = useState(`# Welcome to Markdown Editor

This is a **real-time** markdown editor with live preview functionality.

## Features

- Live preview
- Export functionality
- Syntax highlighting
- File operations
- Responsive design

### Try editing this text!

You can write *italic*, **bold**, and even \`inline code\`.

\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`

> This is a blockquote

- [ ] Todo item
- [x] Completed item

---

Happy writing! 🚀`);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentFile, setCurrentFile] = useState('Untitled.md');

  const handleContentChange = useCallback((newContent: string) => {
    setContent(newContent);
  }, []);

  const handleExport = useCallback((format: 'html' | 'pdf' | 'md') => {
    // Export functionality will be implemented here
    console.log(`Exporting as ${format}`);
  }, []);

  const handleFileOperation = useCallback((operation: 'new' | 'save' | 'load') => {
    // File operations will be implemented here
    console.log(`File operation: ${operation}`);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-background">
      <Toolbar 
        onFileOperation={handleFileOperation}
        onExport={handleExport}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        sidebarOpen={sidebarOpen}
        currentFile={currentFile}
      />
      
      <div className="flex flex-1 overflow-hidden">
        {sidebarOpen && (
          <Sidebar 
            onClose={() => setSidebarOpen(false)}
            onFileSelect={setCurrentFile}
          />
        )}
        
        <ResizablePanelGroup direction="horizontal" className="flex-1">
          <ResizablePanel defaultSize={50} minSize={30}>
            <EditorPane 
              content={content}
              onChange={handleContentChange}
            />
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          <ResizablePanel defaultSize={50} minSize={30}>
            <PreviewPane content={content} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
      
      <StatusBar 
        content={content}
        currentFile={currentFile}
      />
    </div>
  );
};

export default MarkdownEditor;
