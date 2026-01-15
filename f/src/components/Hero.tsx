import { useState, useEffect } from 'react';
import { Heart, Sparkles, Shield, Play, Activity, Calendar, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Hero = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  // 1. Add state for the current time
  const [time, setTime] = useState(new Date());

  // 2. Setup the clock timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000); // Update every second
    return () => clearInterval(timer);
  }, []);

  // 3. Format the time (e.g., "9:41 AM")
  const formattedTime = time.toLocaleTimeString([], { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  });

  const features = [
    {
      id: 0,
      title: "Smart Tracking",
      desc: "AI milestones",
      icon: Activity,
      color: "text-blue-600",
      bg: "bg-blue-100"
    },
    {
      id: 1,
      title: "Medical Safety",
      desc: "Top Gynaecologists",
      icon: Shield,
      color: "text-green-600",
      bg: "bg-green-100"
    },
    {
      id: 2,
      title: "Baby Growth",
      desc: "3D updates",
      icon: Heart,
      color: "text-rose-600",
      bg: "bg-rose-100"
    }
  ];

  // Auto-rotate features
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full overflow-hidden bg-[#FDF8F6] min-h-[60vh] lg:min-h-[80vh] flex items-center">
      
      {/* --- Background Ambience --- */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-300/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-300/30 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] right-[20%] w-[20%] h-[20%] bg-blue-200/20 rounded-full blur-[100px]" />
      </div>

      <div className="relative container mx-auto px-6 py-8 lg:py-0 max-w-7xl w-full">
        
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 items-center">
          
          {/* --- Left Column: Content --- */}
          <div className="lg:col-span-2 space-y-6 lg:space-y-8 z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 lg:px-4 lg:py-2 rounded-full bg-white/80 border border-purple-100 shadow-sm backdrop-blur-md"
            >
              <span className="relative flex h-2.5 w-2.5 lg:h-3 lg:w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 lg:h-3 lg:w-3 bg-purple-500"></span>
              </span>
              <span className="text-xs lg:text-sm font-semibold text-gray-700">#1 Health App for Mothers</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-gray-900 leading-[1.1]">
                Your Journey, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600">
                  Beautifully Guided.
                </span>
              </h1>
              <p className="mt-4 lg:mt-6 text-base lg:text-xl text-gray-600 leading-relaxed max-w-2xl">
                The most advanced AI companion for Indian mothers. From conception to delivery, we ensure you never walk alone.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 pr-0 lg:pr-12"
            >
              {features.map((feature, idx) => (
                <button
                  key={feature.id}
                  onClick={() => setActiveFeature(idx)}
                  className={`group flex flex-row sm:flex-col items-center sm:items-start gap-3 p-3 rounded-xl transition-all duration-300 text-left border ${
                    activeFeature === idx 
                    ? 'bg-white shadow-md border-purple-100 scale-[1.02]' 
                    : 'bg-white/40 border-transparent hover:bg-white/60'
                  }`}
                >
                  <div className={`p-2 lg:p-3 rounded-lg ${feature.bg} ${activeFeature === idx ? 'shadow-inner' : ''}`}>
                    <feature.icon className={`w-5 h-5 lg:w-6 lg:h-6 ${feature.color}`} />
                  </div>
                  <div>
                    <h3 className={`text-sm lg:text-base font-bold ${activeFeature === idx ? 'text-gray-900' : 'text-gray-600'}`}>
                      {feature.title}
                    </h3>
                    <p className="text-[10px] lg:text-xs text-gray-500 hidden sm:block mt-1">{feature.desc}</p>
                  </div>
                </button>
              ))}
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-row gap-3 pt-2"
            >
              <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 lg:px-8 lg:py-4 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-transform hover:-translate-y-1 shadow-xl shadow-purple-900/10 text-sm lg:text-base">
                <Sparkles className="w-4 h-4 lg:w-5 lg:h-5" />
                <span>Start Free</span>
              </button>
              <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 lg:px-8 lg:py-4 bg-white text-gray-700 rounded-xl font-semibold border border-gray-200 hover:border-purple-200 hover:bg-purple-50 transition-colors text-sm lg:text-base">
                <Play className="w-4 h-4 lg:w-5 lg:h-5 fill-current" />
                <span>Demo</span>
              </button>
            </motion.div>
          </div>

          {/* --- Right Column: Visual Mockup --- */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-1 relative flex items-center justify-center lg:justify-end mt-8 lg:mt-0"
          >
            <div className="relative w-full max-w-[300px] lg:max-w-[360px] h-[400px] lg:h-[600px] bg-white/40 backdrop-blur-2xl rounded-[2rem] lg:rounded-[2.5rem] border border-white/50 shadow-2xl overflow-hidden p-4 lg:p-5 z-20">
              
              {/* --- UPDATED PHONE HEADER WITH REAL TIME --- */}
              <div className="flex justify-between items-center mb-4 lg:mb-6 opacity-80">
                {/* Replaced static 9:41 AM with formattedTime variable */}
                <div className="text-[10px] lg:text-xs font-bold text-gray-500 w-16">
                  {formattedTime}
                </div>
                <div className="flex gap-1">
                  <div className="w-3 h-3 lg:w-4 lg:h-4 bg-black/10 rounded-full" />
                  <div className="w-3 h-3 lg:w-4 lg:h-4 bg-black/10 rounded-full" />
                </div>
              </div>

              <AnimatePresence mode='wait'>
                <motion.div
                  key={activeFeature}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="h-full flex flex-col"
                >
                  <div className="mb-4 lg:mb-6">
                    <h2 className="text-lg lg:text-xl font-bold text-gray-800">Hello, Priya! 👋</h2>
                    <p className="text-xs lg:text-sm text-gray-500">Week 24 • Trimester 2</p>
                  </div>

                  <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-4 lg:p-5 text-white shadow-lg mb-3 lg:mb-4 relative overflow-hidden">
                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-2 lg:mb-3">
                        <span className="bg-white/20 backdrop-blur-md px-2 py-1 rounded-full text-[10px] font-medium">Status</span>
                        <Heart className="w-4 h-4 lg:w-5 lg:h-5 fill-white/50 text-white animate-pulse" />
                      </div>
                      <div className="text-2xl lg:text-3xl font-bold mb-1">680g</div>
                      <div className="text-[10px] lg:text-xs text-purple-100">Size of an Eggplant 🍆</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 lg:gap-3 mb-3 lg:mb-4">
                    <div className="bg-white rounded-xl p-2 lg:p-3 shadow-sm border border-purple-50">
                      <div className="bg-orange-100 w-6 h-6 lg:w-8 lg:h-8 rounded-full flex items-center justify-center mb-2">
                        <Calendar className="w-3 h-3 lg:w-4 lg:h-4 text-orange-600" />
                      </div>
                      <div className="text-base lg:text-lg font-bold text-gray-800">12 Oct</div>
                      <div className="text-[10px] text-gray-500">Checkup</div>
                    </div>
                    <div className="bg-white rounded-xl p-2 lg:p-3 shadow-sm border border-purple-50">
                      <div className="bg-blue-100 w-6 h-6 lg:w-8 lg:h-8 rounded-full flex items-center justify-center mb-2">
                        <Bell className="w-3 h-3 lg:w-4 lg:h-4 text-blue-600" />
                      </div>
                      <div className="text-base lg:text-lg font-bold text-gray-800">2 New</div>
                      <div className="text-[10px] text-gray-500">Tips</div>
                    </div>
                  </div>

                  <div className="mt-auto bg-white/60 rounded-xl p-2 lg:p-3 flex items-center gap-2 lg:gap-3 border border-white mb-4 lg:mb-8">
                    <div className="relative shrink-0">
                      <div className="w-8 h-8 lg:w-10 lg:h-10 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold text-[10px] lg:text-xs">Dr</div>
                      <div className="absolute bottom-0 right-0 w-2 h-2 lg:w-2.5 lg:h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
                    </div>
                    <div>
                      <div className="text-[10px] lg:text-xs font-bold text-gray-800">Dr. Anjali</div>
                      <div className="text-[10px] text-gray-500">"Drink water..."</div>
                    </div>
                  </div>

                </motion.div>
              </AnimatePresence>
            </div>

            <div className="absolute top-20 right-0 w-16 h-16 lg:w-24 lg:h-24 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute bottom-20 left-0 w-24 h-24 lg:w-32 lg:h-32 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Hero;