import React, { useState } from "react";

function SmallCalendar({ onSelect }) {
  const [date, setDate] = useState(new Date());

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  const startDay = startOfMonth.getDay();
  const totalDays = endOfMonth.getDate();

  const prevMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
  };

  const handleClick = (day) => {
    const selected = new Date(date.getFullYear(), date.getMonth(), day);
    onSelect(selected); // 🔥 send to parent
  };

  const renderDates = () => {
    const dates = [];

    for (let i = 0; i < startDay; i++) {
      dates.push(<div key={"e" + i}></div>);
    }

    for (let i = 1; i <= totalDays; i++) {
      dates.push(
        <div
          key={i}
          onClick={() => handleClick(i)}
          className="text-center p-2 rounded cursor-pointer hover:bg-orange-500"
        >
          {i}
        </div>
      );
    }

    return dates;
  };

  return (
    <div className="w-64 bg-slate-800 text-white p-4 rounded-xl shadow-xl border border-slate-700">
      <div className="flex justify-between mb-3">
        <button onClick={prevMonth}>⬅</button>
        <h2 className="font-bold">
          {date.toLocaleString("default", { month: "long" })}{" "}
          {date.getFullYear()}
        </h2>
        <button onClick={nextMonth}>➡</button>
      </div>

      <div className="grid grid-cols-7 text-sm text-gray-400 mb-2">
        {days.map((d) => (
          <div key={d} className="text-center">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {renderDates()}
      </div>
    </div>
  );
}

export default SmallCalendar;