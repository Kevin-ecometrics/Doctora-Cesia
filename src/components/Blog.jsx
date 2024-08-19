import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  { src: "/Nacimiento Respetuoso.webp", href: "/blog/Acuerpar-el-nacimiento/" },
  {
    src: "/BlogAborto.webp",
    href: "/blog/La-esencialidad-y-libertad-que-implica-el-aborto-libre-de-estigma/",
  },
  {
    src: "/Retiro de verrugas por VPH.webp",
    href: "/blog/Que-hacer-si-te-han-detectado-el-virus-del-papiloma-humano/",
  },
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(1);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <main id="blog">
      <section className="hidden md:block">
        <div className="bg-[#7DCAD9] h-[800px] p-8 flex justify-center items-center relative">
          <div className="flex justify-between items-center">
            <h1 className="absolute top-10 left-10 text-white z-10 text-[50px] font-glorich">
              Mi Blog
            </h1>
            <a
              href="/blogs/"
              className="absolute top-10 right-10 text-white z-10 text-[50px] font-glorich hover:undeline"
            >
              Ver todos los blogs
            </a>
          </div>

          <button
            onClick={handlePrev}
            className="absolute left-4 z-30 bg-[#B09FCD]  text-white font-bold py-2 px-4 rounded shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Anterior
          </button>
          <div className="relative flex justify-center items-center w-full h-full flex-col">
            {images.map((blog, index) => {
              const isCenter = index === currentIndex;
              const isLeft =
                index ===
                (currentIndex === 0 ? images.length - 1 : currentIndex - 1);
              const isRight =
                index ===
                (currentIndex === images.length - 1 ? 0 : currentIndex + 1);

              return (
                <a
                  key={index}
                  href={blog.href} // Aquí se agrega el href
                  className={`absolute ${isCenter ? "z-20" : "z-10"} ${
                    isLeft ? "left-10" : ""
                  } ${isRight ? "right-10" : ""}`}
                  style={{
                    width: isCenter ? "400px" : "300px",
                    height: "auto",
                  }}
                >
                  <motion.img
                    src={blog.src}
                    alt=""
                    initial={{
                      scale: isCenter ? 1.2 : 1,
                      opacity: isCenter ? 1 : 0.5,
                    }}
                    animate={{
                      scale: isCenter ? 1.2 : 1,
                      opacity: isCenter ? 1 : 0.5,
                    }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-auto"
                  />
                </a>
              );
            })}
          </div>
          <button
            onClick={handleNext}
            className="absolute right-4 z-30 bg-[#B09FCD]  text-white font-bold py-2 px-4 rounded shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Siguiente
          </button>
        </div>
      </section>
      <section className="block md:hidden bg-[#7DCAD9] p-4">
        <h1 className="text-white font-glorich font-bold text-4xl text-center mb-12 py-4">
          MY BLOG
        </h1>
        <div className="relative ">
          <AnimatePresence mode="popLayout">
            {images.map(
              (blog, index) =>
                index === currentIndex && (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full"
                  >
                    <img
                      src={blog.src}
                      alt=""
                      className="w-full h-auto rounded-lg mb-8"
                    />
                  </motion.div>
                )
            )}
          </AnimatePresence>
        </div>
        <div className="flex justify-center items-center py-8 gap-2">
          <a
            href="/blog/blog1/"
            className="text-white font-blisstwine font-normal text-xl"
          >
            Ver Tema
          </a>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ffffff"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-right"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M5 12l14 0" />
            <path d="M13 18l6 -6" />
            <path d="M13 6l6 6" />
          </svg>
        </div>

        <div className="flex justify-center mt-4 space-x-2 mb-8">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? "bg-white" : "bg-gray-300"
              }`}
            ></button>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Carousel;
