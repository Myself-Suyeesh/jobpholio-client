export interface UserFormData {
  name: string;
  email: string;
  password: string;
}

export async function register(formData: UserFormData) {
  let url = process.env.NEXT_PUBLIC_API_URL + "/auth/register";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    });

    // 1. Check if the response failed
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));

      // 2. Drill down into the specific "error.message" structure your backend sends

      const errorMessage = !errorData.error.details
        ? errorData.error?.message || `HTTP error! Status: ${response.status}`
        : errorData.error.details[0].message ||
          `HTTP error! Status: ${response.status}`;

      return { success: false, error: errorMessage };
    }

    const data = await response.json();
    return { success: true, data: data.data };
  } catch (error: any) {
    return {
      success: false,
      error: "User Registration failed, Please try again.",
    };
  }
}
