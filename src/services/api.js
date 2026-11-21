
const API_BASE_URL = "http://localhost:5000/api";

const apiRequest = async (endpoint, options = {}) => {
  let response;

  try {
    response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error(
        "Unable to connect to HISN server. Please try again later.",
        { cause: error },
      );
    }

    throw error;
  }

  const responseText = await response.text();

  let data = {};

  if (responseText) {
    try {
      data = JSON.parse(responseText);
    } catch {
      data = { message: responseText };
    }
  }

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong.");
  }

  return data;
};

// Doctor Registration
export const registerDoctor = (doctorData) =>
  apiRequest("/auth/register", {
    method: "POST",
    body: JSON.stringify(doctorData),
  });

// User Login
export const loginUser = (loginData) =>
  apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify(loginData),
  });

// Email Verification
export const verifyEmail = (token) =>
  apiRequest("/auth/verify-email", {
    method: "POST",
    body: JSON.stringify({ token }),
  });

// Request Password Reset
export const requestPasswordReset = (email) =>
  apiRequest("/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify({ email }),
  });

// Reset Password
export const resetPassword = (token, newPassword) =>
  apiRequest("/auth/reset-password", {
    method: "POST",
    body: JSON.stringify({ token, newPassword }),
  });

// Get Current Authenticated User
export const getCurrentUser = (accessToken) =>
  apiRequest("/auth/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

// Get Notifications
export const getNotifications = (accessToken) =>
  apiRequest("/notifications", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

// Mark One Notification as Read
export const markNotificationAsRead = (notificationId, accessToken) =>
  apiRequest(`/notifications/${notificationId}/read`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

// Mark All Notifications as Read
export const markAllNotificationsAsRead = (accessToken) =>
  apiRequest("/notifications/read-all", {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

// Get All Patients for the Authenticated Doctor
export const getAllPatients = (accessToken) =>
  apiRequest("/patients", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

// Create a New Patient
export const createPatient = (patientData, accessToken) =>
  apiRequest("/patients", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(patientData),
  });

// Mark Selected Patients as Recovered
export const markPatientsRecovered = (patientIds, accessToken) =>
  apiRequest("/patients/recovered", {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ patientIds }),
  });

// Get Archived Patients
export const getArchivedPatients = (accessToken) =>
  apiRequest("/patients/archive", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

// Get All Medical Visits for a Patient
export const getPatientVisits = (patientId, accessToken) =>
  apiRequest(`/patients/${patientId}/visits`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

// Create a New Medical Visit
export const createMedicalVisit = (patientId, visitData, accessToken) =>
  apiRequest(`/patients/${patientId}/visits`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(visitData),
  });

// Get Latest Vital Sign Reading for a Patient
export const getLatestPatientReading = (patientId, accessToken) =>
  apiRequest(`/patients/${patientId}/vital-readings/latest`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
