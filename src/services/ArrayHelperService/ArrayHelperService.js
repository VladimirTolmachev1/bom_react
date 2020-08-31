class ArrayHelperService {
  /**
   * Returns an array with arrays of the given size.
   *
   * @param arr {Array} Array to split
   * @param chunkSize {Integer} Size of every group
   */
  static chunk(arr, chunkSize) {
    const results = [];

    while (arr.length) {
      results.push(arr.splice(0, chunkSize));
    }

    console.log(results);

    return results;
  }
}

export default ArrayHelperService;
