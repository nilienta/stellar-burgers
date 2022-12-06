const setTime = (dateOrder: string) => {
  const data = new Date();
  const createdAt = new Date(`${dateOrder}`);
  const dataHours = createdAt.getHours();
  const dataMinutes = String(createdAt.getMinutes()).padStart(2, '0');
  const dataTime = `${dataHours}:${dataMinutes}`;
  const dataDay = Math.floor(
    Math.abs((+data - +createdAt) / (3600 * 24 * (10 ^ -3)))
  );
  let dataDayDef: string;
  if (dataDay === 0) {
    dataDayDef = 'Сегодня';
  } else if (dataDay === 1) {
    dataDayDef = 'Вчера';
  } else {
    dataDayDef = `${dataDay} дн. назад`;
  }
  return `${dataDayDef},${dataTime}`;
};
export default setTime;
