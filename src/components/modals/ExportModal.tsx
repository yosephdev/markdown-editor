import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Download, FileText, Globe, FileImage } from 'lucide-react';
import { useEditorStore } from '@/store/useEditorStore';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import jsPDF from 'jspdf';

interface ExportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ open, onOpenChange }) => {
  const { getCurrentFile } = useEditorStore();
  const [format, setFormat] = useState<'html' | 'pdf' | 'md'>('html');
  const [includeCSS, setIncludeCSS] = useState(true);
  const [filename, setFilename] = useState('');
  
  const currentFile = getCurrentFile();

  React.useEffect(() => {
    if (currentFile && open) {
      setFilename(currentFile.name);
    }
  }, [currentFile, open]);

  const handleExport = async () => {
    if (!currentFile) return;

    const finalFilename = filename || currentFile.name;

    switch (format) {
      case 'html':
        exportAsHTML(currentFile.content, finalFilename);
        break;
      case 'pdf':
        exportAsPDF(currentFile.content, finalFilename);
        break;
      case 'md':
        exportAsMarkdown(currentFile.content, finalFilename);
        break;
    }

    onOpenChange(false);
  };

  const exportAsHTML = (content: string, filename: string) => {
    const html = marked(content) as string;
    const sanitizedHTML = DOMPurify.sanitize(html);
    
    const fullHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${filename}</title>
    ${includeCSS ? `
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem;
        }
        h1, h2, h3, h4, h5, h6 {
            margin-top: 2rem;
            margin-bottom: 1rem;
            font-weight: 600;
        }
        h1 { font-size: 2.5rem; }
        h2 { font-size: 2rem; }
        h3 { font-size: 1.5rem; }
        code {
            background: #f4f4f4;
            padding: 0.2rem 0.4rem;
            border-radius: 3px;
            font-family: 'Monaco', 'Menlo', monospace;
        }
        pre {
            background: #f4f4f4;
            padding: 1rem;
            border-radius: 5px;
            overflow-x: auto;
        }
        blockquote {
            border-left: 4px solid #ddd;
            margin: 1rem 0;
            padding-left: 1rem;
            color: #666;
        }
        table {
            border-collapse: collapse;
            width: 100%;
            margin: 1rem 0;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 0.5rem;
            text-align: left;
        }
        th {
            background: #f4f4f4;
        }
    </style>
    ` : ''}
</head>
<body>
    ${sanitizedHTML}
</body>
</html>`;

    const blob = new Blob([fullHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportAsPDF = (content: string, filename: string) => {
    const html = marked(content) as string;
    const sanitizedHTML = DOMPurify.sanitize(html);
    
    // Create a temporary div to render the HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = sanitizedHTML;
    tempDiv.style.fontFamily = 'Arial, sans-serif';
    tempDiv.style.fontSize = '12px';
    tempDiv.style.lineHeight = '1.4';
    tempDiv.style.color = '#000';
    
    document.body.appendChild(tempDiv);
    
    const pdf = new jsPDF();
    const pageHeight = pdf.internal.pageSize.height;
    const pageWidth = pdf.internal.pageSize.width;
    
    // Simple text extraction and PDF generation
    const text = tempDiv.innerText;
    const lines = pdf.splitTextToSize(text, pageWidth - 40);
    
    let y = 20;
    lines.forEach((line: string) => {
      if (y > pageHeight - 20) {
        pdf.addPage();
        y = 20;
      }
      pdf.text(line, 20, y);
      y += 7;
    });
    
    document.body.removeChild(tempDiv);
    pdf.save(`${filename}.pdf`);
  };

  const exportAsMarkdown = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!currentFile) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Export Document</DialogTitle>
          <DialogDescription>
            Choose the format and options for exporting your document.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Filename */}
          <div className="space-y-2">
            <Label htmlFor="filename">Filename</Label>
            <Input
              id="filename"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              placeholder="Enter filename"
            />
          </div>

          {/* Format Selection */}
          <div className="space-y-3">
            <Label>Export Format</Label>
            <RadioGroup value={format} onValueChange={(value: 'html' | 'pdf' | 'md') => setFormat(value)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="html" id="html" />
                <Label htmlFor="html" className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  HTML Document
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pdf" id="pdf" />
                <Label htmlFor="pdf" className="flex items-center gap-2">
                  <FileImage className="h-4 w-4" />
                  PDF Document
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="md" id="md" />
                <Label htmlFor="md" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Markdown File
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* HTML Options */}
          {format === 'html' && (
            <div className="space-y-3">
              <Label>HTML Options</Label>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="include-css"
                  checked={includeCSS}
                  onCheckedChange={(checked) => setIncludeCSS(checked as boolean)}
                />
                <Label htmlFor="include-css">Include default CSS styling</Label>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};