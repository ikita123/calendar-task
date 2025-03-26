import React, { useState } from "react";

const AddEventTooltip = ({ position, onSave, onClose }) => {
  const [eventTitle, setEventTitle] = useState("");
  const [eventStartTime, setEventStartTime] = useState("");
  const [eventEndTime, setEventEndTime] = useState("");

  const handleSave = () => {
    if (eventTitle && eventStartTime && eventEndTime) {
      onSave(eventTitle, eventStartTime, eventEndTime);
      onClose();
    } else {
      alert("Please fill in title, start time, and end time.");
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        top: `${position.top}px`,
        left: `${position.left}px`,
        zIndex: 10,
        backgroundColor: "white",
        border: "1px solid #ddd",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        width: "300px",
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          background: "transparent",
          border: "none",
          fontSize: "18px",
          cursor: "pointer",
        }}
      >
        &times;
      </button>
      <h3 className="text-lg font-semibold">Add Event</h3>
      <input
        type="text"
        value={eventTitle}
        onChange={(e) => setEventTitle(e.target.value)}
        className="mt-2 p-2 border border-gray-300 rounded-md w-full"
        placeholder="Event Title"
      />
      <input
        type="time"
        value={eventStartTime}
        onChange={(e) => setEventStartTime(e.target.value)}
        className="mt-2 p-2 border border-gray-300 rounded-md w-full"
        placeholder="Start Time"
      />
      <input
        type="time"
        value={eventEndTime}
        onChange={(e) => setEventEndTime(e.target.value)}
        className="mt-2 p-2 border border-gray-300 rounded-md w-full"
        placeholder="End Time"
      />
      <div className="mt-4 flex justify-end">
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white p-2 rounded-lg"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default AddEventTooltip;
