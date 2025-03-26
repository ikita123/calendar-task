import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import AddEventTooltip from "./AddEventTooltip";
import EventDetailTooltip from "./EventDetailTooltip";

const CalendarView = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const savedEvents =
      JSON.parse(localStorage.getItem("calendarEvents")) || [];
    console.log("Saved Events: ", savedEvents); // Debugging saved events
    setEvents(savedEvents);
    setFilteredEvents(savedEvents);
  }, []);

  useEffect(() => {
    localStorage.setItem("calendarEvents", JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    const filtered = events.filter((event) => {
      const matchesTeam = selectedTeam ? event.team === selectedTeam : true;
      const matchesStatus = selectedStatus
        ? event.status === selectedStatus
        : true;
      const matchesCategory = selectedCategory
        ? event.category === selectedCategory
        : true;
      const matchesSearch = event.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesTeam && matchesStatus && matchesCategory && matchesSearch;
    });

    console.log("Filtered Events: ", filtered); // Debugging filtered events
    setFilteredEvents(filtered);
  }, [selectedTeam, selectedStatus, selectedCategory, searchQuery, events]);

  const handleDateClick = (info) => {
    setSelectedDate(info.dateStr);
    setTooltipPosition({
      top: info.jsEvent.clientY,
      left: info.jsEvent.clientX,
    });
    setSelectedEvent(null);
    setIsTooltipOpen(true);
  };

  const handleSaveEvent = (
    title,
    startTime,
    endTime,
    color = "#3788d8",
    category = "meeting"
  ) => {
    const newEvent = {
      id: `${selectedDate}-${startTime}`,
      title,
      start: `${selectedDate}T${startTime}:00`,
      end: `${selectedDate}T${endTime}:00`,
      backgroundColor: color,
      extendedProps: { highlightColor: lightenColor(color, 0.7) },
      category,
      team: "Development",
      status: "Active",
    };
    setEvents([...events, newEvent]);
    setIsTooltipOpen(false);
  };

  const handleUpdateColor = (eventId, color) => {
    setEvents(
      events.map((event) =>
        event.id === eventId
          ? {
              ...event,
              backgroundColor: color,
              extendedProps: { highlightColor: lightenColor(color, 0.7) },
            }
          : event
      )
    );
  };

  const handleCloseTooltip = () => {
    setIsTooltipOpen(false);
    setSelectedEvent(null);
  };

  const renderEventContent = (eventInfo) => (
    <div
      className="bg-blue-500 text-white p-2 rounded-lg flex items-center"
      style={{ backgroundColor: eventInfo.event.backgroundColor }}
    >
      <span>📌 {eventInfo.event.title}</span>
    </div>
  );

  return (
    <div className="relative p-4">
      <div className="flex flex-wrap justify-start gap-4 mb-6">
        <input
          type="text"
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border rounded-lg w-full sm:w-auto"
        />
        <select
          value={selectedTeam}
          onChange={(e) => setSelectedTeam(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="">Teams</option>
          <option value="Development">Development</option>
          <option value="Design">Design</option>
          <option value="Marketing">Marketing</option>
        </select>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="">Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Completed">Completed</option>
        </select>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="">Category</option>
          <option value="meeting">Meeting</option>
          <option value="personal">Personal</option>
          <option value="deadline">Deadline</option>
        </select>
      </div>

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
        initialView="listWeek" // Change this to list view for testing
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,listWeek",
        }}
        editable={true}
        selectable={true}
        droppable={true}
        events={filteredEvents} // Make sure filteredEvents is passed here
        dateClick={handleDateClick}
        eventClick={(info) => {
          setSelectedEvent(info.event);
          setTooltipPosition({
            top: info.jsEvent.clientY,
            left: info.jsEvent.clientX,
          });
          setIsTooltipOpen(true);
        }}
        eventContent={renderEventContent}
        eventDidMount={(info) => {
          if (info.el) {
            info.el.style.backgroundColor =
              info.event.extendedProps?.highlightColor || "#f3f3f3";
          }
        }}
      />

      {isTooltipOpen && !selectedEvent ? (
        <AddEventTooltip
          position={tooltipPosition}
          onSave={handleSaveEvent}
          onClose={handleCloseTooltip}
        />
      ) : (
        isTooltipOpen &&
        selectedEvent && (
          <EventDetailTooltip
            event={selectedEvent}
            onDelete={(eventId) => {
              setEvents(events.filter((event) => event.id !== eventId));
              setIsTooltipOpen(false);
            }}
            onClose={handleCloseTooltip}
            onUpdateColor={handleUpdateColor}
            position={tooltipPosition}
          />
        )
      )}
    </div>
  );
};

const lightenColor = (hex, percent) => {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.min(255, (num >> 16) + (255 - (num >> 16)) * percent);
  const g = Math.min(
    255,
    ((num >> 8) & 0x00ff) + (255 - ((num >> 8) & 0x00ff)) * percent
  );
  const b = Math.min(
    255,
    (num & 0x0000ff) + (255 - (num & 0x0000ff)) * percent
  );
  return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
};

export default CalendarView;
