import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Icono de rombo blanco
const DiamondIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 34 33"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: "inline", verticalAlign: "middle", margin: "0 8px" }}
  >
    <rect
      x="17.6367"
      y="0.278809"
      width="23.1549"
      height="23.1549"
      transform="rotate(48.0953 17.6367 0.278809)"
      fill="#fff"
    />
  </svg>
);

function Nav({ URL }) {
  // Verifica si el usuario está dentro de la sección de paquetes
  const isInPaquetesSection = () => {
    const el = document.getElementById("#paquetes");

    if (!el) return false;
    const rect = el.getBoundingClientRect();
    // Considera dentro si el top del título está cerca del top del viewport
    return rect.top >= 0 && rect.top <= 150;
  };
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // 🔥 lock para evitar spam click - SOLO ESTE
  const scrollLock = useRef(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const links = [
    { label: "Galería", hash: "galeria" },
    { label: "Servicios", hash: "servicios" },
    { label: "Paquetes", hash: "paquetes" },
    { label: "Blogs", hash: "blog" },
    { label: "Cirugías", path: "/cirugias/" },
  ];

  // Detectar si es móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [isOpen]);

  const handleBannerClick = () => {
    if (scrollLock.current) return;
    if (isInPaquetesSection()) return;

    scrollLock.current = true;

    const headerOffset = isMobile ? -2710 : -366;

    if (URL === "/") {
      const el = document.getElementById("paquetes");

      if (el) {
        const targetY = el.offsetTop - headerOffset;

        window.scrollTo({
          top: targetY,
          behavior: "smooth",
        });
      } else {
        window.location.hash = "paquetes";
      }
    } else {
      window.location.href = "/#paquetes";
    }

    if (isOpen) setIsOpen(false);

    setTimeout(() => {
      scrollLock.current = false;
    }, 800);
  };

  // Función para manejar clics en enlaces del menú móvil
  const handleMobileLinkClick = (hash, path) => {
    if (path) {
      window.location.href = path;
      return;
    }

    // 🔥 Para "paquetes" usar la misma función
    if (hash === "paquetes") {
      handleBannerClick();
      return;
    }

    // Para otras secciones, scroll normal
    if (URL === "/") {
      const el = document.getElementById(hash);
      if (el) {
        // Solo compensar el header, sin offset adicional
        const headerOffset = 100; // Ajuste básico para header fijo

        const y =
          el.getBoundingClientRect().top + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: y,
          behavior: "smooth",
        });
      } else {
        window.location.hash = hash;
      }
    } else {
      window.location.href = `/#${hash}`;
    }

    setIsOpen(false);
  };

  // Componente Button
  const Button = ({ href, className, children, onClick }) => (
    <a
      href={href}
      className={className}
      onClick={(e) => {
        if (onClick) onClick(e);
        setIsOpen(false);
      }}
    >
      {children}
    </a>
  );

  return (
    <>
      {/* Banner animado - Versión móvil */}
      {!isOpen && (
        <div
          className="w-full bg-[#B09FCD] text-white py-1 flex items-center cursor-pointer overflow-hidden shadow-lg md:hidden"
          onClick={handleBannerClick}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 10000,
            height: "30px",
          }}
        >
          <div className="relative w-full h-full">
            <motion.div
              className="absolute flex items-center h-full"
              initial={{ x: "0%" }}
              animate={{ x: "-50%" }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              style={{
                fontSize: "0.9rem",
                fontWeight: "bold",
                letterSpacing: "0.05em",
                minWidth: "200%",
              }}
            >
              {[...Array(2)].map((_, i) => (
                <span
                  key={i}
                  className="flex items-center whitespace-nowrap px-2"
                >
                  ¡Aviso! Precios cambian desde 01 Marzo.{" "}
                  <span className="underline ml-1 font-semibold">
                    Ver precios
                  </span>
                  <DiamondIcon />
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      )}

      {/* Navbar principal - Versión móvil */}
      <nav
        className="w-full z-50 flex items-center justify-between bg-white text-black px-4 py-2 md:hidden border-b border-gray-300 shadow-md"
        style={{
          height: "58px", // ← más compacto
          position: "sticky",
          top: "30px",
        }}
      >
        {/* Logo móvil */}
        <div className="flex items-center flex-1">
          <a href="/" className="flex items-center">
            <motion.img
              src="/Dra Cesia Borjon ginecologa y ob.webp"
              alt="La Dra. Cesia Borjón ginecoobstetra"
              title="La Dra. Cesia Borjón ginecoobstetra"
              className="h-10 w-auto max-w-[150px]"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </a>
        </div>

        {/* Botón de menú hamburguesa */}
        <motion.div whileTap={{ scale: 0.9 }} className="cursor-pointer ml-2">
          <button
            onClick={toggleMenu}
            className="focus:outline-none p-1"
            aria-label="Abrir menú"
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 44 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="2"
                width="40"
                height="40"
                rx="20"
                fill="white"
                stroke="#B09FCD"
                strokeWidth="1"
              />
              <path
                d="M10 12H34M10 20H34M10 28H34"
                stroke="#B09FCD"
                strokeWidth="2.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </motion.div>

        {/* Menú móvil */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Overlay de fondo */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black bg-opacity-60 z-40"
                onClick={toggleMenu}
              />

              {/* Panel del menú */}
              <motion.aside
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{
                  duration: 0.25,
                  ease: "easeOut",
                }}
                className="fixed top-0 right-0 z-50 w-[85%] max-w-sm h-full bg-gradient-to-b from-[#B09FCD] via-[#9a8bc1] to-[#8a6fc9] text-white shadow-2xl flex flex-col"
              >
                {/* Encabezado del menú móvil */}
                <div className="p-5 pt-8 flex-1 overflow-y-auto">
                  <div className="flex justify-between items-center mb-10">
                    <h2 className="text-2xl font-bold text-white">Menú</h2>
                    <button
                      onClick={toggleMenu}
                      className="p-2 focus:outline-none bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                      aria-label="Cerrar menú"
                    >
                      <svg
                        className="w-8 h-8"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2.5"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Imagen decorativa superior */}
                  <div className="mb-8">
                    <img
                      src="/NavMobile.png"
                      alt="Decoración"
                      className="w-full h-auto rounded-lg"
                    />
                  </div>

                  {/* Enlaces de navegación móvil */}
                  <ul className="space-y-4 mb-8">
                    {links.map(({ label, hash, path }) => (
                      <li key={label}>
                        <motion.button
                          whileTap={{ scale: 0.96 }}
                          onClick={() => handleMobileLinkClick(hash, path)}
                          className="w-full text-left text-lg font-semibold py-4 px-5 rounded-xl hover:bg-white hover:text-[#8a6fc9] transition-all duration-200 bg-white/10 backdrop-blur-sm"
                        >
                          {label}
                          {hash === "paquetes" && (
                            <span className="ml-2 text-xs bg-yellow-400 text-black px-2 py-1 rounded-full font-bold">
                              NUEVO
                            </span>
                          )}
                        </motion.button>
                      </li>
                    ))}
                  </ul>

                  {/* Sección destacada para paquetes */}
                  <div className="mb-8 p-4 bg-gradient-to-r from-white/25 to-white/15 rounded-xl border border-white/30 backdrop-blur-sm">
                    <div className="flex items-center mb-3">
                      <svg
                        className="w-6 h-6 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.2 6.5 10.266a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p className="text-lg font-bold">✨ Oferta Especial</p>
                    </div>
                    <button
                      onClick={handleBannerClick}
                      className="w-full bg-white text-[#8a6fc9] font-bold py-4 px-6 rounded-lg text-lg hover:bg-gray-100 active:scale-[0.98] transition-all duration-200 shadow-lg"
                    >
                      Ver Paquetes y Precios
                    </button>
                    <p className="text-sm mt-3 opacity-90 text-center">
                      Consulta nuestros paquetes actualizados para 2024
                    </p>
                  </div>

                  {/* Botón de acción principal */}
                  <div className="mb-6">
                    <Button
                      href={URL === "/agenda/" ? "/contacto/" : "/agenda/"}
                      className="w-full bg-gradient-to-r from-white to-gray-100 text-[#8a6fc9] hover:from-gray-100 hover:to-white active:scale-[0.98] font-bold text-lg py-4 px-6 rounded-xl border-2 border-white/30 shadow-lg transition-all duration-200 flex items-center justify-center"
                      onClick={() => {}}
                    >
                      {URL === "/agenda/" ? (
                        <>
                          <svg
                            className="w-5 h-5 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                          Contactarme
                        </>
                      ) : (
                        <>
                          <svg
                            className="w-5 h-5 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          Agendar Cita
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {/* Pie del menú móvil */}
                <div className="mt-auto border-t border-white/20 pt-4">
                  <div className="w-full">
                    <img
                      src="/navfooter.png"
                      alt="Footer decorativo"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>
      </nav>

      {/* Banner desktop (oculto en móvil) */}
      <div className="hidden md:block">
        <div
          className="w-full bg-[#B09FCD] text-white text-sm md:text-base py-3 flex items-center cursor-pointer overflow-hidden shadow-lg"
          onClick={handleBannerClick}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 9999,
            height: "48px",
          }}
        >
          <div className="relative w-full h-full">
            <motion.div
              className="absolute flex"
              initial={{ x: "0%" }}
              animate={{ x: "-50%" }}
              transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
              style={{
                fontSize: "1.3rem",
                fontWeight: "bold",
                letterSpacing: "0.1em",
                minWidth: "200%",
              }}
            >
              {[...Array(2)].map((_, i) => (
                <span key={i} className="flex items-center whitespace-nowrap">
                  ¡Aviso importante! A partir del 01 de Marzo cambian los
                  precios de nuestros servicios y paquetes. Consulta los nuevos
                  precios aquí. Haz clic para ver detalles.{" "}
                  <span className="underline ml-2 scroll-py-99">
                    Ver precios
                  </span>
                  <DiamondIcon />
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Navbar desktop (oculto en móvil) */}
      <nav
        className="hidden md:flex w-screen z-50 items-center justify-between bg-white text-black p-8 h-[124px] border border-gray-400 shadow-xl"
        style={{ marginTop: "48px" }}
      >
        {/* Logo */}
        <div className="flex items-center">
          <a href="/">
            <motion.img
              src="/Dra Cesia Borjon ginecologa y ob.webp"
              alt="La Dra. Cesia Borjón ginecoobstetra con más de 15 años de experiencia"
              title="La Dra. Cesia Borjón ginecoobstetra con más de 15 años de experiencia"
              initial={{ x: -200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
          </a>
        </div>

        {/* Enlaces de navegación (desktop) */}
        <ul className="md:flex items-center hidden justify-center space-x-16 font-semibold text-xl">
          {links.map(({ label, hash, path }) => (
            <li key={label}>
              <motion.a
                href={path ? path : URL === "/" ? `#${hash}` : `/#${hash}`}
                whileHover={{ scale: 1.1 }}
                className="cursor-pointer hidden md:block hover:text-[#B09FCD]"
              >
                {label}
              </motion.a>
            </li>
          ))}
        </ul>

        {/* Botón de agendar/contactar (desktop) */}
        <Button
          href={URL === "/agenda/" ? "/contacto/" : "/agenda/"}
          className="cursor-pointer md:block hidden hover:text-[#B09FCD] font-semibold text-xl border border-black px-6 py-2 rounded-full font-blisstwine"
          onClick={() => {}}
        >
          {URL === "/agenda/" ? "Contactarme" : "Agendar Cita"}
        </Button>

        {/* Botón de menú hamburguesa (desktop - oculto) */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="cursor-pointer md:hidden block"
        >
          <button onClick={toggleMenu} className="focus:outline-none">
            <svg
              width="58"
              height="58"
              viewBox="0 0 58 58"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_d_201_920)">
                <rect x="4" width="50" height="50" rx="25" fill="white"></rect>
                <path
                  d="M12.5938 14.8438H45.4062M12.5938 25H45.4062M12.5938 35.1562H45.4062"
                  stroke="#B09FCD"
                  strokeWidth="4"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                ></path>
              </g>
              <defs>
                <filter
                  id="filter0_d_201_920"
                  x="0"
                  y="0"
                  width="58"
                  height="58"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood
                    floodOpacity="0"
                    result="BackgroundImageFix"
                  ></feFlood>
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  ></feColorMatrix>
                  <feOffset dy="4"></feOffset>
                  <feGaussianBlur stdDeviation="2"></feGaussianBlur>
                  <feComposite in2="hardAlpha" operator="out"></feComposite>
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                  ></feColorMatrix>
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_201_920"
                  ></feBlend>
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_201_920"
                    result="shape"
                  ></feBlend>
                </filter>
              </defs>
            </svg>
          </button>
        </motion.div>
      </nav>
    </>
  );
}

export default Nav;
