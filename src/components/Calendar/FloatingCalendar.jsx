import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import solarlunar from "solarlunar";
import "./FloatingCalendar.css";

const FloatingCalendar = () => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());

  const toggleCalendar = () => {
    if (open) {
      setDate(new Date());
      setTime(new Date());
    }
    setOpen(!open);
  };

  useEffect(() => {
    if (!open) return;

    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, [open]);

  const lunar = solarlunar.solar2lunar(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate()
  );

  return (
    <>
      <button className="calendar-btn" onClick={toggleCalendar}>
        📅
      </button>

      <div className={`calendar-popup ${open ? "show" : ""}`}>
        <Calendar onChange={setDate} value={date} />

        <div className="lunar-info">
          <p>
            🌞 <b>Dương:</b> {date.toLocaleDateString("vi-VN")}
          </p>
          <p>
            🌙 <b>Âm:</b> {lunar.lDay}/{lunar.lMonth}/{lunar.lYear}
            {lunar.isLeap ? " (Nhuận)" : ""}
          </p>

          {/* ⏰ Đồng hồ */}
          <div className="clock">
            ⏰ {time.toLocaleTimeString("vi-VN")}
          </div>
        </div>
      </div>
    </>
  );
};

export default FloatingCalendar;
