import React from 'react';
import { useEditorStore } from '@/store/useEditorStore';

export const StatusBar: React.FC = () => {
  const { getCurrentFile, previewMode, theme, autoSave } = useEditorStore();
  const currentFile = getCurrentFile();

  const getStats = () => {
    if (!currentFile) return { words: 0, characters: 0, lines: 0 };
    
    const content = currentFile.content;
    const words = content.split(/\s+/).filter(word => word.length > 0).length;
    const characters = content.length;
    const lines = content.split('\n').length;
    
    return { words, characters, lines };
  };

  const stats = getStats();

  return (
    <div className="border-t border-border bg-muted/30 px-4 py-1 flex items-center justify-between text-xs text-muted-foreground">
      <div className="flex items-center gap-4">
        <span>Lines: {stats.lines}</span>
        <span>Words: {stats.words}</span>
        <span>Characters: {stats.characters}</span>
      </div>
      
      <div className="flex items-center gap-4">
        <span className="capitalize">{previewMode} mode</span>
        <span className="capitalize">{theme} theme</span>
        {autoSave && <span>Auto-save: On</span>}
        <span>Markdown</span>
      </div>
    </div>
  );
};