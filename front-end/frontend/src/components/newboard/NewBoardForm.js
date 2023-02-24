import { useNavigate } from "react-router-dom";

import useNewBoardContext from "../../hooks/useNewBoardContext";

import ServiceInfo from "./ServiceInfo";
import Settings from "./Settings";
import Schedule from "./Schedule";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import useBoardContext from "../../hooks/useBoardContext";

const NewBoardForm = () => {
  const boardCtx = useBoardContext();
  const {
    setTickets,
    setOwnerId,
    setDetails,
    setSettings,
    setMarkup,
    boardId,
  } = boardCtx;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const { id } = useAuth();
  console.log(id);

  const {
    page,
    isNewBoard,
    details,
    settings,
    duration,
    mon,
    tue,
    wed,
    thu,
    fri,
    sat,
    sun,
  } = useNewBoardContext();

  const SubmitForm = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const days = {
      monday: { open: mon.open, close: mon.close },
      tuesday: { open: tue.open, close: tue.close },
      wednesday: { open: wed.open, close: wed.close },
      thursday: { open: thu.open, close: thu.close },
      friday: { open: fri.open, close: fri.close },
      saturday: { open: sat.open, close: sat.close },
      sunday: { open: sun.open, close: sun.close },
    };

    days.monday.hours = [];
    days.tuesday.hours = [];
    days.wednesday.hours = [];
    days.thursday.hours = [];
    days.friday.hours = [];
    days.saturday.hours = [];
    days.sunday.hours = [];

    if (!isNewBoard && boardId) {
      //to do: send patch request to back-end
      console.log("boardId in if");
      console.log(boardId);
      navigate(`/board/dash/${boardId}`);
    }

    try {
      const response = await axiosPrivate.post(
        "/board/create",
        JSON.stringify({
          owner_id: "63dbd71a5134ae08fcc45e44",
          label: details.boardname,
          description: details.desc,
          service_name: details.servname,
          req_confirm: settings.reqconf,
          book_num: settings.booknum,
          markup: { duration, days },
          address: details.address,
          auto_open: { day: settings.openday, ahead: settings.ahead },
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("!!!!!!!!!435345345!!!!!!!!");
      const board = response?.data?.board;
      console.log(board);

      setOwnerId(board?.owner_id);
      setDetails((prevDetails)=>{
        console.log(prevDetails)
        console.log({
          boardname: board?.label,
          desc: board?.description || "",
          address: board?.address || "",
          servname: board?.service_name,
        });
        return{
        boardname: board?.label,
        desc: board?.description || "",
        address: board?.address || "",
        servname: board?.service_name,
      }});
      setSettings({
        reqconf: board?.req_confirm,
        booknum: board?.book_num,
        //to do: set openauto when property is added to back-end
        openauto: true,
        openday: board?.auto_open?.day,
        ahead: board?.auto_open?.ahead,
      });
      setMarkup(board?.markup);
      navigate(`/board/dash/${board?._id}`);
    } catch (err) {
      if (!err?.response) {
        console.log("no res error");
      } else if (err.response?.status === 200) {
        console.log("200 error");
      } else if (err.response?.status === 400) {
        console.log("400 error");
      } else {
        console.log("unknown error");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const display = {
    details: <ServiceInfo />,
    settings: <Settings />,
    schedule: <Schedule isSubmitting={isSubmitting} />,
  };

  const content = <form onSubmit={SubmitForm}>{display[page]}</form>;

  return content;
};
export default NewBoardForm;
