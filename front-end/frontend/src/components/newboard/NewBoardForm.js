import { useNavigate } from "react-router-dom";

import useNewBoardContext from "../../hooks/useNewBoardContext";

import ServiceInfo from "./ServiceInfo";
import Settings from "./Settings";
import Schedule from "./Schedule";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";

const NewBoardForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const { id } = useAuth();
  console.log(id);

  const {
    page,
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

  const SubmitForm = async () => {
    setIsSubmitting(true);
    const days = {
      monday: {open: mon.open, close: mon.close},
      tuesday: {open: tue.open, close: tue.close},
      wednesday: {open: wed.open, close: wed.close},
      thursday: {open: thu.open, close: thu.close},
      friday: {open: fri.open, close: fri.close},
      saturday: {open: sat.open, close: sat.close},
      sunday: {open: sun.open, close: sun.close},
    };

    days.monday.hours = [];
    days.tuesday.hours = [];
    days.wednesday.hours = [];
    days.thursday.hours = [];
    days.friday.hours = [];
    days.saturday.hours = [];
    days.sunday.hours = [];

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
          auto_open: {day: settings.openday, ahead: settings.ahead}
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log(response?.board);
      navigate("/success/?message=Board-was-created-successfuly");

    } catch (err) {
      if (!err?.response) {
        console.log('no res error');
      } else if (err.response?.status === 200) {
        console.log('200 error');
      } else if (err.response?.status === 400) {
        console.log('400 error');
      } else {
        console.log('unknown error');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const display = {
    details: <ServiceInfo />,
    settings: <Settings />,
    schedule: <Schedule onSubmit={SubmitForm} isSubmitting={isSubmitting}/>,
  };

  const content = <form>{display[page]}</form>;

  return content;
};
export default NewBoardForm;
