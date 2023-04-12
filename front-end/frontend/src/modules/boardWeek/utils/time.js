export const getTimeFromString = (datetime, addMin = 0) => {
  let date = new Date(datetime);
  if (addMin !== 0) {
    const dateInMs = date.getTime() + addMin * 60 * 1000;
    date.setTime(dateInMs);
  }
  let minutes = date.getMinutes();
  let hours = date.getHours();

  let minutesStr = "";
  let hoursStr = "";

  if (minutes < 10) {
    minutesStr = "0" + minutes.toString();
  } else {
    minutesStr = minutes.toString();
  }

  if (hours < 10) {
    hoursStr = "0" + hours.toString();
  } else {
    hoursStr = hours.toString();
  }

  return `${hoursStr}:${minutesStr}`;
};

export const findTimeBorders = (week) => {
  let firstTime, lastTime, firstDate, lastDate;
  for (const day in week) {
    const dayArray = week[day];
    for (const index in dayArray) {
      const startTime = getTimeFromString(dayArray[index].datetime);
      const endTime = getTimeFromString(
        dayArray[index].datetime,
        dayArray[index].duration
      );
      if (firstTime) {
        if (startTime < firstTime) {
          firstTime = startTime;
          firstDate = new Date(dayArray[index].datetime);
        }
      } else {
        firstTime = startTime;
        firstDate = new Date(dayArray[index].datetime);
      }
      if (lastTime) {
        if (endTime > lastTime) {
          lastTime = endTime;
          lastDate = new Date(dayArray[index].datetime);
          lastDate = new Date(
            lastDate.getTime() + dayArray[index].duration * 60 * 1000
          );
        }
      } else {
        lastTime = endTime;
        lastDate = new Date(dayArray[index].datetime);
        lastDate = new Date(
          lastDate.getTime() + dayArray[index].duration * 60 * 1000
        );
      }
    }
  }
  let upper, bottom;
  if (!firstDate || !lastDate) {
    upper = "August 19, 1975 10:00:00";
    bottom = "August 19, 1975 19:00:00";
  } else {
    upper = new Date();
    bottom = new Date();
    upper.setHours(getUIStart(firstDate.getHours()));
    bottom.setHours(getUIEnd(lastDate.getHours()));
    upper.setMinutes(0);
    bottom.setMinutes(0);
    upper = upper.toISOString();
    bottom = bottom.toISOString();
  }
  return { upper, bottom };
};

const getUIStart = (startHour) => {
  return startHour;
}

const getUIEnd = (endHour) => {
  if (endHour > 17) {
    return endHour;
  } else {
    return 17;
  }
}
