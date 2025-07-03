import { useEffect } from 'react';
import { useEditorStore } from '@/store/useEditorStore';

export const useInitialFileCreator = () => {
  const { files, createFile } = useEditorStore();

  useEffect(() => {
    if (files.length === 0) {
      createFile('Welcome', `# Welcome to Markdown Editor\n\nThis is a modern, feature-rich markdown editor built with React and TypeScript.\n\n## Features\n\n- 🔄 **Real-time Preview**: See your markdown rendered instantly\n- ✨ **Split-pane UI**: Resizable editor and preview panels\n- 💡 **Syntax Highlighting**: Rich editing experience with CodeMirror\n- 📁 **File Management**: Create, save, rename, and delete files\n- 📤 **Export Options**: Export as HTML, PDF, or Markdown\n- 📱 **Responsive Design**: Works great on mobile and desktop\n- 🎨 **Themes**: Light and dark mode support\n- ⚡ **Keyboard Shortcuts**: Efficient workflow with shortcuts\n- 💾 **Auto-save**: Never lose your work\n\n## Getting Started\n\n1. Create a new file using **Ctrl+N** or the "New File" button\n2. Start typing in the editor on the left\n3. See the live preview on the right\n4. Use **Ctrl+B** to toggle the sidebar\n5. Use **Ctrl+P** to cycle through view modes\n\n## Keyboard Shortcuts\n\n- **Ctrl+N**: New file\n- **Ctrl+B**: Toggle sidebar\n- **Ctrl+P**: Cycle preview modes\n- **Ctrl+Shift+E**: Editor only\n- **Ctrl+Shift+R**: Preview only\n\n## Markdown Support\n\nThis editor supports GitHub Flavored Markdown including:\n\n- Headers\n- **Bold** and *italic* text\n- `inline code` and code blocks\n- Lists and checkboxes\n- Tables\n- Links and images\n- Blockquotes\n\n> Start writing and see the magic happen!\n\nHappy writing! 🚀`);
    }
  }, [files.length, createFile]);
};