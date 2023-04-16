import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { Sora } from "next/font/google";
import cn from "cnz";

const sora = Sora({ subsets: ["latin"] });

const containerVariants = {
  visible: {
    transition: {
      staggerChildren: 0.4, // Delay between each child animation
    },
  },
  hidden: {},
};

const childVariants = {
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
  },
  hidden: {
    opacity: 0,
    x: -50,
    scale: 0.8,
  },
  exit: {
    opacity: 0,
    x: 50,
    scale: 0.8,
    transition: {
      delay: 0.2,
    },
  },
};

// @ts-ignore: Unreachable code error
const Circle = ({ showCircle, children }) => {
  return (
    <AnimatePresence>
      {showCircle && (
        <motion.div
          key="circle"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          style={{
            position: "absolute",
            top: "-10px",
            left: "-30px",
            width: "200px",
            height: "60px",
            borderRadius: "50%",
            border: "4px solid red",
            zIndex: 1,
          }}
        />
      )}
      <motion.div style={{ position: "relative", zIndex: 2 }}>
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

const IntroAnimation = () => {
  const [showCircle, setShowCircle] = React.useState(true);

  const handleAnimationComplete = () => {
    setShowCircle(true);
  };

  return (
    <AnimatePresence onExitComplete={() => setShowCircle(true)}>
      <div style={{ position: "relative" }}>
        <Circle showCircle={showCircle}>
          <motion.div
            key="child1"
            variants={childVariants}
            className={cn("text-5xl text-black", sora.className)}
          >
            Tokyo
          </motion.div>
        </Circle>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          // @ts-ignore: Unreachable code error
          onAnimateComplete={handleAnimationComplete}
        >
          <motion.div
            key="child2"
            variants={childVariants}
            exit={{ opacity: 0, x: 50, transition: { duration: 0.5 } }}
            className={cn("text-5xl text-black", sora.className)}
          >
            Taipei
          </motion.div>
          <motion.div
            key="child3"
            variants={childVariants}
            exit={{
              opacity: 0,
              x: 50,
              transition: { duration: 0.5, delay: 0.1 },
            }}
            className={cn("text-5xl text-black", sora.className)}
          >
            Lisbon
          </motion.div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default IntroAnimation;
