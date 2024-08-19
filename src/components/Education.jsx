import React, { useState } from "react";

function Education({ education }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedList, setSelectedList] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openModal = (index, list) => {
    setSelectedIndex(index);
    setSelectedList(list);
    setCurrentImageIndex(0); // Resetear al primer índice de imagen
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedIndex(null);
    setSelectedList([]);
    setCurrentImageIndex(0);
  };

  const showNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % selectedList.length);
  };

  const showPrevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + selectedList.length) % selectedList.length
    );
  };

  return (
    <div>
      {education.map((ed, index) => (
        <article
          key={index}
          className="grid grid-cols-1 md:grid-cols-2 py-16 gap-8 border-b border-white"
        >
          <div
            className="flex justify-center items-center cursor-pointer"
            onClick={(e) => {
              e.preventDefault(); // Prevenir el comportamiento predeterminado del enlace
              openModal(index, ed.list);
            }}
          >
            <img src={ed.image} loading="lazy" alt="" />
          </div>
          <div className="text-black">
            <div className="mb-8">
              <p
                className=" text-black px-8 py-2 rounded-lg mt-4 text-end mb-4 text-xl md:text-4xl cursor-pointer font-blisstwine 
                   hover:text-white transition duration-300 ease-in-out hover:underline
                "
                onClick={(e) => {
                  e.preventDefault(); // Prevenir el comportamiento predeterminado del enlace
                  openModal(index, ed.list);
                }}
              >
                <span className="font-binomaRegular">Ver más</span>
              </p>
              <h1 className="text-2xl md:text-4xl mb-4 font-blisstwine">
                {ed.title}
              </h1>
              <p className="text-xl font-medium font-binomaRegular">
                {/* {ed.description} */}
              </p>
            </div>
          </div>
        </article>
      ))}

      {modalOpen && selectedIndex !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="relative bg-white p-4 rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-black text-2xl"
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
            <div className="flex items-center justify-center">
              <button
                onClick={showPrevImage}
                className="text-2xl text-black mx-2 hidden md:block"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#B09FCD"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-left"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M5 12l14 0" />
                  <path d="M5 12l6 6" />
                  <path d="M5 12l6 -6" />
                </svg>{" "}
              </button>
              <img
                src={selectedList[currentImageIndex]}
                alt={`Imagen ${currentImageIndex + 1}`}
                loading="lazy"
                className="w-[650px] h-[600px]"
              />
              <button
                onClick={showNextImage}
                className="text-2xl text-black mx-2 hidden md:block"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#B09FCD"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-right"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M5 12l14 0" />
                  <path d="M13 18l6 -6" />
                  <path d="M13 6l6 6" />
                </svg>{" "}
              </button>
            </div>
            <div className="block md:hidden">
              <div className="flex items-center justify-center">
                <button
                  onClick={showPrevImage}
                  className="text-2xl text-black mx-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#B09FCD"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-left"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M5 12l14 0" />
                    <path d="M5 12l6 6" />
                    <path d="M5 12l6 -6" />
                  </svg>{" "}
                </button>

                <button
                  onClick={showNextImage}
                  className="text-2xl text-black mx-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#B09FCD"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-right"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M5 12l14 0" />
                    <path d="M13 18l6 -6" />
                    <path d="M13 6l6 6" />
                  </svg>{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Education;
