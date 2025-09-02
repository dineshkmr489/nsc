import { createSlice } from '@reduxjs/toolkit';

const getInitialTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    return savedTheme;
  }
  
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  
  return 'light';
};

const initialState = {
  theme: getInitialTheme(),
  isAutoDetect: !localStorage.getItem('theme'),
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      state.theme = newTheme;
      state.isAutoDetect = false;
      localStorage.setItem('theme', newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
    },
    
    setTheme: (state, action) => {
      state.theme = action.payload;
      state.isAutoDetect = false;
      localStorage.setItem('theme', action.payload);
      document.documentElement.setAttribute('data-theme', action.payload);
    },
    
    setAutoDetect: (state) => {
      state.isAutoDetect = true;
      localStorage.removeItem('theme');
      const systemTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches 
        ? 'dark' 
        : 'light';
      state.theme = systemTheme;
      document.documentElement.setAttribute('data-theme', systemTheme);
    },
    
    updateFromSystem: (state) => {
      if (state.isAutoDetect) {
        const systemTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches 
          ? 'dark' 
          : 'light';
        
        if (state.theme !== systemTheme) {
          state.theme = systemTheme;
          document.documentElement.setAttribute('data-theme', systemTheme);
        }
      }
    },
  },
});

export const { toggleTheme, setTheme, setAutoDetect, updateFromSystem } = themeSlice.actions;

export const listenForSystemThemeChanges = () => (dispatch) => {
  if (window.matchMedia) {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
      dispatch(updateFromSystem());
    };
    
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }
};

export const selectCurrentTheme = (state) => state.theme.theme;
export const selectIsAutoDetect = (state) => state.theme.isAutoDetect;
export const selectIsDarkMode = (state) => state.theme.theme === 'dark';

export default themeSlice.reducer;