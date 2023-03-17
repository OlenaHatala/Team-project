import { useNavigate } from "react-router-dom";

import ServiceInfo from "./ServiceInfo";
import useNewBoardContext from "../hooks/useNewBoardContext";
import Settings from "./Settings";
import Schedule from "./Schedule";

export const NewBoardForm = () => {
  const navigate = useNavigate();
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

  const SubmitForm = () => {
    console.log(details);
    console.log("settings:");
    console.log(settings);
    console.log(`duration: ${duration}`);
    console.log("mon:");
    console.log(mon);
    console.log("tue:");
    console.log(tue);
    console.log("wed:");
    console.log(wed);
    console.log("thu:");
    console.log(thu);
    console.log("fri:");
    console.log(fri);
    console.log("sat:");
    console.log(sat);
    console.log("sun:");
    console.log(sun);

    navigate("/success/?message=Board-was-created-successfuly");
  };

  const display = {
    details: <ServiceInfo />,
    settings: <Settings />,
    schedule: <Schedule onSubmit={SubmitForm} />,
  };

  const content = <form>{display[page]}</form>;

  return content;
};
