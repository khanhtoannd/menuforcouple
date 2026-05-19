import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe } from 'lucide-react';
import CafeFront from './components/CafeFront';
import CafeMenu from './components/CafeMenu';
import DatePlanner from './components/DatePlanner';
import Receipt from './components/Receipt';
import ReasonsViewer from './components/ReasonsViewer';
import ReceiptHistory from './components/ReceiptHistory';
import { Language } from './translations';
import { db } from './firebase';
import { collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { getCoupleId } from './utils';

export type Scene = 'front' | 'menu' | 'planner' | 'receipt' | 'reasons' | 'history';
export type DateOrder = { id?: string; dateStr?: string; vibe: string; activity: string; food: string; };

export default function App() {
  const [scene, setScene] = useState<Scene>('front');
  const [order, setOrder] = useState<DateOrder>({ vibe: '', activity: '', food: '' });
  const [lang, setLang] = useState<Language>('en');

  const handleFinishOrder = async (newOrder: DateOrder) => {
    const coupleId = getCoupleId();
    const orderId = doc(collection(db, 'couples', coupleId, 'orders')).id;
    
    const finalOrder = { 
      ...newOrder, 
      id: orderId, 
      dateStr: new Date().toLocaleDateString()
    };
    
    setOrder(finalOrder);
    setScene('receipt');

    try {
      await setDoc(doc(db, 'couples', coupleId, 'orders', orderId), {
        ...finalOrder,
        coupleId,
        createdAt: serverTimestamp()
      });
    } catch (err) {
      console.error("Firebase save error:", err);
    }
  };

  const cycleLanguage = () => {
    if (lang === 'en') setLang('vi');
    else if (lang === 'vi') setLang('zh');
    else setLang('en');
  };

  const langNames = { en: "English", vi: "Tiếng Việt", zh: "中文" };

  return (
    <div className="min-h-screen bg-stone-200 text-stone-800 flex items-center justify-center p-4 sm:p-8 font-sans overflow-y-auto relative selection:bg-amber-200">
      {/* Subtle Polka Dot Texture */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      {/* Language Switcher */}
      <button 
        onClick={cycleLanguage}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 bg-white/50 backdrop-blur-sm border border-stone-300 px-3 py-2 rounded-full font-medium text-sm text-stone-700 shadow-sm hover:bg-stone-100 transition flex items-center gap-2"
      >
        <Globe className="w-4 h-4" /> {langNames[lang]}
      </button>

      <AnimatePresence mode="wait">
        {scene === 'front' && (
          <motion.div key="front" exit={{ opacity: 0, scale: 0.95 }} className="w-full z-10 flex justify-center">
            <CafeFront onEnter={() => setScene('menu')} lang={lang} />
          </motion.div>
        )}
        
        {scene === 'menu' && (
           <motion.div key="menu" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full z-10 flex justify-center">
             <CafeMenu onOrderDate={() => setScene('planner')} onViewReasons={() => setScene('reasons')} onViewHistory={() => setScene('history')} lang={lang} />
           </motion.div>
        )}
        
        {scene === 'planner' && (
           <motion.div key="planner" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full max-w-md z-10 mx-auto">
             <DatePlanner onFinish={handleFinishOrder} onBack={() => setScene('menu')} lang={lang} />
           </motion.div>
        )}
        
        {scene === 'receipt' && (
           <motion.div key="receipt" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md z-10 mx-auto">
             <Receipt order={order} onReset={() => setScene('front')} lang={lang} />
           </motion.div>
        )}

        {scene === 'reasons' && (
           <motion.div key="reasons" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="w-full z-10 mx-auto">
             <ReasonsViewer onComplete={() => setScene('menu')} lang={lang} />
           </motion.div>
        )}

        {scene === 'history' && (
           <motion.div key="history" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full z-10 mx-auto">
             <ReceiptHistory onBack={() => setScene('menu')} lang={lang} />
           </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
