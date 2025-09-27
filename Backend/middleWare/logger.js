export const LoggerMiddleware = (req, _, next) => {
  console.log(
    `Received request at ${new Date().toDateString()} , Method :${
      req.method
    },url :${req.url}`
  );

  next();
};
