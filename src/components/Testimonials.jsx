import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function App() {
  const [indiceActual, setIndiceActual] = useState(0);
  const [direccion, setDireccion] = useState(0); // 1 para derecha, -1 para izquierda
  const slides = [
    "bg-[#7DCAD9] text-black",
    " bg-[#E2E479] text-black",
    "bg-[#FABB70] text-black",
    "bg-[#B09FCD] text-black",
  ];
  const totalSlides = slides.length;
  const textosSlides = [
    "Desde que entras a la consulta con la Dra. Cesia puedes sentir la alegría y la confianza que ella transmite, yo iba muy nerviosa ya que quería una segunda opinión y la Dra. no dudó en revisarme y explicarme con detalle toda mi situación y el mejor tratamiento, muchas gracias Dra ¡Ya no la cambio! ",
    "Me sentí acompañada y escuchada, excelente persona y profesionista, si estás buscando un acompañamiento con perspectiva de género es la indicada ",
    "Excelente atención, excelente servicio y una excelente profesionista sobre todo empática e incluyente en cuanto a atención ginecológica en personas con discapacidad. En mi caso yo tengo parálisis cerebral infantil y no es fácil encontrar a una persona o profesionista de la salud que sepa atendernos con tanta empatía como la doctora Cesia lo cual se agradece. ",
    "Excelente médico, trato muy humano, explica detallada y claramente cualquier procedimiento que te haga, te aclara tus dudas, excelentes instalaciones, muy puntual, recomendadísima. ",
  ];
  const imagenSlides = [
    "/Testimoniales de pacientxs encantados con la atencion de la Dra Cesia Borjon en consulta.webp",
    "/Testimoniales satisfechos con Atencion medica ginecologica feminista.webp",
    "/Cada paciente se siente incluidx y recibe una atencion empatica con la Dra. Cesia.webp",
    "/La Dra. Cesia brinda un trato calido hacia sus pacientes.webp",
  ];

  const imagenAlt = [
    "Testimoniales de pacientes que estan encantados con su abordaje gineocologico con la ginecoobstetra Cesia Borjon  ",
    "Paciente con testimonial de satisfacción con la atención medica feminista ",
    "Testimoniales de pacientes que han recibido una atención empática e inclusiva con la Dra. Cesia ",
    "La Dra. Cesia brinda un trato calido hacia sus pacientes Testimonial de paciente que recibio un Trato calido, y escucha activa por parte de la Dra. Cesia ",
  ];

  const autorSlides = [
    " Fernanda Armenta ",
    " Karen López ",
    " Maria Rubi Carillo Durazo ",
    " Carmen Sánchez ",
  ];
  const siguienteSlide = () => {
    setDireccion(1);
    setIndiceActual((prevIndice) => (prevIndice + 1) % totalSlides);
  };

  const anteriorSlide = () => {
    setDireccion(-1);
    setIndiceActual(
      (prevIndice) => (prevIndice - 1 + totalSlides) % totalSlides
    );
  };

  const variants = {
    enter: (direccion) => ({
      opacity: 0,
      x: direccion > 0 ? 100 : -100,
    }),
    center: {
      opacity: 1,
      x: 0,
    },
    exit: (direccion) => ({
      opacity: 0,
      x: direccion > 0 ? -100 : 100,
    }),
  };

  return (
    <main className="flex flex-col justify-center items-center bg-[#FEF5E9] py-16">
      <h1 className="text-center text-3xl md:text-7xl font-bold uppercase md:mb-8 py-8">
        Testimonios
      </h1>

      <div className="flex md:flex-row flex-col md:justify-between items-center md:w-[80%] mx-auto px-8">
        <button
          onClick={anteriorSlide}
          className=" text-white font-bold py-2 px-4 rounded hidden md:block"
          aria-label="Anterior Testimonial"
        >
          <svg
            width="75"
            height="75"
            viewBox="0 0 75 75"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="2"
              y="2"
              width="71"
              height="71"
              rx="35.5"
              stroke="#B09FCD"
              strokeWidth="4"
            />
            <path
              d="M36.3846 51L23 38L36.3846 25M24.859 38H52"
              stroke="#B09FCD"
              strokeWidth="2"
              strokeMiterlimit="10"
              strokeLinecap="square"
            />
          </svg>
        </button>
        <AnimatePresence custom={direccion} mode="wait">
          <motion.div
            key={indiceActual}
            className={`${slides[indiceActual]} flex items-center md:flex-row flex-col rounded-[60px] md:rounded-[80px] md:w-[900px] px-8`}
            initial="enter"
            animate="center"
            exit="exit"
            variants={variants}
            custom={direccion}
            transition={{ duration: 0.5 }}
          >
            <img
              src={imagenSlides[indiceActual]}
              loading="lazy"
              alt={imagenAlt[indiceActual]}
              title={imagenAlt[indiceActual]}
            />
            <div className="flex flex-col">
              <p className="md:text-xl text-lg mb-8 font-semibold">
                {textosSlides[indiceActual]}
              </p>
              <div className="flex gap-4 font-medium items-center mb-8 md:mb-0">
                <div className="border-b  w-12 border-black" />
                <p>{autorSlides[indiceActual]}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        <button
          onClick={siguienteSlide}
          aria-activedescendant="Siguiente Testimonial"
          className=" text-white font-bold py-2 px-4 rounded hidden md:block"
        >
          <svg
            width="76"
            height="76"
            viewBox="0 0 76 76"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_347_14)">
              <path
                d="M39.6243 24.0133L53.0137 37.0083L39.6339 50.0133M51.1548 37.009L24.0137 37.0191"
                stroke="#B09FCD"
                strokeWidth="2"
                strokeMiterlimit="10"
                strokeLinecap="square"
              />
            </g>
            <rect
              x="73.0271"
              y="73.0007"
              width="71"
              height="71"
              rx="35.5"
              transform="rotate(179.979 73.0271 73.0007)"
              stroke="#B09FCD"
              strokeWidth="4"
            />
            <defs>
              <clipPath id="clip0_347_14">
                <rect
                  x="75.0278"
                  y="75"
                  width="75"
                  height="75"
                  rx="37.5"
                  transform="rotate(179.979 75.0278 75)"
                  fill="white"
                />
              </clipPath>
            </defs>
          </svg>
        </button>
        <div className="md:hidden block">
          <div className="flex justify-center mb-16 mt-8">
            {Array.from({ length: totalSlides }, (_, index) => (
              <button
                key={index}
                onClick={() => setIndiceActual(index)}
                className={`w-4 h-4 mx-2 rounded-full ${
                  index === indiceActual ? "bg-black" : "bg-gray-300"
                }`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
