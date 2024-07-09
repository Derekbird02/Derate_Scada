import React, { useState, useEffect } from 'react';

const TimeDuration = ({ inputTime }) => {
  const [duration, setDuration] = useState('');

  const calculateDuration = (inputTime) => {
    const givenTime = new Date(inputTime);
    const currentTime = new Date();
    const diffMs = currentTime - givenTime;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    let result = '';
    if (diffDays > 0) {
      result += `${diffDays} day${diffDays > 1 ? 's' : ''}, `;
    }
    result += `${diffHours} hour${diffHours > 1 ? 's' : ''}, `;
    result += `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''}`;
    
    return result;
  };

  useEffect(() => {
    setDuration(calculateDuration(inputTime));
    const interval = setInterval(() => {
      setDuration(calculateDuration(inputTime));
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [inputTime]);

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">Time Duration</h1>
      <p className="text-lg">{duration}</p>
    </div>
  );
};

export default TimeDuration;

// Usage Example
// <TimeDuration inputTime="2024-07-06 21:44:30.000 -0400" />