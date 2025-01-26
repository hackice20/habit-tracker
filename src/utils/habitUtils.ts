export const getMonthDates = (year: number, month: number) => {
  const dates: Date[] = [];
  const lastDay = new Date(year, month + 1, 0).getDate();
  
  for (let day = 1; day <= lastDay; day++) {
    dates.push(new Date(year, month, day));
  }
  
  return dates;
};

export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

export const calculateStreak = (dates: Record<string, boolean>): { current: number; longest: number } => {
  const sortedDates = Object.entries(dates)
    .filter(([, completed]) => completed)
    .map(([date]) => new Date(date))
    .sort((a, b) => b.getTime() - a.getTime());

  let currentStreak = 0;
  let longestStreak = 0;
  let currentDate = new Date();

  // Set time to midnight for accurate comparison
  currentDate.setHours(0, 0, 0, 0);

  for (const date of sortedDates) {
    date.setHours(0, 0, 0, 0);
    const diffDays = Math.floor((currentDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 0 || diffDays === currentStreak) {
      currentStreak++;
      longestStreak = Math.max(currentStreak, longestStreak);
    } else {
      currentStreak = 0;
    }

    currentDate = date;
  }

  return { current: currentStreak, longest: longestStreak };
};