import { useCallback, useState } from 'react';
import AnnouncementBar from './components/AnnouncementBar.jsx';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import ProductHighlights from './components/ProductHighlights.jsx';
import ProductIntroduction from './components/ProductIntroduction.jsx';
import EyeHealthEducation from './components/EyeHealthEducation.jsx';
import Ingredients from './components/Ingredients.jsx';
import ProductDetails from './components/ProductDetails.jsx';
import PricingPackages from './components/PricingPackages.jsx';
import OrderForm from './components/OrderForm.jsx';
import TrustInformation from './components/TrustInformation.jsx';
// Reviews are not on the page while there are none to show: the placeholder
// cards were empty skeletons that only added height. Re-add <Testimonials />
// below <TrustInformation /> once real, authorised customer feedback exists,
// and fill the `reviews` array in src/components/Testimonials.jsx.
import FAQ from './components/FAQ.jsx';
import FinalCTA from './components/FinalCTA.jsx';
import Footer from './components/Footer.jsx';
import LegalDialog from './components/LegalDialog.jsx';
import { useReveal } from './hooks/useReveal.js';
import { useStructuredData } from './hooks/useStructuredData.js';

export default function App() {
  /**
   * The selected package lives here so the pricing cards and the order form
   * stay in step. Choosing a package anywhere on the page scrolls to the form
   * with that package already selected, and the selection survives until the
   * visitor changes it.
   */
  const [selectedPackage, setSelectedPackage] = useState('best-value');
  const [legalOpen, setLegalOpen] = useState(null);

  useReveal();
  useStructuredData();

  const choosePackage = useCallback((id) => {
    setSelectedPackage(id);
    const target = document.getElementById('order');
    if (!target) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({
      behavior: reduced ? 'auto' : 'smooth',
      block: 'start',
    });
  }, []);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:rounded-full focus:bg-gold focus:px-5 focus:py-3 focus:font-bold focus:text-forest-deep"
      >
        Skip to content
      </a>

      <AnnouncementBar />
      <Header />

      <main id="main">
        <Hero />
        <ProductHighlights />
        <ProductIntroduction />
        <EyeHealthEducation />
        <Ingredients />
        <ProductDetails />
        <PricingPackages
          selected={selectedPackage}
          onSelect={choosePackage}
        />
        <OrderForm
          selected={selectedPackage}
          onSelect={setSelectedPackage}
        />
        <TrustInformation />
        <FAQ />
        <FinalCTA />
      </main>

      <Footer onOpenLegal={setLegalOpen} />

      <LegalDialog openId={legalOpen} onClose={() => setLegalOpen(null)} />
    </>
  );
}
