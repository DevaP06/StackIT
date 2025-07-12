import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

import MainLayout from './pages/MainLayout';
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';

// Pages based on sidebar
import AskQuestion from './pages/AskQuestion';
import QuestionView from './pages/QuestionView';

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        {/* Default route = HomePage */}
        <Route index element={<HomePage />} />

        {/* Ask question page */}
        <Route path="ask" element={<AskQuestion />} />

        {/* View specific question by ID */}
        <Route path="question/:id" element={<QuestionView />} />

        {/* 404 fallback */}
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
