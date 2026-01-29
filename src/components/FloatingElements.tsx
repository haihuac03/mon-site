import { motion } from "motion/react";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

interface FloatingElement {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  type: 'rose' | 'heart' | 'petal';
}

export function FloatingElements() {
  const [elements, setElements] = useState<FloatingElement[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const newElements: FloatingElement[] = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 20 + Math.random() * 40,
      delay: Math.random() * 5,
      duration: 15 + Math.random() * 10,
      type: ['rose', 'heart', 'petal'][Math.floor(Math.random() * 3)] as 'rose' | 'heart' | 'petal',
    }));
    setElements(newElements);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {elements.map((element) => {
        const offsetX = (mousePos.x - 0.5) * 20;
        const offsetY = (mousePos.y - 0.5) * 20;
        
        return (
          <motion.div
            key={element.id}
            className="absolute"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              width: `${element.size}px`,
              height: `${element.size}px`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, -15, 0],
              rotate: [0, 10, -10, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: element.duration,
              repeat: Infinity,
              delay: element.delay,
              ease: "easeInOut",
            }}
          >
            <motion.div
              animate={{
                x: offsetX * (element.id % 3 + 1),
                y: offsetY * (element.id % 3 + 1),
              }}
              transition={{ type: "spring", stiffness: 50, damping: 20 }}
            >
              {element.type === 'heart' ? (
                <Heart 
                  className="text-pink-300/40" 
                  fill="currentColor"
                  style={{ width: '100%', height: '100%' }}
                />
              ) : element.type === 'rose' ? (
                <div className="text-4xl opacity-40">🌹</div>
              ) : (
                <div 
                  className="rounded-full bg-gradient-to-br from-pink-300/40 to-rose-400/30"
                  style={{ width: '100%', height: '100%' }}
                />
              )}
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
