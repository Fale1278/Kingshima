import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import PublicLayout from './layouts/PublicLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Public Pages
import HomePage from './pages/public/Home';
import ServicesPage from './pages/public/Services';
import ProjectsPage from './pages/public/Projects';
import AboutPage from './pages/public/About';
import PublicProgramsPage from './pages/public/Programs';
import PublicCommunityPage from './pages/public/Community';
import CareersPage from './pages/public/Careers';
import BlogPage from './pages/public/Blog';
import PricingPage from './pages/public/Pricing';
import AdvancedContactPage from './pages/public/Contact';
import Login from './pages/public/Login';
import Register from './pages/public/Register';
import ExplorePage from './pages/public/Explore';
import CurriculumPage from './pages/public/Curriculum';

// Dashboard Pages
import DashboardOverview from './pages/dashboard/Overview';
import ProgramsPage from './pages/dashboard/ProgramsPage';
import CommunityPage from './pages/dashboard/Community';
import EventsPage from './pages/dashboard/Events';
import AchievementsPage from './pages/dashboard/Achievements';
import ProfilePage from './pages/dashboard/Profile';
import CoursePlayer from './pages/dashboard/CoursePlayer';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>; // Could be a highly styled splash/loading component
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<PublicLayout />}>
              <Route index element={<HomePage />} />
              <Route path="services" element={<ServicesPage />} />
              <Route path="projects" element={<ProjectsPage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="programs" element={<PublicProgramsPage />} />
              <Route path="community" element={<PublicCommunityPage />} />
              <Route path="careers" element={<CareersPage />} />
              <Route path="blog" element={<BlogPage />} />
              <Route path="pricing" element={<PricingPage />} />
              <Route path="contact" element={<AdvancedContactPage />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="explore" element={<ExplorePage />} />
              <Route path="curriculum" element={<CurriculumPage />} />
            </Route>

            {/* Dashboard Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }>
              <Route index element={<DashboardOverview />} />
              <Route path="programs" element={<ProgramsPage />} />
              <Route path="community" element={<CommunityPage />} />
              <Route path="events" element={<EventsPage />} />
              <Route path="achievements" element={<AchievementsPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="programs/:id" element={<CoursePlayer />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
