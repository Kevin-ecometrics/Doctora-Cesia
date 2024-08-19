import React, { useState } from "react";

const tratamientos = [
  {
    nombre: "Amistoso",
    alt: "El consultorio ginecologico  violeta humanista y seguro  ginecologico en Zona Rio ",
    imagen: "/Consultorio violeta  ginecologico en Zona Rio.webp",
  },
  {
    nombre: "Sincero",
    alt: "La Dra. Cesia Borjón es aliada a en tu bienestar general con más de 15 años de experiencia",
    imagen: "/La Dra Cesia es aliada a tu bienestar integral.webp",
  },
  {
    nombre: "Moderno",
    alt: "Recibe la mejor atención con la Dra. Cesia experta en colposcopia, patologías vulvares y trastornos hormonales ",
    imagen:
      "/La doctora Cesia es experta en colposcopia, patologias vulvares y trastornos hormonales.webp",
  },
  {
    nombre: "Atento",
    alt: "Consultorio de la Dra. Cesia con la más alta tecnología y amenidades para tu comodidad  ",
    imagen: "/El consultorio de la Dra Cesia esta hecho para tu comodidad.webp",
  },
  {
    nombre: "Divertido",
    alt: "Un consultorio ginecológico abierto, empático y con perspectiva de genero en Tijuana ",
    imagen:
      "/Nueva consulta ginecologica con perspectiva de genero en Tijuana.webp ",
  },
  {
    nombre: "Sensible",
    alt: "Tu cuerpo y mente son lo más importante por ello acude con la Dra. Cesia experta en nacimiento respetado, salud sexual y reproductiva ",
    imagen:
      "/La doctora Cesia Borjon es experta en nacimiento respetado, salud sexual y reproductiva.webp",
  },
];

