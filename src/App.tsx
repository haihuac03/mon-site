import { useState } from "react";
import { motion } from "motion/react";
import { FloatingElements } from "./components/FloatingElements";
import { Envelope } from "./components/Envelope";
import { Letter } from "./components/Letter";
import { Celebration } from "./components/Celebration";
import { GlitchOverlay } from "./components/GlitchOverlay";

export default function App() {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [noClickCount, setNoClickCount] = useState(0);

  const handleEnvelopeClick = () => {
    if (!isEnvelopeOpen) {
      setIsEnvelopeOpen(true);
    }
  };

  const handleYes = () => {
    setShowCelebration(true);
    setNoClickCount(0); // Reset glitch when accepting
  };

  const handleNo = () => {
    // Just for fun, nothing happens
    setNoClickCount((prev) => prev + 1);
  };

  const showGlitch = noClickCount >= 7 && !showCelebration;

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background gradient with grain texture */}
      <div
        className="fixed inset-0 bg-gradient-to-br from-pink-200 via-rose-300 to-pink-400"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 50%, rgba(251, 207, 232, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(244, 114, 182, 0.3) 0%, transparent 50%),
            url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")
          `,
        }}
      />

      {/* Floating roses and particles */}
      <FloatingElements />

      {/* Glitch overlay when clicked No 7+ times */}
      <GlitchOverlay isActive={showGlitch} />

      {/* Main content container */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
        <div className="max-w-4xl mx-auto w-full">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">
              💗 Pour Elodie Vatosoa Amouriq
            </h1>
            <p className="text-red-500 text-lg drop-shadow">
              {!isEnvelopeOpen
                ? "Clique sur l'enveloppe stp"
                : "Lis ce petit mot… 💌"}
            </p>
          </motion.div>

          {/* Envelope and Letter container */}
          <div className="relative min-h-[400px] flex items-center justify-center">
            {!showCelebration && (
              <>
                <motion.div
                  animate={{
                    opacity: isEnvelopeOpen ? 0.3 : 1,
                    scale: isEnvelopeOpen ? 0.8 : 1,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <Envelope
                    isOpen={isEnvelopeOpen}
                    onClick={handleEnvelopeClick}
                    isSuccess={showCelebration}
                  />
                </motion.div>

                <Letter
                  isVisible={isEnvelopeOpen}
                  onYes={handleYes}
                  onNo={handleNo}
                  noClickCount={noClickCount}
                />
              </>
            )}
          </div>

          {/* Footer */}
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <p className="text-red-500 text-lg drop-shadow">
              Made with love 💕
            </p>
          </motion.div>
        </div>
      </div>

      {/* Celebration overlay */}
      <Celebration isVisible={showCelebration} />
    </div>
  );
}