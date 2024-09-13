const config = {
  channelAccessToken: process.env.LINE_MESSAGING_API_CHANNEL_ACCESS_TOKEN,
  baseUrl: process.env.BASE_URL,
  liffUrl: {
    home: `https://liff.line.me/${process.env.LIFF_URL_HOME}`,
    authSignup: `https://liff.line.me/${process.env.LIFF_ID_AUTH_SIGNUP}`,
    appEvent: `https://liff.line.me/${process.env.LIFF_ID_APP_EVENT}`,
    appEventNew: `https://liff.line.me/${process.env.LIFF_ID_APP_EVENT_NEW}`,
    //old,
    me: process.env.LIFF_URL_ME,
    signIn: process.env.LIFF_URL_SIGNIN,
    newCarer: process.env.LIFF_URL_NEW_CARER,
    newFeeder: process.env.LIFF_URL_NEW_FEEDER,
    eventBoard: process.env.LIFF_URL_EVENT_BOARD,
    //CARER
    carerMyEvents: process.env.LIFF_URL_CARER_MY_EVENTS,
    carerMyBookedEvents: process.env.LIFF_URL_CARER_MY_BOOKED_EVENTS,
    // FEEDER
    newEvent: process.env.LIFF_URL_NEW_EVENT,
    feederMyEvents: process.env.LIFF_URL_FEEDER_MY_CREATED_EVENTS,
  },
};
export default config;
