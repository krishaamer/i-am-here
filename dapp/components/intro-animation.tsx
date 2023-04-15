import { motion, AnimatePresence } from "framer-motion";

const containerVariants = {
  visible: {
    transition: {
      staggerChildren: 0.1, // Delay between each child animation
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
    scale: 0,
    transition: {
      delay: 0.2,
    },
  },
};

const IntroAnimation = () => {
  return (
    <AnimatePresence>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <motion.div key="child1" variants={childVariants} className="text-5xl">
          Tokyo
        </motion.div>
        <motion.div
          key="child2"
          variants={childVariants}
          exit="exit"
          className="text-5xl"
        >
          Taipei
        </motion.div>
        <motion.div
          key="child3"
          variants={childVariants}
          exit="exit"
          className="text-5xl"
        >
          Lisbon
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default IntroAnimation;
