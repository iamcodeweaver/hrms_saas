import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DemoPage from './pages/DemoPage';
import ContactSection from './components/ContactSection';
import DrawerNavbar from './components/DrawerNavbar';

function App() {
  return (
    <BrowserRouter>
      <DrawerNavbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/demo" element={<DemoPage />} />
        <Route path="/contact" element={<ContactSection />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
