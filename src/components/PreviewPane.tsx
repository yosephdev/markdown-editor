
import React from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

interface PreviewPaneProps {
  content: string;
}

export const PreviewPane: React.FC<PreviewPaneProps> = ({ content }) => {
  const htmlContent = React.useMemo(() => {
    try {
      // Use marked() function directly for synchronous parsing
      const rawHtml = marked(content) as string;
      return DOMPurify.sanitize(rawHtml);
    } catch (error) {
      console.error('Error parsing markdown:', error);
      return '<p>Error parsing markdown</p>';
    }
  }, [content]);

  return (
    <div className="h-full flex flex-col">
      <div className="bg-muted/30 px-4 py-2 border-b border-border">
        <h3 className="text-sm font-medium text-foreground">Preview</h3>
      </div>
      
      <div className="flex-1 p-4 overflow-auto">
        <div 
          className="prose prose-neutral dark:prose-invert max-w-none prose-headings:scroll-m-20 prose-headings:tracking-tight prose-h1:text-4xl prose-h1:font-extrabold prose-h2:text-3xl prose-h2:font-semibold prose-h3:text-2xl prose-h3:font-semibold prose-h4:text-xl prose-h4:font-semibold prose-p:leading-7 prose-a:font-medium prose-a:text-primary prose-a:underline prose-a:underline-offset-4 hover:prose-a:text-primary/80 prose-blockquote:border-l-2 prose-blockquote:border-muted-foreground prose-blockquote:pl-6 prose-blockquote:italic prose-code:relative prose-code:rounded prose-code:bg-muted prose-code:px-[0.3rem] prose-code:py-[0.2rem] prose-code:font-mono prose-code:text-sm prose-pre:overflow-x-auto prose-pre:rounded-lg prose-pre:bg-muted prose-pre:p-4"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
    </div>
  );
};
