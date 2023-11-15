export async function handleResponse(response: Response) {
  const data = await response.json();

  if (response.status !== 200) {
    let errorMessage = 'An error occurred';

    if (Array.isArray(data) && data[0]?.property) {
      errorMessage = data[0].errors[0].errorMessage;
    } else if (data.error) {
      errorMessage = data.error;
    }

    throw new Error(errorMessage);
  }

  return data;
}
