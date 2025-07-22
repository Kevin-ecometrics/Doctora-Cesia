import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./Button";

function Nav({ URL }) {
  const [isOpen, setIsOpen] = useState(false);

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

  return (
    <nav className=" w-screen z-50 flex items-center justify-between bg-white text-black p-8 md:h-[124px] border border-gray-400 shadow-xl">
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

      <Button
        href={URL === "/agenda/" ? "/contacto/" : "/agenda/"}
        className="cursor-pointer md:block hidden hover:text-[#B09FCD] font-semibold text-xl border border-black px-6 py-2 rounded-full font-blisstwine"
        eventName={
          URL === "/agenda/" ? "contact_nav_click" : "booking_nav_click"
        }
        category="Boton"
        label={URL === "/agenda/" ? "Contactarme" : "Agendar Cita"}
        onClick={() => {}}
      >
        {URL === "/agenda/" ? "Contactarme" : "Agendar Cita"}
      </Button>
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
                stroke-width="4"
                stroke-miterlimit="10"
                stroke-linecap="round"
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
                color-interpolation-filters="sRGB"
              >
                <feFlood
                  flood-opacity="0"
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
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 z-20 p-4 w-full h-screen bg-[#B09FCD] text-white shadow-lg flex flex-col space-y-4 font-semibold text-xl md:hidden"
          >
            <div className="flex justify-start items-start">
              <img src="/NavMobile.png" alt="" />
            </div>

            <button
              onClick={toggleMenu}
              className="self-end p-4 focus:outline-none absolute"
            >
              <svg
                className="w-12 h-12 border-2 rounded-full hover:stroke-black hover:border-black"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
            <div className="flex justify-center items-center flex-col">
              <ul className="flex flex-col items-center justify-center space-y-8 text-white font-semibold text-xl">
                {links.map(({ label, hash, path }) => (
                  <li key={label}>
                    <motion.a
                      href={
                        path ? path : URL === "/" ? `#${hash}` : `/#${hash}`
                      }
                      whileHover={{ scale: 1.1 }}
                      className="cursor-pointer hover:text-[#B09FCD]"
                    >
                      {label}
                    </motion.a>
                  </li>
                ))}
              </ul>

              <a
                href={URL === "/agenda/" ? "/contacto/" : "/agenda/"}
                className="cursor-pointer bg-white mt-4 text-black hover:text-white hover:bg-black font-semibold text-xl border border-black px-6 py-2 rounded-full font-blisstwine"
              >
                {URL === "/agenda/" ? "Contactarme" : "Agendar Cita"}
              </a>
              <div class="absolute bottom-0">
                <img src="/navfooter.png" alt="" />
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Nav;
