const Moment = require('moment-timezone');
const clientTimeZone = Moment.tz.guess();

export function getFormatedDate(date, timeZone) {
  if (date === null || date === undefined) {
    return '-';
  }
  if (timeZone !== null && timeZone !== undefined) {
    return Moment(date).tz(timeZone).format('Do MMM[,] YYYY');
  }
  return Moment(date).tz(clientTimeZone).format('Do MMM[,] YYYY');
}

export function getRelativeDate(date, timeZone) {
  if (timeZone !== null && timeZone !== undefined) {
    const minus2Days = Moment().tz(timeZone).add(-3, 'days');
    if (Moment(date).tz(timeZone).diff(minus2Days, 'days') > 0) {
      return Moment(date).tz(timeZone).fromNow();
    } else {
      return getFormatedDate(date);
    }
  }
  const minus2Days = Moment().tz(clientTimeZone).add(-3, 'days');
  if (Moment(date).tz(clientTimeZone).diff(minus2Days, 'days') > 0) {
    return Moment(date).tz(clientTimeZone).fromNow();
  } else {
    return getFormatedDate(date);
  }
}