"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface AtomLogoProps {
  size?: number;
  className?: string;
}

export function AtomLogo({ size = 40, className }: AtomLogoProps) {
  const [clicked, setClicked] = useState(0);

  const pulse = {
    scale: clicked % 2 === 1 ? [1, 1.15, 1] : [1, 0.9, 1],
  };

  return (
    <div className={`group relative grid place-items-center ${className ?? ""}`}>
      <motion.div
        aria-hidden
        animate={pulse}
        className="relative grid place-items-center"
        style={{ width: size, height: size }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        onClick={() => setClicked((c) => c + 1)}
      >
        {/* outer glow */}
        <div className="absolute inset-0 rounded-full bg-cyan-400/30 blur-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        {/* nucleus */}
        <div
          className="absolute rounded-full"
          style={{
            width: size * 0.22,
            height: size * 0.22,
            background: "radial-gradient(circle, #9ff0ff 0%, #00d4ff 55%, #007ea6 100%)",
            boxShadow: "0 0 12px 2px rgba(0,212,255,0.6)",
          }}
        />
        {/* orbital ring 1 */}
        <motion.svg
          viewBox="0 0 100 100"
          className="absolute inset-0"
          style={{ width: size, height: size }}
          initial={{ rotate: 0 }}
          whileHover={{ rotate: 65, scale: 1.06 }}
          transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <ellipse
            cx="50"
            cy="50"
            rx="46"
            ry="20"
            fill="none"
            stroke="rgba(0,212,255,0.85)"
            strokeWidth="3"
            transform="rotate(-28 50 50)"
            strokeLinecap="round"
          />
          <circle r="5" fill="#9ff0ff" style={{ filter: "drop-shadow(0 0 4px #00d4ff)" }}>
            <animateMotion
              dur="3.2s"
              repeatCount="indefinite"
              path="M 50 50 m -46 0 a 46 20 0 1 0 92 0 a 46 20 0 1 0 -92 0"
              keyPoints="0;1"
              keyTimes="0;1"
              calcMode="linear"
              rotate="0"
            />
          </circle>
        </motion.svg>
        {/* orbital ring 2 */}
        <motion.svg
          viewBox="0 0 100 100"
          className="absolute inset-0"
          style={{ width: size, height: size }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        >
          <ellipse
            cx="50"
            cy="50"
            rx="46"
            ry="20"
            fill="none"
            stroke="rgba(0,212,255,0.35)"
            strokeWidth="1.5"
            transform="rotate(28 50 50)"
            strokeLinecap="round"
          />
          <circle r="3.5" fill="#67e8f9" style={{ filter: "drop-shadow(0 0 3px #00d4ff)" }}>
            <animateMotion
              dur="1.9s"
              repeatCount="indefinite"
              path="M 50 50 m -46 0 a 46 20 0 1 0 92 0 a 46 20 0 1 0 -92 0"
              rotate="0"
            />
          </circle>
        </motion.svg>
      </motion.div>
    </div>
  );
}
