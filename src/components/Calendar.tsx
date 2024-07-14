import React, { useEffect, useState } from "react";
import getDaysOff from "../api/getDaysOffAPI";
import EventItemInterface from "../interfaces/EventItemInterface";

interface CalendarProps {
	events: EventItemInterface[];
	currentDate: Date;
	setCurrentDate: (date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({ currentDate, setCurrentDate, events }) => {
  const [daysOff, setDaysOff] = useState<boolean[]>([]);
  console.log(events)

  useEffect(() => {
    const fetchDaysOff = async () => {
      try {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1;
        const daysOffData = await getDaysOff(year, month);
        setDaysOff(daysOffData);
      } catch (err) {
        console.error((err as Error).message);
        throw new Error(
          "Не удалось получить данные о выходных и праздничных днях с сервера");
      }
    };
    fetchDaysOff();
  }, [currentDate]);

  const handlePrevMonth = (): void => {
    const prevMonth = new Date(
      currentDate.setMonth(currentDate.getMonth() - 1)
    );
    setCurrentDate(new Date(prevMonth));
  };

  const handleNextMonth = (): void => {
    const nextMonth = new Date(
      currentDate.setMonth(currentDate.getMonth() + 1)
    );
    setCurrentDate(new Date(nextMonth));
  };

  const handleDayClick = (day: number): void => {
    const clickedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    setCurrentDate(clickedDate);
  };

  const daysInMonth = (month: number, year: number): number=> {
    return new Date(year, month + 1, 0).getDate();
  };

  const renderDays = () => {
    const days = [];
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const firstDay = new Date(year, month, 1).getDay();
    const lastMonthDays = daysInMonth(month - 1, year);
    const currentMonthDays = daysInMonth(month, year);
    const nextMonthStartDay = new Date(year, month + 1, 1).getDay();

    for (let i = firstDay - 1; i >= 0; i--) {
      days.push(
        <div key={`prev-${i}`} className="day prev-date">
          {lastMonthDays - i}
        </div>
      );
    }

    for (let i = 1; i <= currentMonthDays; i++) {
      const isDayOff = daysOff[i - 1];
      const dayEvents = events.filter(
        (event) =>
          new Date(event.date).toDateString() ===
          new Date(year, month, i).toDateString()
      );
      days.push(
        <div
          key={`current-${i}`}
          className={`day ${i === currentDate.getDate() ? "today" : ""} ${
            isDayOff ? "day-off" : ""
          }`}
          onClick={() => handleDayClick(i)}
        >
          {i}
          {dayEvents.length > 0 && (
            <div className="event-indicator">{dayEvents.length}</div>
          )}
        </div>
      );
    }

    for (let i = 1; i <= 6 - nextMonthStartDay; i++) {
      days.push(
        <div key={`next-${i}`} className="day next-date">
          {i}
        </div>
      );
    }
    return days;
  };

  return (
    <div className="calendar">
      <div className="month">
        <div className="prev" onClick={handlePrevMonth}>
          ❮
        </div>
        <div>
          <h2>
            {currentDate.toLocaleString("default", { month: "long" })}{" "}
            {currentDate.getFullYear()}
          </h2>
          <p>{new Date().toDateString()}</p>
        </div>
        <div className="next" onClick={handleNextMonth}>
          ❯
        </div>
      </div>
      <div className="weekdays">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>
      <div className="days">{renderDays()}</div>
    </div>
  );
};

export default Calendar;
