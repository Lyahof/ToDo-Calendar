import React from "react";
import "../App.css";
import EventItemInterface from "../interfaces/EventItemInterface";

interface EventListProps {
	currentDate: Date;
	events: EventItemInterface[];
	onDeleteEvent: (id: number) => void;
	onFulfillEvent: (id: number) => void;
}

const EventList: React.FC<EventListProps> = ({ events, currentDate, onDeleteEvent, onFulfillEvent }) => {
  return (
    <div className="events">
      {events
        .filter(
          (event) =>
            new Date(event.date).toDateString() === currentDate.toDateString()
        )
        .map((event, index) => (
          <div className="event-container" key={event.eventId}>
            <label className="container-checkbox">
              <input
                type="checkbox"
                onChange={() => onFulfillEvent(event.eventId)}
                checked={event.status === "done"}
                disabled={event.status === "done"}
              />
              <span className="checkmark"></span>
            </label>
            <div className="event">
              <div className="title">
                <h3
                  className={`event-title ${
                    event.status === "done" ? "done" : ""
                  }`}
                >{`${index + 1}. ${event.title}`}</h3>
              </div>
              <span className="event-time">{event.time}</span>
              <button onClick={() => onDeleteEvent(event.eventId)}>
                Удалить задачу
              </button>
            </div>
          </div>
        ))}
      {events.filter(
        (event) =>
          new Date(event.date).toDateString() === currentDate.toDateString()
      ).length === 0 && <div className="no-event">Нет событий</div>}
    </div>
  );
};

export default EventList;
