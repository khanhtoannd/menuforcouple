import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft } from 'lucide-react';
import { t, Language } from '../translations';

export default function DatePlanner({ onFinish, onBack, lang }: { onFinish: (order: { vibe: string, activity: string, food: string }) => void, onBack: () => void, lang: Language }) {
  const [step, setStep] = useState(1);
  const [vibe, setVibe] = useState('');
  const [activity, setActivity] = useState('');
  const text = t[lang];

  const VIBES = [
    { id: 'v_cozy', label: text.v_cozy },
    { id: 'v_night', label: text.v_night },
    { id: 'v_nature', label: text.v_nature },
    { id: 'v_movie', label: text.v_movie },
    { id: 'v_arcade', label: text.v_arcade },
    { id: 'v_museum', label: text.v_museum },
    { id: 'v_drive', label: text.v_drive },
    { id: 'v_surprise', label: text.v_surprise }
  ];

  const ACTIVITIES = [
    { id: 'a_binge', label: text.a_binge },
    { id: 'a_board', label: text.a_board },
    { id: 'a_star', label: text.a_star },
    { id: 'a_shop', label: text.a_shop },
    { id: 'a_cook', label: text.a_cook },
    { id: 'a_spa', label: text.a_spa },
    { id: 'a_karaoke', label: text.a_karaoke },
    { id: 'a_surprise', label: text.a_surprise }
  ];

  const FOODS = [
    { id: 'f_sushi', label: text.f_sushi },
    { id: 'f_pizza', label: text.f_pizza },
    { id: 'f_tacos', label: text.f_tacos },
    { id: 'f_italian', label: text.f_italian },
    { id: 'f_burgers', label: text.f_burgers },
    { id: 'f_chicken', label: text.f_chicken },
    { id: 'f_kbbq', label: text.f_kbbq },
    { id: 'f_dessert', label: text.f_dessert },
    { id: 'f_surprise', label: text.f_surprise }
  ];

  const handleVibe = (v: string) => {
    setVibe(v);
    setTimeout(() => setStep(2), 350);
  };

  const handleActivity = (a: string) => {
    setActivity(a);
    setTimeout(() => setStep(3), 350);
  };

  const handleFood = (f: string) => {
    setTimeout(() => onFinish({ vibe, activity, food: f }), 400);
  };

  return (
     <div className="w-full mx-auto bg-stone-50 rounded-3xl shadow-2xl overflow-hidden border border-stone-200">
       <div className="p-6 bg-stone-100 border-b border-stone-200 flex items-center justify-between">
          <button 
            onClick={() => step === 1 ? onBack() : setStep(step - 1)} 
            className="p-2 -ml-2 text-stone-500 hover:text-stone-800 transition-colors bg-white rounded-full shadow-sm hover:shadow active:scale-95"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="flex gap-3">
             <div className={`w-8 sm:w-12 h-2 rounded-full transition-colors duration-500 ${step >= 1 ? 'bg-amber-500' : 'bg-stone-300'}`} />
             <div className={`w-8 sm:w-12 h-2 rounded-full transition-colors duration-500 ${step >= 2 ? 'bg-amber-500' : 'bg-stone-300'}`} />
             <div className={`w-8 sm:w-12 h-2 rounded-full transition-colors duration-500 ${step >= 3 ? 'bg-amber-500' : 'bg-stone-300'}`} />
          </div>
       </div>

       <div className="p-8">
         <AnimatePresence mode="wait">
           {step === 1 && (
             <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20, scale: 0.95 }}>
               <h2 className="text-2xl font-bold font-sans text-stone-800 mb-6 text-center">{text.vibeQuestion}</h2>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto p-1">
                 {VIBES.map((v) => (
                   <button
                     key={v.id}
                     onClick={() => handleVibe(v.label)}
                     className={`p-4 rounded-xl text-left font-bold font-sans text-lg border-2 transition-all hover:scale-[1.02] active:scale-95 shadow-sm ${vibe === v.label ? 'border-amber-500 bg-amber-50 text-amber-900 shadow-md' : 'border-stone-200 bg-white text-stone-700 hover:border-amber-300'}`}
                   >
                     {v.label}
                   </button>
                 ))}
               </div>
             </motion.div>
           )}

           {step === 2 && (
             <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20, scale: 0.95 }}>
               <h2 className="text-2xl font-bold font-sans text-stone-800 mb-6 text-center">{text.activityQuestion}</h2>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto p-1">
                 {ACTIVITIES.map((a) => (
                   <button
                     key={a.id}
                     onClick={() => handleActivity(a.label)}
                     className={`p-4 rounded-xl text-left font-bold font-sans text-lg border-2 transition-all hover:scale-[1.02] active:scale-95 shadow-sm ${activity === a.label ? 'border-amber-500 bg-amber-50 text-amber-900 shadow-md' : 'border-stone-200 bg-white text-stone-700 hover:border-amber-300'}`}
                   >
                     {a.label}
                   </button>
                 ))}
               </div>
             </motion.div>
           )}

           {step === 3 && (
             <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20, scale: 0.95 }}>
               <h2 className="text-2xl font-bold font-sans text-stone-800 mb-6 text-center">{text.foodQuestion}</h2>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto p-1">
                 {FOODS.map((f) => (
                   <button
                     key={f.id}
                     onClick={() => handleFood(f.label)}
                     className="p-4 rounded-xl text-left font-bold font-sans text-lg border-2 border-stone-200 bg-white text-stone-700 transition-all hover:scale-[1.02] hover:border-amber-400 hover:bg-amber-50 active:scale-95 shadow-sm hover:shadow-md"
                   >
                     {f.label}
                   </button>
                 ))}
               </div>
             </motion.div>
           )}
         </AnimatePresence>
       </div>
     </div>
  );
}
