import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  FileText,
  Plus,
  Search,
  MoreHorizontal,
  Trash2,
  Edit3,
  Download,
  Upload,
  X,
} from 'lucide-react';
import { useEditorStore } from '@/store/useEditorStore';
import { formatDistanceToNow } from 'date-fns';

export const Sidebar: React.FC = () => {
  const {
    files,
    currentFileId,
    createFile,
    deleteFile,
    setCurrentFile,
    updateFile,
    importFile,
    toggleSidebar,
  } = useEditorStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [fileToDelete, setFileToDelete] = useState<string | null>(null);
  const [editingFile, setEditingFile] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');

  const filteredFiles = files.filter((file) =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    file.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateFile = () => {
    const name = `Untitled-${Date.now()}`;
    createFile(name, '# New Document\n\nStart writing...');
  };

  const handleDeleteFile = (fileId: string) => {
    setFileToDelete(fileId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (fileToDelete) {
      deleteFile(fileToDelete);
      setFileToDelete(null);
    }
    setDeleteDialogOpen(false);
  };

  const handleRenameFile = (fileId: string, currentName: string) => {
    setEditingFile(fileId);
    setEditingName(currentName);
  };

  const saveRename = () => {
    if (editingFile && editingName.trim()) {
      updateFile(editingFile, { name: editingName.trim() });
    }
    setEditingFile(null);
    setEditingName('');
  };

  const handleImportFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'text/markdown') {
      await importFile(file);
    }
    event.target.value = '';
  };

  return (
    <div className="w-80 border-r border-border bg-card flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-foreground">Files</h2>
          <Button variant="ghost" size="sm" onClick={toggleSidebar}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Search */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button onClick={handleCreateFile} size="sm" className="flex-1">
            <Plus className="h-4 w-4 mr-2" />
            New File
          </Button>
          <Button variant="outline" size="sm" asChild>
            <label className="cursor-pointer">
              <Upload className="h-4 w-4" />
              <input
                type="file"
                accept=".md,.markdown"
                onChange={handleImportFile}
                className="hidden"
              />
            </label>
          </Button>
        </div>
      </div>

      {/* File List */}
      <ScrollArea className="flex-1">
        <div className="p-2">
          {filteredFiles.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-sm">No files found</p>
              <p className="text-xs mt-1">Create a new file to get started</p>
            </div>
          ) : (
            <div className="space-y-1">
              {filteredFiles.map((file) => (
                <div
                  key={file.id}
                  className={`group relative rounded-lg p-3 cursor-pointer transition-colors hover:bg-accent ${
                    currentFileId === file.id ? 'bg-accent' : ''
                  }`}
                  onClick={() => setCurrentFile(file.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      {editingFile === file.id ? (
                        <Input
                          value={editingName}
                          onChange={(e) => setEditingName(e.target.value)}
                          onBlur={saveRename}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') saveRename();
                            if (e.key === 'Escape') {
                              setEditingFile(null);
                              setEditingName('');
                            }
                          }}
                          className="h-6 text-sm font-medium"
                          autoFocus
                        />
                      ) : (
                        <h3 className="font-medium text-sm truncate">
                          {file.name}
                        </h3>
                      )}
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDistanceToNow(new Date(file.updatedAt), {
                          addSuffix: true,
                        })}
                      </p>
                      <p className="text-xs text-muted-foreground truncate mt-1">
                        {file.content.split('\n')[0].replace(/^#\s*/, '') || 'Empty file'}
                      </p>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRenameFile(file.id, file.name);
                          }}
                        >
                          <Edit3 className="h-4 w-4 mr-2" />
                          Rename
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            const blob = new Blob([file.content], { type: 'text/markdown' });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = `${file.name}.md`;
                            a.click();
                            URL.revokeObjectURL(url);
                          }}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Export
                        </DropdownMenuItem>
                        <Separator />
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteFile(file.id);
                          }}
                          className="text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete File</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this file? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};