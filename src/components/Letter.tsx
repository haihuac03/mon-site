import { motion } from "motion/react";
import { useState } from "react";

interface LetterProps {
  isVisible: boolean;
  onYes: () => void;
  onNo: () => void;
  noClickCount: number;
}

export function Letter({ isVisible, onYes, onNo, noClickCount }: LetterProps) {
  const [yesScale, setYesScale] = useState(1);

  const teasingTexts = [
    "T'es sûre ? 😳",
    "Re-réfléchis… 🥺",
    "Vraiment ? 💔",
    "Allez, essaye encore… 🌹",
    "Tu vas craquer… 💕",
    "Sérieusement ? 😤",
    "Dernière chance... ⚠️",
  ];

  const handleNoClick = () => {
    setYesScale((prev) => Math.min(prev + 0.15, 2.2));
    onNo();
  };

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md z-50"
      initial={{ y: 100, opacity: 0, scale: 0.8 }}
      animate={isVisible ? { 
        y: 0, 
        opacity: 1, 
        scale: 1,
      } : { 
        y: 100, 
        opacity: 0, 
        scale: 0.8 
      }}
      transition={{ 
        type: "spring", 
        stiffness: 100, 
        damping: 15,
        delay: 0.3,
      }}
    >
      {/* Paper */}
      <div className="bg-gradient-to-br from-white to-pink-50 rounded-2xl shadow-2xl p-8 md:p-10 border-2 border-pink-200/50">
        {/* Signature */}
        <div className="text-right mb-6">
          <p className="text-pink-600 italic" style={{ fontFamily: 'cursive' }}>
            De Haihua l'amour de ta vie 💗
          </p>
        </div>

        {/* Main question */}
        <motion.div
          className="text-center mb-8"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-rose-600 mb-2">
            Veux-tu être ma
          </h2>
          <h2 className="text-4xl md:text-5xl font-bold text-rose-600">
            Valentine ? 💝
          </h2>
        </motion.div>

        {/* Teasing text */}
        {noClickCount > 0 && noClickCount < 7 && (
          <motion.p
            key={noClickCount}
            className="text-center text-pink-500 mb-4 text-lg"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            {teasingTexts[Math.min(noClickCount - 1, teasingTexts.length - 1)]}
          </motion.p>
        )}

        {noClickCount >= 7 && (
          <motion.p
            className="text-center text-red-600 font-bold mb-4 text-xl"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [-2, 2, -2],
            }}
            transition={{
              duration: 0.3,
              repeat: Infinity,
            }}
          >
            ⚠️ ALERTE SYSTÈME ⚠️
          </motion.p>
        )}

        {/* Buttons */}
        <div className="flex gap-4 justify-center items-end">
          {/* Yes button - grows */}
          <motion.button
            className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden"
            style={{ scale: yesScale }}
            whileHover={{ scale: yesScale * 1.05 }}
            whileTap={{ scale: yesScale * 0.95 }}
            onClick={onYes}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-pink-400 to-rose-400 opacity-0 hover:opacity-100 transition-opacity"
              style={{
                boxShadow: '0 0 20px rgba(244, 114, 182, 0.6)',
              }}
            />
            <span className="relative z-10">Oui 💕</span>
          </motion.button>

          {/* No button - shrinks */}
          <motion.button
            className="bg-white text-pink-600 px-6 py-3 rounded-full font-semibold shadow-md hover:shadow-lg transition-shadow border-2 border-pink-300"
            animate={{ 
              scale: Math.max(1 - noClickCount * 0.08, 0.6),
              x: noClickCount > 0 && noClickCount < 7 ? [0, -3, 3, -3, 3, 0] : 0,
              rotate: noClickCount >= 7 ? [-5, 5, -5] : 0,
            }}
            transition={{ 
              x: { duration: 0.3 },
              scale: { duration: 0.3 },
              rotate: { duration: 0.2, repeat: Infinity }
            }}
            whileHover={{ scale: Math.max(1.05 - noClickCount * 0.08, 0.65) }}
            whileTap={{ scale: Math.max(0.95 - noClickCount * 0.08, 0.55) }}
            onClick={handleNoClick}
          >
            Non 😔
          </motion.button>
        </div>
      </div>

      {/* Paper shadow */}
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-pink-900/20 rounded-full blur-2xl" />
    </motion.div>
  );
}