import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useEditorStore } from '@/store/useEditorStore';

interface SettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ open, onOpenChange }) => {
  const {
    fontSize,
    setFontSize,
    autoSave,
    toggleAutoSave,
    wordWrap,
    toggleWordWrap,
    lineNumbers,
    toggleLineNumbers,
    theme,
    setTheme,
    editorTheme,
    setEditorTheme,
  } = useEditorStore();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Customize your editor preferences and behavior.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Appearance */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Appearance</h3>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="theme">Dark Mode</Label>
              <Switch
                id="theme"
                checked={theme === 'dark'}
                onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                aria-label="Toggle dark mode"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="editor-theme">Editor Theme</Label>
              <Select value={editorTheme} onValueChange={setEditorTheme}>
                <SelectTrigger id="editor-theme" className="w-full">
                  <SelectValue placeholder="Select a theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="oneDark">One Dark</SelectItem>
                  {/* Add more themes here as they are imported/supported */}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Font Size: {fontSize}px</Label>
              <Slider
                value={[fontSize]}
                onValueChange={(value) => setFontSize(value[0])}
                min={10}
                max={24}
                step={1}
                className="w-full"
                aria-label="Font size slider"
              />
            </div>
          </div>

          <Separator />

          {/* Editor */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Editor</h3>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-save">Auto Save</Label>
              <Switch
                id="auto-save"
                checked={autoSave}
                onCheckedChange={toggleAutoSave}
                aria-label="Toggle auto save"
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="word-wrap">Word Wrap</Label>
              <Switch
                id="word-wrap"
                checked={wordWrap}
                onCheckedChange={toggleWordWrap}
                aria-label="Toggle word wrap"
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="line-numbers">Line Numbers</Label>
              <Switch
                id="line-numbers"
                checked={lineNumbers}
                onCheckedChange={toggleLineNumbers}
                aria-label="Toggle line numbers"
              />
            </div>
          </div>

          <Separator />

          {/* Keyboard Shortcuts */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Keyboard Shortcuts</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex justify-between">
                <span>New File</span>
                <kbd className="px-2 py-1 bg-muted rounded text-xs">Ctrl+N</kbd>
              </div>
              <div className="flex justify-between">
                <span>Toggle Sidebar</span>
                <kbd className="px-2 py-1 bg-muted rounded text-xs">Ctrl+B</kbd>
              </div>
              <div className="flex justify-between">
                <span>Toggle Preview</span>
                <kbd className="px-2 py-1 bg-muted rounded text-xs">Ctrl+P</kbd>
              </div>
              <div className="flex justify-between">
                <span>Editor Only</span>
                <kbd className="px-2 py-1 bg-muted rounded text-xs">Ctrl+Shift+E</kbd>
              </div>
              <div className="flex justify-between">
                <span>Preview Only</span>
                <kbd className="px-2 py-1 bg-muted rounded text-xs">Ctrl+Shift+R</kbd>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};