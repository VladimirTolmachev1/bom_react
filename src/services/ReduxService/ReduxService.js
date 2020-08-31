export class ReduxService {
  static createActionCreator = type => payload => ({
    type,
    payload,
  });
}
