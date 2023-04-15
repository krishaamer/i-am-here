import { motion } from "framer-motion";

const containerVariants = {
  visible: {
    transition: {
      staggerChildren: 0.1 // Delay between each child animation
    }
  },
  hidden: {}
};

const childVariants = {
  visible: {
    opacity: 1
  },
  hidden: {
    opacity: 0
  }
};

const IntroAnimation = () => {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <motion.div variants={childVariants} className="text-4xl">
        Tokyo
      </motion.div>
      <motion.div variants={childVariants} className="text-4xl">
        Taipei
      </motion.div>
      <motion.div variants={childVariants} className="text-4xl">
        Lisbon
      </motion.div>
    </motion.div>
  );
};

export default IntroAnimation;