export const TimeToString = (time) => {
  return String(parseInt(time / 60)) + '분 ' + String(time % 60) + '초';
};
