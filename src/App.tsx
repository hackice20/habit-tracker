import React, { useState, useEffect } from 'react';
import { PlusCircle, Calendar } from 'lucide-react';
import type { Habit } from './types';
import { HabitRow } from './components/HabitRow';

function App() {
  const [habits, setHabits] = useState<Habit[]>(() => {
    const saved = localStorage.getItem('habits');
    return saved ? JSON.parse(saved) : [];
  });

  const [newHabitName, setNewHabitName] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits));
  }, [habits]);

  const addHabit = (name: string) => {
    if (!name.trim()) return;
    
    const newHabit: Habit = {
      id: crypto.randomUUID(),
      name: name.trim(),
      createdAt: new Date().toISOString(),
      dates: {},
    };

    setHabits((prev) => [...prev, newHabit]);
    setNewHabitName('');
    setIsAdding(false);
  };

  const toggleDate = (habitId: string, date: string) => {
    setHabits((prev) =>
      prev.map((habit) =>
        habit.id === habitId
          ? {
              ...habit,
              dates: {
                ...habit.dates,
                [date]: !habit.dates[date],
              },
            }
          : habit
      )
    );
  };

  const deleteHabit = (habitId: string) => {
    setHabits((prev) => prev.filter((habit) => habit.id !== habitId));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Calendar size={32} className="text-blue-400" />
            <h1 className="text-3xl font-bold">Habit Tracker</h1>
          </div>
          
          {!isAdding && (
            <button
              onClick={() => setIsAdding(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <PlusCircle size={20} />
              Add Habit
            </button>
          )}
        </div>

        {isAdding && (
          <div className="mb-6 p-4 bg-gray-800 rounded-lg">
            <input
              type="text"
              value={newHabitName}
              onChange={(e) => setNewHabitName(e.target.value)}
              placeholder="Enter habit name..."
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  addHabit(newHabitName);
                } else if (e.key === 'Escape') {
                  setIsAdding(false);
                  setNewHabitName('');
                }
              }}
              autoFocus
            />
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => addHabit(newHabitName)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Add
              </button>
              <button
                onClick={() => {
                  setIsAdding(false);
                  setNewHabitName('');
                }}
                className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {habits.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg">No habits yet. Click "Add Habit" to get started!</p>
            </div>
          ) : (
            habits.map((habit) => (
              <HabitRow
                key={habit.id}
                habit={habit}
                onToggleDate={toggleDate}
                onDelete={deleteHabit}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;