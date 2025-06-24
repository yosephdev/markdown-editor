import React, { useEffect, useRef } from 'react';
import { EditorView, basicSetup } from 'codemirror';
import { markdown } from '@codemirror/lang-markdown';
import { oneDark } from '@codemirror/theme-one-dark';
import { EditorState } from '@codemirror/state';
import { useEditorStore } from '@/store/useEditorStore';

interface CodeMirrorEditorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const CodeMirrorEditor: React.FC<CodeMirrorEditorProps> = ({
  value,
  onChange,
  className = '',
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const { theme, fontSize, wordWrap, lineNumbers } = useEditorStore();

  useEffect(() => {
    if (!editorRef.current) return;

    const extensions = [
      basicSetup,
      markdown(),
      EditorView.updateListener.of((update) => {
        if (update.docChanged) {
          onChange(update.state.doc.toString());
        }
      }),
      EditorView.theme({
        '&': {
          fontSize: `${fontSize}px`,
        },
        '.cm-editor': {
          height: '100%',
        },
        '.cm-scroller': {
          fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Monaco, Inconsolata, "Roboto Mono", monospace',
        },
        '.cm-content': {
          padding: '16px',
          minHeight: '100%',
        },
        '.cm-focused': {
          outline: 'none',
        },
      }),
      EditorView.lineWrapping.of(wordWrap),
    ];

    if (theme === 'dark') {
      extensions.push(oneDark);
    }

    const state = EditorState.create({
      doc: value,
      extensions,
    });

    const view = new EditorView({
      state,
      parent: editorRef.current,
    });

    viewRef.current = view;

    return () => {
      view.destroy();
      viewRef.current = null;
    };
  }, [theme, fontSize, wordWrap, lineNumbers]);

  // Update content when value changes externally
  useEffect(() => {
    if (viewRef.current && viewRef.current.state.doc.toString() !== value) {
      viewRef.current.dispatch({
        changes: {
          from: 0,
          to: viewRef.current.state.doc.length,
          insert: value,
        },
      });
    }
  }, [value]);

  return (
    <div className={`h-full w-full ${className}`}>
      <div ref={editorRef} className="h-full" />
    </div>
  );
};