import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

interface EnvelopeProps {
  isOpen: boolean;
  onClick: () => void;
  isSuccess: boolean;
}

export function Envelope({ isOpen, onClick, isSuccess }: EnvelopeProps) {
  return (
    <motion.div
      className="relative cursor-pointer"
      onClick={onClick}
      whileHover={!isOpen ? {
        y: -6,
        rotate: [0, -2, 2, -2, 0],
        scale: 1.05,
      } : {}}
      transition={{ duration: 0.3 }}
    >
      {/* Envelope body */}
      <div className="relative w-64 h-40 md:w-80 md:h-48">
        {/* Back flap (always visible) */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-200 to-rose-300 rounded-lg shadow-xl border-2 border-pink-300/50" />
        
        {/* Top flap - animates on open */}
        <motion.div
          className="absolute left-0 right-0 top-0 h-24 md:h-28 origin-bottom"
          style={{
            background: 'linear-gradient(to bottom right, #fce7f3, #fda4af)',
            clipPath: 'polygon(0 0, 50% 60%, 100% 0)',
            borderTop: '2px solid rgba(244, 114, 182, 0.3)',
            borderLeft: '2px solid rgba(244, 114, 182, 0.3)',
            borderRight: '2px solid rgba(244, 114, 182, 0.3)',
          }}
          animate={{
            rotateX: isOpen ? 180 : 0,
            y: isOpen ? -10 : 0,
          }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        />

        {/* Envelope front decoration */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            animate={{
              scale: isOpen ? 0 : 1,
              opacity: isOpen ? 0 : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-6xl">💌</div>
          </motion.div>
        </div>

        {/* Success sparkle effect */}
        {isSuccess && (
          <motion.div
            className="absolute -top-4 -right-4"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          >
            <Sparkles className="w-8 h-8 text-yellow-400 fill-yellow-400" />
          </motion.div>
        )}

        {/* Glow effect on hover */}
        {!isOpen && (
          <motion.div
            className="absolute inset-0 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300"
            style={{
              boxShadow: '0 0 30px rgba(244, 114, 182, 0.5)',
            }}
          />
        )}
      </div>

      {/* Shadow */}
      <motion.div
        className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-48 h-8 bg-pink-900/10 rounded-full blur-xl"
        animate={{
          scale: isOpen ? 0.8 : 1,
        }}
      />
    </motion.div>
  );
}
