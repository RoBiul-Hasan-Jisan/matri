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

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-maternity-pink/20 via-white to-maternity-blue/20">
      {/* Hero Section */}
      <Hero />
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-12 max-w-7xl">
        {/* Pregnancy Week Tracker */}
        <section id="pregnancy-tracker" className="scroll-mt-20">
          <PregnancyTracker />
        </section>
        
        {/* Rural Health Information */}
        <section id="rural-health" className="scroll-mt-20">
          <RuralHealthInfo />
        </section>
        
        {/* Image Gallery */}
        <section id="image-gallery" className="scroll-mt-20">
          <ImageSection />
        </section>
        
        {/* Nutrition Guide */}
        <section id="nutrition" className="scroll-mt-20">
          <NutritionGuide />
        </section>
        
        {/* Pregnancy Care */}
        <section id="care" className="scroll-mt-20">
          <CareSection />
        </section>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Must Do Section */}
          <section id="must-do" className="scroll-mt-20">
            <MustDoList />
          </section>
          
          {/* Daily Tips */}
          <section id="daily-tips" className="scroll-mt-20">
            <DailyTips />
          </section>
        </div>
        
        {/* Body Changes */}
        <section id="body-changes" className="scroll-mt-20">
          <BodyChanges />
        </section>
        
        {/* Quick Questions */}
        <section id="quick-questions" className="scroll-mt-20">
          <QuickQuestions />
        </section>
      </main>
    </div>
  );
};

export default Home;