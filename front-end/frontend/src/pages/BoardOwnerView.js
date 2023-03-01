import { useParams } from "react-router-dom";
import { useState } from "react";

import { BoardProvider } from "../context/BoardProvider";

import Week from "../components/board/Week"
import NewTicketForm from "../components/board/NewTicketForm";

const BoardOwnerView = () => {
    const params = useParams();

    const [ticketFormIsShown, setTicketFormIsShown] = useState(false);

    const showTicketForm = () => {
        setTicketFormIsShown(true);
    }
  
    const hideTicketForm = () => {
        setTicketFormIsShown(false);
    }

    const {boardId} = params;
    
  return (
    <>
        {ticketFormIsShown && <NewTicketForm onClose={hideTicketForm} />}
        <Week onShowTicketForm={showTicketForm} />
    </>
    )
}

export default BoardOwnerView