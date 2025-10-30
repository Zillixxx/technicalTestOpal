import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import InternshipDetailPage from './pages/InternshipDetailPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/internship/:id" element={<InternshipDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}
