let _uid = '';

export const getUid = () => {
  if(_uid) {
    return _uid;
  }
  const t = new Date().getUTCMilliseconds();
  _uid = '' + Math.round(2147483647 * Math.random()) * t % 1e10;
  return _uid;
};