import { useEffect } from 'react';
import { useEditorStore } from '@/store/useEditorStore';

export const useKeyboardShortcuts = () => {
  const {
    createFile,
    getCurrentFile,
    updateFile,
    toggleSidebar,
    setPreviewMode,
    previewMode,
  } = useEditorStore();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check for modifier keys
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const modifier = isMac ? event.metaKey : event.ctrlKey;

      if (!modifier) return;

      switch (event.key.toLowerCase()) {
        case 'n': {
          event.preventDefault();
          createFile('Untitled', '# New Document\n\nStart writing...');
          break;
        }

        case 's': {
          event.preventDefault();
          // Auto-save is handled by the editor component
          break;
        }

        case 'b': {
          event.preventDefault();
          toggleSidebar();
          break;
        }

        case 'p': {
          event.preventDefault();
          const modes: Array<'split' | 'preview' | 'editor'> = ['split', 'preview', 'editor'];
          const currentIndex = modes.indexOf(previewMode);
          const nextMode = modes[(currentIndex + 1) % modes.length];
          setPreviewMode(nextMode);
          break;
        }

        case 'e': {
          if (event.shiftKey) {
            event.preventDefault();
            setPreviewMode('editor');
          }
          break;
        }

        case 'r': {
          if (event.shiftKey) {
            event.preventDefault();
            setPreviewMode('preview');
          }
          break;
        }

        case '/': {
          event.preventDefault();
          // Focus search (will be implemented)
          break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [createFile, getCurrentFile, updateFile, toggleSidebar, setPreviewMode, previewMode]);
};