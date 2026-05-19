import { motion } from 'motion/react';
import { Cat, Store, Heart } from 'lucide-react';
import { t, Language } from '../translations';

export default function CafeFront({ onEnter, lang }: { onEnter: () => void, lang: Language }) {
  const text = t[lang];

  return (
    <div className="flex flex-col items-center justify-center space-y-8 max-w-sm mx-auto">
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
        className="w-[320px] bg-[#fdfbf7] rounded-t-3xl rounded-b-md shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25)] p-6 pt-10 pb-6 border-x-4 border-b-4 border-t-8 border-stone-800 relative text-center"
      >
        {/* Awning structure */}
        <div className="absolute -top-4 -left-4 -right-4 h-14 flex z-20 shadow-lg border-b-4 border-stone-800 rounded-lg overflow-hidden">
           {Array.from({length: 6}).map((_, i) => (
             <div key={i} className={`flex-1 h-full transform origin-top ${i % 2 === 0 ? 'bg-rose-400' : 'bg-rose-100'}`} />
           ))}
        </div>
        
        {/* Awning support poles */}
        <div className="absolute top-10 -left-1 w-2 h-24 bg-stone-300 border border-stone-800 rounded-full rotate-[-12deg] origin-top z-10" />
        <div className="absolute top-10 -right-1 w-2 h-24 bg-stone-300 border border-stone-800 rounded-full rotate-[12deg] origin-top z-10" />

        <div className="mt-8 relative z-10 w-full mb-6">
            {/* Window frame */}
            <div className="w-[85%] mx-auto h-40 bg-blue-50/70 border-4 border-stone-800 rounded-t-full relative overflow-hidden flex items-center justify-center p-4">
                {/* Window reflections */}
                <div className="absolute -top-10 left-6 w-6 h-40 bg-white/60 rotate-[30deg]" />
                <div className="absolute -top-10 left-16 w-2 h-40 bg-white/60 rotate-[30deg]" />
                
                {/* Store logo sign inside window */}
                <motion.div 
                    animate={{ rotate: [-2, 2, -2] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                    className="w-20 h-20 bg-stone-800 rounded-full border-4 border-amber-300 flex items-center justify-center text-amber-50 shadow-lg z-10"
                >
                    <Cat className="w-10 h-10 mb-1" />
                </motion.div>
                
                {/* Floating hearts */}
                 <motion.div animate={{ y: [-10, -30, -10], opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 2, delay: 0 }} className="absolute text-rose-400 right-6 bottom-4 z-10"><Heart className="w-5 h-5 fill-current"/></motion.div>
                 <motion.div animate={{ y: [-10, -40, -10], opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 2.5, delay: 0.5 }} className="absolute text-rose-300 right-14 bottom-8 z-10"><Heart className="w-3 h-3 fill-current"/></motion.div>
            </div>
            
            {/* Window sill */}
            <div className="w-[100%] mx-auto h-4 bg-stone-700 border-x-4 border-b-4 border-stone-900 rounded-b-md relative z-20" />
            
            {/* Potted plant left */}
            <div className="absolute -bottom-1 left-2 w-8 h-8 z-30">
               <div className="w-5 h-8 mx-auto bg-emerald-600 rounded-t-full rounded-b-sm border-2 border-stone-800" />
               <div className="w-6 h-5 mx-auto bg-orange-600 rounded-b-md border-2 border-stone-800 -mt-2" />
            </div>
            {/* Potted plant right */}
            <div className="absolute -bottom-1 right-2 w-8 h-8 z-30">
               <div className="w-6 h-6 mx-auto bg-emerald-500 rounded-full border-2 border-stone-800" />
               <div className="w-6 h-5 mx-auto bg-orange-500 rounded-b-md border-2 border-stone-800 -mt-1" />
            </div>
        </div>

        <h1 className="text-3xl font-bold text-stone-800 tracking-tight font-sans drop-shadow-sm mt-6">
          {text.cafeTitle}
        </h1>
        <p className="text-stone-500 mt-1 font-hand text-xl font-medium mb-4">
          {text.cafeEst}
        </p>

        {/* Chalkboard Sign */}
        <div className="bg-stone-700 p-2 rounded-lg relative rotate-2 mb-6 shadow-xl mx-8 border-2 border-stone-800">
             <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-stone-800" />
             <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-4 h-[10px] border-x-2 border-t-2 border-stone-400 rounded-t-full" />
            <div className="border-2 border-stone-500 border-dashed rounded p-2 text-stone-200 bg-stone-600/50">
                <p className="font-hand text-xl text-rose-300">{text.open247}</p>
                <p className="text-sm font-hand opacity-90">{text.forYouOnly}</p>
            </div>
        </div>

        <motion.button
           whileHover={{ scale: 1.05 }}
           whileTap={{ scale: 0.95 }}
           onClick={onEnter}
           className="w-full py-4 bg-stone-800 text-stone-100 rounded-xl font-bold text-lg hover:bg-stone-700 transition-colors shadow-[0_6px_0_theme(colors.stone.900)] active:shadow-[0_0px_0_theme(colors.stone.900)] active:translate-y-[6px] flex items-center justify-center gap-2 group relative overflow-hidden"
        >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
           {text.stepInside} <Store className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </motion.button>
      </motion.div>
    </div>
  );
}
