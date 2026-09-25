export async function apiFetch(endPoint: string, options: RequestInit) {
  const refreshTokenUrl = process.env.NEXT_PUBLIC_API_URL + "/auth/refresh";
  const token = localStorage.getItem("accessToken");

  try {
    let response = await fetch(endPoint, {
      ...options,
      headers: {
        ...(options.headers as Record<string, string>),
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 401) {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        localStorage.removeItem("accessToken");
        return {
          success: false,
          error: "No refresh token available",
        };
      }
      const refreshResponse = await fetch(refreshTokenUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken: refreshToken }),
      });

      if (!refreshResponse.ok) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        return {
          success: false,
          error: "Session expired",
        };
      }

      const refreshData = await refreshResponse.json();
      const newAccessToken = refreshData.data.accessToken;
      localStorage.setItem("accessToken", newAccessToken);
      localStorage.setItem("refreshToken", refreshData.data.refreshToken);
      const newOptions = {
        ...options,
        headers: {
          ...(options.headers as Record<string, string>),
          Authorization: `Bearer ${newAccessToken}`,
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
