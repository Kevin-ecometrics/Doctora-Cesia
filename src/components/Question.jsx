import React, { useState } from "react";
import Accordion from "./Accordion";

const questions = [
  {
    question: "¿Cómo es la primera consulta ginecológica?",
    answer:
      "Mi objetivo es garantizar tu máxima comodidad, por lo que es necesario completar un consentimiento informado. Esto nos permitirá escuchar tus necesidades y evitar suposiciones que puedan causarte incomodidad. De este modo, buscamos establecer un primer contacto consensuado, poniendo énfasis en tus derechos, diversidad sexual y corporal.",
  },
  {
    question: "¿Qué se necesita para acudir a la cita?",
    answer:
      "Solo querer hacerlo el resto, permiteme hacerte sentir comodx y confiadx al asistir a tu consulta. Si necesitas resolver un problema de salud o tienes alguna duda, estamos aquí para ofrecerte apoyo. Es fundamental mencionar que no es necesario preocuparse por aspectos estéticos, como el vello o la higiene previa a la cita; lo importante es tu bienestar, independientemente de estas cuestiones",
  },

  {
    question: "¿Puedo llevar algún acompañante a consulta?",
    answer:
      "Comprendo que puede resultar intimidante asistir a una consulta por primera vez, ya sea para adolescentes o adultos en un lugar nuevo. Puedes venir acompañado de alguien con quien te sientas cómodo. Mi objetivo es ofrecer un entorno libre y empoderado para abordar cualquier inquietud que tengas.",
  },
  {
    question: "¿Qué otros servicios se pueden agregar a mi consulta?",
    answer:
      "Puedes agregar a tu consulta pruebas rápidas de detección de: Chlamidia, VIH, Sifilis, pruebas de embarazo, biopsia cervical, vulvar o endometrial, PCR VPH bajo y alto riesgo Y PCR ITS",
  },
];

const Question = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleOpen = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="md:h-[600px] flex justify-center items-center p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-1 flex justify-center items-center flex-col">
          <img
            src="/Conoce las preguntas frecuentes antes de tu visita ginecologica con la Dra. Cesia.png"
            className="absolute left-4 translate-y-[-220px] hidden md:block "
            alt="Te invitamos a Conocer las preguntas frecuentes antes de tu visita ginecológica con la Dra. Cesia "
            title="Te invitamos a Conocer las preguntas frecuentes antes de tu visita ginecológica con la Dra. Cesia "
          />
          <img
            src="/Conoce mas en preguntas frecuentes.png"
            className="absolute hidden md:block translate-x-36 translate-y-[-100px]"
            alt="Da clik a las preguntas mas frecuentes previo a tu consulta ginecologica "
            title="Da clik a las preguntas mas frecuentes previo a tu consulta ginecologica "
          />
          <img
            src="/Si tienes mas dudas  puedes dar llamar directamente.png"
            className="absolute hidden md:block translate-y-24 translate-x-[-220px]"
            alt="Llama al 664 976 3510 si tienes mas dudas  "
            title="Llama al 664 976 3510 si tienes mas dudas  "
          />
          <h1 className="text-3xl md:text-6xl font-glorich font-bold">
            PREGUNTAS FRECUENTES
          </h1>
        </div>
        <div className="col-span-2">
          <hr className="border-b border-black" />
          {questions.map((question, index) => (
            <Accordion
              key={index}
              question={question.question}
              answer={question.answer}
              isOpen={openIndex === index}
              toggleOpen={() => toggleOpen(index)}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Question;
