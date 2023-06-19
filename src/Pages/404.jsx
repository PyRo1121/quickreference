const NotFoundPage = () => {
  return (
    <html>
      <head>
        <title>404 Not Found</title>
      </head>
      <body class='flex flex-col items-center justify-center h-screen'>
        <h1 class='text-4xl font-bold'>404</h1>
        <p class='text-lg text-gray-500 mt-4'>Oops! The page you're looking for is missing.</p>
        <img src='https://i.imgur.com/LqKjvQG.gif' alt='Lost Astronaut' class='w-96 mt-8' />
      </body>
    </html>
  );
};

export default NotFoundPage;
