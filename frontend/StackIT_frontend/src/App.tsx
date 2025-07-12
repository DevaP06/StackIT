import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

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
        <Route path="answers" element={<AnswersPage />} /> {/* New route */}
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return (
    <div className="min-h-screen scroll-smooth">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
