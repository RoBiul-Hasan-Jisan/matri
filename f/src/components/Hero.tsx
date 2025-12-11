import { Heart, Sparkles, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-grid-slate-100/50 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
      
      <div className="relative container mx-auto px-4 py-20 md:py-28">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-8">
            {/* Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-purple-200 shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-700">AI-Powered Maternal Health Ecosystem</span>
            </motion.div>
            
            {/* Main Title */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-display font-bold tracking-tight text-gray-900"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                Matri-Rokkha Bondhun
              </span>
            </motion.h1>
            
            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto"
            >
              Your intelligent companion for a safe, healthy, and joyful pregnancy journey
            </motion.p>
            
            {/* Features */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-6 pt-8"
            >
              <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-xl border border-purple-100">
                <Heart className="w-5 h-5 text-pink-600" />
                <span className="font-medium text-gray-700">Personalized Care</span>
              </div>
              <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-xl border border-blue-100">
                <Sparkles className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-gray-700">AI Insights</span>
              </div>
              <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-xl border border-green-100">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="font-medium text-gray-700">Safety First</span>
              </div>
            </motion.div>
            
            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center pt-12"
            >
              <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300">
                Start Your Journey
              </button>
              <button className="px-8 py-3 bg-white text-purple-700 font-semibold rounded-xl border-2 border-purple-200 hover:border-purple-300 hover:shadow-md transition-all duration-300">
                Learn More
              </button>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Pregnant woman illustration */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden lg:block">
        <div className="relative">
          <div className="w-64 h-64 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-30 blur-3xl" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl">🤰</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;