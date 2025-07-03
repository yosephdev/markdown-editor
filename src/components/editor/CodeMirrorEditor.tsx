import React, { useEffect, useRef } from 'react';
import { EditorView, basicSetup } from 'codemirror';
import { lineNumbers, keymap } from '@codemirror/view';
import { markdown } from '@codemirror/lang-markdown';
import { oneDark } from '@codemirror/theme-one-dark';
import { githubLight, githubDark } from '@uiw/codemirror-theme-github';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { solarizedLight, solarizedDark } from '@uiw/codemirror-theme-solarized';
import { EditorState, Extension } from '@codemirror/state';
import { history, historyKeymap } from '@codemirror/commands';
import { searchKeymap, highlightSelectionMatches } from '@codemirror/search';
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
  const { theme, fontSize, wordWrap, lineNumbers: showLineNumbers, editorTheme } = useEditorStore();

  useEffect(() => {
    if (!editorRef.current) return;

    const extensions = [
      basicSetup,
      markdown(),
      history(),
      keymap.of(historyKeymap),
      highlightSelectionMatches(),
      keymap.of(searchKeymap),
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
    ];

    // Conditionally add line wrapping
    if (wordWrap) {
      extensions.push(EditorView.lineWrapping);
    }

    // Conditionally add line numbers
    if (showLineNumbers) {
      extensions.push(lineNumbers());
    }

    if (theme === 'dark') {
      extensions.push(oneDark);
    }

    // Apply selected editor theme
    const themes: { [key: string]: Extension } = {
      oneDark: oneDark,
      githubLight: githubLight,
      githubDark: githubDark,
      dracula: dracula,
      solarizedLight: solarizedLight,
      solarizedDark: solarizedDark,
    };

    if (themes[editorTheme]) {
      extensions.push(themes[editorTheme]);
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
  }, [theme, fontSize, wordWrap, showLineNumbers, editorTheme, onChange, value]);

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
    <div className={`h-full w-full ${className}`} role="textbox" aria-label="Markdown editor">
      <div ref={editorRef} className="h-full" />
    </div>
  );
};