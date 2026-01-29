import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

interface CelebrationProps {
  isVisible: boolean;
}

export function Celebration({ isVisible }: CelebrationProps) {
  const [confetti, setConfetti] = useState<Array<{ id: number; x: number; delay: number; color: string }>>([]);

  useEffect(() => {
    if (isVisible) {
      const newConfetti = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 0.5,
        color: ['#ec4899', '#f472b6', '#fb923c', '#fbbf24', '#a855f7'][Math.floor(Math.random() * 5)],
      }));
      setConfetti(newConfetti);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Confetti */}
      {confetti.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute w-3 h-3 rounded-full"
          style={{
            backgroundColor: piece.color,
            left: `${piece.x}%`,
            top: '-5%',
          }}
          animate={{
            y: ['0vh', '110vh'],
            x: [0, Math.random() * 100 - 50],
            rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)],
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: 2 + Math.random(),
            delay: piece.delay,
            ease: "easeIn",
          }}
        />
      ))}

      {/* Sparkles effects */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute"
          style={{
            left: '50%',
            top: '50%',
          }}
          initial={{ scale: 0, x: 0, y: 0 }}
          animate={{
            scale: [0, 1, 0],
            x: Math.cos((i / 8) * Math.PI * 2) * 150,
            y: Math.sin((i / 8) * Math.PI * 2) * 150,
          }}
          transition={{
            duration: 1,
            delay: 0.2,
            ease: "easeOut",
          }}
        >
          <Sparkles className="w-6 h-6 text-yellow-400 fill-yellow-400" />
        </motion.div>
      ))}

      {/* Main message */}
      <motion.div
        className="relative text-center z-10"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 15,
          delay: 0.5,
        }}
      >
        <motion.div
          className="bg-gradient-to-br from-white to-pink-50 rounded-3xl p-12 shadow-2xl border-4 border-pink-300"
          animate={{
            boxShadow: [
              '0 0 20px rgba(244, 114, 182, 0.5)',
              '0 0 40px rgba(244, 114, 182, 0.8)',
              '0 0 20px rgba(244, 114, 182, 0.5)',
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-rose-600 to-red-600"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Je t'aime ❤️
          </motion.h1>
          
          <motion.p
            className="mt-4 text-xl text-pink-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            Tu as fait mon bonheur ! 💝
          </motion.p>
        </motion.div>

        {/* Floating hearts around the message */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`heart-${i}`}
            className="absolute text-4xl"
            style={{
              left: '50%',
              top: '50%',
            }}
            animate={{
              x: Math.cos((i / 6) * Math.PI * 2) * 120,
              y: Math.sin((i / 6) * Math.PI * 2) * 120,
              rotate: [0, 360],
              scale: [0, 1, 0.8, 1],
            }}
            transition={{
              duration: 3,
              delay: 0.7 + i * 0.1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            💕
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
