import { useState, useEffect } from "react";

const Calendar = () => {
  const timeSlots = [
    "6:00 AM",
    "6:30 AM",
    "7:00 AM",
    "7:30 AM",
    "8:00 AM",
    "8:30 AM",
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
  ];

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [statusFilter, setStatusFilter] = useState("");
  const [teamFilter, setTeamFilter] = useState("");
  const [timeRange, setTimeRange] = useState("1 Hour");
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Filter members based on status and team
    filterMembers();
  }, [statusFilter, teamFilter]);

  const filterMembers = () => {
    let members = [...Array(11)].map((_, i) => `Member ${i + 1}`);

    // Apply team filter (dummy filter logic based on "team-")
    if (teamFilter) {
      members = members.filter((m) =>
        m.includes(teamFilter.replace("team-", ""))
      );
    }

    // Apply status filter (just an example, modify based on actual logic)
    if (statusFilter) {
      members = members.slice(0, 7); // Example logic to show only 7 members if status is selected
    }

    setFilteredMembers(members);
  };

  const handleMonthChange = (delta) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + delta);
    setSelectedDate(newDate);
  };

  const formattedDate = selectedDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  const handleAddEvent = (member, timeSlot) => {
    // Check if there's already an event at that time
    const existingEvent = events.find(
      (e) => e.member === member && e.timeSlot === timeSlot
    );
    if (existingEvent) {
      alert("This slot already has an event.");
      return; // Prevent adding a new event if one already exists
    }

    const eventName = prompt("Enter event name");
    if (eventName) {
      setEvents((prevEvents) => [
        ...prevEvents,
        { member, timeSlot, eventName },
      ]);
    }
  };

  const handleDeleteEvent = (eventIndex) => {
    setEvents((prevEvents) => prevEvents.filter((_, i) => i !== eventIndex));
  };

  return (
    <div className="flex-1 p-4 overflow-auto">
      <header className="p-4 border-b bg-white shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleMonthChange(-1)}
              className="text-xl font-bold text-gray-600 hover:text-gray-900 transition-all"
            >
              &lt;
            </button>
            <h1 className="text-lg font-semibold">{formattedDate}</h1>
            <button
              onClick={() => handleMonthChange(1)}
              className="text-xl font-bold text-gray-600 hover:text-gray-900 transition-all"
            >
              &gt;
            </button>
          </div>

          <div className="flex space-x-6">
            <span className="text-gray-700 font-medium cursor-pointer hover:underline transition-all">
              Event
            </span>
            <span className="text-gray-700 font-medium cursor-pointer hover:underline transition-all">
              Team View
            </span>
            <span className="text-gray-700 font-medium cursor-pointer hover:underline transition-all">
              Team Tracking
            </span>
          </div>
        </div>

        <div className="flex mt-4 justify-between items-center">
          <div className="flex space-x-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500 transition-all"
            >
              <option value="">Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="expired">Expired</option>
            </select>

            <select
              value={teamFilter}
              onChange={(e) => setTeamFilter(e.target.value)}
              className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500 transition-all"
            >
              <option value="">Teams</option>
              <option value="team-a">Team A</option>
              <option value="team-b">Team B</option>
              <option value="team-c">Team C</option>
            </select>
          </div>

          <div className="flex space-x-4">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500 transition-all"
            >
              <option value="1 Hour">1 Hour</option>
              <option value="Day">Day</option>
            </select>

            {timeRange === "1 Hour" && (
              <select className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500 transition-all">
                <option value="Day">Day</option>
                <option value="Week">Week</option>
              </select>
            )}

            <button
              onClick={() => setSelectedDate(new Date())}
              className="text-gray-700 font-semibold border p-2 rounded-md hover:bg-gray-200 transition-all"
            >
              &lt; Today &gt;
            </button>
          </div>
        </div>
      </header>

      <table className="w-full border-collapse mt-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Team</th>
            {timeSlots.map((time, i) => (
              <th key={i} className="border p-2">
                {time}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredMembers.map((member, rowIndex) => (
            <tr key={rowIndex} className="border">
              <td className="border p-2 font-medium">{member}</td>
              {timeSlots.map((timeSlot, colIndex) => {
                const event = events.find(
                  (e) => e.member === member && e.timeSlot === timeSlot
                );
                return (
                  <td
                    key={colIndex}
                    className="border p-2 relative cursor-pointer transition-all hover:bg-gray-100"
                    onClick={() => handleAddEvent(member, timeSlot)}
                  >
                    {event && (
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white p-2 rounded-md transition-all opacity-100 animate-fade-in">
                        {event.eventName}
                        <button
                          onClick={() =>
                            handleDeleteEvent(events.indexOf(event))
                          }
                          className="text-xs absolute top-0 right-0 text-red-500 hover:text-red-700 transition-all"
                        >
                          X
                        </button>
                      </div>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;
