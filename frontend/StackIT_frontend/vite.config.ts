import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
    // 👇 This line fixes 404 when using React Router on refresh or direct URL access
    historyApiFallback: true,
  },
});
