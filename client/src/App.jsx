import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import DegreesPage from './pages/DegreesPage.jsx';
import YearsPage from './pages/YearPage.jsx';
import CoursesPage from './pages/CoursePage.jsx';
import LessonsPage from './pages/LessonListPage.jsx';
import VideoComponent from './components/VideoComponent.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from './context/AuthContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

function App() {
  const { authUser } = useAuthContext();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Routes>
        <Route path="/" element={authUser ? <Navigate to="/degrees" /> : <LoginPage />} />
        <Route path="/login" element={authUser ? <Navigate to="/degrees" /> : <LoginPage />} />
        <Route path="/signup" element={authUser ? <Navigate to="/degrees" /> : <SignupPage />} />

        {/* Protected routes */}
        <Route path="/degrees" element={<ProtectedRoute element={<DegreesPage />} />} />
        <Route path="/degrees/:degreeName" element={<ProtectedRoute element={<YearsPage />} />} />
        <Route path="/courses/:yearName/:degreeName" element={<ProtectedRoute element={<CoursesPage />} />} />
        <Route path="/lessons/:courseName" element={<ProtectedRoute element={<LessonsPage />} />} />
        <Route path="/lesson/:lessonName" element={<ProtectedRoute element={<VideoComponent />} />} />

        {/* Handle unmatched routes */}
        <Route path="*" element={<Navigate to="/NotFoundPage" />} />
        <Route path="/NotFoundPage" element={<ProtectedRoute element={<VideoComponent />} />} />

      </Routes>
      <Toaster />
      <Footer />
    </div>
  );
}

export default App;
