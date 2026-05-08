import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import PublicLayout from './layouts/PublicLayout';

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
import ExplorePage from './pages/public/Explore';
import CurriculumPage from './pages/public/Curriculum';
import PrivacyPage from './pages/public/Privacy';
import TermsPage from './pages/public/Terms';

function App() {
  return (
    <ThemeProvider>
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
              <Route path="explore" element={<ExplorePage />} />
              <Route path="curriculum" element={<CurriculumPage />} />
              <Route path="privacy" element={<PrivacyPage />} />
              <Route path="terms" element={<TermsPage />} />
            </Route>
          </Routes>
        </Router>
    </ThemeProvider>
  );
}

export default App;
