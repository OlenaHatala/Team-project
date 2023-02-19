import React from 'react';
import Day from './Day.js';
import TimeColumn from './TimeColumn.js';
import classes from './WeekBody.module.css';
import useBoardContext from '../../hooks/useBoardContext';

const WeekBody = () => {
  const { minutePercentage, timeBorders } = useBoardContext();

  return (
  <div className={classes.scroll}>
    <TimeColumn timeBorders={timeBorders} minutePercentage={minutePercentage}/>
    <Day day="monday"  />
    <Day day="tuesday" />
    <Day day="wednesday" />
    <Day day="thursday" />
    <Day day="friday" />
    <Day day="saturday" />
    <Day day="sunday" />
  </div>
  );
};

export default WeekBody;
