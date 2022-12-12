const setTime = (dateOrder: string) => {
  const data = new Date();
  const createdAt = new Date(`${dateOrder}`);
  const dataHours = createdAt.getHours();
  const dataMinutes = String(createdAt.getMinutes()).padStart(2, '0');
  const dataTime = `${dataHours}:${dataMinutes}`;
  const dataDay = Math.floor(
    Math.abs((+data - +createdAt) / (3600 * 24 * (10 ^ -3)))
  );

  const dataDayDef =
    dataDay === 0
      ? 'Сегодня'
      : dataDay === 1
      ? 'Вчера'
      : `${dataDay} дн. назад`;
  return `${dataDayDef},${dataTime}`;
};
export default setTime;
