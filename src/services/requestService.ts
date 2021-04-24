const requestService = async <T>(
  url: string,
  options?: RequestInit,
): Promise<T> => {
  const response = await fetch(url, options);
  if (response.ok) {
    return response.json();
  }
  throw new Error('Something went wrong');
};

export default requestService;
