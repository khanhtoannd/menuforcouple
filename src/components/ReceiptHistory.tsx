import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, CalendarHeart, Trash2, Loader2 } from 'lucide-react';
import { DateOrder } from '../App';
import { t, Language } from '../translations';
import { db, auth } from '../firebase';
import { collection, query, orderBy, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { getCoupleId } from '../utils';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export default function ReceiptHistory({ onBack, lang }: { onBack: () => void, lang: Language }) {
  const [history, setHistory] = useState<DateOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const text = t[lang];

  useEffect(() => {
    const coupleId = getCoupleId();
    const q = query(
      collection(db, 'couples', coupleId, 'orders'),
      orderBy('createdAt', 'desc')
    );

    const pathForOnSnapshot = `couples/${coupleId}/orders`;
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ordersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as DateOrder[];
      setHistory(ordersData);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, pathForOnSnapshot);
    });

    return () => unsubscribe();
  }, []);

  const deleteItem = async (id: string) => {
    const coupleId = getCoupleId();
    const pathForWrite = `couples/${coupleId}/orders/${id}`;
    try {
      await deleteDoc(doc(db, 'couples', coupleId, 'orders', id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, pathForWrite);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-stone-50 rounded-2xl shadow-xl overflow-hidden border border-stone-200">
      <div className="bg-stone-800 text-stone-100 p-6 flex items-center justify-between">
        <button onClick={onBack} className="p-2 hover:bg-stone-700 rounded-full transition-colors active:scale-95">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-bold font-sans flex items-center gap-2">
            <CalendarHeart className="w-5 h-5" />
            {text.historyTitle}
        </h2>
        <div className="w-9" /> {/* Spacer */}
      </div>

      <div className="p-4 max-h-[60vh] min-h-[40vh] overflow-y-auto bg-stone-100">
        {loading ? (
          <div className="h-full flex items-center justify-center p-8">
            <Loader2 className="w-8 h-8 animate-spin text-stone-400" />
          </div>
        ) : history.length === 0 ? (
          <div className="p-8 text-center text-stone-500 font-hand text-xl h-full flex flex-col items-center justify-center">
            {text.noHistory}
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((order, i) => (
              <motion.div 
                key={order.id || i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white p-4 rounded-xl shadow-sm border border-stone-200 relative"
              >
                 <div className="flex justify-between items-start mb-2">
                    <span className="font-mono text-xs font-bold text-stone-400">
                        {order.dateStr || ''}
                    </span>
                    <button onClick={() => order.id && deleteItem(order.id)} className="text-stone-300 hover:text-rose-500 transition-colors">
                        <Trash2 className="w-4 h-4"/>
                    </button>
                 </div>
                 <div className="space-y-1 font-sans text-stone-700">
                    <p className="flex items-center gap-2 font-medium">✨ {order.vibe}</p>
                    <p className="flex items-center gap-2 font-medium">🎯 {order.activity}</p>
                    <p className="flex items-center gap-2 font-medium">🍽️ {order.food}</p>
                 </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
