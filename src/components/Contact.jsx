import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
function Contact() {
  const [form, setForm] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleKeyPress = (e) => {
    const {
      charCode,
      target: { value },
    } = e;
    const isNotNumber = charCode < 48 || charCode > 57;
    const isMaxLength = value.length >= 13;

    if (isNotNumber || isMaxLength) {
      e.preventDefault();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const sendEmail = axios.post("https://cesiaborjon.com/contact", form);

      toast.promise(sendEmail, {
        loading: "Enviando mensaje...",
        success: <b>Mensaje enviado correctamente</b>,
        error: <b>Error al enviar el mensaje</b>,
      });

      await sendEmail;

      setForm({
        name: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
    }
  };
  return (
    <main className="md:w-[80%] mx-auto py-4 md:py-8">
      <div className="flex items-center md:gap-16 flex-col md:flex-row">
        <h1 className="font-glorich font-black text-2xl md:text-[90px] text-[#FABB70]">
          CONTACTO
        </h1>
        <h1 className=" font-normal md:text-[40px] font-blisstwine px-8 ">
          Me encantaria leerte <br /> Es tu espacio seguro para escribir
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col justify-center items-center md:justify-start md:items-start md:py-0 py-8">
          <h1 className="uppercase md:mb-4 font-blisstwine">Contáctame</h1>
          <p className="text-[#626262]">Cesia Borjon</p>
          <p className="text-[#626262]">
            {" "}
            <a href="mailto:doctora@cesiaborjon.com">doctora@cesiaborjon.com</a>
          </p>
          <p className="text-[#626262]">
            {" "}
            <a href="tel:+526649763510">664 976 3510</a>
          </p>
          <p className="mb-8 text-[#626262]">
            {" "}
            <a
              href="https://cesiaborjon.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              cesiaborjon.com
            </a>
          </p>

          <h1 className="uppercase md:mb-4  font-blisstwine font-bold">
            LOCALÍZAME
          </h1>
          <p className="text-[#626262]">
            Torre Norte No. 2, Piso 2, Local: 809 y 810.
          </p>
          <p className="text-[#626262]">
            Calle: Fray Servando Teresa de Mier, #1351.
          </p>
          <p className="text-[#626262]">Zona Urbana Río Tijuana, C.P. 22010</p>
          <p className="text-[#626262]">Tijuana, Baja California, Mexico.</p>
        </div>
        <div className="flex justify-center py-4 px-4">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row gap-8 mb-4">
              <div className="flex flex-col">
                <label htmlFor="">Nombre:</label>
                <input
                  required
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  type="text"
                  className="md:w-[391px] border-b border-black md:h-[35px]"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="">Apellido:</label>
                <input
                  required
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  type="text"
                  className="md:w-[391px] border-b border-black  md:h-[35px]"
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-8 mb-4">
              <div className="flex flex-col">
                <label htmlFor="">Email:</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  name="email"
                  className="md:w-[391px] border-b border-black  md:h-[35px]"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="">Telefono:</label>
                <input
                  required
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                  name="phone"
                  className="md:w-[391px] border-b border-black  md:h-[35px]"
                />
              </div>
            </div>

            <div className="flex flex-col  mb-4">
              <label htmlFor="">Como puedo ayudarte? ¡Escríbeme!</label>
              <textarea
                className="border-b border-black h-[100px]"
                required
                name="message"
                value={form.message}
                onChange={handleChange}
                id=""
              ></textarea>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <button
                  type="submit"
                  className=" border border-black rounded-full px-8 py-2
                hover:bg-gray-500 hover:text-white"
                >
                  Enviar
                </button>

                <Toaster position="top-right" />
              </div>

              <div className="flex flex-col">
                <h1 className="font-binomaRegular text-lg mb-4">
                  Métodos de pago:
                </h1>
                <div className="flex gap-4">
                  <img
                    src="/Aceptamos pagos con tarjeta.png"
                    alt="En el consultorio aceptamos pagos con tarjeta  "
                    title="En el consultorio aceptamos pagos con tarjeta  "
                  />
                  <img
                    src="/Aceptamos pagos con tarjeta de debito o credito.png"
                    alt="Puedes pagar tu consulta ginecológica con tu tarjeta de débito o crédito "
                    title="Puedes pagar tu consulta ginecológica con tu tarjeta de débito o crédito "
                  />
                  <img
                    src="/Aceptamos pagos con tarjeta de credito.png"
                    alt="Aceptamos pagos con tarjeta de crédito en el consultorio "
                    title="Aceptamos pagos con tarjeta de crédito en el consultorio "
                  />
                  <img
                    src="/Aceptamos pagos en efectivo y trasferencias bancarias.png"
                    alt="Con la Dra. Cesia aceptamos pagos en efectivo y trasferencias bancarias "
                    title="Con la Dra. Cesia aceptamos pagos en efectivo y trasferencias bancarias "
                  />
                  <p className="font-binomaRegular text-xl font-bold">
                    Efectivo o Transferencia
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

export default Contact;
