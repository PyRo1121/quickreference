import { createSignal, createEffect, onCleanup } from 'solid-js';

const formatDateTime = (dateTime) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const dateFormatter = new Intl.DateTimeFormat(undefined, options);
  const date = dateFormatter.format(dateTime);

  const timeOptions = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };
  const timeFormatter = new Intl.DateTimeFormat(undefined, timeOptions);
  const time = timeFormatter.format(dateTime);

  return `${date} | ${time}`;
};

const Time = () => {
  const [currentTime, setCurrentTime] = createSignal(new Date());

  createEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    onCleanup(() => {
      clearInterval(intervalId);
    });
  });

  return (
    <div class="text-center mt-2">
      <h2>{formatDateTime(currentTime())}</h2>
    </div>
  );
};

export default Time;
