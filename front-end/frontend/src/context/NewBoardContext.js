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

  // setMon: () => {},
  // setTue: () => {},
  // setWed: () => {},
  // setThu: () => {},
  // setFri: () => {},
  // setSat: () => {},
  // setSun: () => {},
  setDetails: (details) => {},
  setSettings: (nav, settings) => {},
  setSchedule: () => {},
});

export const NewBoardProvider = ({ children }) => {
  const [page, setPage] = useState("details");
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
  // const [schedule, setSchedule] = useState({
  //   duration: 60,
  //   mon: {
  //     disabled: false,
  //     open: "09:00",
  //     close: "18:00",
  //   },
  //   tue: {
  //     disabled: false,
  //     open: "09:00",
  //     close: "18:00",
  //   },
  //   wed: {
  //     disabled: false,
  //     open: "09:00",
  //     close: "18:00",
  //   },
  //   thu: {
  //     disabled: false,
  //     open: "09:00",
  //     close: "18:00",
  //   },
  //   fri: {
  //     disabled: false,
  //     open: "09:00",
  //     close: "18:00",
  //   },
  //   sat: {
  //     disabled: true,
  //     open: "09:00",
  //     close: "18:00",
  //   },
  //   sun: {
  //     disabled: true,
  //     open: "09:00",
  //     close: "18:00",
  //   },
  // });

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

  // const saveMon = (disabled, open, close) => {
  //   setMon({ disabled, open, close });
  // };
  // const saveTue = (disabled, open, close) => {
  //   setTue({ disabled, open, close });
  // };
  // const saveWed = (disabled, open, close) => {
  //   setWed({ disabled, open, close });
  // };
  // const saveThu = (disabled, open, close) => {
  //   setThu({ disabled, open, close });
  // };
  // const saveFri = (disabled, open, close) => {
  //   setFri({ disabled, open, close });
  // };
  // const saveSat = (disabled, open, close) => {
  //   setSat({ disabled, open, close });
  // };
  // const saveSun = (disabled, open, close) => {
  //   setSun({ disabled, open, close });
  // };

  return (
    <NewBoardContext.Provider
      value={{
        page,
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
      }}
    >
      {children}
    </NewBoardContext.Provider>
  );
};

export default NewBoardContext;
