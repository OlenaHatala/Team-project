import { useNavigate } from "react-router-dom";

import useNewBoardContext from "../../hooks/useNewBoardContext";

import ServiceInfo from "./ServiceInfo";
import Settings from "./Settings";
import Schedule from "./Schedule";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { selectBoard } from "../board/boardSlice";
import { boardFetched, configuringEnded } from "../board/boardSlice";

const NewBoardForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();

  const {
    isConfiguring,
    boardId,
    details: currentDetails,
    settings: currentSettings,
    markup: currentMarkup,
  } = useSelector(selectBoard);

  console.log("currentMarkup");
  console.log(currentMarkup);

  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const { id } = useAuth();

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
    setMon,
    setTue,
    setWed,
    setThu,
    setFri,
    setSat,
    setSun,
    setDetails,
    setSettings,
    setDuration,
    setIsNewBoard,
  } = useNewBoardContext();

  useEffect(() => {
    if (isConfiguring) {
      console.log(1);
      setIsNewBoard(false);
      setDetails(currentDetails);
      setSettings(currentSettings);
      setDuration(currentMarkup.duration);
      setMon(currentMarkup.days.mon);
      setTue(currentMarkup.days.tue);
      setWed(currentMarkup.days.wed);
      setThu(currentMarkup.days.thu);
      setFri(currentMarkup.days.fri);
      setSat(currentMarkup.days.sat);
      setSun(currentMarkup.days.sun);
      console.log(2);
    }
  }, []);

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

    if (isConfiguring) {
      //to do: send patch request to back-end
      console.log(`boardId in if isConfiguring ${boardId}`);
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

      const board = response?.data?.board;

      console.log("board!");
      console.log(board);

      const resBoardId = board?._id;
      const resOwnerId = board?.owner_id;
      const resDetails = {
        boardname: board?.label,
        desc: board?.description || "",
        address: board?.address || "",
        servname: board?.service_name,
      };
      const resSettings = {
        reqconf: board?.req_confirm,
        booknum: board?.book_num,
        //to do: set openauto when property is added to back-end
        openauto: true,
        openday: board?.auto_open?.day,
        ahead: board?.auto_open?.ahead,
      };
      const resMarkup = board?.markup;

      const daysRedux = {
        mon: { open: resMarkup.days.monday.open, close: resMarkup.days.monday.close, disabled : false },
        tue: { open: resMarkup.days.monday.open, close: resMarkup.days.monday.close, disabled : false },
        wed: { open: resMarkup.days.monday.open, close: resMarkup.days.monday.close, disabled : false },
        thu: { open: resMarkup.days.monday.open, close: resMarkup.days.monday.close, disabled : false },
        fri: { open: resMarkup.days.monday.open, close: resMarkup.days.monday.close, disabled : false },
        sat: { open: resMarkup.days.monday.open, close: resMarkup.days.monday.close, disabled : false },
        sun: { open: resMarkup.days.monday.open, close: resMarkup.days.monday.close, disabled : false },
      };

      resMarkup.days = daysRedux;

      //todo: add resTickets to reducer
      const resTickets = board?.tickets;

      dispatch(
        boardFetched({
          boardId: resBoardId,
          ownerId: resOwnerId,
          details: resDetails,
          settings: resSettings,
          markup: resMarkup,
        })
      );

      dispatch(
        configuringEnded()
      );

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
