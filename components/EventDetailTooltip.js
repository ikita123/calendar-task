import React, { useState } from "react";

const EventDetailTooltip = ({
  event,
  onDelete,
  onClose,
  onUpdateColor,
  position,
}) => {
  const [selectedColor, setSelectedColor] = useState(
    event.backgroundColor || "#3788d8"
  );

  const handleColorChange = (color) => {
    setSelectedColor(color);
    onUpdateColor(event.id, color);
  };

  const handleDelete = () => {
    onDelete(event.id);
    onClose();
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
      <h3>Event Details</h3>
      <div>
        <p>
          <strong>Title:</strong> {event.title}
        </p>
        <p>
          <strong>Start:</strong> {new Date(event.start).toLocaleString()}
        </p>
        <p>
          <strong>End:</strong>{" "}
          {event.end ? new Date(event.end).toLocaleString() : "N/A"}
        </p>
      </div>

      <div style={{ margin: "10px 0" }}>
        <label>Change Event Color:</label>
        <input
          type="color"
          value={selectedColor}
          onChange={(e) => handleColorChange(e.target.value)}
          style={{ marginLeft: "10px" }}
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "15px",
        }}
      >
        <button
          onClick={handleDelete}
          style={{
            backgroundColor: "#e74c3c",
            color: "white",
            padding: "8px 12px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Delete Event
        </button>

        <button
          onClick={onClose}
          style={{
            backgroundColor: "#3498db",
            color: "white",
            padding: "8px 12px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default EventDetailTooltip;