const Gallery = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (imagen) => {
    setSelectedImage(imagen);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <main id="galeria">
      <section className="p-8 hidden md:block">
        <div className="grid grid-cols-1 md:grid-cols-2 mb-8 py-8">
          <div>
            <h1 className="text-[25px] md:text-[40px] font-medium uppercase font-glorich mb-2 md:mb-0">
              CONOCE MI
            </h1>
            <div className="flex">
              <h2 className="text-[55px] md:text-[90px] font-medium uppercase font-glorich mb-2 md:mb-0">
                CONSULTORIO
              </h2>
              <img
                src="/galleryPlanta.png"
                className="translate-x-[-30px]"
                alt=""
              />
            </div>
          </div>
          <div className="flex gap-4 ">
            {tratamientos.slice(0, 2).map((tratamiento, index) => (
              <div
                key={index}
                className={`relative bg-[#7DCAD9] rounded-lg p-4 w-96 text-white flex items-end font-semibold overflow-hidden transition-all duration-300 ${
                  hoveredIndex === index ? "h-64" : "h-48"
                }`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => openModal(tratamiento.imagen)}
              >
                <div className="absolute top-4 right-4">
                  <svg
                    className="rounded-2xl border border-white p-1 cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-up-right"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M17 7l-10 10" />
                    <path d="M8 7l9 0l0 9" />
                  </svg>
                </div>
                {hoveredIndex === index && (
                  <div className="absolute inset-0 bg-cover h-48 bg-center transition-opacity duration-300 opacity-100">
                    <img
                      src={tratamiento.imagen}
                      alt={tratamiento.alt}
                      title={tratamiento.alt}
                      loading="lazy"
                      className="w-full h-full object-cover cursor-pointer"
                    />
                    <div className="absolute top-4 right-4">
                      <svg
                        className="rounded-2xl border border-white p-1 cursor-pointer"
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M17 7l-10 10" />
                        <path d="M8 7l9 0l0 9" />
                      </svg>
                    </div>
                  </div>
                )}
                <p
                  className={`relative z-10 font-binomaRegular transition-transform duration-300 ${
                    hoveredIndex === index ? "transform translate-y-4" : ""
                  }`}
                >
                  {tratamiento.nombre}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 mb-8">
          <div className="flex gap-4">
            {tratamientos.slice(2, 4).map((tratamiento, index) => (
              <div
                key={index}
                className={`relative bg-[#7DCAD9] rounded-lg p-4 w-96 text-white flex items-end font-semibold overflow-hidden transition-all duration-300 ${
                  hoveredIndex === index + 2 ? "h-64" : "h-48"
                }`}
                onMouseEnter={() => setHoveredIndex(index + 2)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => openModal(tratamiento.imagen)}
              >
                <div className="absolute top-4 right-4">
                  <svg
                    className="rounded-2xl border border-white p-1 cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-up-right"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M17 7l-10 10" />
                    <path d="M8 7l9 0l0 9" />
                  </svg>
                </div>
                {hoveredIndex === index + 2 && (
                  <div className="absolute inset-0 bg-cover h-48 bg-center transition-opacity duration-300 opacity-100">
                    <img
                      src={tratamiento.imagen}
                      alt={tratamiento.alt}
                      title={tratamiento.alt}
                      loading="lazy"
                      className="w-full h-full object-cover cursor-pointer"
                    />
                    <div className="absolute top-4 right-4">
                      <svg
                        className="rounded-2xl border border-white p-1 cursor-pointer"
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M17 7l-10 10" />
                        <path d="M8 7l9 0l0 9" />
                      </svg>
                    </div>
                  </div>
                )}
                <p
                  className={`relative z-10 font-binomaRegular transition-transform duration-300 ${
                    hoveredIndex === index + 4 ? "transform translate-y-4" : ""
                  }`}
                >
                  {tratamiento.nombre}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div></div>
          <div className="flex gap-4">
            {tratamientos.slice(4, 6).map((tratamiento, index) => (
              <div
                key={index}
                className={`relative bg-[#7DCAD9] rounded-lg p-4 w-96 text-white flex items-end font-semibold overflow-hidden transition-all duration-300 ${
                  hoveredIndex === index + 4 ? "h-64" : "h-48"
                }`}
                onMouseEnter={() => setHoveredIndex(index + 4)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => openModal(tratamiento.imagen)}
              >
                <div className="absolute top-4 right-4">
                  <svg
                    className="rounded-2xl border border-white p-1 cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-up-right"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M17 7l-10 10" />
                    <path d="M8 7l9 0l0 9" />
                  </svg>
                </div>
                {hoveredIndex === index + 4 && (
                  <div className="absolute inset-0 bg-cover h-48 bg-center transition-opacity duration-300 opacity-100">
                    <img
                      src={tratamiento.imagen}
                      alt={tratamiento.alt}
                      title={tratamiento.alt}
                      loading="lazy"
                      className="w-full h-full object-cover cursor-pointer"
                    />
                    <div className="absolute top-4 right-4">
                      <svg
                        className="rounded-2xl border border-white p-1 cursor-pointer"
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M17 7l-10 10" />
                        <path d="M8 7l9 0l0 9" />
                      </svg>
                    </div>
                  </div>
                )}
                <p
                  className={`relative z-10 font-binomaRegular transition-transform duration-300 ${
                    hoveredIndex === index + 4 ? "transform translate-y-4" : ""
                  }`}
                >
                  {tratamiento.nombre}
                </p>
              </div>
            ))}
          </div>
          <div className="flex flex-col">
            <div className="border-b border-[#FABB70] md:w-32 mb-8" />
            <h1 className="font-binomaRegular font-normal md:w-[342px] text-[18px] md:text-[25px]">
              {" "}
              Ginecología y obstetricia feminista
            </h1>
          </div>
        </div>

        {modalOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
            onClick={closeModal}
          >
            <div className="relative bg-white p-4 rounded-lg">
              <button
                className="absolute top-4 right-4 text-black text-2xl"
                onClick={closeModal}
              >
                <svg
                  className={`fill-[#B09FCD] cursor-pointer`}
                  width="75"
                  height="76"
                  viewBox="0 0 75 76"
                  fill="none"
                  stroke="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M65.625 38C65.625 22.2656 53.0273 9.5 37.5 9.5C21.9727 9.5 9.375 22.2656 9.375 38C9.375 53.7344 21.9727 66.5 37.5 66.5C53.0273 66.5 65.625 53.7344 65.625 38Z"
                    stroke="white"
                    stroke-width="4"
                    stroke-miterlimit="10"
                  />
                  <path
                    d="M46.875 47.5L28.125 28.5M28.125 47.5L46.875 28.5"
                    stroke="white"
                    stroke-width="4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
              <img
                src={selectedImage}
                alt="Imagen seleccionada"
                loading="lazy"
              />
            </div>
          </div>
        )}
      </section>
      <section className="block md:hidden p-8">
        <h1 className="text-3xl md:text-7xl font-medium uppercase font-glorich mb-2 md:mb0">
          CONOCE MI CONSULTORIO
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tratamientos.map((tratamiento, index) => (
            <div
              key={index}
              className="relative bg-[#7DCAD9] rounded-lg p-4 w-full text-white flex flex-col items-start font-semibold overflow-hidden"
              onClick={() => openModal(tratamiento.imagen)}
            >
              <div className="absolute top-4 right-4">
                <svg
                  className="rounded-2xl border border-white p-1 cursor-pointer"
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-up-right"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M17 7l-10 10" />
                  <path d="M8 7l9 0l0 9" />
                </svg>
              </div>
              <img
                src={tratamiento.imagen}
                alt={tratamiento.nombre}
                loading="lazy"
                className="w-full h-48 object-cover cursor-pointer"
                OnClick={() => openModal(tratamiento.imagen)}
              />
              <p className="relative z-10">{tratamiento.nombre}</p>
            </div>
          ))}
        </div>
        {modalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-lg relative">
              <button
                className="absolute top-0 right-0 text-black"
                onClick={closeModal}
              >
                <svg
                  className={`fill-[#B09FCD] cursor-pointer`}
                  width="75"
                  height="76"
                  viewBox="0 0 75 76"
                  fill="none"
                  stroke="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M65.625 38C65.625 22.2656 53.0273 9.5 37.5 9.5C21.9727 9.5 9.375 22.2656 9.375 38C9.375 53.7344 21.9727 66.5 37.5 66.5C53.0273 66.5 65.625 53.7344 65.625 38Z"
                    stroke="white"
                    stroke-width="4"
                    stroke-miterlimit="10"
                  />
                  <path
                    d="M46.875 47.5L28.125 28.5M28.125 47.5L46.875 28.5"
                    stroke="white"
                    stroke-width="4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>{" "}
              </button>
              <img src={selectedImage} alt="Modal" className="w-full h-auto" />
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default Gallery;
