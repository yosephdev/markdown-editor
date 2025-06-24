import React, { useEffect, useState } from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { CodeMirrorEditor } from './CodeMirrorEditor';
import { MarkdownPreview } from './MarkdownPreview';
import { useEditorStore } from '@/store/useEditorStore';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';

export const EditorLayout: React.FC = () => {
  const {
    getCurrentFile,
    updateFile,
    previewMode,
    autoSave,
  } = useEditorStore();

  const [content, setContent] = useState('');
  const currentFile = getCurrentFile();

  // Initialize keyboard shortcuts
  useKeyboardShortcuts();

  // Load current file content
  useEffect(() => {
    if (currentFile) {
      setContent(currentFile.content);
    } else {
      setContent('');
    }
  }, [currentFile]);

  // Auto-save functionality
  useEffect(() => {
    if (!currentFile || !autoSave) return;

    const timeoutId = setTimeout(() => {
      if (content !== currentFile.content) {
        updateFile(currentFile.id, { content });
      }
    }, 1000); // Auto-save after 1 second of inactivity

    return () => clearTimeout(timeoutId);
  }, [content, currentFile, updateFile, autoSave]);

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };

  if (!currentFile) {
    return (
      <div className="flex-1 flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="text-6xl">📝</div>
          <h2 className="text-2xl font-semibold text-foreground">Welcome to Markdown Editor</h2>
          <p className="text-muted-foreground max-w-md">
            Create a new file or select an existing one from the sidebar to start writing.
          </p>
        </div>
      </div>
    );
  }

  if (previewMode === 'editor') {
    return (
      <div className="flex-1 flex flex-col">
        <CodeMirrorEditor
          value={content}
          onChange={handleContentChange}
          className="flex-1"
        />
      </div>
    );
  }

  if (previewMode === 'preview') {
    return (
      <div className="flex-1 flex flex-col">
        <MarkdownPreview content={content} className="flex-1" />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <ResizablePanelGroup direction="horizontal" className="flex-1">
        <ResizablePanel defaultSize={50} minSize={30}>
          <div className="h-full flex flex-col">
            <div className="bg-muted/30 px-4 py-2 border-b border-border">
              <h3 className="text-sm font-medium text-foreground">Editor</h3>
            </div>
            <CodeMirrorEditor
              value={content}
              onChange={handleContentChange}
              className="flex-1"
            />
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={50} minSize={30}>
          <div className="h-full flex flex-col">
            <div className="bg-muted/30 px-4 py-2 border-b border-border">
              <h3 className="text-sm font-medium text-foreground">Preview</h3>
            </div>
            <MarkdownPreview content={content} className="flex-1" />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};