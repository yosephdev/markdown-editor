import React, { useMemo } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { useEditorStore } from '@/store/useEditorStore';

interface MarkdownPreviewProps {
  content: string;
  className?: string;
}

export const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({
  content,
  className = '',
}) => {
  const { fontSize } = useEditorStore();

  useEffect(() => {
    // Configure marked for GitHub Flavored Markdown once
    marked.setOptions({
      gfm: true,
      breaks: true,
      headerIds: true,
      mangle: false,
    });
  }, []);

  const htmlContent = useMemo(() => {
    try {
      const rawHtml = marked(content) as string;
      return DOMPurify.sanitize(rawHtml);
    } catch (error) {
      console.error('Error parsing markdown:', error);
      return '<p class="text-red-500">Error parsing markdown</p>';
    }
  }, [content]);

  return (
    <div className={`h-full overflow-auto ${className}`} role="document" aria-label="Markdown preview">
      <div
        className="prose prose-neutral dark:prose-invert max-w-none p-6 prose-headings:scroll-m-20 prose-headings:tracking-tight prose-h1:text-4xl prose-h1:font-extrabold prose-h2:text-3xl prose-h2:font-semibold prose-h3:text-2xl prose-h3:font-semibold prose-h4:text-xl prose-h4:font-semibold prose-p:leading-7 prose-a:font-medium prose-a:text-primary prose-a:underline prose-a:underline-offset-4 hover:prose-a:text-primary/80 prose-blockquote:border-l-2 prose-blockquote:border-muted-foreground prose-blockquote:pl-6 prose-blockquote:italic prose-code:relative prose-code:rounded prose-code:bg-muted prose-code:px-[0.3rem] prose-code:py-[0.2rem] prose-code:font-mono prose-code:text-sm prose-pre:overflow-x-auto prose-pre:rounded-lg prose-pre:bg-muted prose-pre:p-4 prose-table:w-full prose-table:border-collapse prose-th:border prose-th:border-muted prose-th:px-4 prose-th:py-2 prose-th:text-left prose-td:border prose-td:border-muted prose-td:px-4 prose-td:py-2"
        style={{ fontSize: `${fontSize}px` }}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </div>
  );
};