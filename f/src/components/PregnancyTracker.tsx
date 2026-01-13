'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  Calendar, Baby, Heart, MapPin, 
  Users, TrendingUp, Ruler, Weight, Activity, 
  Sparkles, ArrowRight, Clock,
  Moon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, BarChart, Bar, LineChart
} from 'recharts';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// --- YOUR REAL DATA IMPORTS ---
import { weekDetails, trimesterData, getWeekData } from '@/data/pregnancyData';
import { realGrowthData } from '@/data/realGrowthData';

// Generate weeks 1-40 for the timeline
const ALL_WEEKS = Array.from({ length: 40 }, (_, i) => i + 1);

const getTrimester = (week: number) => {
  if (week <= 13) return { 
    name: 'First', 
    color: 'text-purple-600', 
    bg: 'bg-purple-500', 
    gradient: 'from-purple-500 via-violet-500 to-indigo-500',
    glowColor: 'shadow-purple-500/30',
    lightBg: 'bg-purple-50',
    darkBg: 'bg-purple-900',
    accentColor: '#8B5CF6'
  };
  if (week <= 27) return { 
    name: 'Second', 
    color: 'text-pink-600', 
    bg: 'bg-pink-500', 
    gradient: 'from-pink-500 via-rose-500 to-red-400',
    glowColor: 'shadow-pink-500/30',
    lightBg: 'bg-pink-50',
    darkBg: 'bg-pink-900',
    accentColor: '#EC4899'
  };
  return { 
    name: 'Third', 
    color: 'text-blue-600', 
    bg: 'bg-blue-500', 
    gradient: 'from-blue-500 via-cyan-500 to-teal-400',
    glowColor: 'shadow-blue-500/30',
    lightBg: 'bg-blue-50',
    darkBg: 'bg-blue-900',
    accentColor: '#3B82F6'
  };
};

