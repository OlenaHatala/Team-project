import { createContext } from "react";

export const defaultTickets = [
  {
    monday: [{ id: "id1_1", type: 'ticket', date: new Date("July 4 1776 11:00"), duration: 90 }, { id: "id1_2" , type: 'ticket', date: new Date("July 4 1776 13:30"), duration: 90  }, { id: "id1_2" , type: 'ticket', date: new Date("July 4 1776 18:00"), duration: 20  }],
    tuesday: [{ id: "id1_3" , type: 'ticket', date: new Date("July 4 1776 12:30"), duration: 90  }, { id: "id1_4" , type: 'ticket', date: new Date("July 4 1776 15:30"), duration: 90  }],
    wednesday: [{ id: "id1_5" , type: 'ticket', date: new Date("July 4 1776 13:00"), duration: 90  }, { id: "id1_6" , type: 'ticket', date: new Date("July 4 1776 18:30"), duration: 90  }],
    thursday: [{ id: "id1_7" , type: 'ticket', date: new Date("July 4 1776 15:00"), duration: 90  }, { id: "id1_8" , type: 'ticket', date: new Date("July 4 1776 18:00"), duration: 90  }],
    friday: [{ id: "id1_9" , type: 'ticket', date: new Date("July 4 1776 12:30"), duration: 90  }, { id: "id1_10" , type: 'ticket', date: new Date("July 4 1776 16:30"), duration: 90  }],
    saturday: [{ id: "id1_11" , type: 'ticket', date: new Date("July 4 1776 19:30"), duration: 30  }, { id: "id1_12" , type: 'ticket', date: new Date("July 4 1776 21:00"), duration: 60  }],
    sunday: [{ id: "id1_13" , type: 'ticket', date: new Date("July 4 1776 10:30"), duration: 90  }, { id: "id1_14" , type: 'ticket', date: new Date("July 4 1776 15:30"), duration: 180  }],
  },

  {
    monday: [{ id: "id2_1" , type: 'ticket', date: new Date("July 4 1776 10:30"), duration: 90  }, { id: "id2_2" , type: 'ticket', date: new Date("July 4 1776 10:30"), duration: 90  }],
    tuesday: [{ id: "id2_3" , type: 'ticket', date: new Date("July 4 1776 10:30"), duration: 90  }, { id: "id2_4" , type: 'ticket', date: new Date("July 4 1776 10:30"), duration: 90  }],
    wednesday: [{ id: "id2_5" , type: 'ticket', date: new Date("July 4 1776 10:30"), duration: 90  }, { id: "id2_6" , type: 'ticket', date: new Date("July 4 1776 10:30"), duration: 90  }],
    thursday: [{ id: "id2_7" , type: 'ticket', date: new Date("July 4 1776 10:30"), duration: 90  }, { id: "id2_8" , type: 'ticket', date: new Date("July 4 1776 10:30"), duration: 90  }],
    friday: [{ id: "id2_9" , type: 'ticket', date: new Date("July 4 1776 10:30"), duration: 90  }, { id: "id2_10" , type: 'ticket', date: new Date("July 4 1776 10:30"), duration: 90  }],
    saturday: [{ id: "id2_11" , type: 'ticket', date: new Date("July 4 1776 10:30"), duration: 90  }, { id: "id2_12" , type: 'ticket', date: new Date("July 4 1776 10:30"), duration: 90  }],
    sunday: [{ id: "id2_13" , type: 'ticket', date: new Date("July 4 1776 10:30"), duration: 90  }, { id: "id2_14" , type: 'ticket', date: new Date("July 4 1776 10:30"), duration: 90  }],
  },

  {
    monday: [{ id: "id3_1" , type: 'ticket', date: new Date("July 4 1776 10:30"), duration: 90  }, { id: "id3_2" , type: 'ticket', date: new Date("July 4 1776 10:30"), duration: 90  }],
    tuesday: [{ id: "id3_3" , type: 'ticket', date: new Date("July 4 1776 10:30"), duration: 90  }, { id: "id3_4" , type: 'ticket', date: new Date("July 4 1776 10:30"), duration: 90  }],
    wednesday: [{ id: "id3_5" , type: 'ticket', date: new Date("July 4 1776 10:30"), duration: 90  }, { id: "id3_6" , type: 'ticket', date: new Date("July 4 1776 10:30"), duration: 90  }],
    thursday: [{ id: "id3_7" , type: 'ticket', date: new Date("July 4 1776 10:30"), duration: 90  }, { id: "id3_8" , type: 'ticket', date: new Date("July 4 1776 10:30"), duration: 90  }],
    friday: [{ id: "id3_9" , type: 'ticket', date: new Date("July 4 1776 10:30"), duration: 90  }, { id: "id3_10" , type: 'ticket', date: new Date("July 4 1776 10:30"), duration: 90  }],
    saturday: [{ id: "id3_11" , type: 'ticket', date: new Date("July 4 1776 10:30"), duration: 90  }, { id: "id3_12" , type: 'ticket', date: new Date("July 4 1776 10:30"), duration: 90  }],
    sunday: [{ id: "id3_13" , type: 'ticket', date: new Date("July 4 1776 10:30"), duration: 90  }, { id: "id3_14" , type: 'ticket', date: new Date("July 4 1776 10:30"), duration: 90  }],
  },

  {
    monday: [{ id: "id4_1" , type: 'ticket', date: new Date("July 4 1776 10:30"), duration: 90  }, { id: "id4_2" , type: 'ticket', date: new Date("July 4 1776 10:30"), duration: 90  }],
    tuesday: [{ id: "id4_3" , type: 'ticket', date: new Date("July 4 1776 10:30"), duration: 90  }, { id: "id4_4" , type: 'ticket', date: new Date("July 4 1776 10:30"), duration: 90  }],
    wednesday: [{ id: "id4_5" , type: 'ticket', date: new Date("July 4 1776 10:30"), duration: 90  }, { id: "id4_6" , type: 'ticket', date: new Date("July 4 1776 10:30"), duration: 90  }],
    thursday: [{ id: "id4_7" , type: 'ticket', date: new Date("July 4 1776 10:30"), duration: 90  }, { id: "id4_8" , type: 'ticket', date: new Date("July 4 1776 10:30"), duration: 90  }],
    friday: [{ id: "id4_9" , type: 'ticket', date: new Date("July 4 1776 10:30"), duration: 90  }, { id: "id4_10" , type: 'ticket', date: new Date("July 4 1776 10:30"), duration: 90  }],
    saturday: [{ id: "id4_11" , type: 'ticket', date: new Date("July 4 1776 10:30"), duration: 90  }, { id: "id4_12" , type: 'ticket', date: new Date("July 4 1776 10:30"), duration: 90  }],
    sunday: [{ id: "id4_13" , type: 'ticket', date: new Date("July 4 1776 10:30"), duration: 90  }, { id: "id4_14" , type: 'ticket', date: new Date("July 4 1776 10:30"), duration: 90  }],
  },

  {
    monday: [{ id: "id5_1" , type: 'ticket', date: new Date("July 4 1776 10:30"), duration: 90  }, { id: "id5_2" , type: 'ticket', date: new Date("July 4 1776 10:30"), duration: 90  }],
    tuesday: [{ id: "id5_3" , type: 'ticket', date: new Date("July 4 1776 10:30"), duration: 90  }, { id: "id5_4" , type: 'ticket', date: new Date("July 4 1776 10:30"), duration: 90  }],
    wednesday: [{ id: "id5_5" , type: 'ticket', date: new Date("July 4 1776 10:30"), duration: 90  }, { id: "id5_6" , type: 'ticket', date: new Date("July 4 1776 10:30"), duration: 90  }],
    thursday: [{ id: "id5_7" , type: 'ticket', date: new Date("July 4 1776 10:30"), duration: 90  }, { id: "id5_8" , type: 'ticket', date: new Date("July 4 1776 10:30"), duration: 90  }],
    friday: [{ id: "id5_9" , type: 'ticket', date: new Date("July 4 1776 10:30"), duration: 90  }, { id: "id5_10" , type: 'ticket', date: new Date("July 4 1776 10:30"), duration: 90  }],
    saturday: [{ id: "id5_11" , type: 'ticket', date: new Date("July 4 1776 10:30"), duration: 90  }, { id: "id5_12" , type: 'ticket', date: new Date("July 4 1776 10:30"), duration: 90  }],
    sunday: [{ id: "id5_13" , type: 'ticket', date: new Date("July 4 1776 10:30"), duration: 90  }, { id: "id5_14" , type: 'ticket', date: new Date("July 4 1776 10:30"), duration: 90  }],
  },

  {
    monday: [{ id: "id6_1" , type: 'ticket', date: new Date("July 4 1776 10:30"), duration: 90  }, { id: "id6_2" , type: 'ticket', date: new Date("July 4 1776 10:30"), duration: 90  }],
    tuesday: [{ id: "id6_3" , type: 'ticket', date: new Date("July 4 1776 10:30"), duration: 90  }, { id: "id6_4" , type: 'ticket', date: new Date("July 4 1776 10:30"), duration: 90  }],
    wednesday: [{ id: "id6_5" , type: 'ticket', date: new Date("July 4 1776 10:30"), duration: 90  }, { id: "id6_6" , type: 'ticket', date: new Date("July 4 1776 10:30"), duration: 90  }],
    thursday: [{ id: "id6_7" , type: 'ticket', date: new Date("July 4 1776 10:30"), duration: 90  }, { id: "id6_8" , type: 'ticket', date: new Date("July 4 1776 10:30"), duration: 90  }],
    friday: [{ id: "id6_9" , type: 'ticket', date: new Date("July 4 1776 10:30"), duration: 90  }, { id: "id6_10" , type: 'ticket', date: new Date("July 4 1776 10:30"), duration: 90  }],
    saturday: [{ id: "id6_11" , type: 'ticket', date: new Date("July 4 1776 10:30"), duration: 90  }, { id: "id6_12" , type: 'ticket', date: new Date("July 4 1776 10:30"), duration: 90  }],
    sunday: [{ id: "id6_13" , type: 'ticket', date: new Date("July 4 1776 10:30"), duration: 90  }, { id: "id6_14" , type: 'ticket', date: new Date("July 4 1776 10:30"), duration: 90  }],
  },
];

export const defaultOwnerId = "OWNER_ID";
export const defaultBordId = "BOARD_ID";

export const defaultDetails = {
  boardname: "",
  desc: "",
  address: "",
  servname: "",
};

export const defaulSettings = {
  reqconf: false,
  booknum: 1,
  openauto: false,
  openday: "mon",
  ahead: 1,
};

export const defaultMarkup = {
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
};

export const defaultTimeBorders = {
    upper: Date.parse('2000-02-19T06:00:00'),
    bottom: Date.parse('2000-02-19T06:00:00'),
  } 

const BoardContext = createContext({

  boardId: defaultBordId,

  ownerId: defaultOwnerId,

  details: defaultDetails,

  settings: defaulSettings,

  markup: defaultMarkup,

  tickets: defaultTickets,

  timeBorders: defaultTimeBorders,

  minutePercentage: 0.138,

    setTickets: () => {},
    setOwnerId: () => {},
    setDetails: () => {},
    setSettings: () => {},
    setMarkup: () => {},
});

export default BoardContext;
