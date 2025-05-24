class HttpError extends Error {
  constructor(statusCode, message,urlNavigation = 'movies/index',title = "Error") {
    super(message);
    this.statusCode = statusCode;
    this.title = title
    this.urlNavigation = urlNavigation
  }
}

module.exports = HttpError;