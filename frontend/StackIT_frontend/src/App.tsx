import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';

import MainLayout from './pages/MainLayout';
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';
import AskQuestion from './pages/AskQuestion';
import AnswerPage from './pages/AnswerPage';
import AnswersPage from './pages/AnswerPage'; // New import

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="ask" element={<AskQuestion />} />
        <Route path="question/:id" element={<AnswerPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return (
    <AuthProvider>
      <div className="min-h-screen scroll-smooth">
        <RouterProvider router={router} />
        <Toaster position="top-right" />
      </div>
    </AuthProvider>
  );
};

export default App;
