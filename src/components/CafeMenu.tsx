import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Coffee, Heart, Utensils, Sun, MessageCircleHeart, Ticket, Sparkles } from 'lucide-react';
import { t, Language } from '../translations';

export default function CafeMenu({ onOrderDate, onViewReasons, onViewHistory, lang }: { onOrderDate: () => void, onViewReasons: () => void, onViewHistory: () => void, lang: Language }) {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const text = t[lang];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-stone-50 rounded-2xl shadow-2xl border border-stone-200 relative overflow-hidden flex flex-col max-h-[85vh]">
      {/* Header */}
      <div className="bg-stone-800 text-stone-100 p-8 text-center relative overflow-hidden flex-shrink-0">
        {/* ... */}
        <div className="absolute top-0 right-0 opacity-10 rotate-12 -translate-y-4 translate-x-4">
          <Coffee className="w-32 h-32" />
        </div>
        <h2 className="text-4xl font-sans font-bold tracking-widest uppercase text-stone-100 relative z-10">{text.menuTitle}</h2>
        <p className="text-stone-400 text-sm mt-2 font-bold tracking-widest relative z-10">{text.menuSubtitle}</p>
      </div>

      {/* Items */}
      <div className="p-6 space-y-4 pb-4 overflow-y-auto flex-1 menu-scrollbar">
        <MenuItem
          icon={<Coffee className="w-6 h-6" />}
          title={text.item1Title}
          desc={text.item1Desc}
          onClick={() => showToast(text.item1Toast)}
        />
        <MenuItem
          icon={<Heart className="w-6 h-6" />}
          title={text.item2Title}
          desc={text.item2Desc}
          onClick={() => showToast(text.item2Toast)}
        />
        <MenuItem
          icon={<Sun className="w-6 h-6" />}
          title={text.item4Title}
          desc={text.item4Desc}
          onClick={() => showToast(text.item4Toast)}
        />
        <MenuItem
          icon={<MessageCircleHeart className="w-6 h-6" />}
          title={text.item5Title}
          desc={text.item5Desc}
          onClick={() => showToast(text.item5Toast)}
        />
        <MenuItem
          icon={<Ticket className="w-6 h-6" />}
          title={text.item6Title}
          desc={text.item6Desc}
          onClick={() => showToast(text.item6Toast)}
        />
        <MenuItem
          icon={<Sparkles className="w-6 h-6 text-amber-500" />}
          title={text.item7Title}
          desc={text.item7Desc}
          onClick={onViewReasons}
        />
      </div>

      <div className="p-6 pt-2 bg-stone-50 shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.1)] z-10 sticky bottom-0">
        <div className="pb-4 pt-2 flex justify-center">
           <div className="w-12 h-1 bg-stone-200 rounded-full" />
        </div>

        <MenuItem
          icon={<Utensils className="w-6 h-6" />}
          title={text.item3Title}
          desc={text.item3Desc}
          onClick={onOrderDate}
          isSpecial
        />

        <button onClick={onViewHistory} className="w-full mt-3 text-stone-400 font-sans font-medium text-sm hover:text-stone-600 transition-colors underline underline-offset-4 decoration-stone-300">
           {text.viewHistory}
        </button>
      </div>

      {/* Toast Notification positioned absolutely over the menu */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute bottom-6 left-0 right-0 mx-4 bg-rose-500 text-white p-5 rounded-2xl shadow-xl text-center z-50 font-medium text-lg leading-relaxed pointer-events-none"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MenuItem({ icon, title, desc, onClick, isSpecial=false }: any) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`w-full text-left p-4 rounded-2xl flex items-center gap-4 transition-colors border-2 ${
        isSpecial 
          ? 'bg-amber-50 border-amber-200 hover:border-amber-400 shadow-md' 
          : 'bg-white border-stone-100 hover:border-stone-300 shadow-sm'
      }`}
    >
      <div className={`p-4 rounded-xl flex-shrink-0 ${
        isSpecial ? 'bg-amber-100 text-amber-700' : 'bg-stone-100 text-stone-600'
      }`}>
        {icon}
      </div>
      <div>
        <h3 className={`font-bold font-sans text-xl mb-1 ${
          isSpecial ? 'text-amber-900' : 'text-stone-800'
        }`}>{title}</h3>
        <p className={`text-sm leading-snug font-medium ${
          isSpecial ? 'text-amber-700/80' : 'text-stone-500'
        }`}>{desc}</p>
      </div>
    </motion.button>
  );
}
