import { createContext, useState } from "react";

const NewBoardContext = createContext({
  canSubmit: false,
  step: "details",
  duration: 60,
  details: {
    boardname: "",
    desc: "",
    address: "",
    servname: "",
  },
  settings: {
    reqconf: false,
    booknum: 1,
    openauto: false,
    openday: "mon",
    ahead: 1,
  },
  mon: {
    disabled: false,
    open: "09:00",
    close: "18:00",
  },
  tue: {
    disabled: false,
    open: "09:00",
    close: "18:00",
  },
  wed: {
    disabled: false,
    open: "09:00",
    close: "18:00",
  },
  thu: {
    disabled: false,
    open: "09:00",
    close: "18:00",
  },
  fri: {
    disabled: false,
    open: "09:00",
    close: "18:00",
  },
  sat: {
    disabled: true,
    open: "09:00",
    close: "18:00",
  },
  sun: {
    disabled: true,
    open: "09:00",
    close: "18:00",
  },
  saveDetails: (details) => {},
  saveSettings: (nav, settings) => {},
  saveSchedule: () => {},
  setMon: () => {},
  setTue: () => {},
  setWed: () => {},
  setThu: () => {},
  setFri: () => {},
  setSat: () => {},
  setSun: () => {},
  setDetails: () => {},
  setSettings: () => {},
  setDuration: () => {},
  setIsNewBoard: () => {},
});

export const NewBoardProvider = ({ children }) => {
  const [page, setPage] = useState("details");
  const [isNewBoard, setIsNewBoard] = useState(true);
  const [details, setDetails] = useState({
    boardname: "",
    desc: "",
    address: "",
    servname: "",
  });

  const [settings, setSettings] = useState({
    reqconf: false,
    booknum: 1,
    openauto: false,
    openday: "mon",
    ahead: 7,
  });
  const [mon, setMon] = useState({
    disabled: false,
    open: "09:00",
    close: "18:00",
  });
  const [tue, setTue] = useState({
    disabled: false,
    open: "09:00",
    close: "18:00",
  });
  const [wed, setWed] = useState({
    disabled: false,
    open: "09:00",
    close: "18:00",
  });
  const [thu, setThu] = useState({
    disabled: false,
    open: "09:00",
    close: "18:00",
  });
  const [fri, setFri] = useState({
    disabled: false,
    open: "09:00",
    close: "18:00",
  });
  const [sat, setSat] = useState({
    disabled: false,
    open: "09:00",
    close: "18:00",
  });
  const [sun, setSun] = useState({
    disabled: false,
    open: "09:00",
    close: "18:00",
  });

  const [duration, setDuration] = useState(60);

  const canSubmit = details.boardname && details.servname;

  const saveDetails = (details) => {
    setDetails(details);
    setPage("settings");
  };
  const saveSettings = (nav, settings) => {
    setSettings(settings);
    let newPage = "details";
    if (nav === "next") {
      newPage = "schedule";
    }
    setPage(newPage);
  };
  const saveSchedule = () => {
    setPage("settings");
  };

  return (
    <NewBoardContext.Provider
      value={{
        page,
        isNewBoard,
        details,
        settings,
        canSubmit,
        duration,
        mon,
        tue,
        wed,
        thu,
        fri,
        sat,
        sun,
        saveDetails,
        saveSettings,
        saveSchedule,
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
        setIsNewBoard
      }}
    >
      {children}
    </NewBoardContext.Provider>
  );
};

export default NewBoardContext;
