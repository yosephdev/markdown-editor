
import React from 'react';

interface StatusBarProps {
  content: string;
  currentFile: string;
}

export const StatusBar: React.FC<StatusBarProps> = ({ content, currentFile }) => {
  const wordCount = content.split(/\s+/).filter(word => word.length > 0).length;
  const charCount = content.length;
  const lineCount = content.split('\n').length;

  return (
    <div className="border-t border-border bg-muted/30 px-4 py-1 flex items-center justify-between text-xs text-muted-foreground">
      <div className="flex items-center gap-4">
        <span>Ln {lineCount}</span>
        <span>{wordCount} words</span>
        <span>{charCount} characters</span>
      </div>
      
      <div className="flex items-center gap-4">
        <span>Markdown</span>
        <span>UTF-8</span>
      </div>
    </div>
  );
};
