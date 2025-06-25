# Instant Markdown Canvas

A modern, real-time markdown editor with live preview functionality built with React, TypeScript, and Shadcn UI components.

![Instant Markdown Canvas](./public/instant-markdown-canvas-preview.png)

## 🚀 Features

- **Real-time Preview**: See your markdown rendered instantly as you type
- **Split-pane Interface**: Resizable editor and preview panels
- **Syntax Highlighting**: Clear formatting for code blocks and markdown syntax
- **Modern UI**: Clean, responsive design using Shadcn UI components
- **File Management**: Create, save, and load markdown files
- **Export Options**: Export your content as HTML, PDF, or Markdown
- **Responsive Design**: Works on desktop and mobile devices
- **Sidebar Navigation**: Easy access to your files and folders

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with Shadcn UI components
- **Routing**: React Router DOM
- **Markdown Processing**: Marked.js
- **Security**: DOMPurify for sanitizing HTML output
- **State Management**: React Query for async state
- **Build Tool**: Vite

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn or bun

## 🔧 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yosephdev/markdown-editor
   cd markdown-editor
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   # or
   bun install
   ```

3. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   bun dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## 🖥️ Usage

1. **Creating a new document**: Click the "New" button in the toolbar
2. **Editing**: Type your markdown in the left panel
3. **Preview**: See the rendered output in the right panel
4. **Saving**: Click the "Save" button to save your document
5. **Exporting**: Use the export dropdown to choose your preferred format
6. **File Management**: Toggle the sidebar to access your files

## 📝 Markdown Support

Instant Markdown Canvas supports standard markdown syntax including:

- Headers (# H1, ## H2, etc.)
- Emphasis (*italic*, **bold**)
- Lists (ordered and unordered)
- Links and images
- Code blocks with syntax highlighting
- Blockquotes
- Horizontal rules
- Task lists
- Tables

## 🔍 Project Structure

```
instant-markdown-canvas/
├── public/               # Static assets
├── src/
│   ├── components/       # React components
│   │   ├── ui/           # Shadcn UI components
│   │   ├── EditorPane.tsx
│   │   ├── MarkdownEditor.tsx
│   │   ├── PreviewPane.tsx
│   │   ├── Sidebar.tsx
│   │   ├── StatusBar.tsx
│   │   └── Toolbar.tsx
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   ├── pages/            # Page components
│   ├── App.tsx           # Main application component
│   └── main.tsx          # Entry point
├── package.json          # Dependencies and scripts
└── vite.config.ts        # Vite configuration
```

## 🧪 Running Tests

```bash
npm run test
# or
yarn test
# or
bun test
```

## 🚢 Deployment

1. Build the production version:

   ```bash
   npm run build
   # or
   yarn build
   # or
   bun run build
   ```

2. The build output will be in the `dist` directory, which can be deployed to any static hosting service like Netlify, Vercel, GitHub Pages, or AWS S3.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👏 Acknowledgments

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Marked.js](https://marked.js.org/)
- [DOMPurify](https://github.com/cure53/DOMPurify)

## 📧 Contact

Yoseph Berhane - [contact@yoseph.dev](mailto:your.email@example.com)

Project Link: [https://github.com/yosephdev/markdown-editor](https://github.com/yosephdev/markdown-editor)
