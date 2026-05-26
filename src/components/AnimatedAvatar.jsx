import React, { useEffect, useState, useRef } from "react";

// Make sure these paths point exactly to your asset files
import face from "../assets/avatar/face.png";
import pupilImg from "../assets/avatar/pupil.png";

export default function AnimatedAvatar() {
  const leftEyeRef = useRef(null);
  const rightEyeRef = useRef(null);

  const [pupils, setPupils] = useState({
    left: { x: 0, y: 0 },
    right: { x: 0, y: 0 },
  });

  // Calculate circular boundary tracking
  const calculate = (rect, targetX, targetY) => {
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const dx = targetX - cx;
    const dy = targetY - cy;

    const distance = Math.sqrt(dx * dx + dy * dy);

    const maxMove = 6;
    const clampedDistance = Math.min(maxMove, distance * 0.05);

    if (distance === 0) return { x: 0, y: 0 };

    return {
      x:
        (dx / distance) * clampedDistance +
        (Math.random() - 0.5) * 0.12, // micro jitter added
      y:
        (dy / distance) * clampedDistance +
        (Math.random() - 0.5) * 0.12,
    };
  };

  useEffect(() => {
    const handleMove = (e) => {
      const nextPupils = { left: { x: 0, y: 0 }, right: { x: 0, y: 0 } };

      if (leftEyeRef.current) {
        const leftRect = leftEyeRef.current.getBoundingClientRect();
        nextPupils.left = calculate(leftRect, e.clientX, e.clientY);
      }

      if (rightEyeRef.current) {
        const rightRect = rightEyeRef.current.getBoundingClientRect();
        nextPupils.right = calculate(rightRect, e.clientX, e.clientY);
      }

      setPupils(nextPupils);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div className="avatar-wrapper animate-float">
      <div className="avatar-container">

        {/* LEFT EYE */}
        <div ref={leftEyeRef} className="avatar-eye eye-left">
          <div className="eye-highlight" />
          <img
            src={pupilImg}
            className="avatar-pupil"
            style={{
              transform: `translate(${pupils.left.x}px, ${pupils.left.y}px)`,
            }}
            alt="Left Pupil"
          />
        </div>

        {/* RIGHT EYE */}
        <div ref={rightEyeRef} className="avatar-eye eye-right">
          <div className="eye-highlight" />
          <img
            src={pupilImg}
            className="avatar-pupil"
            style={{
              transform: `translate(${pupils.right.x}px, ${pupils.right.y}px)`,
            }}
            alt="Right Pupil"
          />
        </div>

        {/* FACE (ON TOP) */}
        <img src={face} className="avatar-face" alt="Character Face" />

      </div>

      <style>{`
        .avatar-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          /* Removed 100vh height to fit inside portfolio layout smoothly */
          width: 320px;
          height: 320px;
          position: relative;
          z-index: 2;
        }

        .avatar-container {
          position: relative;
          width: 380px;
          height: 325px;
        }

        .avatar-face {
          width: 125%;
          height: 101%;
          object-fit: contain;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 10;
          pointer-events: none;
          filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.4));
        }

        /* 👁️ REALISTIC EYE BASE */
        .avatar-eye {
          position: absolute;
          width: 32px;
          height: 20px;
          border-radius: 50%;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 5;
          background: radial-gradient(circle at 30% 30%, #ffffff, #dcdcdc);
          box-shadow: inset 0 1px 3px rgba(0,0,0,0.25);
        }

        .eye-left {
          top: 23%;
          left: 43%;
        }

        .eye-right {
          top: 23%;
          left: 54%;
        }

        .avatar-pupil {
          width: 14px;
          height: 14px;
          object-fit: contain;
          transition: transform 0.15s linear;
          flex-shrink: 0;
          will-change: transform;
        }

        /* ✨ Eye highlight reflection */
        .eye-highlight {
          position: absolute;
          width: 4px;
          height: 4px;
          background: rgba(255,255,255,0.9);
          border-radius: 50%;
          top: 22%;
          left: 22%;
          z-index: 10;
          filter: blur(0.2px);
        }
      `}</style>
    </div>
  );
}
