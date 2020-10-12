class APIError extends Error {
  constructor({ status, message }, ...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, APIError);
    }

    this.name = 'APIError';
    this.status = status;
    this.message = message;
  }
}

const handleAPIError = (res, e) => {
  if (e.name === 'APIError') {
    return res.status(e.status).json({ message: e.message });
  }
  console.log(e);
  return res.status(422).json({ message: 'An nnknown error occured.' });
};

module.exports = {
  APIError,
  handleAPIError,
};
