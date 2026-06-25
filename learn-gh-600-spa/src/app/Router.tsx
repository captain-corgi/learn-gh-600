import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from '@/components/pages/HomePage';
import { StudyPlan } from '@/components/pages/StudyPlan';
import { DomainDetail } from '@/components/pages/DomainDetail';
import { ExamsIndex } from '@/components/pages/ExamsIndex';
import { ExamPage } from '@/components/pages/ExamPage';
import { LabsIndex } from '@/components/pages/LabsIndex';
import { LabDetail } from '@/components/pages/LabDetail';
import { SearchPage } from '@/components/pages/SearchPage';
import { NotFound } from '@/components/pages/NotFound';
import { AppLayout } from './AppLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'study-plan', element: <StudyPlan /> },
      { path: 'study-plan/:domainId', element: <DomainDetail /> },
      { path: 'exams', element: <ExamsIndex /> },
      { path: 'exams/:examId', element: <ExamPage /> },
      { path: 'labs', element: <LabsIndex /> },
      { path: 'labs/:labId', element: <LabDetail /> },
      { path: 'search', element: <SearchPage /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
