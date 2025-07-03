import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { toast } from '@/components/ui/use-toast';

export interface MarkdownFile {
  id: string;
  name: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  folder?: string;
}

interface EditorState {
  // Files
  files: MarkdownFile[];
  currentFileId: string | null;
  
  // UI State
  sidebarOpen: boolean;
  previewMode: 'split' | 'preview' | 'editor';
  theme: 'light' | 'dark';
  editorTheme: string;
  fontSize: number;
  
  // Editor Settings
  autoSave: boolean;
  wordWrap: boolean;
  lineNumbers: boolean;
  
  // Actions
  createFile: (name: string, content?: string, folder?: string) => string;
  updateFile: (id: string, updates: Partial<MarkdownFile>) => void;
  deleteFile: (id: string) => void;
  setCurrentFile: (id: string | null) => void;
  getCurrentFile: () => MarkdownFile | null;
  
  // UI Actions
  toggleSidebar: () => void;
  setPreviewMode: (mode: 'split' | 'preview' | 'editor') => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setFontSize: (size: number) => void;
  setEditorTheme: (editorTheme: string) => void;
  
  // Settings Actions
  toggleAutoSave: () => void;
  toggleWordWrap: () => void;
  toggleLineNumbers: () => void;
  
  // File Operations
  exportFile: (id: string, format: 'html' | 'pdf' | 'md') => void;
  importFile: (file: File) => Promise<string>;
}

export const useEditorStore = create<EditorState>()(
  persist(
    (set, get) => ({
      // Initial State
      files: [],
      currentFileId: null,
      sidebarOpen: true,
      previewMode: 'split',
      theme: 'light',
      editorTheme: 'oneDark', // Default CodeMirror theme
      fontSize: 14,
      autoSave: true,
      wordWrap: true,
      lineNumbers: true,

      // File Actions
      createFile: (name: string, content = '', folder?: string) => {
        const id = crypto.randomUUID();
        const newFile: MarkdownFile = {
          id,
          name,
          content,
          createdAt: new Date(),
          updatedAt: new Date(),
          folder,
        };
        
        set((state) => ({
          files: [...state.files, newFile],
          currentFileId: id,
        }));
        
        return id;
      },

      updateFile: (id: string, updates: Partial<MarkdownFile>) => {
        set((state) => ({
          files: state.files.map((file) =>
            file.id === id
              ? { ...file, ...updates, updatedAt: new Date() }
              : file
          ),
        }));
      },

      deleteFile: (id: string) => {
        set((state) => ({
          files: state.files.filter((file) => file.id !== id),
          currentFileId: state.currentFileId === id ? null : state.currentFileId,
        }));
      },

      setCurrentFile: (id: string | null) => {
        set({ currentFileId: id });
      },

      getCurrentFile: () => {
        const state = get();
        return state.files.find((file) => file.id === state.currentFileId) || null;
      },

      // UI Actions
      toggleSidebar: () => {
        set((state) => ({ sidebarOpen: !state.sidebarOpen }));
      },

      setPreviewMode: (mode: 'split' | 'preview' | 'editor') => {
        set({ previewMode: mode });
      },

      setTheme: (theme: 'light' | 'dark') => {
        set({ theme });
        document.documentElement.classList.toggle('dark', theme === 'dark');
      },

      setFontSize: (fontSize: number) => {
        set({ fontSize });
      },

      setEditorTheme: (editorTheme: string) => {
        set({ editorTheme });
      },

      // Settings Actions
      toggleAutoSave: () => {
        set((state) => ({ autoSave: !state.autoSave }));
      },

      toggleWordWrap: () => {
        set((state) => ({ wordWrap: !state.wordWrap }));
      },

      toggleLineNumbers: () => {
        set((state) => ({ lineNumbers: !state.lineNumbers }));
      },

      // File Operations
      exportFile: (id: string, format: 'html' | 'pdf' | 'md') => {
        const file = get().files.find((f) => f.id === id);
        if (!file) {
          toast({
            title: 'Export Failed',
            description: 'File not found.',
            variant: 'destructive',
          });
          return;
        }

        try {
          if (format === 'md') {
            const blob = new Blob([file.content], { type: 'text/markdown' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${file.name}.md`;
            a.click();
            URL.revokeObjectURL(url);
            toast({
              title: 'Export Successful',
              description: `${file.name}.md has been downloaded.`,
            });
          } else if (format === 'html') {
            const htmlContent = DOMPurify.sanitize(marked(file.content) as string);
            const blob = new Blob([htmlContent], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${file.name}.html`;
            a.click();
            URL.revokeObjectURL(url);
            toast({
              title: 'Export Successful',
              description: `${file.name}.html has been downloaded.`,
            });
          } else if (format === 'pdf') {
            // PDF export is handled by the ExportModal component, which uses html2canvas and jspdf
            // This action here is primarily for triggering the modal or logging
            toast({
              title: 'PDF Export Initiated',
              description: 'Please confirm options in the export dialog.',
            });
          }
        } catch (error) {
          console.error('Export error:', error);
          toast({
            title: 'Export Failed',
            description: 'An error occurred during export.',
            variant: 'destructive',
          });
        }
      },

      importFile: async (file: File): Promise<string> => {
        try {
          const content = await file.text();
          const name = file.name.replace(/\.md$/, '');
          const newFileId = get().createFile(name, content);
          toast({
            title: 'Import Successful',
            description: `${file.name} has been imported.`,
          });
          return newFileId;
        } catch (error) {
          console.error('Import error:', error);
          toast({
            title: 'Import Failed',
            description: 'An error occurred during file import.',
            variant: 'destructive',
          });
          throw error; // Re-throw to propagate the error if needed
        }
      },
    }),
    {
      name: 'markdown-editor-storage',
      partialize: (state) => ({
        files: state.files,
        currentFileId: state.currentFileId,
        theme: state.theme,
        fontSize: state.fontSize,
        autoSave: state.autoSave,
        wordWrap: state.wordWrap,
        lineNumbers: state.lineNumbers,
        previewMode: state.previewMode,
      }),
    }
  )
);