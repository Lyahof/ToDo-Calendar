import React from "react";
import "../App.css";

interface EventFormProps {
	showEventForm: boolean;
	setShowEventForm: (show: boolean) => void;
	eventTitle: string;
	setEventTitle: (value: string) => void;
	eventTime: string;
	setEventTime: (value: string) => void;
	onAddEvent: () => void;
}

const EventForm: React.FC<EventFormProps> = ({
  showEventForm,
  setShowEventForm,
  eventTitle,
  setEventTitle,
  eventTime,
  setEventTime,
  onAddEvent,
}) => {
  return (
    <div className={`add-event-wrapper ${showEventForm ? "active" : ""}`}>
      <div className="add-event-header">
        <span className="title">Добавить Задачу</span>
        <span className="close" onClick={() => setShowEventForm(false)}>
          x
        </span>
      </div>
      <div className="add-event-body">
        <div className="add-event-input">
          <input
            type="text"
            placeholder="Название задачи"
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
          />
        </div>
        <div className="add-event-input">
          <input
            type="time"
            placeholder="Время выполнения"
            value={eventTime}
            onChange={(e) => setEventTime(e.target.value)}
          />
        </div>
      </div>
      <div className="add-event-footer">
        <button className="add-event-btn" onClick={onAddEvent}>
          Добавить Задачу
        </button>
      </div>
    </div>
  );
};

export default EventForm;
