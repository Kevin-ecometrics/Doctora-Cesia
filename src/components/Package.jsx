import React, { useState } from "react";

function Package({ packages }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  const handleSvgClick = (item) => {
    setSelectedPackage(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedPackage(null);
  };

  return (
    <div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-8">
        {packages.map((item, index) => (
          <div
            class={`${item.background} h-[400px] w-[343px] py-8 px-8
              `}
            key={index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="flex justify-end items-start">
              {hoveredIndex === index && (
                <svg
                  className="cursor-pointer hidden md:block"
                  width="58"
                  height="58"
                  viewBox="0 0 58 58"
                  fill="none"
                  onClick={() => handleSvgClick(item)}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_515_289)">
                    <path
                      d="M57.0632 6.91095L56.4857 -3.84714L45.7421 -3.04322M55.7797 -3.04422L45.4725 8.67837"
                      stroke="white"
                      strokeWidth="1.28297"
                      strokeMiterlimit="10"
                      strokeLinecap="square"
                    />
                    <path
                      d="M33.3427 33.8895L32.7651 23.1314L22.0215 23.9353M32.0591 23.9343L21.752 35.6569"
                      stroke="white"
                      strokeWidth="1.28297"
                      strokeMiterlimit="10"
                      strokeLinecap="square"
                    />
                  </g>
                  <rect
                    x="0.905332"
                    y="30.2914"
                    width="39.1307"
                    height="39.1307"
                    rx="19.5653"
                    transform="rotate(-48.6763 0.905332 30.2914)"
                    stroke="white"
                    strokeWidth="1.28297"
                  />
                  <defs>
                    <clipPath id="clip0_515_289">
                      <rect
                        y="30.3496"
                        width="40.4136"
                        height="40.4136"
                        rx="20.2068"
                        transform="rotate(-48.6763 0 30.3496)"
                        fill="white"
                      />
                    </clipPath>
                  </defs>
                </svg>
              )}
            </div>
            <div class="mb-4 text-center">
              <div class="flex h-16">
                <h2 class="font-bold text-2xl font-glorich  uppercase">
                  {item.name}
                </h2>
              </div>

              <p class="text-3xl font-bold mb-8 z-10 bg-white rounded-full py-8 mt-12">
                {item.price}
              </p>

              <button
                className="block
                md:hidden
                bg-white
                text-black
                font-bold
                rounded-full
                py-4
                px-8
                transition-all
                duration-300
                ease-in-out
                cursor-pointer
                z-10
                w-full

              "
                onClick={() => handleSvgClick(item)}
              >
                Ver paquete
              </button>
              <div className="flex justify-center items-center md:py-0 py-4">
                <svg
                  width="34"
                  height="33"
                  viewBox="0 0 34 33"
                  fill="#00000"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="17.6367"
                    y="0.278809"
                    width="23.1549"
                    height="23.1549"
                    transform="rotate(48.0953 17.6367 0.278809)"
                  ></rect>
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modalVisible && selectedPackage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex z-50 justify-center  md:h-screen items-center w-full">
          <div className="bg-white p-8 rounded-lg relative md:w-[820px]">
            <button
              className="absolute top-8 right-8 p-4 
            "
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
              src={selectedPackage.image}
              className="w-full h-32 md:h-80"
              alt=""
              loading="lazy"
            />
            <div className="flex items-center gap-4 md:py-4">
              <div
                className={`border h-24 w-5 ${selectedPackage.background}`}
              />
              <h2 className="md:text-4xl  uppercase py-4 font-glorich font-black ">
                Paquete <br /> {selectedPackage.name}
              </h2>
            </div>

            <div
              className={` py-2 md:py-4 px-8 rounded-3xl font-binomaRegular font-bold text-xl flex text-black justify-start flex-col items-start ${selectedPackage.background}`}
            >
              <h1 className="text-start mb-4">
                <strong className="font-binomaRegular ">Descripción:</strong>
                &nbsp; <br />
                <p className="text-black font-normal">
                  {selectedPackage.modalDescription}
                </p>
              </h1>
              <p class="text-start  border-t border-white w-full py-2">
                {selectedPackage.description1}
              </p>
              <p class="text-start  border-t border-white w-full py-2">
                {selectedPackage.description2}
              </p>
              <p class="text-start  border-t border-white w-full border-b py-2">
                {selectedPackage.description3}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Package;
