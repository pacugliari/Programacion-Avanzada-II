class HttpError extends Error {
  constructor(statusCode, message,title = "Error" ) {
    super(message);
    this.statusCode = statusCode;
    this.title = title
  }
}

module.exports = HttpError;