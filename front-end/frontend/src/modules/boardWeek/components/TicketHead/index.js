import { getTimeFromString } from "../../utils/time";

export const TicketHead = ({ datetime, duration, status, actions }) => {
    const startTime = getTimeFromString(datetime);
    const endTime = getTimeFromString(datetime, duration);
  return (
    <div>
      <h3 style={{"margin": "0", "padding": "0", fontSize: '15px'}}>{`${startTime}-${endTime}`}</h3>
      <p style={{"margin": "0", "padding": "0"}}>{status}</p>
    </div>
  );
};
