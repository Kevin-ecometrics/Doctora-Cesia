import { useState } from "react";

function ArrowAnimation({ title }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative w-[80px] h-[80px] cursor-pointer overflow-visible"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Imagen original (rosa) */}
      <img
        src="https://static.laralink.com/html/grace/assets/img/icons/arrow_down_s4.svg"
        alt={title}
        title={title}
        className={`absolute top-0 left-0 -rotate-[120deg] p-4 transition-all duration-500 ease-in-out
          ${
            hovered
              ? "translate-x-12 -translate-y-12 opacity-0"
              : "translate-x-0 translate-y-0 opacity-100"
          }
        `}
      />

      {/* Imagen blanca (entra desde dirección opuesta) */}
      <img
        src="https://static.laralink.com/html/grace/assets/img/icons/arrow_down_light_s4.svg"
        alt={title}
        title={title}
        className={`absolute top-0 left-0 -rotate-[120deg] p-4 transition-all duration-500 ease-in-out
          ${
            hovered
              ? "translate-x-0 translate-y-0 opacity-100"
              : "-translate-x-12 translate-y-12 opacity-0"
          }
        `}
      />
    </div>
  );
}

export default ArrowAnimation;
