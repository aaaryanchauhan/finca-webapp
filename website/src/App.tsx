import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StatsBar } from './components/StatsBar';
import { PropertyHighlightsSection } from './components/PropertyHighlightsSection';
import { SuitesShowcase } from './components/SuitesShowcase';
import { SuiteDetailModal } from './components/SuiteDetailModal';
import { WhatThisPlaceOffersSection } from './components/WhatThisPlaceOffersSection';
import { LocationSection } from './components/LocationSection';
import { StorySection } from './components/StorySection';
import { GallerySection } from './components/GallerySection';
import { HostSection } from './components/HostSection';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';
import { InquiryModal } from './components/InquiryModal';
import type { InquiryPreFillData } from './components/InquiryModal';
import { DigitalTourModal } from './components/DigitalTourModal';
import { DigitalTourBanner } from './components/DigitalTourBanner';
import { PhotosPage } from './components/PhotosPage';
import type { Suite } from './data/villaData';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'photos'>(() => {
    return window.location.hash === '#photos' || window.location.pathname === '/photos' ? 'photos' : 'home';
  });

  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [inquiryData, setInquiryData] = useState<InquiryPreFillData | null>(null);
  
  const [isDigitalTourOpen, setIsDigitalTourOpen] = useState(false);
  const [inspectedSuite, setInspectedSuite] = useState<Suite | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#photos' || window.location.pathname === '/photos') {
        setCurrentPage('photos');
      } else if (window.location.hash === '' || window.location.hash === '#estate') {
        setCurrentPage('home');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleOpenPhotos = () => {
    setCurrentPage('photos');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenInquiry = () => {
    setInquiryData(null);
    setIsInquiryOpen(true);
  };

  const handleReserveSuiteFromModal = (suiteName: string) => {
    setInquiryData({ suiteName });
    setIsInquiryOpen(true);
  };

  const handleCloseInquiry = () => setIsInquiryOpen(false);

  const handleOpenDigitalTour = () => setIsDigitalTourOpen(true);
  const handleCloseDigitalTour = () => setIsDigitalTourOpen(false);

  if (currentPage === 'photos') {
    return (
      <div className="min-h-screen bg-ink-900 text-ivory-100 selection:bg-champagne-500/30 selection:text-white">
        <PhotosPage onBackToHome={handleBackToHome} onOpenInquiry={handleOpenInquiry} />

        {/* Interactive Booking Inquiry Modal */}
        <InquiryModal
          isOpen={isInquiryOpen}
          onClose={handleCloseInquiry}
          initialData={inquiryData}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ink-900 text-ivory-100 selection:bg-champagne-500/30 selection:text-white">
      {/* Glassmorphism Header */}
      <Navbar onOpenInquiry={handleOpenInquiry} onOpenPhotos={handleOpenPhotos} />

      {/* Cinematic Hero */}
      <Hero onOpenDigitalTour={handleOpenDigitalTour} />

      {/* Estate Highlights Bar */}
      <StatsBar />

      {/* Interactive Digital Estate Tour Banner */}
      <DigitalTourBanner onOpenDigitalTour={handleOpenDigitalTour} />

      {/* Property Highlights Section (Pool/Hot Tub, Home Gym, 5-Star Check-in) */}
      <PropertyHighlightsSection />

      {/* Master Suites Section */}
      <SuitesShowcase onInspectSuite={(suite) => setInspectedSuite(suite)} />

      {/* What This Place Offers Amenities Section */}
      <WhatThisPlaceOffersSection />

      {/* Heritage & Design Story */}
      <StorySection />

      {/* Interactive Photo Gallery */}
      <GallerySection onOpenPhotos={handleOpenPhotos} />

      {/* Meet Your Host Section (Meyer Profile & Host Bio) */}
      <HostSection />

      {/* Where You'll Be Google Maps Location Section */}
      <LocationSection />

      {/* Authentic Guest Testimonials */}
      <ReviewsSection />

      {/* Luxury Footer */}
      <Footer onOpenInquiry={handleOpenInquiry} />

      {/* Interactive Booking Inquiry Modal */}
      <InquiryModal
        isOpen={isInquiryOpen}
        onClose={handleCloseInquiry}
        initialData={inquiryData}
      />

      {/* Suite Details Spotlight Modal */}
      <SuiteDetailModal
        suite={inspectedSuite}
        onClose={() => setInspectedSuite(null)}
        onReserveSuite={handleReserveSuiteFromModal}
      />

      {/* Interactive 18-Stop Digital Tour Modal */}
      <DigitalTourModal
        isOpen={isDigitalTourOpen}
        onClose={handleCloseDigitalTour}
      />
    </div>
  );
}
