import React, { useState, useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const controls = useAnimation();
  const constraintsRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Verificar el tamaño de pantalla al montar y en cambios de tamaño
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // Tailwind's md breakpoint
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const testimonios = [
    {
      id: 1,
      title: "Working with Grace was a",
      text: "Working with Grace was a pleasure. She understood our vision and translated it into a design that exceeded our expectations.",
      author: "OMBE",
    },
    {
      id: 2,
      title: "She always delivers best quality of work.",
      text: "We have worked with Grace on multiple projects, and she always delivers quality work within the deadline. She did amazing work.",
      author: "HUESPACE",
    },
    {
      id: 3,
      title: "Exceptional attention to detail",
      text: "Grace's attention to detail is remarkable. She consistently delivers designs that are both beautiful and functional.",
      author: "DESIGN CO.",
    },
    {
      id: 4,
      title: "Creative and professional",
      text: "Working with Grace was a game-changer for our brand. Her creative approach combined with professionalism made the process smooth.",
      author: "BRAND STUDIO",
    },
    {
      id: 5,
      title: "Innovative solutions",
      text: "Grace brought fresh ideas to our project that we hadn't even considered. Her innovative approach solved complex design challenges.",
      author: "TECH SOLUTIONS",
    },
    {
      id: 6,
      title: "Reliable partner",
      text: "We've collaborated on multiple projects and Grace has always been a reliable partner, delivering on time and with exceptional quality.",
      author: "DIGITAL AGENCY",
    },
  ];

  // Determinar cuántos testimonios mostrar según el dispositivo
  const itemsToShow = isMobile ? 1 : 2;
  const visibleTestimonials = testimonios.slice(
    currentIndex,
    currentIndex + itemsToShow
  );

  // Auto-rotación cada 10 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging) {
        nextTestimonial();
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [currentIndex, isDragging, isMobile]);

  const nextTestimonial = () => {
    controls
      .start({
        x: -20,
        opacity: 0,
        transition: { duration: 0.3 },
      })
      .then(() => {
        // Avanzar según el número de elementos a mostrar
        const nextIndex =
          currentIndex + itemsToShow >= testimonios.length
            ? 0
            : currentIndex + itemsToShow;
        setCurrentIndex(nextIndex);
        controls.start({
          x: 0,
          opacity: 1,
          transition: { duration: 0.3 },
        });
      });
  };

  const prevTestimonial = () => {
    controls
      .start({
        x: 20,
        opacity: 0,
        transition: { duration: 0.3 },
      })
      .then(() => {
        // Retroceder según el número de elementos a mostrar
        const prevIndex =
          currentIndex - itemsToShow < 0
            ? testimonios.length -
              (testimonios.length % itemsToShow || itemsToShow)
            : currentIndex - itemsToShow;
        setCurrentIndex(prevIndex);
        controls.start({
          x: 0,
          opacity: 1,
          transition: { duration: 0.3 },
        });
      });
  };

  const handleDragStart = () => {
    setIsDragging(true);
    document.body.style.cursor = "grabbing";
  };

  const handleDragEnd = (event, info) => {
    setIsDragging(false);
    document.body.style.cursor = "";

    const threshold = 50;
    if (info.offset.x > threshold) {
      prevTestimonial();
    } else if (info.offset.x < -threshold) {
      nextTestimonial();
    }
  };

  const handleDotClick = (index) => {
    controls
      .start({
        scale: 0.9,
        opacity: 0,
        transition: { duration: 0.2 },
      })
      .then(() => {
        setCurrentIndex(index * itemsToShow);
        controls.start({
          scale: 1,
          opacity: 1,
          transition: { duration: 0.3 },
        });
      });
  };

  return (
    <div className="relative mx-auto container px-8 py-8 overflow-hidden">
      <div ref={constraintsRef} className="relative">
        <motion.div
          className={`grid ${isMobile ? "grid-cols-1" : "grid-cols-2"} gap-4`}
          drag="x"
          dragConstraints={constraintsRef}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          animate={controls}
          style={{ cursor: isDragging ? "grabbing" : "grab" }}
        >
          {visibleTestimonials.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              whileTap={{ scale: 0.98 }}
              className={`relative p-6 ${
                !isMobile && index % 2 === 0
                  ? "md:border-r border-black"
                  : "md:border-l border-none"
              }`}
            >
              <div className="h-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="mb-4"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M9 5a2 2 0 0 1 2 2v6c0 3.13 -1.65 5.193 -4.757 5.97a1 1 0 1 1 -.486 -1.94c2.227 -.557 3.243 -1.827 3.243 -4.03v-1h-3a2 2 0 0 1 -1.995 -1.85l-.005 -.15v-3a2 2 0 0 1 2 -2z" />
                  <path d="M18 5a2 2 0 0 1 2 2v6c0 3.13 -1.65 5.193 -4.757 5.97a1 1 0 1 1 -.486 -1.94c2.227 -.557 3.243 -1.827 3.243 -4.03v-1h-3a2 2 0 0 1 -1.995 -1.85l-.005 -.15v-3a2 2 0 0 1 2 -2z" />
                </svg>
                <h1 className="text-3xl md:text-5xl md:h-20 font-semibold mb-4 md:mb-8 text-balance max-w-5xl font-serif">
                  {item.title}
                </h1>
                <p className="text-xl md:text-2xl md:h-20 font-binomaRegular mb-4 md:mb-8 text-balance max-w-3xl">
                  {item.text}
                </p>
                <span className="relative before:border-b before:border-black before:absolute before:top-1/2 before:left-0 before:w-10 before:transform before:-translate-y-1/2 pl-12 text-lg md:text-xl font-semibold text-gray-500">
                  {item.author}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="flex justify-center gap-2 mt-8">
        {Array.from({
          length: Math.ceil(testimonios.length / itemsToShow),
        }).map((_, index) => (
          <motion.button
            key={index}
            onClick={() => handleDotClick(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            className={`w-3 h-3 rounded-full ${
              index === Math.floor(currentIndex / itemsToShow)
                ? "bg-black"
                : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default Testimonials;
