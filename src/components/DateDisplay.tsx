
import React, { useState, useEffect } from 'react';
import '../index.css';
import moment from 'moment-hijri';
import 'moment/locale/ar';

moment.locale('en'); // set locale to English
const DateDisplay = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  // Convert the current date to Hijri and format it
  // This is a placeholder and needs a real conversion function
  const hijriDate = moment(currentTime).format('iYYYY/iM/iD');

  const timeString = currentTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  const dateString = currentTime.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Display the date and time along with the location and AM/PM indication
  return (
<div className="clockcss">
  <div className="text8xl">{timeString}</div>
  <div className="text4xl">{dateString}</div>
      {/* <div className="text-center text-4xl p-2 bg-green-800">{hijriDate}</div> */}
      
    </div>
  );
};

export default DateDisplay;
