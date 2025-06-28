import Header from '../components/Header';
import Hero from '../components/Hero';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import FinalCTA from '../components/FinalCTA';
import CampaignAnimation from '../components/CampaignAnimation';
import Footer from '../components/Footer';
import PromoSection from '../components/PromoSection';
import KanbanBoard from '../components/KanbanBoard';
import PerformanceChart from '../components/PerformanceChart';
import { Suspense } from 'react';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <PromoSection />
        <KanbanBoard />
        <HowItWorks />
        <CampaignAnimation />
        <Suspense fallback={<div className="loading">Carregando...</div>}>
          <PerformanceChart />
        </Suspense>
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
} 