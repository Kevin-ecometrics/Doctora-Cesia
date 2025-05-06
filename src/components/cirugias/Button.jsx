import { motion } from "framer-motion";
import { useState } from "react";

const ContactButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex justify-center items-center md:mb-0 mb-8 overflow-hidden">
      <motion.a
        href="/contacto/"
        className="bg-[#FABB70] font-binomaRegular font-bold px-16 py-4 rounded-full uppercase
                   text-lg md:text-xl relative overflow-hidden tracking-wide focus-visible:outline-none"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{
          boxShadow: isHovered
            ? "0px 10px 25px rgba(250, 184, 80, 0.5)"
            : "0px 4px 10px rgba(0,0,0,0.1)",
          transition: "box-shadow 0.3s ease",
        }}
      >
        <motion.div className="flex flex-col items-center relative">
          <motion.p
            animate={{
              y: isHovered ? 72 : 0,
              opacity: isHovered ? 0 : 1,
            }}
            transition={{
              duration: isHovered ? 0.5 : 0.3,
              ease: "easeInOut",
              delay: isHovered ? 0 : 0.1,
            }}
            className="transition-all"
          >
            Contáctame
          </motion.p>

          <motion.p
            animate={{
              y: isHovered ? 0 : -72,
              opacity: isHovered ? 1 : 0,
            }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
            }}
            className="absolute"
          >
            Contáctame
          </motion.p>
        </motion.div>
      </motion.a>
    </div>
  );
};

export default ContactButton;
