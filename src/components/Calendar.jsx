import React, { useState, useEffect, useRef } from "react";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar } from "react-modern-calendar-datepicker";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import moment from "moment-timezone";

const horarios = {
  0: [], // Domingo
  1: [
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
  ], // Lunes
  2: [
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
  ], // Martes
  3: [
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
  ], // Miércoles
  4: [
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
  ], // Jueves
  5: [
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
  ], // Viernes
  6: ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM"], // Sábado
};

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 5 segundos

    return () => clearTimeout(timer); // Limpiar el temporizador si el componente se desmonta
  }, []);
  const [selectedDay, setSelectedDay] = useState(null);
  const [availableHours, setAvailableHours] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [triggerFetch, setTriggerFetch] = useState(false);

  const calendarRef = useRef(null);

  useEffect(() => {
    if (selectedDay) {
      const date = new Date(
        selectedDay.year,
        selectedDay.month - 1,
        selectedDay.day
      );
      const dayOfWeek = date.getDay();
      setAvailableHours(horarios[dayOfWeek]);
    } else {
      setAvailableHours([]);
    }
  }, [selectedDay]);

  const formatDate = (day) => {
    if (!day) return "";
    const date = new Date(day.year, day.month - 1, day.day);
    const dayString = String(date.getDate()).padStart(2, "0");
    const monthString = String(date.getMonth() + 1).padStart(2, "0");
    const yearString = date.getFullYear();
    return `${dayString}/${monthString}/${yearString}`;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const data = new FormData(form);
    const name = data.get("name");
    const phone = data.get("phone");
    const email = data.get("email");
    const date = formatDate(selectedDay);
    const hour = data.get("hour");
    const dateTime = `${date} ${hour}`;

    try {
      await axios.post("https://cesiaborjon.com/calendar", {
        name,
        phone,
        email,
        dateTime,
      });
      form.reset();
      setTriggerFetch(!triggerFetch);
      toast.success("Cita agendada correctamente");
    } catch (error) {
      toast.error("Error al agendar la cita");
    }
  };

  useEffect(() => {
    // Obtener las citas desde el backend
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          "https://cesiaborjon.com/appointments"
        );
        const adjustedAppointments = response.data.map((appointment) => {
          // Sumar 4 horas a cada cita
          const adjustedDateTime = moment(
            appointment.dateTime,
            "YYYY-MM-DD HH:mm:ss"
          )
            .add(-4, "hours")
            .format("YYYY-MM-DD HH:mm:ss");
          return { ...appointment, dateTime: adjustedDateTime };
        });
        setAppointments(adjustedAppointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, [triggerFetch]);

  useEffect(() => {
    if (selectedDay) {
      const date = new Date(
        selectedDay.year,
        selectedDay.month - 1,
        selectedDay.day
      );
      const dayOfWeek = date.getDay();
      const dayString = date.toISOString().split("T")[0];

      const filteredHours = horarios[dayOfWeek].filter((hour) => {
        const dateTime = new Date(
          `${dayString}T${convertTo24HourFormat(hour)}`
        );
        return !appointments.some(
          (appointment) =>
            new Date(appointment.dateTime).getTime() === dateTime.getTime()
        );
      });

      setAvailableHours(filteredHours);
    } else {
      setAvailableHours([]);
    }
  }, [selectedDay, appointments]);

  const convertTo24HourFormat = (time) => {
    const [hour, modifier] = time.split(" ");
    let [hours, minutes] = hour.split(":");
    if (hours === "12") {
      hours = "00";
    }
    if (modifier === "PM") {
      hours = parseInt(hours, 10) + 12;
    }
    return `${hours}:${minutes}:00`;
  };

  return (
    <main className="">
      <img
        src="/agendaFondo.png"
        className="absolute h-[800px] hidden md:block"
        alt=""
      />
      <img
        src="/calendarioPlanta.png"
        className="absolute left-56 translate-y-[-13px]  hidden md:block"
        alt=""
      />

      <h1 className="p-8 px-16 text-5xl font-glorich font-medium z-10 relative">
        AGENDA
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 px-8 gap-16 py-8">
        <div className="">
          <img className="" src="/calendar.png" alt="" />
        </div>
        <div className="flex gap-8">
          <div className="flex flex-col">
            <h2 className="text-3xl mb-4 font-blisstwine">
              ¿Te gustaría agendar una cita?
            </h2>
            <p className="mb-8 text-lg font-blisstwine md:text-end">
              ¡Estaré encantada de atenderte!{" "}
            </p>
            {/* <div className="flex-1 flex gap-8" ref={calendarRef}>
                <Calendar
                  value={selectedDay}
                  onChange={setSelectedDay}
                  colorPrimary="#B09FCD"
                  calendarClassName="custom-calendar h-32"
                />
                {selectedDay && (
                  <form className="mt-4 w-[400px]" onSubmit={handleSubmit}>
                    <label className="block mt-4 text-[#B09FCD] text-lg">
                      Nombre completo:
                    </label>
                    <input
                      type="text"
                      name="name"
                      className="mt-2 p-2 border rounded-full w-full"
                      required
                    />
                    <label className="block mt-4 text-[#B09FCD] text-lg">
                      Teléfono:
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      className="mt-2 p-2 border rounded-full w-full"
                      required
                    />
                    <label className="block mt-4 text-[#B09FCD] text-lg">
                      Correo electrónico:
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="mt-2 p-2 border rounded-full w-full"
                      required
                    />
                    <div className="flex justify-between items-center mt-4 gap-8">
                      <select
                        name="hour"
                        className="mt-2 p-2 border rounded-full bg-[#B09FCD] text-white w-48"
                        required
                      >
                        {availableHours.length > 0 ? (
                          availableHours.map((hour, index) => (
                            <option key={index} value={hour}>
                              {hour}
                            </option>
                          ))
                        ) : (
                          <option value="">No hay horas disponibles</option>
                        )}
                      </select>
                      <button
                        type="submit"
                        className="  p-2 bg-white hover:bg-gray-300 border-black border text-black w-48 rounded-full"
                      >
                        Agendar
                      </button>
                    </div>
                  </form>
                )}

                <Toaster position="top-right" />
              </div> */}
            {loading ? (
              <p>Cargando...</p>
            ) : (
              <iframe
                src="//overcomehelp.appspot.com/public/1kfp6h99l34/schedule"
                className="w-full h-[600px] md:w-[600px] md:h-[650px]"
              ></iframe>
            )}
            <div className="flex gap-4 justify-center items-center mb-4">
              <svg
                width="64"
                height="90"
                viewBox="0 0 64 90"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M32 38.3996C35.5346 38.3996 38.4 35.5342 38.4 31.9996C38.4 28.465 35.5346 25.5996 32 25.5996C28.4654 25.5996 25.6 28.465 25.6 31.9996C25.6 35.5342 28.4654 38.3996 32 38.3996Z"
                  fill="#B09FCD"
                />
                <path
                  d="M32 0C14.356 0 0 13.73 0 30.6C0 38.634 3.662 49.318 10.884 62.356C16.684 72.824 23.394 82.29 26.884 87C27.4737 87.8048 28.2448 88.4593 29.1347 88.9104C30.0246 89.3615 31.0083 89.5966 32.006 89.5966C33.0037 89.5966 33.9874 89.3615 34.8773 88.9104C35.7672 88.4593 36.5383 87.8048 37.128 87C40.612 82.29 47.328 72.824 53.128 62.356C60.338 49.322 64 38.638 64 30.6C64 13.73 49.644 0 32 0ZM32 44.8C29.4684 44.8 26.9937 44.0493 24.8887 42.6428C22.7838 41.2363 21.1431 39.2372 20.1743 36.8983C19.2055 34.5595 18.9521 31.9858 19.4459 29.5028C19.9398 27.0199 21.1589 24.7391 22.949 22.949C24.7391 21.1589 27.0199 19.9398 29.5028 19.4459C31.9858 18.9521 34.5595 19.2055 36.8983 20.1743C39.2372 21.1431 41.2363 22.7838 42.6428 24.8887C44.0493 26.9937 44.8 29.4684 44.8 32C44.7963 35.3936 43.4465 38.6472 41.0469 41.0469C38.6472 43.4465 35.3936 44.7963 32 44.8Z"
                  fill="#B09FCD"
                />
              </svg>
              <div className="flex flex-col">
                <p>
                  <strong>Torre Norte No. 2</strong>, Piso &nbsp;
                  <strong>2</strong>, Local: &nbsp;
                  <strong>809</strong>&nbsp;y&nbsp;<strong>810.</strong>
                </p>
                <p>Calle: Fray Servando Teresa de Mier, #1351. </p>
                <p>Zona Urbana Río Tijuana, C.P. 22010 </p>
                <p>Tijuana, Baja California, Mexico. </p>
                <a
                  className="hover:underline hover:font-bold"
                  href="tel:+526649763510"
                  target="_blank"
                >
                  Telefono del consultorio +526649763510
                </a>
                <a
                  className="hover:underline hover:font-bold"
                  href="https://wa.me/+526641515569?text=Buen+d%C3%ADa,+me+gustar%C3%ADa+agendar+una+cita"
                  target="_blank"
                >
                  WhatsApp del consultorio{" "}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default App;
