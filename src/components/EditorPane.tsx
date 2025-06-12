
import React, { useRef, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';

interface EditorPaneProps {
  content: string;
  onChange: (content: string) => void;
}

export const EditorPane: React.FC<EditorPaneProps> = ({ content, onChange }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      // Auto-resize textarea
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [content]);

  return (
    <div className="h-full flex flex-col border-r border-border">
      <div className="bg-muted/30 px-4 py-2 border-b border-border">
        <h3 className="text-sm font-medium text-foreground">Editor</h3>
      </div>
      
      <div className="flex-1 p-4 overflow-auto">
        <Textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Start typing your markdown here..."
          className="min-h-full w-full resize-none border-0 bg-transparent p-0 text-sm font-mono leading-relaxed focus-visible:ring-0 focus-visible:ring-offset-0"
          style={{ 
            minHeight: 'calc(100vh - 200px)',
            fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Monaco, Inconsolata, "Roboto Mono", monospace'
          }}
        />
      </div>
    </div>
  );
};
