const whiteList = [
  "https://www.google.com",
  "http://www.127.0.0.1:3500",
  "http://www.localhost:3000/",
];
const corsOptions = {
  origin: (orign, callback) => {
    if (whiteList.indexOf(orign) !== -1 || !orign) {
      callback(null, true);
    } else {
      callback(new Error("Site is not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};
