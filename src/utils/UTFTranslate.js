export const   ChangeToUTF = pValue => {
  // eslint-disable-next-line no-control-regex
  return pValue.replace(/[^\u0000-\u00FF]/g, $0 => escape($0).replace(/(%u)(\w{4})/gi, "&#x$2;"));
}

export const ReChange = pValue => {
  return decodeURIComponent(pValue);
}