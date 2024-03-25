const config = {
  channelAccessToken: process.env.LINE_MESSAGING_API_CHANNEL_ACCESS_TOKEN,
  baseUrl: process.env.BASE_URL,
  liffUrl: {
    home: process.env.LIFF_URL_HOME,
    me: process.env.LIFF_URL_ME,
    signIn: process.env.LIFF_URL_SIGNIN,
    newCarer: process.env.LIFF_URL_NEW_CARER,
    newFeeder: process.env.LIFF_URL_NEW_FEEDER,
    eventBoard: process.env.LIFF_URL_EVENT_BOARD,
    newEvent: process.env.LIFF_URL_NEW_EVENT,
  },
};
export default config;
