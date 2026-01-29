import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface GlitchOverlayProps {
  isActive: boolean;
}

export function GlitchOverlay({ isActive }: GlitchOverlayProps) {
  const [glitchText, setGlitchText] = useState("");
  
  useEffect(() => {
    if (isActive) {
      const texts = [
        "TRÈS BIEN",
        "JE VAIS TE HACKER",
        "MAINTENANT",
        "C'EST TANT PIS POUR TOI",
        "⚠️ HACK EN COURS ⚠️",
        "01010100 01010010 01001111 01010000",
        "SYSTÈME COMPROMIS",
      ];
      
      let index = 0;
      const interval = setInterval(() => {
        setGlitchText(texts[index % texts.length]);
        index++;
      }, 300);
      
      return () => clearInterval(interval);
    }
  }, [isActive]);

  if (!isActive) return null;

  return (
    <>
      {/* Glitch overlay */}
      <motion.div
        className="fixed inset-0 z-40 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* Red flash effect */}
        <motion.div
          className="absolute inset-0 bg-red-600"
          animate={{
            opacity: [0, 0.3, 0, 0.5, 0, 0.2, 0],
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatDelay: 0.1,
          }}
        />

        {/* Scanlines */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,.1) 0px, transparent 2px, transparent 4px)',
            animation: 'scanline 8s linear infinite',
          }}
        />

        {/* RGB split effect */}
        <motion.div
          className="absolute inset-0 mix-blend-screen"
          animate={{
            x: [-2, 2, -2],
          }}
          transition={{
            duration: 0.1,
            repeat: Infinity,
          }}
          style={{
            backgroundImage: 'linear-gradient(90deg, rgba(255,0,0,0.1) 0%, transparent 100%)',
          }}
        />

        {/* Random squares glitch */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-black"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 5 + 2,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              x: [0, Math.random() * 20 - 10],
            }}
            transition={{
              duration: 0.1,
              repeat: Infinity,
              repeatDelay: Math.random() * 0.5,
              delay: Math.random() * 0.5,
            }}
          />
        ))}
      </motion.div>

      {/* Warning message */}
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <motion.div
          className="bg-black border-4 border-red-600 p-8 rounded-lg shadow-2xl"
          animate={{
            rotate: [-1, 1, -1, 1, 0],
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 0.2,
            repeat: Infinity,
          }}
          style={{
            boxShadow: '0 0 50px rgba(220, 38, 38, 0.8), inset 0 0 20px rgba(220, 38, 38, 0.3)',
          }}
        >
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-red-500 text-center mb-4"
            animate={{
              opacity: [1, 0.8, 1],
              textShadow: [
                '0 0 10px rgba(220, 38, 38, 0.8)',
                '0 0 20px rgba(220, 38, 38, 1)',
                '0 0 10px rgba(220, 38, 38, 0.8)',
              ],
            }}
            transition={{
              duration: 0.3,
              repeat: Infinity,
            }}
          >
            {glitchText}
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl text-red-400 text-center font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{
              duration: 1,
              repeat: Infinity,
            }}
          >
            TRÈS BIEN JE VAIS TE HACKER MTN<br />
            ALORS C'EST TANT PIS POUR TOI ⚠️
          </motion.p>

          {/* Fake loading bar */}
          <div className="mt-6 bg-gray-800 h-4 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-red-600 to-red-400"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </div>

          <p className="text-red-300 text-center mt-4 text-sm font-mono">
            HACK PROGRESS: LOADING...
          </p>
        </motion.div>
      </motion.div>

      <style jsx>{`
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </>
  );
}
