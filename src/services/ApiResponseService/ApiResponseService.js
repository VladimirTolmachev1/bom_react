export class ApiResponseService {
  static error(error) {
    return error.response.message;
  }

  static success() {
    return null;
  }
}
