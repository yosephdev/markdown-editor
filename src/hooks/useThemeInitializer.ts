import { useEffect } from 'react';
import { useEditorStore } from '@/store/useEditorStore';

export const useThemeInitializer = () => {
  const { theme } = useEditorStore();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);
};