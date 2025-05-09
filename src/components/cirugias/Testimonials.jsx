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
      title: "La mejor decisión",
      text: "Llegué con la Dra. Cesia por una recomendación y fue la mejor decisión. Siempre resolvió nuestras dudas, llevó el final de mi embarazo increíblemente, escuchó lo que yo buscaba y para mí fue un gran apoyo en mi labor de parto. Fue clave, estuvo siempre al pendiente de mí, me fue guiando en cómo me iba a sentir. La recta final de mi labor fue increíble su acompañamiento para mi esposo y para mí. Siempre nos dio toda la información importante para tomar las mejores decisiones. Me acercó con un gran equipo de profesionales que recibieron a mi bebé. Me acompañó en mi recuperación y dudas sobre los cambios que iba sintiendo.",
      author: "Itzia Rubio",
    },
    {
      id: 2,
      title: "Excelente médico",
      text: "Tengo como 10 años atendiéndome con ella. ¡Excelente médico! Desde que entras al consultorio te sientes como en casa, te hace sentir en confianza, tiene un trato súper humano, responde todas tus dudas, siempre se está actualizando, y siempre al pendiente de sus pacientes. ¡La mejor gine!",
      author: "Carmen Inzunza Medina",
    },
    {
      id: 3,
      title: "Recomendadísima",
      text: "Viajé desde Ventura, California, a mi cita de valoración postparto con la Dra. Cesia y me encontré con una persona sumamente profesional y empática. Nunca me había sentido tan cómoda. Sin duda será mi gine de confianza en Tijuana. ¡Recomendadísima!",
      author: "Karla Ofelia",
    },
    {
      id: 4,
      title: "Confianza y seguridad",
      text: "Mi experiencia con la Dra. Cesia: Soy una persona sorda, y ella es buena, atenta y tiene buena comunicación escrita. Me hizo sentir segura y con mucha confianza. En la comunidad sorda sí los recomiendo para consultar ahí ginecólogo.",
      author: "Ileana Alexa Esacrrega Valenzuela",
    },
    {
      id: 5,
      title: "Gran corazón",
      text: "La doctora Cesia tiene un gran corazón, sus consultas son muy humanas y muy cercanas. En lo personal amerité una cirugía y ella me atendió con MUCHO profesionalismo y con tanto amor. Una gran doctora, muy recomendada.",
      author: "Aleyda Armenta",
    },
    {
      id: 6,
      title: "Empática y analítica",
      text: "Ella es mi gine, la de mis hijas, de las mujeres de mi familia y mis amigas. Entiende perfectamente cada incertidumbre de nuestra feminidad y te apoya con el mayor humanismo posible. Es súper empática, por supuesto inteligente y analítica para resolver cada uno de los procesos de salud que atravesamos las mujeres. ¡Más que recomendada!",
      author: "Edith Amaro",
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
    <div className="relative mx-auto container md:px-4 px-2 py-8 overflow-hidden">
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
                <h1 className="text-3xl md:text-5xl font-semibold mb-4 md:mb-8 text-balance max-w-5xl font-serif">
                  {item.title}
                </h1>
                <p className="text-xl md:text-2xl font-binomaRegular mb-4 md:mb-8 text-balance ">
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
