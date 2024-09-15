const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      <h1 className="text-9xl font-bold text-gray-700">404</h1>
      <h2 className="text-2xl font-semibold text-gray-600 mt-4">
        OOPS! PAGE NOT FOUND
      </h2>
      <p className="text-lg text-gray-500 mt-2">
        We are sorry, but the page you requested was not found.
      </p>
    </div>
  );
};

export default PageNotFound;
