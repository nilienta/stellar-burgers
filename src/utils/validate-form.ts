export const validateForm = (type: string, value: string) => {
  let reg: RegExp = /./;
  switch (type) {
    case 'text':
      reg = /^[a-zA-Zа-яА-Я ]+$/;
      break;
    case 'email':
      reg =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      break;
    case 'password':
      reg = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Zа-яА-Я0-9!@#$%^&*]{6,16}$/;
      break;
    default:
      break;
  }
  return String(value).toLowerCase().match(reg);
};
