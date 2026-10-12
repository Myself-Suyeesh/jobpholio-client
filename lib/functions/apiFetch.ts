export async function apiFetch(endPoint: string, options: RequestInit = {}) {
  const apiEndPoint = `${process.env.NEXT_PUBLIC_API_URL}${endPoint}`;
  const refreshTokenUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`;

  const makeRequest = (requestOptions: RequestInit) => {
    const headers = new Headers(requestOptions.headers);

    if (requestOptions.body instanceof FormData) {
      // Let the browser set multipart/form-data and its boundary.
      headers.delete("Content-Type");
    } else if (requestOptions.body != null && !headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }

    return fetch(apiEndPoint, {
      ...requestOptions,
      headers,
      credentials: requestOptions.credentials ?? "include",
    });
  };

  try {
    let response = await makeRequest(options);

    if (response.status === 401) {
      const refreshResponse = await fetch(refreshTokenUrl, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!refreshResponse.ok) {
        return { success: false, error: "Session expired" };
      }

      response = await makeRequest(options);
    }

    const body = await response.json().catch(() => ({}));

    if (!response.ok) {
      return {
        success: false,
        error:
          body?.error?.details?.[0]?.message ??
          body?.error?.message ??
          body?.message ??
          `HTTP error! Status: ${response.status}`,
      };
    }

    return {
      success: true,
      data: body.data,
      meta: body.meta,
    };
  } catch (error) {
    console.error("Failed to fetch data:", error);

    return {
      success: false,
      error: "Something went wrong. Please try again.",
    };
  }
}
