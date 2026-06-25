import { ThemeProvider } from './providers/ThemeProvider';
import { ProgressProvider } from './providers/ProgressProvider';
import { Router } from './Router';

export function App() {
  return (
    <ThemeProvider>
      <ProgressProvider>
        <Router />
      </ProgressProvider>
    </ThemeProvider>
  );
}
