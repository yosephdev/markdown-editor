
import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { FileText, X, Folder, Plus } from 'lucide-react';

interface SidebarProps {
  onClose: () => void;
  onFileSelect: (filename: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onClose, onFileSelect }) => {
  const recentFiles = [
    'README.md',
    'project-notes.md',
    'todo.md',
    'meeting-notes.md',
  ];

  return (
    <div className="w-64 border-r border-border bg-card flex flex-col">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h2 className="font-semibold text-foreground">Files</h2>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="p-4">
        <Button variant="outline" size="sm" className="w-full justify-start">
          <Plus className="h-4 w-4 mr-2" />
          New File
        </Button>
      </div>

      <Separator />
      
      <ScrollArea className="flex-1">
        <div className="p-4">
          <div className="space-y-1">
            <div className="flex items-center text-sm font-medium text-muted-foreground mb-2">
              <Folder className="h-4 w-4 mr-2" />
              Recent Files
            </div>
            {recentFiles.map((file) => (
              <Button
                key={file}
                variant="ghost"
                size="sm"
                className="w-full justify-start h-8 px-2"
                onClick={() => onFileSelect(file)}
              >
                <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm truncate">{file}</span>
              </Button>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};
