export function isEmpty(e) {
  switch (e) {
    case '':
    case null:
    case undefined:
    case typeof e === 'undefined':
      return true;
    default:
      return false;
  }
}

export function isNull(e) {
  return e === null || e === undefined || typeof e === 'undefined';
}

export function isNullString(e) {
  return e === null || e === undefined || typeof e === 'undefined' || e === '';
}

export function isNullArray(e) {
  return (
    e === null || e === undefined || typeof e === 'undefined' || e.length === 0
  );
}

export function isEmptyDisplay(e) {
  switch (e) {
    case '':
    case null:
    case undefined:
    case typeof e === 'undefined':
      return '';
    default:
      return e;
  }
}

export function isJson(e) {
  try {
    return JSON.parse(e) && !!e;
  } catch (error) {
    return false;
  }
}

export function isValidURL(e) {
  var pattern = new RegExp('^https?://');
  var filePattern = new RegExp('^file?://');
  return !!pattern.test(e) || !!filePattern.test(e);
}

export function isIncludesChinese(text) {
  return /[\u4e00-\u9fd5]/.test(text);
}

export default {
  isEmpty,
  isNull,
  isNullArray,
  isEmptyDisplay,
  isJson,
  isValidURL,
  isIncludesChinese,
};
