const months = {
  ["0"]: "January",
  ["1"]: "February",
  ["2"]: "March",
  ["3"]: "April",
  ["4"]: "May",
  ["5"]: "June",
  ["6"]: "July",
  ["7"]: "August",
  ["8"]: "September",
  ["9"]: "October",
  ["10"]: "November",
  ["11"]: "December",
};

/**
 * Gets human readable time string
 * @param {Date} dateInput - Date you want to calculate from to now.
 * @returns String
 * @example
 * ```js
 * const string = getTimeSince("2023-10-03T12:40:04.628Z")
 * // Will return either date, days since, hours since, minutes since or just now
 * ```
 */
export const getTimeSince = (dateInput) => {
  const currentDate = new Date();
  const createdDate = new Date(dateInput);

  const differenceInSec =
    (currentDate.getTime() - createdDate.getTime()) / 1000;

  const amountOfDays = Math.floor(differenceInSec / (24 * 60 * 60));
  const amountOfHours = Math.floor(differenceInSec / (60 * 60));
  const amountOfMinutes = Math.floor(differenceInSec / 60);

  const date = {
    day: createdDate.getDate(),
    month: createdDate.getMonth(),
    year: createdDate.getFullYear(),
    hour: createdDate.getHours(),
    minute: createdDate.getMinutes(),
    second: createdDate.getSeconds(),
  };

  if (amountOfDays > 7) {
    if (date.year != currentDate.getFullYear()) {
      return `${months[date.month]} ${date.day}, ${date.year}`;
    } else {
      return `${months[date.month]} ${date.day}`;
    }
  } else if (amountOfDays >= 1) {
    return `${amountOfDays} d`;
  } else {
    if (amountOfHours >= 1) {
      return `${amountOfHours} t`;
    } else if (amountOfMinutes >= 1) {
      return `${amountOfMinutes} m`;
    } else {
      return "Just now";
    }
  }
};
