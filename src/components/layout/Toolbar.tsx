import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Menu,
  FileText,
  Save,
  Download,
  Settings,
  Eye,
  EyeOff,
  Split,
  Monitor,
  Sun,
  Moon,
  Plus,
  Upload,
} from 'lucide-react';
import { useEditorStore } from '@/store/useEditorStore';

export const Toolbar: React.FC = () => {
  const {
    toggleSidebar,
    sidebarOpen,
    previewMode,
    setPreviewMode,
    theme,
    setTheme,
    createFile,
    getCurrentFile,
    importFile,
  } = useEditorStore();

  const currentFile = getCurrentFile();

  const handleCreateFile = () => {
    createFile('Untitled', '# New Document\n\nStart writing...');
  };

  const handleImportFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'text/markdown') {
      await importFile(file);
    }
    event.target.value = '';
  };

  const handleExportHTML = () => {
    if (!currentFile) return;
    
    // This will be implemented with the export modal
    console.log('Export HTML');
  };

  const handleExportPDF = () => {
    if (!currentFile) return;
    
    // This will be implemented with the export modal
    console.log('Export PDF');
  };

  return (
    <div className="border-b border-border bg-card px-4 py-2 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleSidebar}
          className="text-muted-foreground hover:text-foreground"
        >
          <Menu className="h-4 w-4" />
        </Button>

        <div className="text-sm font-medium text-foreground px-2">
          {currentFile?.name || 'No file selected'}
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
            <DropdownMenuItem onClick={handleCreateFile}>
              <Plus className="h-4 w-4 mr-2" />
              New File
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <label className="cursor-pointer">
                <Upload className="h-4 w-4 mr-2" />
                Import File
                <input
                  type="file"
                  accept=".md,.markdown"
                  onChange={handleImportFile}
                  className="hidden"
                />
              </label>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled={!currentFile}>
              <Save className="h-4 w-4 mr-2" />
              Save (Auto-saved)
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* View Mode */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              {previewMode === 'split' && <Split className="h-4 w-4 mr-1" />}
              {previewMode === 'editor' && <EyeOff className="h-4 w-4 mr-1" />}
              {previewMode === 'preview' && <Eye className="h-4 w-4 mr-1" />}
              View
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setPreviewMode('split')}>
              <Split className="h-4 w-4 mr-2" />
              Split View
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setPreviewMode('editor')}>
              <EyeOff className="h-4 w-4 mr-2" />
              Editor Only
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setPreviewMode('preview')}>
              <Eye className="h-4 w-4 mr-2" />
              Preview Only
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Export */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" disabled={!currentFile}>
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={handleExportHTML}>
              Export as HTML
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleExportPDF}>
              Export as PDF
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                if (currentFile) {
                  const blob = new Blob([currentFile.content], { type: 'text/markdown' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `${currentFile.name}.md`;
                  a.click();
                  URL.revokeObjectURL(url);
                }
              }}
            >
              Download Markdown
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
          {theme === 'light' ? (
            <Moon className="h-4 w-4" />
          ) : (
            <Sun className="h-4 w-4" />
          )}
        </Button>

        {/* Settings */}
        <Button variant="ghost" size="sm">
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};