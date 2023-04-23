import ServiceInfo from "./ServiceInfo";
import useNewBoardContext from "../hooks/useNewBoardContext";
import Settings from "./Settings";
import Schedule from "./Schedule";

export const NewBoardForm = ({
  onSubmit,
  disableSubmit,
  isUpdateForm,
}) => {
  const {
    page,
    details,
    settings,
    duration,
    apply_new_markup,
    mon,
    tue,
    wed,
    thu,
    fri,
    sat,
    sun,
  } = useNewBoardContext();

  const SubmitForm = () => {
    let days = {
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

    const boardData = {
      label: details.boardname,
      description: details.desc,
      service_name: details.servname,
      req_confirm: settings.reqconf,
      book_num: settings.booknum,
      markup: { duration, days },
      address: details.address,
      apply_new_markup: apply_new_markup,
      auto_open: { day: settings.openauto ? settings.openday : 'none', ahead: settings.ahead },
    };
    onSubmit(boardData);
  };

  const display = {
    details: <ServiceInfo />,
    settings: <Settings />,
    schedule: (
      <Schedule
        onSubmit={SubmitForm}
        disableSubmit={disableSubmit}
        isUpdateForm={isUpdateForm}
      />
    ),
  };

  const content = <form>{display[page]}</form>;

  return content;
};
