import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
        if (!file) return;

        if (format === 'md') {
          const blob = new Blob([file.content], { type: 'text/markdown' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${file.name}.md`;
          a.click();
          URL.revokeObjectURL(url);
        }
        // HTML and PDF export will be implemented in components
      },

      importFile: async (file: File): Promise<string> => {
        const content = await file.text();
        const name = file.name.replace(/\.md$/, '');
        return get().createFile(name, content);
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