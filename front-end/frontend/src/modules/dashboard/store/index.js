import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  boardId: "",
  ownerId: "",
  details: { boardname: "", desc: "", address: "", servname: "" },
  settings: {
    reqconf: false,
    booknum: 1,
    openauto: false,
    openday: "mon",
    ahead: 1,
  },
  markup: {
    duration: 60,
    days: {
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
    },
  },
  showConfigureBoard: false,
  members: [],
  requests: [],
};

export const DashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    boardFetched(state, action) {
      const {
        _id,
        owner_id,
        label,
        service_name,
        address,
        description,
        book_num,
        auto_open,
        req_confirm,
        markup,
        members,
        requests,
      } = action.payload;
      state.boardId = _id;
      state.ownerId = owner_id;
      state.details.boardname = label;
      state.details.desc = description;
      state.details.servname = service_name;
      state.details.address = address;
      state.settings.reqconf = req_confirm;
      state.settings.booknum = book_num;
      state.settings.openauto = auto_open?.ahead !== 0;
      state.settings.openday = auto_open?.day || "";
      state.settings.ahead = auto_open?.ahead || 0;
      state.markup = markup;
      state.members = members;
      state.requests = requests;
    },

    toggleShowConfigureBoardAction(state, action) {
      state.showConfigureBoard = action.payload;
    },
  },
});

export const selectMembers = (state) => state.dashboard.members;
export const selectRequests = (state) => state.dashboard.requests;
export const selectDashboardAll = (state) => state.dashboard;

export const { boardFetched, toggleShowConfigureBoardAction } =
  DashboardSlice.actions;

export default DashboardSlice.reducer;
