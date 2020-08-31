/* eslint-disable no-plusplus */
/* eslint-disable prefer-rest-params */
import queryString from 'query-string';

export class HelperService {
  static format(str, ...args) {
    return str.replace(/{(\d+)}/g, (match, number) => {
      return typeof args[number] !== 'undefined' ? args[number] : match;
    });
  }

  static getFromStorage(storage, key) {
    const value = storage.getItem(key);
    return typeof value === 'string' &&
      (value.startsWith('{') || value.startsWith('['))
      ? JSON.parse(value)
      : value;
  }

  static popFromStorage(storage, key) {
    const item = storage.getItem(key);
    storage.removeItem(key);
    return item;
  }

  static setInStorage(storage, key, value) {
    const valueToStore =
      typeof value === 'object' ? JSON.stringify(value) : value;
    return storage.setItem(key, valueToStore);
  }

  static debounce(func, wait, immediate) {
    let timeout;
    return function() {
      const context = this;

      const args = arguments;
      const later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  static throttle(callback, delay) {
    let isThrottled = false;

    let args;

    let context;

    function wrapper() {
      if (isThrottled) {
        args = arguments;
        context = this;
        return;
      }

      isThrottled = true;
      callback.apply(this, arguments);

      setTimeout(() => {
        isThrottled = false;
        if (args) {
          wrapper.apply(context, args);
          args = null;
          context = null;
        }
      }, delay);
    }

    return wrapper;
  }

  static deepFind(obj, path, def = '') {
    const paths = path.split('.');
    let current = obj || {};

    for (let i = 0; i < paths.length; ++i) {
      if (!current[paths[i]]) {
        return def;
      }
      current = current[paths[i]];
    }
    return current;
  }

  // Find diff of arrays of primitive values
  static arrDiff(arr1, arr2) {
    return arr1.filter(
      arr1Item => !arr2.find(arr2Item => arr2Item === arr1Item),
    );
  }

  static pick(object, props) {
    const temp = {};
    props.forEach(prop => {
      if (
        ![undefined, null].includes(object[prop]) ||
        (Array.isArray(object[prop]) && object[prop].length > 0)
      ) {
        temp[prop] = object[prop];
      }
    });
    return temp;
  }

  static nameFunction(name, body) {
    return {
      [name](...args) {
        return body(...args);
      },
    }[name];
  }

  static objectSize(obj) {
    let size = 0;
    for (const key in obj) {
      // eslint-disable-next-line no-prototype-builtins
      if (obj.hasOwnProperty(key)) size++;
    }
    return size;
  }

  static removeNull(obj) {
    const newObj = {};
    Object.keys(obj).forEach(prop => {
      if (obj[prop] !== null) {
        newObj[prop] = obj[prop];
      }
    });
    return newObj;
  }

  static removeEmptyValues(obj) {
    const newObj = {};
    Object.keys(obj).forEach(prop => {
      if (obj[prop] !== null && obj[prop] !== '') {
        newObj[prop] = obj[prop];
      }
    });
    return newObj;
  }

  static capitalize([first = '', ...rest], lowerRest = false) {
    return (
      first.toUpperCase() +
      (lowerRest ? rest.join('').toLowerCase() : rest.join(''))
    );
  }

  static constToReadableText(constantStr = '') {
    return HelperService.capitalize(constantStr, true)
      .split('_')
      .join(' ');
  }

  static parseSearch(search) {
    return queryString.parse(search);
  }

  static objToQueryString(paramsObject, options = {}) {
    return queryString.stringify(paramsObject, options);
  }

  static isObjectValue(value) {
    return value && typeof value === 'object' && value.constructor === Object;
  }

  static uniqeArray(array, key) {
    return array.reduce((acc, item) => {
      const conditionToInclude = key
        ? !acc.find(x => x[key] === item[key])
        : !acc.includes(item);

      if (conditionToInclude) {
        acc.push(item);
      }

      return acc;
    }, []);
  }

  static getFromSessionStorage(key) {
    return JSON.parse(
      HelperService.fromString(window.sessionStorage.getItem(key)),
    );
  }

  static decodeHtmlFromString(string) {
    return string.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  static flattenDeep(collection) {
    return collection.reduce(
      (acc, val) =>
        val.options && Array.isArray(val.options)
          ? acc.concat(HelperService.flattenDeep(val.options))
          : acc.concat(val),
      [],
    );
  }

  static getGroupedSelectedValue(collection, value) {
    const flattenCollection = HelperService.flattenDeep(collection);
    return flattenCollection.find(item => item.value === value);
  }

  static getCroppedImg({ file, pixelCrop }) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const name = file && file.name;
    const img = new Image();

    canvas.width = pixelCrop.width || 307; // If pixelCrop width 0, setting default crop width
    canvas.height = pixelCrop.height || 307; // If pixelCrop height 0, setting default crop height

    const promise = new Promise(resolve => {
      img.onload = function() {
        const crop = {
          x: pixelCrop.x || 0,
          y: pixelCrop.y || 0,
          width: canvas.width,
          height: canvas.height,
        };

        // window.URL.revokeObjectURL(this.src);

        ctx.drawImage(
          img,
          crop.x,
          crop.y,
          crop.width,
          crop.height,
          0,
          0,
          crop.width,
          crop.height,
        );

        canvas.toBlob(blob => {
          if (blob) {
            blob.name = name;
            return resolve(blob);
          }

          resolve({
            error: 'Blob is null!',
          });
        });
      };
    });

    img.crossOrigin = '';
    img.src = typeof file === 'string' ? file : URL.createObjectURL(file);

    return promise;
  }

  static formatCurrency(value) {
    // todo
    return Number.isNaN(Number(value)) ? value : Number(value).toFixed(2);
  }

  static identity(value) {
    return value;
  }

  static toCoins(price) {
    // floor fixes math inaccuracy after multiplication
    return Math.floor(price * 100);
  }
}
