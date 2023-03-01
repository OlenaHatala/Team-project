// import { useNavigate } from "react-router-dom";
// import useBoardContext from "./useBoardContext";
// import useNewBoardContext from "./useNewBoardContext";

// import { useSelector } from "react-redux";
// import { selectBoard } from "../components/board/boardSlice"

// const useConfigureBoard = () => {
//   const navigate = useNavigate();
//   const { details, settings, markup } = useSelector(selectBoard);
//   const {
//     setIsNewBoard,
//     setDetails,
//     setSettings,
//     setDuration,
//     setMon,
//     setTue,
//     setWed,
//     setThu,
//     setFri,
//     setSat,
//     setSun,
//   } = useNewBoardContext();

//   const configureBoard = () => {
//     setIsNewBoard(false);

//     setDetails(details);
//     setSettings(settings);
//     setDuration(markup.duration);
//     setMon(markup.days.mon);
//     setTue(markup.days.tue);
//     setWed(markup.days.wed);
//     setThu(markup.days.thu);
//     setFri(markup.days.fri);
//     setSat(markup.days.sat);
//     setSun(markup.days.sun);

//     navigate("/newboard");
//   };

//   return configureBoard;
// };

// export default useConfigureBoard;
