import { useState } from 'react';

import BoardContext from "./BoardContext";
import {
  defaultOwnerId,
  defaultDetails,
  defaulSettings,
  defaultMarkup,
  defaultTickets,
  defaultBordId
} from "./BoardContext";

export const BoardProvider = ({ children }) => {
  const [boardId, setBoardId] = useState(defaultBordId);
  const [ownerId, setOwnerId] = useState(defaultOwnerId);
  const [details, setDetails] = useState(defaultDetails);
  const [settings, setSettings] = useState(defaulSettings);
  const [markup, setMarkup] = useState(defaultMarkup);
  const [tickets, setTickets] = useState(defaultTickets);
  
  let ticketsStartHours = [];
  
  for (const day in tickets[0]) {
      for (let i = 0; i < tickets[0][day].length; i++) {
      ticketsStartHours.push(tickets[0][day][i].date.getHours());
    }
  }

  let ticketsEndHours = [];

  for (const day in tickets[0]) {
    for (let i = 0; i < tickets[0][day].length; i++) {
        ticketsEndHours.push(tickets[0][day][i].date.getHours() + 
        tickets[0][day][i].duration / 60);
    }
}

const minHour = Math.min(...ticketsStartHours);
const maxHour = Math.ceil(Math.max(...ticketsEndHours));

  const minutePercentage = 100 / ((maxHour-minHour) * 60);
  let timeBorders = {
    upper:  new Date(`August 19, 1975 ${minHour}:00:00`),
    bottom: new Date(`August 19, 1975 ${maxHour}:00:00`),
  };
  

  return (
    <BoardContext.Provider
      value={{
        boardId,
        ownerId,
        details,
        settings,
        markup,
        tickets,
        minutePercentage,
        timeBorders,
        setTickets,
        setOwnerId,
        setDetails,
        setSettings,
        setMarkup,
        setBoardId,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};