const ModernPregnancyTracker = () => {
  const [selectedWeek, setSelectedWeek] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'overview' | 'growth'>('overview');
  const scrollRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  // Add ref for the main container scroller
  const mainContainerRef = useRef<HTMLDivElement>(null);

  const currentWeekData = getWeekData(selectedWeek) || weekDetails[1];
  const currentTrimesterEvent = trimesterData.find(t => t.week === selectedWeek);
  const trimester = getTrimester(selectedWeek);

  // GSAP Animations on mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero card entrance
      gsap.from(heroRef.current, {
        scale: 0.95,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });

      // Stats cards stagger
      gsap.from('.stat-card', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        delay: 0.3
      });

      // Info cards entrance
      gsap.from('.info-card', {
        x: -20,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power2.out',
        delay: 0.5
      });
    });

    return () => ctx.revert();
  }, []);

  // GSAP animation when week changes
  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo(heroRef.current,
        { scale: 0.98, opacity: 0.7 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'power2.out' }
      );
    }

    const babyImg = document.querySelector('.baby-visual');
    if (babyImg) {
      gsap.fromTo(babyImg,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: 'elastic.out(1, 0.5)' }
      );
    }
    
    // Scroll container to top when week changes (optional ux improvement)
    if(mainContainerRef.current) {
        mainContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
  }, [selectedWeek]);

  // Auto-scroll timeline to week
  useEffect(() => {
    if (scrollRef.current) {
      const el = scrollRef.current.querySelector(`[data-week="${selectedWeek}"]`);
      el?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [selectedWeek]);

  return (
    // MAIN CONTAINER: 60vh on mobile, 80vh on LG screens. 
    // Added rounded corners and shadow to make it look like a dashboard widget.
    <div className="relative w-full h-[60vh] lg:h-[80vh] bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-800 font-sans selection:bg-purple-200 overflow-hidden rounded-3xl border border-slate-200 shadow-2xl">
      
      {/* Animated Background - Changed from 'fixed' to 'absolute' so it stays INSIDE this div */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-gradient-to-br from-purple-300/20 to-pink-300/20 rounded-full blur-[100px] animate-blob" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-gradient-to-br from-blue-300/20 to-cyan-300/20 rounded-full blur-[100px] animate-blob animation-delay-2000" />
      </div>

      {/* Internal Scrollable Area */}
      <div 
        ref={mainContainerRef}
        className="relative z-10 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent"
      >
        <div className="max-w-[1600px] mx-auto px-4 py-8 sm:px-6 lg:px-12">
          
          {/* Header Section */}
          <motion.div 
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6"
          >
            <div className="space-y-2">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-3"
              >
                <div className={`px-4 py-1.5 rounded-2xl text-[10px] sm:text-xs font-bold uppercase tracking-widest bg-white/70 backdrop-blur-xl border-2 ${trimester.color} shadow-lg ${trimester.glowColor}`}>
                  {trimester.name} Trimester
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/60 backdrop-blur-md rounded-xl border border-slate-200">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  <span className="text-[10px] sm:text-xs font-semibold text-slate-600">{40 - selectedWeek} weeks to go</span>
                </div>
              </motion.div>
              
              <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 flex items-baseline gap-3">
                <span className="text-slate-400 text-3xl md:text-5xl">Week</span>
                <motion.span 
                  key={selectedWeek}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className={`text-transparent bg-clip-text bg-gradient-to-r ${trimester.gradient}`}
                >
                  {selectedWeek}
                </motion.span>
              </h1>
            </div>
            
            {/* Tab Switcher */}
            <div className="bg-white/70 backdrop-blur-xl p-1.5 rounded-[1.25rem] border-2 border-white/80 flex gap-1.5 shadow-xl shadow-slate-900/5">
              {[
                { id: 'overview', label: 'Overview', icon: <Baby className="w-4 h-4" /> },
                { id: 'growth', label: 'Growth', icon: <TrendingUp className="w-4 h-4" /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`
                    px-4 py-2 sm:px-6 sm:py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-2
                    ${activeTab === tab.id 
                      ? `bg-gradient-to-r ${trimester.gradient} text-white shadow-lg ${trimester.glowColor}` 
                      : 'text-slate-500 hover:text-slate-700 hover:bg-white/50'}
                  `}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Timeline - Compact for smaller height */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8 relative"
          >
            <div className="absolute left-0 top-0 bottom-6 w-full">
              <div className="h-1 bg-gradient-to-r from-purple-200 via-pink-200 to-blue-200 rounded-full opacity-30" style={{ width: `${(selectedWeek / 40) * 100}%` }} />
            </div>
            
            <div 
              ref={scrollRef}
              className="flex gap-2 overflow-x-auto pb-6 pt-2 px-2 scrollbar-hide snap-x relative z-10"
            >
              {ALL_WEEKS.map((week) => {
                const isActive = selectedWeek === week;
                const t = getTrimester(week);
                const isPast = week < selectedWeek;
                
                return (
                  <motion.button
                    key={week}
                    data-week={week}
                    onClick={() => setSelectedWeek(week)}
                    whileHover={{ scale: 1.08, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                      snap-center shrink-0 w-14 h-20 sm:w-16 sm:h-24 rounded-[1rem] sm:rounded-[1.25rem] flex flex-col items-center justify-center transition-all duration-300 relative overflow-hidden
                      ${isActive 
                        ? `bg-gradient-to-br ${t.gradient} text-white shadow-2xl ${t.glowColor} scale-110 z-20` 
                        : isPast
                          ? 'bg-white/80 text-slate-400 border-2 border-slate-200/50'
                          : 'bg-white/60 hover:bg-white text-slate-500 hover:text-slate-700 border-2 border-white/60'}
                    `}
                  >
                    <span className="text-[10px] font-bold opacity-70 mb-0.5">WK</span>
                    <span className={`text-xl sm:text-2xl font-black ${isActive ? 'text-white' : ''}`}>{week}</span>
                    
                    {isActive && (
                      <motion.div 
                        layoutId="activeIndicator"
                        className="absolute bottom-2 w-1.5 h-1.5 bg-white rounded-full shadow-lg"
                      />
                    )}
                    
                    {isPast && !isActive && (
                      <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                    )}
                  </motion.button>
                );
              })}
            </div>
            {/* Fade edges */}
            <div className="absolute inset-y-0 left-0 w-8 sm:w-16 bg-gradient-to-r from-slate-50 to-transparent pointer-events-none z-20" />
            <div className="absolute inset-y-0 right-0 w-8 sm:w-16 bg-gradient-to-l from-slate-50 to-transparent pointer-events-none z-20" />
          </motion.div>

          {/* Content Area */}
          <AnimatePresence mode="wait">
            {activeTab === 'overview' ? (
              <OverviewView 
                key="overview" 
                weekData={currentWeekData}
                trimesterEvent={currentTrimesterEvent}
                trimester={trimester}
                heroRef={heroRef}
                selectedWeek={selectedWeek}
              />
            ) : (
              <GrowthView 
                key="growth" 
                data={realGrowthData} 
                selectedWeek={selectedWeek}
              />
            )}
          </AnimatePresence>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 20s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};


// ENHANCED SUB-COMPONENTS


const OverviewView = ({ weekData, trimesterEvent, trimester, heroRef, selectedWeek }: any) => {
  const statsCardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (statsCardsRef.current) {
      gsap.from(statsCardsRef.current.children, {
        scale: 0.9,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'back.out(1.7)'
      });
    }
  }, [selectedWeek]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-8"
    >
      {/* LEFT COLUMN */}
      <div className="lg:col-span-8 space-y-6">
        
        {/* Hero Card */}
        <div 
          ref={heroRef}
          className="relative min-h-[400px] md:min-h-[500px] rounded-[2.5rem] overflow-hidden bg-white shadow-2xl border-2 border-white/80"
        >
          {/* Animated gradient background */}
          <div className={`absolute inset-0 bg-gradient-to-br ${trimester.gradient} opacity-[0.06]`} />
          
          {/* Floating elements */}
          <motion.div 
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 right-10 w-16 h-16 md:w-20 md:h-20 bg-white/40 backdrop-blur-sm rounded-full border border-white/60"
          />
          
          <div className="absolute top-8 md:top-10 left-8 md:left-10 right-8 md:right-10 z-10">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl md:text-4xl font-black text-slate-900 leading-tight max-w-2xl mb-6"
            >
              {weekData.title}
            </motion.h2>
            
            {/* Stats Pills */}
            <div ref={statsCardsRef} className="flex gap-3 flex-wrap">
              <StatPill icon={<Ruler className="w-4 h-4" />} label="Length" value={weekData.babyLength} color="purple" />
              <StatPill icon={<Weight className="w-4 h-4" />} label="Weight" value={weekData.weight} color="pink" />
              <StatPill icon={<Activity className="w-4 h-4" />} label="Growing" value="Active" color="blue" />
            </div>
          </div>

          {/* Baby Visual */}
          <div className="absolute inset-0 flex items-center justify-center pt-32 pb-12 px-8">
            <motion.div
              className="baby-visual relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {weekData.image ? (
                <img 
                  src={weekData.image} 
                  alt="Baby visualization" 
                  className="max-h-[220px] md:max-h-[300px] w-auto object-contain drop-shadow-2xl"
                />
              ) : (
                <div className="text-[100px] md:text-[160px] drop-shadow-2xl">
                  {weekData.babySize?.includes('Seed') ? '🌱' : 
                   weekData.babySize?.includes('Egg') ? '🥚' : 
                   weekData.babySize?.includes('Lime') ? '🍋' : 
                   weekData.babySize?.includes('Apple') ? '🍎' : '👶'}
                </div>
              )}
              
              <div className={`absolute inset-0 bg-gradient-to-br ${trimester.gradient} opacity-20 blur-3xl -z-10`} />
            </motion.div>
          </div>

          {/* Bottom Label */}
          <div className="absolute bottom-6 md:bottom-8 left-0 right-0 text-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-xl rounded-2xl border-2 border-white/60 shadow-xl"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-bold text-slate-700">
                Size of a <span className={`${trimester.color}`}>{weekData.babySize}</span>
              </span>
            </motion.div>
          </div>
        </div>

        {/* Info Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <EnhancedInfoCard 
            title="Baby's Milestones" 
            icon={<Sparkles className="w-5 h-5" />} 
            items={weekData.milestones} 
            color="amber"
            gradient="from-amber-400 to-orange-400"
          />
          <EnhancedInfoCard 
            title="What You're Feeling" 
            icon={<Heart className="w-5 h-5" />} 
            items={weekData.symptoms} 
            color="rose"
            gradient="from-rose-400 to-pink-400"
          />
        </div>
      </div>

      {/* RIGHT COLUMN */}
      <div className="lg:col-span-4 space-y-6">
        
        {/* Community Card */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="info-card relative overflow-hidden bg-gradient-to-br from-emerald-50 to-teal-50/50 backdrop-blur-xl rounded-[2rem] p-6 md:p-8 border-2 border-emerald-100/50 shadow-xl"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-400/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-teal-400/10 rounded-full blur-2xl" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-white rounded-2xl shadow-lg shadow-emerald-900/10">
                <Users className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-black text-emerald-900 text-lg">Community</h3>
                <p className="text-xs text-emerald-600 font-medium">Local Insights</p>
              </div>
            </div>

            {trimesterEvent ? (
              <div className="space-y-4">
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 border border-emerald-100/50 shadow-sm">
                  <p className="text-base md:text-lg font-bold text-emerald-900 leading-snug mb-2">
                    "{trimesterEvent.ruralAction}"
                  </p>
                  <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">
                    {trimesterEvent.event}
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-emerald-800 font-medium">Enjoy this special week!</p>
            )}

            {weekData.ruralTip && (
              <div className="mt-4 bg-white/90 backdrop-blur-sm rounded-2xl p-4 flex items-start gap-3 border border-emerald-100/50 shadow-sm">
                <MapPin className="w-5 h-5 shrink-0 mt-0.5 text-emerald-600" />
                <span className="text-sm text-emerald-900 font-medium leading-relaxed">{weekData.ruralTip}</span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Health Tips Card */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="info-card bg-white rounded-[2rem] p-6 md:p-8 shadow-2xl border-2 border-slate-100"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className={`p-3 ${trimester.lightBg} rounded-2xl shadow-sm`}>
              <Heart className={`w-6 h-6 ${trimester.color}`} />
            </div>
            <div>
              <h3 className="font-black text-slate-900 text-lg">Health Tips</h3>
              <p className="text-xs text-slate-500 font-medium">For This Week</p>
            </div>
          </div>
          
          <ul className="space-y-4 mb-6">
            {weekData.tips?.slice(0, 4).map((tip: string, i: number) => (
              <motion.li 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * i }}
                className="flex items-start gap-3 text-slate-700 text-sm leading-relaxed font-medium"
              >
                <div className={`w-2 h-2 rounded-full ${trimester.bg} mt-1.5 shrink-0 shadow-sm`} />
                <span>{tip}</span>
              </motion.li>
            ))}
          </ul>
          
          <button className={`w-full py-4 rounded-2xl bg-gradient-to-r ${trimester.gradient} text-white text-sm font-bold flex items-center justify-center gap-2 shadow-lg ${trimester.glowColor} hover:shadow-xl transition-all group`}>
            <span>View All Tips</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        {/* Quick Stats */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="info-card grid grid-cols-2 gap-4"
        >
          <QuickStat icon={<Moon className="w-5 h-5" />} label="Trimester" value={trimester.name} color={trimester.color} />
          <QuickStat icon={<Calendar className="w-5 h-5" />} label="Days Left" value={`${(40 - selectedWeek) * 7}`} color="text-slate-600" />
        </motion.div>
      </div>
    </motion.div>
  );
};

const GrowthView = ({ data, selectedWeek }: any) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-8 pb-8"
    >
      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GrowthSummaryCard 
          title="Current Weight" 
          value={data[selectedWeek - 1]?.weight || 0}
          unit="g"
          icon={<Weight className="w-5 h-5" />}
          gradient="from-blue-400 to-cyan-400"
          change="+12g from last week"
        />
        <GrowthSummaryCard 
          title="Current Length" 
          value={data[selectedWeek - 1]?.babyLength || 0}
          unit="cm"
          icon={<Ruler className="w-5 h-5" />}
          gradient="from-purple-400 to-pink-400"
          change="+0.8cm from last week"
        />
        <GrowthSummaryCard 
          title="Heart Rate" 
          value={data[selectedWeek - 1]?.heartRate || 0}
          unit="bpm"
          icon={<Activity className="w-5 h-5" />}
          gradient="from-rose-400 to-red-400"
          change="Healthy range"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <EnhancedChartCard 
          title="Weight Progression" 
          subtitle="Throughout pregnancy"
          icon={<Weight className="w-5 h-5 text-blue-500" />}
          gradient="from-blue-500 to-cyan-500"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" strokeOpacity={0.5} />
              <XAxis 
                dataKey="week" 
                stroke="#94A3B8" 
                fontSize={11} 
                tickLine={false} 
                axisLine={false} 
                tickMargin={10}
                tickFormatter={(value) => `W${value}`}
              />
              <YAxis 
                stroke="#94A3B8" 
                fontSize={11} 
                tickLine={false} 
                axisLine={false}
                tickFormatter={(value) => `${value}g`}
              />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '16px', 
                  border: 'none', 
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                  backgroundColor: 'white',
                  padding: '12px'
                }}
                itemStyle={{ color: '#1e293b', fontWeight: 600, fontSize: '14px' }}
                labelStyle={{ color: '#64748b', fontWeight: 500, marginBottom: '4px' }}
              />
              <Area 
                type="monotone" 
                dataKey="weight" 
                stroke="#3B82F6" 
                strokeWidth={3} 
                fillOpacity={1} 
                fill="url(#colorWeight)" 
                animationDuration={1500}
              />
            </AreaChart>
          </ResponsiveContainer>
        </EnhancedChartCard>

        <EnhancedChartCard 
          title="Baby Length" 
          subtitle="Growth tracking"
          icon={<Ruler className="w-5 h-5 text-purple-500" />}
          gradient="from-purple-500 to-pink-500"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <defs>
                <linearGradient id="colorLength" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#A855F7" stopOpacity={1}/>
                  <stop offset="100%" stopColor="#EC4899" stopOpacity={1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" strokeOpacity={0.5} />
              <XAxis 
                dataKey="week" 
                stroke="#94A3B8" 
                fontSize={11} 
                tickLine={false} 
                axisLine={false} 
                tickMargin={10}
                tickFormatter={(value) => `W${value}`}
              />
              <YAxis 
                stroke="#94A3B8" 
                fontSize={11} 
                tickLine={false} 
                axisLine={false}
                tickFormatter={(value) => `${value}cm`}
              />
              <Tooltip 
                cursor={{fill: '#F1F5F9', radius: 8}}
                contentStyle={{ 
                  borderRadius: '16px', 
                  border: 'none', 
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                  backgroundColor: 'white',
                  padding: '12px'
                }}
                itemStyle={{ color: '#1e293b', fontWeight: 600, fontSize: '14px' }}
              />
              <Bar 
                dataKey="babyLength" 
                fill="url(#colorLength)"
                radius={[8, 8, 0, 0]} 
                animationDuration={1500}
              />
            </BarChart>
          </ResponsiveContainer>
        </EnhancedChartCard>
      </div>

      {/* Full Width Heart Rate Chart */}
      <EnhancedChartCard 
        title="Heart Rate Monitor" 
        subtitle="Baby's heartbeat progression"
        icon={<Activity className="w-5 h-5 text-rose-500" />}
        gradient="from-rose-500 to-red-500"
        fullWidth
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <defs>
              <linearGradient id="colorHeart" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F43F5E" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#F43F5E" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" strokeOpacity={0.5} />
            <XAxis 
              dataKey="week" 
              stroke="#94A3B8" 
              fontSize={11} 
              tickLine={false} 
              axisLine={false} 
              tickMargin={10}
              tickFormatter={(value) => `Week ${value}`}
            />
            <YAxis 
              stroke="#94A3B8" 
              fontSize={11} 
              tickLine={false} 
              axisLine={false} 
              domain={[100, 180]}
              tickFormatter={(value) => `${value} bpm`}
            />
            <Tooltip 
              contentStyle={{ 
                borderRadius: '16px', 
                border: 'none', 
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                backgroundColor: 'white',
                padding: '12px'
              }}
              itemStyle={{ color: '#1e293b', fontWeight: 600, fontSize: '14px' }}
            />
            <Area 
              type="monotone" 
              dataKey="heartRate" 
              stroke="#F43F5E" 
              strokeWidth={3} 
              fillOpacity={1} 
              fill="url(#colorHeart)" 
              animationDuration={1500}
            />
          </LineChart>
        </ResponsiveContainer>
      </EnhancedChartCard>
    </motion.div>
  );
};


// UTILITY COMPONENTS


const StatPill = ({ icon, label, value, color }: any) => {
  const colors: { [key: string]: string } = {
    purple: 'bg-purple-500/10 border-purple-200 text-purple-700',
    pink: 'bg-pink-500/10 border-pink-200 text-pink-700',
    blue: 'bg-blue-500/10 border-blue-200 text-blue-700'
  };
  
  return (
    <motion.div 
      className={`stat-card flex items-center gap-2.5 px-5 py-3 rounded-2xl border-2 backdrop-blur-xl shadow-lg ${colors[color]} font-semibold text-sm`}
      whileHover={{ scale: 1.05 }}
    >
      <div className="opacity-70">{icon}</div>
      <div className="flex flex-col">
        <span className="text-xs opacity-60 font-bold uppercase tracking-wide">{label}</span>
        <span className="font-black text-base">{value}</span>
      </div>
    </motion.div>
  );
};

const EnhancedInfoCard = ({ title, icon, items, color, gradient }: any) => {
  const colorClasses: { [key: string]: { bg: string; border: string; icon: string; text: string } } = {
    amber: { bg: 'from-amber-50 to-orange-50/50', border: 'border-amber-100/50', icon: 'bg-amber-500', text: 'text-amber-900' },
    rose: { bg: 'from-rose-50 to-pink-50/50', border: 'border-rose-100/50', icon: 'bg-rose-500', text: 'text-rose-900' }
  };
  
  const colors = colorClasses[color] || colorClasses.amber;
  
  return (
    <motion.div 
      className={`info-card relative overflow-hidden bg-gradient-to-br ${colors.bg} backdrop-blur-xl rounded-[2rem] p-7 border-2 ${colors.border} shadow-xl`}
      whileHover={{ y: -4 }}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/40 rounded-full blur-3xl" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className={`p-3 bg-gradient-to-br ${gradient} rounded-2xl shadow-lg`}>
            <div className="text-white">{icon}</div>
          </div>
          <h3 className={`font-black text-lg ${colors.text}`}>{title}</h3>
        </div>
        
        <ul className="space-y-3">
          {items?.slice(0, 5).map((item: string, idx: number) => (
            <motion.li 
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`text-sm font-semibold ${colors.text} flex items-start gap-3 leading-relaxed`}
            >
              <div className={`w-2 h-2 ${colors.icon} rounded-full mt-1.5 shrink-0 shadow-sm`} />
              <span>{item}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

const GrowthSummaryCard = ({ title, value, unit, icon, gradient, change }: any) => (
  <motion.div 
    className="bg-white rounded-[1.75rem] p-6 shadow-xl border border-slate-100"
    whileHover={{ y: -4, boxShadow: '0 25px 30px -5px rgba(0, 0, 0, 0.1)' }}
  >
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-2xl bg-gradient-to-br ${gradient} text-white shadow-lg`}>
        {icon}
      </div>
      <span className="text-xs font-bold text-emerald-500 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
        {change}
      </span>
    </div>
    <p className="text-slate-500 text-sm font-bold mb-1">{title}</p>
    <p className="text-2xl font-black text-slate-800">
      {value} <span className="text-base text-slate-400 font-bold">{unit}</span>
    </p>
  </motion.div>
);

const EnhancedChartCard = ({ title, subtitle, icon, children, fullWidth }: any) => (
  <motion.div 
    className={`bg-white rounded-[2rem] p-6 shadow-xl border border-slate-100 flex flex-col ${fullWidth ? 'col-span-1 lg:col-span-2' : ''}`}
    whileHover={{ y: -2 }}
  >
    <div className="flex items-center gap-3 mb-8">
      <div className="p-2.5 bg-slate-50 rounded-xl">
        {icon}
      </div>
      <div>
        <h3 className="font-bold text-slate-900">{title}</h3>
        <p className="text-xs text-slate-500 font-medium">{subtitle}</p>
      </div>
    </div>
    <div className="flex-1 min-h-[300px] w-full">
      {children}
    </div>
  </motion.div>
);

const QuickStat = ({ icon, label, value, color }: any) => (
  <div className="bg-white/60 p-4 rounded-2xl border border-slate-200/50 flex flex-col items-center text-center">
    <div className={`${color} mb-2`}>{icon}</div>
    <div className="text-xs text-slate-500 font-bold uppercase">{label}</div>
    <div className="text-lg font-black text-slate-800">{value}</div>
  </div>
);

export default ModernPregnancyTracker;