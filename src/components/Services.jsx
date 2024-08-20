import React, { useState } from "react";
function Services({ services }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [modalImage, setModalImage] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const handleImageClick = (image) => {
    setModalImage(image);
  };

  const handleCloseModal = () => {
    setModalImage(null);
  };

  const handleSvgClick = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  return (
    <main>
      <section className="hidden md:block">
        <div className="flex flex-col">
          {services.map((service, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row md:justify-between  items-center p-4 border-b border-white"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="flex gap-8 items-center">
                {" "}
                <img
                  loading="lazy"
                  src="/Atencion ginecologica de vanguardia.webp"
                  className="w-[72px] h-[86px]"
                  alt="Atención y cuidado ginecológico de vanguardia "
                  title="Atención y cuidado ginecológico de vanguardia "
                />
                <h3 className="text-lg md:text-3xl font-bold font-blisstwine uppercase text-[#71579E]">
                  {service.title}
                </h3>
              </div>
              {hoveredIndex === index && (
                <>
                  <svg
                    onClick={() => handleSvgClick(service)}
                    className="cursor-pointer"
                    width="126"
                    height="126"
                    viewBox="0 0 126 126"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_83_343)">
                      <path
                        d="M61 86L85 62.5L61 39M81.6667 62.5H33"
                        stroke="white"
                        stroke-width="4"
                        stroke-miterlimit="10"
                        stroke-linecap="square"
                      />
                    </g>
                    <rect
                      x="2"
                      y="2"
                      width="122"
                      height="122"
                      rx="61"
                      stroke="white"
                      stroke-width="4"
                    />
                    <defs>
                      <clipPath id="clip0_83_343">
                        <rect width="126" height="126" rx="63" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <img
                    loading="lazy"
                    src={service.image}
                    alt={service.imageAlt}
                    title={service.imageAlt}
                    onClick={() => handleImageClick(service.image)}
                    className="w-96 h-96"
                  />
                </>
              )}
            </div>
          ))}
          {modalImage && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
              <div className="relative">
                <button
                  className="absolute top-0 right-0 m-4 text-white text-2xl"
                  onClick={handleCloseModal}
                >
                  &times;
                </button>
                <img
                  loading="lazy"
                  src={modalImage}
                  alt="Expanded service"
                  className="max-w-full max-h-full"
                />
              </div>
            </div>
          )}
          {isModalOpen && (
            <div className="fixed inset-0 px-16 flex items-center justify-center z-50 w-screen h-screen bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg h-screen">
                <button
                  onClick={closeModal}
                  className="absolute top-8 right-24 
                    
                  
                  "
                >
                  <svg
                    className="fill-[#B09FCD] cursor-pointer"
                    width="75"
                    height="76"
                    viewBox="0 0 75 76"
                    fill="none"
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
                  loading="lazy"
                  className="w-full"
                  src={selectedService.imageInside}
                  alt={selectedService.insideAlt}
                  title={selectedService.insideAlt}
                />
                <div className="flex gap-4 mb-4">
                  <div className={`border h-24 w-5 bg-[#B09FCD]`} />{" "}
                  <div className="flex flex-col">
                    <h2 className="text-6xl py-4 text-[#B09FCD] font-black font-glorich">
                      {selectedService.title}
                    </h2>
                  </div>
                </div>
                <div className="max-h-40 overflow-y-auto">
                  <p
                    className="font-binomaRegular font-normal md:text-2xl text-[#626262]"
                    dangerouslySetInnerHTML={{
                      __html: selectedService.description,
                    }}
                  ></p>{" "}
                </div>
              </div>
            </div>
          )}
        </div>{" "}
      </section>
      <section className="block md:hidden">
        {services.map((service, index) => (
          <div key={index} className="flex flex-col  p-4 border-b border-white">
            <img loading="lazy" src={service.image} alt="" />
            <h3 className="text-lg md:text-3xl text-start font-bold uppercase text-[#71579E]">
              {service.title}
            </h3>
            <svg
              className="cursor-pointer"
              onClick={() => handleSvgClick(service)}
              width="126"
              height="126"
              viewBox="0 0 126 126"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_83_343)">
                <path
                  d="M61 86L85 62.5L61 39M81.6667 62.5H33"
                  stroke="white"
                  stroke-width="4"
                  stroke-miterlimit="10"
                  stroke-linecap="square"
                />
              </g>
              <rect
                x="2"
                y="2"
                width="122"
                height="122"
                rx="61"
                stroke="white"
                stroke-width="4"
              />
              <defs>
                <clipPath id="clip0_83_343">
                  <rect width="126" height="126" rx="63" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
        ))}

        {isModalOpen && (
          <div className="fixed inset-0 px-16 flex items-center justify-center z-50 w-screen h-screen bg-black bg-opacity-50">
            <div className="bg-white p-6 mt-8 rounded-lg shadow-lg">
              <button
                onClick={closeModal}
                className="absolute top-10 right-6 
                    
                  
                  "
              >
                <svg
                  className="fill-[#B09FCD] cursor-pointer"
                  width="75"
                  height="76"
                  viewBox="0 0 75 76"
                  fill="none"
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
                loading="lazy"
                className="w-full"
                src={selectedService.imageInside}
                alt={selectedService.insideAlt}
                title={selectedService.insideAlt}
              />
              <div className="flex gap-4 mb-4">
                <div className={`border w-5 bg-[#B09FCD]`} />{" "}
                <div className="flex flex-col">
                  <h2 className="text-2xl md:text-6xl py-4 text-[#B09FCD] font-black font-glorich">
                    {selectedService.title}
                  </h2>
                </div>
              </div>
              <div className="max-h-96 overflow-y-auto">
                <p
                  className="font-binomaRegular font-normal md:text-2xl text-[#626262]"
                  dangerouslySetInnerHTML={{
                    __html: selectedService.description,
                  }}
                ></p>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

export default Services;
