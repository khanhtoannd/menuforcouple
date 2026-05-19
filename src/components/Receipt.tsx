import { useRef, useState, useEffect } from 'react';
import { DateOrder } from '../App';
import { t, Language } from '../translations';
import SignaturePad from './SignaturePad';
import { toPng } from 'html-to-image';
import { Download, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Receipt({ order, onReset, lang }: { order: DateOrder, onReset: () => void, lang: Language }) {
  const dateString = new Date().toLocaleDateString();
  const text = t[lang];
  const receiptRef = useRef<HTMLDivElement>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Fire confetti when receipt is shown
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 50 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);

    // Simple burst first
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#fbbf24', '#34d399', '#60a5fa']
    });
    
    return () => clearInterval(interval);
  }, []);

  const handleSave = async () => {
    if (!receiptRef.current) return;
    setIsSaving(true);
    try {
      const dataUrl = await toPng(receiptRef.current, { 
        cacheBust: true, 
        backgroundColor: '#f5f5f4', // stone-50 to match background loosely or white
        pixelRatio: 2
      });
      const link = document.createElement('a');
      link.download = `date-receipt-${new Date().getTime()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to save receipt', err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto flex flex-col items-center pb-20 mt-16">
      <div ref={receiptRef} className="w-full bg-white text-stone-800 p-8 py-12 rounded-sm shadow-2xl border-y-[10px] border-dotted border-stone-300 relative">
        <div className="absolute inset-0 bg-stone-50 opacity-50 mix-blend-multiply pointer-events-none" />

        {/* Receipt Content */}
        <div className="text-center mb-8 relative z-10">
          <h2 className="text-2xl font-mono font-bold tracking-widest uppercase text-stone-800">{text.cafeNameOnReceipt}</h2>
          <p className="text-stone-400 font-mono text-sm mt-2">{text.orderTitle}</p>
          <p className="text-stone-400 font-mono text-sm">{dateString}</p>
        </div>

        <div className="border-t-2 border-dashed border-stone-300 my-6 relative z-10" />

        <div className="font-mono text-base space-y-6 relative z-10">
          <div>
            <p className="text-stone-400 text-xs tracking-wider mb-1">{text.customerLabel}</p>
            <p className="font-bold text-lg">{text.customerName}</p>
          </div>
          <div>
            <p className="text-stone-400 text-xs tracking-wider mb-1">{text.itemLabel}</p>
            <p className="font-bold text-lg">{text.itemName}</p>
          </div>
          <div className="pl-4 border-l-2 border-stone-200 space-y-2 mt-2">
            <p className="text-stone-600 font-medium">{text.vibeLabel} {order.vibe}</p>
            <p className="text-stone-600 font-medium">{text.activityLabel} {order.activity}</p>
            <p className="text-stone-600 font-medium">{text.foodLabel} {order.food}</p>
          </div>
        </div>

        <div className="border-t-2 border-dashed border-stone-300 my-6 relative z-10" />

        <div className="flex justify-between items-center font-mono font-bold text-xl relative z-10">
          <span>{text.totalDueLabel}</span>
          <span>{text.totalDueValue}</span>
        </div>

        <SignaturePad label={text.signHere} clearLabel={text.clearSignature} />

        <div className="mt-10 text-center relative z-10">
          <p className="font-hand text-4xl text-rose-500 mb-4 -rotate-2">{text.validLabel}</p>
          <p className="font-sans text-sm text-stone-400 font-medium bg-stone-100 p-3 rounded-lg border border-stone-200 shadow-inner">
            {text.screenshotLabel}
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-6 mt-12">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-stone-800 text-stone-100 px-6 py-3 rounded-full font-bold font-sans hover:bg-stone-700 transition-colors flex items-center gap-2 shadow-lg hover:shadow-xl active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
          {text.saveReceipt}
        </button>

        <button
          onClick={onReset}
          className="text-stone-500 hover:text-stone-800 font-medium font-sans underline underline-offset-8 transition-colors flex items-center gap-2"
        >
          {text.returnMenu}
        </button>
      </div>
    </div>
  );
}
