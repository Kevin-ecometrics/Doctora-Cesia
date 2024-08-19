import React from "react";

const Accordion = ({ question, answer, isOpen, toggleOpen }) => {
  return (
    <div className="border-b border-black">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={toggleOpen}
      >
        <h2 className="text-3xl font-glorich font-bold text-start py-6">
          {question}
        </h2>
        <svg
          width="45"
          height="45"
          viewBox="0 0 45 45"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`transform transition-transform ${
            isOpen ? "rotate-45" : ""
          }`}
        >
          <path
            d="M22.5 2V43M43 22.5H2"
            stroke="#D9D9D9"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div
        className={`overflow-hidden transition-max-height duration-500 ease-in-out ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="py-4 font-binomaRegular font-medium">{answer}</div>
      </div>
    </div>
  );
};

export default Accordion;
