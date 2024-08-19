import React, { useState } from "react";
import { motion } from "framer-motion";

const ValuesComponent = ({ responsabilities }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleSubtitle = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section className="p-10  text-white bg-[#B09FCD] ">
      <h1 className="uppercase font-semibold text-4xl py-8 md:text-7xl mb-8 font-glorich">
        MIS OBJETIVOS{" "}
      </h1>

      <article>
        {responsabilities.map((responsability, index) => (
          <div
            key={index}
            className="md:flex md:items-start gap-4 w-full border border-white rounded-3xl mb-8 p-4 cursor-pointer"
            onClick={() => toggleSubtitle(index)}
          >
            <span className="text-white  uppercase  text-2xl md:text-5xl font-blisstwine mx-auto md:w-[80%]">
              {responsability.title}
            </span>
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: expandedIndex === index ? "auto" : 0,
                opacity: expandedIndex === index ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
              style={{ overflow: "hidden" }}
            >
              <div
                style={{ padding: expandedIndex === index ? "1rem 0" : "0" }}
                className="flex flex-col"
              >
                <span className="text-white font-medium md:text-xl mt-2 ">
                  {responsability.subtitle}
                </span>
                <span className="text-white font-medium md:text-xl mt-2">
                  {responsability.subtitle2}
                </span>{" "}
                <span className="text-white font-medium md:text-xl mt-2">
                  {responsability.subtitle3}
                </span>
              </div>
            </motion.div>
          </div>
        ))}
      </article>
    </section>
  );
};

export default ValuesComponent;
