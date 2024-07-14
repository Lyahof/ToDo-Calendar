import { useState, useEffect, FC } from "react";
import "./App.css";
import Calendar from "./components/Calendar";
import EventForm from "./components/EventForm";
import WeeklyView from "./components/WeeklyView";
import EventList from "./components/EventList";
import EventItemInterface from "./interfaces/EventItemInterface";

const App: FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [events, setEvents] = useState<EventItemInterface[]>(() => {
		const storedEvents = localStorage.getItem("events")
		return storedEvents ? JSON.parse(storedEvents) : []
  });

  const [eventTitle, setEventTitle] = useState<string>("");
  const [eventTime, setEventTime] = useState<string>("");
  const [showEventForm, setShowEventForm] = useState<boolean>(false);
  const [view, setView] = useState<"month" | "week">("month");

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const handleAddEvent = (): void => {
    if (!eventTitle || !eventTime)
      return alert("Название задачи и время дожны быть заполнены");

    if (eventTitle && eventTime) {
      const newEvent = {
        eventId: Math.random(),
        title: eventTitle,
        time: eventTime,
        date: currentDate.toDateString(),
        status: "inProgress",
      };
      setEvents([...events, newEvent]);
      setEventTitle("");
      setEventTime("");
      setShowEventForm(false);
    }
  };

  const handleDeleteEvent = (id: number): void => {
    alert("Вы действительно хотите удалить выбраную задачу?");

    const updatedEvents = events.filter((event: EventItemInterface) => event.eventId !== id);
    setEvents(updatedEvents);
  };

  const handleFulfillEvent = (id: number): void => {
    alert("Вы действительно хотите отметить выбраную задачу как выполненную?");

    const updatedEvents = events.map((event: EventItemInterface) =>
      event.eventId === id ? { ...event, status: "done" } : event
    );
    setEvents(updatedEvents);
  };

  return (
    <div className="container">
      <div className="left">
        <div className="view-switcher">
          <button onClick={() => setView("month")}>Календарь</button>
          <button onClick={() => setView("week")}>
            События недели
          </button>
        </div>
        {view === "month" ? (
          <Calendar
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
            events={events}
          />
        ) : (
          <WeeklyView
            currentDate={currentDate}
            events={events}
          />
        )}
      </div>

      {view === "month" && (
        <div className="right">
          <div className="today-date">
            <span className="event-day">
              {currentDate.toLocaleString("default", { weekday: "long" })}
            </span>
            <span className="event-date">{currentDate.toDateString()}</span>
          </div>
          <EventList
            events={events}
            currentDate={currentDate}
            onDeleteEvent={handleDeleteEvent}
            onFulfillEvent={handleFulfillEvent}
          />
          <EventForm
            showEventForm={showEventForm}
            setShowEventForm={setShowEventForm}
            eventTitle={eventTitle}
            setEventTitle={setEventTitle}
            eventTime={eventTime}
            setEventTime={setEventTime}
            onAddEvent={handleAddEvent}
          />
          <button
            className="add-event"
            onClick={() => setShowEventForm((show) => !show)}
          >
           +
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
