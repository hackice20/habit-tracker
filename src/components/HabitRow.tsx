import React from 'react';
import type { Habit, HabitStreak } from '../types';
import { HabitGrid } from './HabitGrid';
import { calculateStreak } from '../utils/habitUtils';
import { Flame, Trash2 } from 'lucide-react';

interface HabitRowProps {
  habit: Habit;
  onToggleDate: (habitId: string, date: string) => void;
  onDelete: (habitId: string) => void;
}

export const HabitRow: React.FC<HabitRowProps> = ({ habit, onToggleDate, onDelete }) => {
  const streak: HabitStreak = calculateStreak(habit.dates);

  return (
    <div className="flex flex-col md:flex-row md:items-start gap-4 p-4 bg-gray-800 rounded-lg">
      <div className="w-full md:w-48 flex-shrink-0">
        <h3 className="text-lg font-medium text-white">{habit.name}</h3>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Flame className="text-orange-500" size={16} />
          <span>{streak.current} day streak</span>
        </div>
        <button
          onClick={() => onDelete(habit.id)}
          className="md:hidden mt-2 flex items-center gap-2 px-3 py-1 text-sm text-red-400 hover:text-red-300 transition-colors"
        >
          <Trash2 size={16} />
          Delete
        </button>
      </div>
      
      <div className="flex-grow">
        <HabitGrid habit={habit} onToggleDate={onToggleDate} />
      </div>
      
      <button
        onClick={() => onDelete(habit.id)}
        className="hidden md:block px-3 py-1 text-sm text-red-400 hover:text-red-300 transition-colors"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
};