import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '@/components/Hero';
import PregnancyTracker from '@/components/PregnancyTracker';
import NutritionGuide from '@/components/NutritionGuide';
import CareSection from '@/components/CareSection';
import MustDoList from '@/components/MustDoList';
import DailyTips from '@/components/DailyTips';
import BodyChanges from '@/components/BodyChanges';
import QuickQuestions from '@/components/QuickQuestions';
import ImageSection from '@/components/ImageSection';
import RuralHealthInfo from '@/components/RuralHealthInfo';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Home = () => {
  const location = useLocation();

  // FIX: Force Scroll to Top on Reload
  useEffect(() => {
    // 1. This tells the browser: "Stop trying to remember my scroll position!"
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // 2. Logic: If there is a specific #link, go there. Otherwise, GO TO TOP.
    if (location.hash) {
      const element = document.getElementById(location.hash.replace('#', ''));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    } else {
      // Force window to top (Hero Section) immediately
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-800">
     
      <Header />
      
      {/* Main Content with cleaner background */}
      <main className="flex-grow bg-slate-50">
        
        {/* HERO SECTION - User will always see this first now */}
        <Hero />
        
        <div className="container mx-auto px-4 py-16 space-y-24 max-w-7xl">
          
          {/* Tracker Section */}
          <section id="pregnancy-tracker" className="scroll-mt-28">
            <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-6 md:p-10">
                  
              <div className="flex justify-center">
  <span className="inline-block py-1 px-3 rounded-full bg-purple-100 text-purple-700 text-sm font-semibold mb-4">
    Weekly Progress
  </span>
</div>

                
              <PregnancyTracker />
            </div>
          </section>
          
          {/* Rural Health Support */}
          <section id="rural-health" className="scroll-mt-28">
             <div className="text-center mb-12">
               <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Rural Health Support</h2>
               <p className="text-slate-600 max-w-2xl mx-auto">Specialized guidance for mothers in remote areas.</p>
             </div>
             <RuralHealthInfo />
          </section>
          
          {/* Image Gallery */}
          <section id="image-gallery" className="scroll-mt-28">
            <ImageSection />
          </section>
          
          {/* Nutrition Guide */}
          <section id="nutrition" className="scroll-mt-28">
            <div className="bg-white rounded-3xl shadow-sm p-6 md:p-10 border border-slate-100">
              <div className="mb-10 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  Nutrition Guide
                </h2>
                <p className="text-slate-600 max-w-2xl mx-auto">
                  Balanced diet plans tailored for your specific trimester.
                </p>
              </div>
              <NutritionGuide />
            </div>
          </section>
          
          {/* Care Guide */}
          <section id="care" className="scroll-mt-28">
             <div className="text-center mb-12">
               <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Comprehensive Care</h2>
               <p className="text-slate-600 max-w-2xl mx-auto">Essential healthcare checks and reminders.</p>
             </div>
            <CareSection />
          </section>
          
          {/* Split Grid: Must Do & Daily Tips */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <section id="must-do" className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-full scroll-mt-28">
              <MustDoList />
            </section>
            
            <section id="daily-tips" className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-full scroll-mt-28">
              <DailyTips />
            </section>
          </div>
          
          {/* Body Changes */}
          <section id="body-changes" className="scroll-mt-28">
            <div className="mb-10 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Understanding Your Body
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Physical and emotional changes to expect this week.
              </p>
            </div>
            <BodyChanges />
          </section>
          
          {/* FAQ Section */}
          <section id="quick-questions" className="scroll-mt-28 mb-12">
            <div className="bg-indigo-50 rounded-3xl p-8 md:p-12">
              <div className="mb-10 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  Common Questions
                </h2>
                <p className="text-slate-600 max-w-2xl mx-auto">
                  Quick answers from medical experts.
                </p>
              </div>
              <QuickQuestions />
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;