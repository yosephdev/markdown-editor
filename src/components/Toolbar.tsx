
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Save, 
  FolderOpen, 
  Download, 
  Menu,
  Bold,
  Italic,
  Code,
  Link,
  Image,
  List,
  ListOrdered
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

interface ToolbarProps {
  onFileOperation: (operation: 'new' | 'save' | 'load') => void;
  onExport: (format: 'html' | 'pdf' | 'md') => void;
  onToggleSidebar: () => void;
  sidebarOpen: boolean;
  currentFile: string;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  onFileOperation,
  onExport,
  onToggleSidebar,
  sidebarOpen,
  currentFile,
}) => {
  return (
    <div className="border-b border-border bg-card px-4 py-2 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleSidebar}
          className="text-muted-foreground hover:text-foreground"
        >
          <Menu className="h-4 w-4" />
        </Button>
        
        <div className="text-sm font-medium text-foreground px-2">
          {currentFile}
        </div>
      </div>
      
      <div className="flex items-center gap-1">
        {/* File Operations */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <FileText className="h-4 w-4 mr-1" />
              File
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => onFileOperation('new')}>
              <FileText className="h-4 w-4 mr-2" />
              New
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onFileOperation('load')}>
              <FolderOpen className="h-4 w-4 mr-2" />
              Open
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onFileOperation('save')}>
              <Save className="h-4 w-4 mr-2" />
              Save
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Format Buttons */}
        <div className="hidden md:flex items-center gap-1 border-l border-border pl-2 ml-2">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Bold className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Italic className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Code className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Link className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Image className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <List className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <ListOrdered className="h-4 w-4" />
          </Button>
        </div>

        {/* Export */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="ml-2 border-l border-border pl-2">
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => onExport('html')}>
              Export as HTML
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onExport('pdf')}>
              Export as PDF
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onExport('md')}>
              Download Markdown
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
