const pad = (value) => {
  return String(value).padStart(2, "0");
}

const calculateTime = (time) => {

  const hours = pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
  const minutes = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
  const seconds = pad(Math.floor((time % (1000 * 60)) / 1000));

  return `${hours}:${minutes}:${seconds}`;
}

export default calculateTime;