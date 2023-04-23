import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Modal } from "../../common/components/Modal";
import { useUpdateMutation } from "../api";
import { NewBoardForm } from "../components/NewBoardForm";
import { NewBoardProvider } from "../context/NewBoardContext";
import useNewBoardContext from "../hooks/useNewBoardContext";
import classes from "./ConfigureBoardModal.module.css";
import { Loader } from "../../common/components";

const ConfigureBoard = ({ boardInfo }) => {
  const {
    setDetails,
    setSettings,
    setDuration,
    setMon,
    setTue,
    setWed,
    setThu,
    setFri,
    setSat,
    setSun,
  } = useNewBoardContext();
  const [update, { isLoading }] = useUpdateMutation();
  const [formIsReady, setFormIsReady] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setFormIsReady(true);
    }, 1);
    setDetails({
      boardname: boardInfo.label,
      desc: boardInfo.description,
      address: boardInfo.address,
      servname: boardInfo.service_name,
    });
    setSettings({
      reqconf: boardInfo.req_confirm,
      booknum: boardInfo.book_num,
      openauto: boardInfo.auto_open.ahead > 0 ? true : false,
      openday: boardInfo.auto_open.day.substring(0, 3),
      ahead: boardInfo.auto_open.ahead,
    });
    setMon({
      disabled: false,
      open: boardInfo.markup.days.monday.open,
      close: boardInfo.markup.days.monday.close,
    });
    setTue({
      disabled: false,
      open: boardInfo.markup.days.tuesday.open,
      close: boardInfo.markup.days.tuesday.close,
    });
    setWed({
      disabled: false,
      open: boardInfo.markup.days.wednesday.open,
      close: boardInfo.markup.days.wednesday.close,
    });
    setThu({
      disabled: false,
      open: boardInfo.markup.days.thursday.open,
      close: boardInfo.markup.days.thursday.close,
    });
    setFri({
      disabled: false,
      open: boardInfo.markup.days.friday.open,
      close: boardInfo.markup.days.friday.close,
    });
    setSat({
      disabled: false,
      open: boardInfo.markup.days.saturday.open,
      close: boardInfo.markup.days.saturday.close,
    });
    setSun({
      disabled: false,
      open: boardInfo.markup.days.sunday.open,
      close: boardInfo.markup.days.sunday.close,
    });
    setDuration(boardInfo.markup.duration);
  }, [boardInfo]);

  const submitHandler = async (boardData) => {
    try {
      boardData.id = boardInfo._id;
      const updatedBoardData = await update(boardData).unwrap();
      window.location.reload();
      //todo: invalidate cached board data instaad of reloading
    } catch (err) {
      //todo: implement ui feedback
      const errMessage = err?.message || "An error ocured";
      console.log(errMessage);
    }
  };

  let content = <Loader />;
  if (formIsReady) {
    content = (
      <>
        {isLoading ? (
          <p>Updating tickets... Usually it takes around 20 second.</p>
        ) : null}
        <div className={classes["super-div"]}>
          <NewBoardForm
            onSubmit={submitHandler}
            disableSubmit={isLoading}
            isUpdateForm={true}
          />
        </div>
      </>
    );
  }

  return content;
};

export default ConfigureBoard;
