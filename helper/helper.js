const tryCatch = (checkError) => async (req, res, next) => {
  try {
    await checkError(req, res, next);
  } catch (error) {
    next(error);
  }
};
module.exports = tryCatch;
