export class MockApiService {
  static createRequestProxy(mock) {
    const promise = new Promise(resolve => {
      // simulate network
      setTimeout(() => {
        resolve(mock);
      }, 1000);
    });

    return {
      promise,
      xhr: {
        abort: () => console.log('Mock API request aborted'),
      },
    };
  }

  static get(mock) {
    return MockApiService.createRequestProxy(mock);
  }

  static post(mock) {
    return MockApiService.createRequestProxy(mock);
  }

  static put(mock) {
    return MockApiService.createRequestProxy(mock);
  }

  static patch(mock) {
    return MockApiService.createRequestProxy(mock);
  }

  static delete(mock) {
    return MockApiService.createRequestProxy(mock);
  }
}
