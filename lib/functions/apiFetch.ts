export async function apiFetch(endPoint: string, options: RequestInit) {
  const refreshTokenUrl = process.env.NEXT_PUBLIC_API_URL + "/auth/refresh";
  const token = localStorage.getItem("accessToken");

  try {
    let response = await fetch(endPoint, {
      ...options,
      headers: {
        ...(options.headers as Record<string, string>),
        "Content-Type": "application/json",
      },
    });

    if (response.status === 401) {
      const refreshResponse = await fetch(refreshTokenUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!refreshResponse.ok) {
        return {
          success: false,
          error: "Session expired",
        };
      }

      const newOptions = {
        ...options,
        headers: {
          ...(options.headers as Record<string, string>),
        },
      };
      response = await fetch(endPoint, newOptions);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));

        // 2. Drill down into the specific "error.message" structure your backend sends

        const errorMessage = !errorData.error.details
          ? errorData.error?.message || `HTTP error! Status: ${response.status}`
          : errorData.error.details[0].message ||
            `HTTP error! Status: ${response.status}`;
        return {
          success: false,
          error: errorMessage,
        };
      }

      const newData = await response.json();

      return {
        success: true,
        data: newData.data,
      };
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));

      // 2. Drill down into the specific "error.message" structure your backend sends

      const errorMessage = !errorData.error.details
        ? errorData.error?.message || `HTTP error! Status: ${response.status}`
        : errorData.error.details[0].message ||
          `HTTP error! Status: ${response.status}`;

      return {
        success: false,
        error: errorMessage,
      };
    }

    const data = await response.json();
    return { success: true, data: data.data };
  } catch (error) {
    console.log("Failed to fetch data", error);
    return {
      success: false,
      error: "Something went wrong. Please try again..",
    };
  }
}
