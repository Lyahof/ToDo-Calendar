import EventItemInterface from "../interfaces/EventItemInterface";

interface WeeklyViewProps {
	currentDate: Date;
	events: EventItemInterface[];
}

const WeeklyView = ({ currentDate, events }: WeeklyViewProps) => {

  const startOfWeek = (date: Date): Date => {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  };

  const getWeekDates = (date: Date): Date[] => {
    const start = startOfWeek(new Date(date));
    const weekDates = [new Date(start)];
    for (let i = 1; i < 7; i++) {
      const nextDate = new Date(start);
      nextDate.setDate(start.getDate() + i);
      weekDates.push(nextDate);
    }
    return weekDates;
  };

  const weekDates = getWeekDates(currentDate);

  return (
    <div className="week-days">
      {weekDates.map((date, index) => (
        <div key={index} className="week-day">
          <div className="date">
            {date.toLocaleDateString("default", { weekday: "long" })} -{" "}
            {date.getDate()}{" "}
            {currentDate.toLocaleString("default", { month: "long" })}{" "}
          </div>
          <div className="week-events">
            {events
              .filter(
                (event) =>
                  new Date(event.date).toDateString() === date.toDateString()
              )
              .map((event) => (
                <div className="week-event" key={event.eventId}>
                  <div className={`event-title ${
                    event.status === "done" ? "done" : ""
                  }`}>{event.time}</div>
                  <div className={`event-title ${
                    event.status === "done" ? "done" : ""
                  }`}>{event.title}</div>
                </div>
              ))}
            {events.filter(
              (event) =>
                new Date(event.date).toDateString() === date.toDateString()
            ).length === 0 && <div>Ничего не запланировано</div>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WeeklyView;
