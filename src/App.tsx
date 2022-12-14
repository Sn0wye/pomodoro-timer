import { ThemeProvider } from 'styled-components';

import { Router } from './components/Router';
import { CyclesContextProvider } from './hooks/useCycles';
import { GlobalStyle } from './styles/global';
import { defaultTheme } from './styles/themes/default';

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CyclesContextProvider>
        <GlobalStyle />
        <Router />
      </CyclesContextProvider>
    </ThemeProvider>
  );
}
