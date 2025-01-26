export interface Habit {
  id: string;
  name: string;
  createdAt: string;
  dates: Record<string, boolean>;
}

export interface HabitStreak {
  current: number;
  longest: number;
}