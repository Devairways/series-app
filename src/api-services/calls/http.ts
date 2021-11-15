import toastr from "toastr";

interface HttpInterface {
  request: RequestInfo;
  init?: RequestInit;
  errorMessage?: string;
}

export const http = <T>({
  request,
  init,
  errorMessage,
}: HttpInterface): Promise<T> =>
  fetch(request, init)
    .then(async (response) => {
      if (!response.ok) {
        const errorStatus = response.status;

        if (errorStatus === 401) {
          throw Error("Unauthorized");
        }

        if (errorStatus === 500) {
          throw Error("Server error");
        }
      }

      try {
        return await response.json();
      } catch (error) {
        throw Error("Could not parse Json");
      }
    })
    .catch((apiError: string) => {
      toastr.warning(errorMessage || "An unexpected error has ocurred");
      throw Error(apiError);
    });
