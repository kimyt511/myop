export const TimeToString = (time) => {
  return String(parseInt(time / 60)) + '분 ' + String(time % 60) + '초';
};

export const StartDayFromToDay = (time) => {
  const date = new Date();
  const hour = (date.getTime() - time) / (60 * 60 * 1000);
  if (hour < 1) return parseInt(hour * 60) + '분 전';
  else if (hour < 24) return parseInt(hour) + '시간 전';
  else return parseInt(hour / 24) + '일 전';
};
