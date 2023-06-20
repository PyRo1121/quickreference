import { onMount } from 'solid-js';

const NotFoundPage = () => {
  onMount(() => {
    document.title = "404 Not Found";
  });

  return (
    <div class='flex flex-col items-center justify-center h-screen'>
      <img src='https://cdn.svgator.com/images/2022/01/404-page-example-animation.gif' 
        alt='Lost Astronaut' 
        class='w-screen h-screen object-cover' />
    </div>
  );
};

export default NotFoundPage;
