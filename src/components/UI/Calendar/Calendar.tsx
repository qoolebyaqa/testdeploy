/* import { useState } from 'react';
import '../Calendar/calendar.scss'; 

const DatePicker = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDays, setSelectedDays] = useState({});
  
  const daysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const startDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleDayClick = (day) => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const dateKey = `${year}-${month}-${day}`;
    
    setSelectedDays((prevSelectedDays) => ({
      ...prevSelectedDays,
      [dateKey]: !prevSelectedDays[dateKey],
    }));
  };

  const handleWeekSelect = (weekIndex) => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const newSelectedDays = {...selectedDays};

    for (let i = 0; i < 7; i++) {
      const day = weekIndex * 7 + i + 1 - startDayOfMonth(year, month);
      if (day > 0 && day <= daysInMonth(year, month)) {
        const dateKey = `${year}-${month}-${day}`;
        newSelectedDays[dateKey] = true;
      }
    }
    setSelectedDays(newSelectedDays);
  };

  const renderDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const numDays = daysInMonth(year, month);
    const startDay = startDayOfMonth(year, month);
    const daysArray = [];
    
    for (let i = 0; i < startDay; i++) {
      daysArray.push(null);
    }

    for (let i = 1; i <= numDays; i++) {
      daysArray.push(i);
    }

    return daysArray.map((day, index) => {
      const dateKey = `${year}-${month}-${day}`;
      const isSelected = selectedDays[dateKey];

      return (
        <div
          key={index}
          className={`day ${isSelected ? 'selected' : ''}`}
          onClick={() => day && handleDayClick(day)}
        >
          {day || ''}
        </div>
      );
    });
  };

  const renderWeekRows = () => {
    const weeks = [];
    const days = renderDays();
    const numRows = Math.ceil(days.length / 7);

    for (let i = 0; i < numRows; i++) {
      weeks.push(
        <div className="week-row" key={i}>
          <input 
            type="checkbox" 
            onChange={() => handleWeekSelect(i)} 
          />
          {days.slice(i * 7, i * 7 + 7)}
        </div>
      );
    }

    return weeks;
  };

  return (
    <div className="datepicker">
      <div className="header">
        <button onClick={handlePrevMonth}>{'<'}</button>
        <div>{currentDate.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' })}</div>
        <button onClick={handleNextMonth}>{'>'}</button>
      </div>
      <div className="days-of-week">
        <div>Пн</div>
        <div>Вт</div>
        <div>Ср</div>
        <div>Чт</div>
        <div>Пт</div>
        <div className="weekend">Сб</div>
        <div className="weekend">Вс</div>
      </div>
      <div className="days-grid">
        {renderWeekRows()}
      </div>
      <button className="apply-button">Применить</button>
    </div>
  );
};

export default DatePicker; */