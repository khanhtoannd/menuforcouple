import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { t, Language } from '../translations';

export default function ReasonsViewer({ onComplete, lang }: { onComplete: () => void, lang: Language }) {
  const [index, setIndex] = useState(0);
  const text = t[lang];
  const reasons = text.reasons;

  const next = () => {
    if (index < reasons.length - 1) {
      setIndex(index + 1);
    } else {
      onComplete();
    }
  };

  const prev = () => {
    if (index > 0) setIndex(index - 1);
  };

  return (
    <div className="relative w-full max-w-lg mx-auto h-[400px] flex flex-col items-center justify-center p-8 bg-stone-50 backdrop-blur-md shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25)] rounded-2xl border-2 border-stone-200 z-10 overflow-hidden">
      
      {/* Decorative top tape */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-8 bg-white/40 rotate-2 border border-stone-200 shadow-sm z-20" />
      
      <div className="absolute top-6 left-0 w-full flex justify-center opacity-70">
        <div className="font-sans font-bold text-stone-400 tracking-widest text-xs uppercase">
          {text.reasonsTitle} ({index + 1}/{reasons.length})
        </div>
      </div>

      <div className="w-full flex-1 flex items-center justify-center text-center px-6 sm:px-10 mt-8 mb-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="text-2xl sm:text-3xl font-hand text-stone-800 font-semibold leading-relaxed"
          >
            "{reasons[index]}"
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-6 w-full px-6 flex justify-between items-center z-10">
        <div>
          {index > 0 ? (
            <button 
              onClick={prev} 
              className="p-3 text-stone-500 hover:text-stone-800 hover:bg-stone-200 bg-stone-100 rounded-full transition-all shadow-sm active:scale-95 border border-stone-200"
              aria-label="Previous reason"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          ) : <div className="w-12" />} 
        </div>
        
        <button 
          onClick={next} 
          className={`p-3 rounded-full transition-all shadow-md flex items-center gap-2 px-6 active:scale-95 ${
            index < reasons.length - 1 
              ? 'text-stone-100 bg-stone-800 hover:bg-stone-700' 
              : 'text-stone-800 bg-amber-200 hover:bg-amber-300 border border-amber-300'
          }`}
        >
          {index < reasons.length - 1 ? (
             <>
               <span className="font-semibold font-sans hidden sm:inline-block">{text.reasonsNext}</span>
               <ChevronRight className="w-5 h-5" />
             </>
          ) : (
            <>
               <span className="font-semibold font-sans">{text.reasonsEnding}</span>
               <Check className="w-5 h-5" />
             </>
          )}
        </button>
      </div>
    </div>
  );
}
