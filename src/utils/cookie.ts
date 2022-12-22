export const getCookie = (name: string): string | undefined => {
  const matches = document.cookie.match(
    new RegExp(
      '(?:^|; )' +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
        '=([^;]*)'
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

type TCookieProps = {
  expires?: string | number | boolean;
  path?: '/';
} & { [propName: number]: string | number | boolean };

export const setCookie = (
  name: string,
  value: string | null,
  props: TCookieProps = {}
) => {
  let exp = props.expires;
  // для удаление cookie
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    props.expires = d.toUTCString();
  }
  // для установление cookie
  if (typeof value === 'string') {
    value = encodeURIComponent(value);
  }
  let updatedCookie = name + '=' + value;
  for (const propName in props) {
    updatedCookie += '; ' + 'path=/;' + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;
};

export const deleteCookie = (name: string) => {
  setCookie(name, null, { expires: -1 });
};
