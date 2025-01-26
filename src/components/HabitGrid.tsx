import React from 'react';
import { getMonthDates, formatDate } from '../utils/habitUtils';
import type { Habit } from '../types';
import { Check } from 'lucide-react';

interface HabitGridProps {
  habit: Habit;
  onToggleDate: (habitId: string, date: string) => void;
}

export const HabitGrid: React.FC<HabitGridProps> = ({ habit, onToggleDate }) => {
  const currentDate = new Date();
  const dates = getMonthDates(currentDate.getFullYear(), currentDate.getMonth());
  const monthName = currentDate.toLocaleString('default', { month: 'long' });
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="bg-gray-800/50 rounded-lg p-3">
      <div className="mb-2 text-sm font-medium text-gray-400">
        {monthName} {currentDate.getFullYear()}
      </div>
      <div className="grid grid-cols-7 gap-1 mb-1">
        {dayNames.map(day => (
          <div
            key={day}
            className="text-xs text-gray-500 font-medium text-center py-1"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {/* Add empty cells for days before the first of the month */}
        {[...Array(dates[0].getDay())].map((_, index) => (
          <div
            key={`empty-${index}`}
            className="aspect-square bg-gray-800/30 rounded-sm"
          />
        ))}
        
        {dates.map((date) => {
          const dateStr = formatDate(date);
          const isCompleted = habit.dates[dateStr];
          const isPast = date <= currentDate;
          const isToday = formatDate(date) === formatDate(currentDate);

          return (
            <button
              key={dateStr}
              onClick={() => isPast && onToggleDate(habit.id, dateStr)}
              disabled={!isPast}
              className={`
                aspect-square rounded-sm flex flex-col items-center justify-center
                relative transition-all duration-200
                ${isPast
                  ? isCompleted
                    ? 'bg-green-500 hover:bg-green-600'
                    : 'bg-gray-700 hover:bg-gray-600'
                  : 'bg-gray-800/30 cursor-not-allowed'
                }
                ${isToday ? 'ring-2 ring-blue-400' : ''}
              `}
            >
              <span className="text-xs font-medium mb-1">
                {date.getDate()}
              </span>
              {isCompleted && <Check size={12} className="text-white absolute bottom-1" />}
            </button>
          );
        })}
      </div>
    </div>
  );
};