import { onMount } from 'solid-js';

const NotFoundPage = () => {
  onMount(() => {
    document.title = "404 Not Found";
  });

  return (
    <div class='flex flex-col items-center justify-center h-screen bg-gray-900 text-white'>
      <h1 class='text-4xl font-bold mb-4'>404 Page Not Found</h1>
      <p class='text-lg'>Oops! The page you're looking for does not exist.</p>
      <img
        src='https://cdn.svgator.com/images/2022/01/404-page-example-animation.gif'
        alt='Lost Astronaut'
        class='w-96 h-96 object-contain mt-8'
      />
    </div>
  );
};

export default NotFoundPage;

