
export interface SketchfabOptions {
  autostart?: boolean;
  ui_theme?: 'dark' | 'light';
  ui_infos?: boolean;
  ui_controls?: boolean;
  ui_stop?: boolean;
  transparent?: boolean;
  preload?: boolean;
}

export const buildSketchfabUrl = (
  baseUrl: string,
  options: SketchfabOptions = {}
): string => {
  if (!baseUrl || !baseUrl.includes('sketchfab.com')) {
    return '';
  }

  // Ensure it's an embed URL
  let finalUrl = baseUrl;
  if (!baseUrl.includes('/embed')) {
      // Very basic transform if possible, but the API spec says it's already an embed URL
      // If it weren't, we'd need more complex logic.
  }

  const defaultOptions: SketchfabOptions = {
    autostart: true,
    ui_theme: 'dark',
    ui_infos: false,
    ui_controls: true,
    ui_stop: false,
    transparent: true,
    preload: true,
  };

  const mergedOptions = { ...defaultOptions, ...options };
  
  const params = new URLSearchParams();
  Object.entries(mergedOptions).forEach(([key, value]) => {
    params.append(key, value ? '1' : '0');
  });

  // Sketchfab uses 1/0 for booleans but some keys expect specific strings
  // but for the common ones 1/0 works fine.
  // Exception for ui_theme
  params.set('ui_theme', mergedOptions.ui_theme === 'light' ? 'light' : 'dark');

  const separator = baseUrl.includes('?') ? '&' : '?';
  return `${baseUrl}${separator}${params.toString()}`;
};

export const isValidSketchfabUrl = (url: string): boolean => {
  return !!(url && url.includes('sketchfab.com') && url.includes('embed'));
};
