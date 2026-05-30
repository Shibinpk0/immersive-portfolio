import { useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";

export default function LandingScene({ setStage }) {
  const imageRef = useRef(null);
  const fadeOverlayRef = useRef(null);
  const contentRef = useRef(null);

  const handleEnter = () => {
    // 1. Fade out text first
    gsap.to(contentRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.4,
      ease: "power2.in",
    });

    // 2. Stop CSS animation so GSAP can take over
    gsap.set(imageRef.current, { animation: "none" });

    // 3. Start zoom timeline
    const tl = gsap.timeline({
      delay: 0.3,
      onComplete: () => {
        setStage("portfolio");
      },
    });

    tl.to(imageRef.current, {
      scale: 2.5,
      duration: 2,
      ease: "power3.inOut",
    });

    tl.to(
      fadeOverlayRef.current,
      {
        opacity: 1,
        duration: 1,
      },
      "-=0.8"
    );
  };

  return (
    <motion.div
      className="landing-scene"
      initial={{ scale: 1.1, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
    >
      <img
        ref={imageRef}
        src="/assets/room.jpg"
        alt=""
        className="scene-image"
      />

      <div className="overlay-dark" />
      <div ref={fadeOverlayRef} className="zoom-fade-overlay" />

      <div ref={contentRef} className="scene-content">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          Welcome To My World
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.8, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
        >
          Cinematic Interactive Portfolio Experience
        </motion.p>

        <motion.button
          onClick={handleEnter}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Enter Experience
        </motion.button>
      </div>
    </motion.div>
  );
}