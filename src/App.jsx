import { useState, useRef, useEffect } from "react";

import hisnLogo from "./assets/hisn-logo.png";

import DoctorWelcome from "./pages/doctor/DoctorWelcome";

import {
  registerDoctor,
  loginUser,
  verifyEmail,
  requestPasswordReset,
  resetPassword,
  getAllPatients,
  createPatient,
  markPatientsRecovered,
  getArchivedPatients,
  getLatestPatientReading,
  getPatientVisits,
  createMedicalVisit,
} from "./services/api";

import "./App.css";

const content = {
  en: {
    welcome: "WELCOME TO",

    brand: "HISN",

    subtitle: "Smart Care, Secure Connections",

    welcomeText:
      "An integrated smart medical system that combines the Internet of Things, Artificial Intelligence, and Cybersecurity to monitor vital signs and provide a secure environment for medical data and communications.",

    explore: "Discover HISN",

    aboutTag: "ABOUT HISN",

    aboutTitle: "Smart Medical Technology in a Secure Digital Environment",

    aboutText:
      "HISN brings together a smart medical device and an integrated web system to monitor vital signs and manage their data.\n\nBy integrating Artificial Intelligence and Cybersecurity technologies, HISN analyzes medical readings, monitors device communications, detects abnormal behavior and security threats, and supports appropriate responses providing a safer and more reliable medical experience.",

    aboutButton: "Learn About HISN",

    startTag: "GET STARTED",

    startTitle: "Welcome to HISN",

    startText:
      "Log in or create your doctor account to access the system and monitor medical data.",

    login: "Login",

    signup: "Create an Account",

    loginText: "Already have an account? Log in to access your account.",

    signupText: "Create your doctor account to get started with HISN.",

    back: "Back to Home",

    loginTitle: "Welcome Back",

    loginSubtitle: "Log in to your HISN doctor account.",

    signupTitle: "Create Your Account",

    signupSubtitle: "Register as a doctor to access HISN.",

    email: "Email Address",

    emailPlaceholder: "Enter your email address",

    password: "Password",

    passwordPlaceholder: "Enter your password",

    confirmPassword: "Confirm Password",

    confirmPasswordPlaceholder: "Re-enter your password",

    fullName: "Full Name",

    fullNamePlaceholder: "Enter your full name",

    phone: "Phone Number",

    phonePlaceholder: "Enter your phone number",

    specialty: "Medical Specialty",

    specialtyPlaceholder: "Select your medical specialty",

    remember: "Remember me",

    forgot: "Forgot Password?",

    noAccount: "Don't have an account?",

    haveAccount: "Already have an account?",

    createAccount: "Create Account",

    loginButton: "Login",

    showPassword: "Show",

    hidePassword: "Hide",

    passwordMismatch: "Passwords do not match.",

    passwordLength: "Password must be at least 8 characters.",

    requiredFields: "Please fill in all required fields.",

    invalidEmail: "Please enter a valid email address.",

    invalidPhone: "Please enter a valid phone number.",

    successLogin: "Login successful.",

    successSignup:
      "Doctor account created successfully. Please verify your email.",

    registering: "Creating Account...",

    loggingIn: "Logging in...",

    verificationTitle: "Email Verification",

    verifyingEmail: "Please wait while we verify your email address...",

    verificationSuccess: "Your email has been verified successfully.",

    verificationError:
      "Email verification failed. The link may be invalid or expired.",

    forgotTitle: "Reset Your Password",

    forgotSubtitle:
      "Enter your email address and we will send you a password reset link.",

    sendResetLink: "Send Reset Link",

    sendingResetLink: "Sending...",

    resetEmailSent:
      "If an account exists with this email, a password reset link has been sent.",

    resetPasswordTitle: "Create a New Password",

    resetPasswordSubtitle: "Enter your new password below.",

    newPassword: "New Password",

    confirmNewPassword: "Confirm New Password",

    resetPasswordButton: "Reset Password",

    resettingPassword: "Resetting Password...",

    passwordResetSuccess: "Your password has been reset successfully.",

    passwordResetError:
      "Unable to reset your password. The link may be invalid or expired.",

    backToLogin: "Back to Login",

    specialties: [
      "General Practitioner",

      "Cardiology",

      "Internal Medicine",

      "Neurology",

      "Pediatrics",

      "Emergency Medicine",

      "Other",
    ],

    previous: "Previous slide",

    next: "Next slide",
  },

  ar: {
    welcome: "مرحبًا بك في",

    brand: "حِصن",

    subtitle: "رعاية ذكية، واتصال آمن",

    welcomeText:
      "نظام طبي ذكي متكامل يجمع بين إنترنت الأشياء والذكاء الاصطناعي والأمن السيبراني لمتابعة العلامات الحيوية وتوفير بيئة آمنة للبيانات والاتصالات الطبية.",

    explore: "اكتشف حِصن",

    aboutTag: "عن حِصن",

    aboutTitle: "تكنولوجيا طبية ذكية في بيئة رقمية آمنة",

    aboutText:
      "يجمع حِصن بين جهاز طبي ذكي ونظام ويب متكامل لمتابعة العلامات الحيوية وإدارة بياناتها.\n\nومن خلال دمج تقنيات الذكاء الاصطناعي والأمن السيبراني، يعمل حِصن على تحليل القراءات الطبية، ومراقبة اتصالات الجهاز، واكتشاف السلوكيات غير الطبيعية والتهديدات الأمنية، مع دعم الاستجابة لها؛ لتوفير تجربة طبية أكثر أمانًا وموثوقية.",

    aboutButton: "تعرّف على حِصن",

    startTag: "ابدأ مع حِصن",

    startTitle: "مرحبًا بك في حِصن",

    startText:
      "سجّل الدخول أو أنشئ حساب الطبيب الخاص بك للوصول إلى النظام ومتابعة البيانات الطبية.",

    login: "تسجيل الدخول",

    signup: "إنشاء حساب جديد",

    loginText: "لديك حساب بالفعل؟ سجّل الدخول للوصول إلى حسابك.",

    signupText: "أنشئ حساب الطبيب الخاص بك للبدء في استخدام حِصن.",

    back: "العودة للرئيسية",

    loginTitle: "مرحبًا بعودتك",

    loginSubtitle: "سجّل الدخول إلى حسابك على حِصن.",

    signupTitle: "إنشاء حساب جديد",

    signupSubtitle: "أنشئ حساب الطبيب الخاص بك للوصول إلى حِصن.",

    email: "البريد الإلكتروني",

    emailPlaceholder: "أدخل بريدك الإلكتروني",

    password: "كلمة المرور",

    passwordPlaceholder: "أدخل كلمة المرور",

    confirmPassword: "تأكيد كلمة المرور",

    confirmPasswordPlaceholder: "أعد إدخال كلمة المرور",

    fullName: "الاسم بالكامل",

    fullNamePlaceholder: "أدخل اسمك بالكامل",

    phone: "رقم الهاتف",

    phonePlaceholder: "أدخل رقم هاتفك",

    specialty: "التخصص الطبي",

    specialtyPlaceholder: "اختر تخصصك الطبي",

    remember: "تذكرني",

    forgot: "نسيت كلمة المرور؟",

    noAccount: "ليس لديك حساب؟",

    haveAccount: "لديك حساب بالفعل؟",

    createAccount: "إنشاء الحساب",

    loginButton: "تسجيل الدخول",

    showPassword: "إظهار",

    hidePassword: "إخفاء",

    passwordMismatch: "كلمتا المرور غير متطابقتين.",

    passwordLength: "يجب ألا تقل كلمة المرور عن 8 أحرف.",

    requiredFields: "يرجى ملء جميع الحقول المطلوبة.",

    invalidEmail: "يرجى إدخال بريد إلكتروني صحيح.",

    invalidPhone: "يرجى إدخال رقم هاتف صحيح.",

    successLogin: "تم تسجيل الدخول بنجاح.",

    successSignup: "تم إنشاء حساب الطبيب بنجاح. يرجى تأكيد بريدك الإلكتروني.",

    registering: "جارٍ إنشاء الحساب...",

    loggingIn: "جارٍ تسجيل الدخول...",

    verificationTitle: "تأكيد البريد الإلكتروني",

    verifyingEmail: "يرجى الانتظار أثناء التحقق من بريدك الإلكتروني...",

    verificationSuccess: "تم تأكيد بريدك الإلكتروني بنجاح.",

    verificationError:
      "فشل تأكيد البريد الإلكتروني. قد يكون الرابط غير صالح أو منتهي الصلاحية.",

    forgotTitle: "استعادة كلمة المرور",

    forgotSubtitle:
      "أدخلي بريدك الإلكتروني وسنرسل إليك رابطًا لإعادة تعيين كلمة المرور.",

    sendResetLink: "إرسال رابط الاستعادة",

    sendingResetLink: "جارٍ الإرسال...",

    resetEmailSent:
      "إذا كان هناك حساب مرتبط بهذا البريد الإلكتروني، فسيتم إرسال رابط استعادة كلمة المرور إليه.",

    resetPasswordTitle: "إنشاء كلمة مرور جديدة",

    resetPasswordSubtitle: "أدخلي كلمة المرور الجديدة بالأسفل.",

    newPassword: "كلمة المرور الجديدة",

    confirmNewPassword: "تأكيد كلمة المرور الجديدة",

    resetPasswordButton: "تغيير كلمة المرور",

    resettingPassword: "جارٍ تغيير كلمة المرور...",

    passwordResetSuccess: "تم تغيير كلمة المرور بنجاح.",

    passwordResetError:
      "تعذر تغيير كلمة المرور. قد يكون الرابط غير صالح أو منتهي الصلاحية.",

    backToLogin: "العودة لتسجيل الدخول",

    specialties: [
      "طبيب عام",

      "أمراض القلب",

      "الباطنة",

      "الأعصاب",

      "طب الأطفال",

      "طب الطوارئ",

      "أخرى",
    ],

    previous: "الشريحة السابقة",

    next: "الشريحة التالية",
  },
};

function App() {
  const [currentPage, setCurrentPage] = useState("landing");

  const [currentSlide, setCurrentSlide] = useState(0);

  const [language, setLanguage] = useState("en");

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loginData, setLoginData] = useState({
    email: "",

    password: "",

    remember: false,
  });

  const [signupData, setSignupData] = useState({
    fullName: "",

    email: "",

    phone: "",

    specialty: "",

    password: "",

    confirmPassword: "",
  });

  const [forgotEmail, setForgotEmail] = useState("");

  const [resetToken, setResetToken] = useState("");

  const [resetData, setResetData] = useState({
    password: "",

    confirmPassword: "",
  });

  const [formMessage, setFormMessage] = useState({
    type: "",

    text: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [accessToken, setAccessToken] = useState(null);

  const [authenticatedUser, setAuthenticatedUser] = useState(null);

  // All Patients page data

  const [patients, setPatients] = useState([]);

  const [patientsLoading, setPatientsLoading] = useState(false);

  const [patientsError, setPatientsError] = useState("");

  const [patientsReload, setPatientsReload] = useState(0);
  const [expandedPatientId, setExpandedPatientId] = useState(null);
  const [latestReading, setLatestReading] = useState(null);
  const [readingLoading, setReadingLoading] = useState(false);
  const [readingError, setReadingError] = useState("");
  const [archivedPatients, setArchivedPatients] = useState([]);
  const [archiveLoading, setArchiveLoading] = useState(false);
  const [archiveError, setArchiveError] = useState("");
  const [patientSearch, setPatientSearch] = useState("");
  const [archiveSearch, setArchiveSearch] = useState("");
  const [showAddPatient, setShowAddPatient] = useState(false);
  const [isSelectingPatients, setIsSelectingPatients] = useState(false);
  const [selectedPatientIds, setSelectedPatientIds] = useState([]);
  const [patientSubmitting, setPatientSubmitting] = useState(false);
  const [patientActionError, setPatientActionError] = useState("");
  const [newPatient, setNewPatient] = useState({
    full_name: "",
    date_of_birth: "",
    gender: "",
    phone_number: "",
    emergency_contact_phone: "",
    blood_type: "",
    allergies: "",
    medical_history: "",
    initial_case_description: "",
  });

  // Medical Visits (per patient id)
  const [patientVisits, setPatientVisits] = useState({});
  const [visitsLoading, setVisitsLoading] = useState({});
  const [visitsError, setVisitsError] = useState({});
  const [showVisitForm, setShowVisitForm] = useState({});
  const [visitSubmitting, setVisitSubmitting] = useState({});
  const [visitFormMessage, setVisitFormMessage] = useState({
    patientId: null,
    type: "",
    text: "",
  });
  const [newVisit, setNewVisit] = useState({
    admission_date: "",
    department: "",
    chief_complaints: "",
    diagnosis: "",
    treatment_plan: "",
    prescribed_medications: "",
    discharge_date: "",
    current_medical_condition: "",
  });

  const startX = useRef(null);

  const verificationStarted = useRef(false);

  const resetTokenHandled = useRef(false);

  // Keep the latest language without restarting email verification.

  const languageRef = useRef(language);

  useEffect(() => {
    languageRef.current = language;
  }, [language]);

  const text = content[language];

  const isArabic = language === "ar";

  // ==========================================

  // Email Verification

  // ==========================================

  useEffect(() => {
    const currentPath = window.location.pathname;

    if (currentPath !== "/verify-email") return;

    const params = new URLSearchParams(window.location.search);

    const token = params.get("token");

    if (!token || verificationStarted.current) return;

    verificationStarted.current = true;

    setCurrentPage("verify");

    setIsSubmitting(true);

    const cleanUrl = new URL(window.location.href);

    cleanUrl.searchParams.delete("token");

    window.history.replaceState(
      {},

      document.title,

      `${cleanUrl.pathname}${cleanUrl.search}${cleanUrl.hash}`,
    );

    verifyEmail(token)
      .then((result) => {
        setFormMessage({
          type: "success",

          text:
            result.message || content[languageRef.current].verificationSuccess,
        });
      })

      .catch((error) => {
        setFormMessage({
          type: "error",

          text: error.message || content[languageRef.current].verificationError,
        });
      })

      .finally(() => {
        setIsSubmitting(false);
      });
  }, []);

  // ==========================================

  // Password Reset Link Handling

  // ==========================================

  useEffect(() => {
    if (window.location.pathname !== "/reset-password") return;

    if (resetTokenHandled.current) return;

    resetTokenHandled.current = true;

    const params = new URLSearchParams(window.location.search);

    const token = params.get("token");

    setCurrentPage("reset");

    if (!token) {
      setFormMessage({
        type: "error",

        text: content[languageRef.current].passwordResetError,
      });

      return;
    }

    setResetToken(token);

    // Remove the token from the visible URL after reading it.

    const cleanUrl = new URL(window.location.href);

    cleanUrl.searchParams.delete("token");

    window.history.replaceState(
      {},

      document.title,

      `${cleanUrl.pathname}${cleanUrl.search}${cleanUrl.hash}`,
    );
  }, []);

  const isAuthenticated = Boolean(accessToken && authenticatedUser);

  // Load only the patients associated with the currently authenticated doctor.

  useEffect(() => {
    if (currentPage !== "allPatients" || !isAuthenticated || !accessToken) {
      return;
    }

    let isActive = true;

    const loadPatients = async () => {
      setPatientsLoading(true);

      setPatientsError("");

      try {
        const result = await getAllPatients(accessToken);

        if (!isActive) return;

        if (result?.status !== "SUCCESS" || !Array.isArray(result.patients)) {
          throw new Error(
            languageRef.current === "ar"
              ? "تعذر تحميل قائمة المرضى."
              : "Unable to load the patients list.",
          );
        }

        setPatients(result.patients);
      } catch (error) {
        if (!isActive) return;

        setPatientsError(
          error?.message ||
            (languageRef.current === "ar"
              ? "حدث خطأ أثناء تحميل المرضى. حاول مرة أخرى."
              : "An error occurred while loading patients. Please try again."),
        );
      } finally {
        if (isActive) setPatientsLoading(false);
      }
    };

    loadPatients();

    return () => {
      isActive = false;
    };
  }, [currentPage, isAuthenticated, accessToken, patientsReload, isArabic]);
  // Load and refresh the expanded patient's latest vital readings.
  useEffect(() => {
    if (
      currentPage !== "allPatients" ||
      !isAuthenticated ||
      !accessToken ||
      !expandedPatientId
    ) {
      return;
    }

    let isActive = true;
    let isFetching = false;

    const loadLatestReading = async () => {
      if (isFetching) return;

      isFetching = true;

      try {
        const result = await getLatestPatientReading(
          expandedPatientId,
          accessToken,
        );

        if (!isActive) return;

        if (result?.status !== "SUCCESS") {
          throw new Error(
            isArabic
              ? "تعذر تحميل القراءات الحيوية."
              : "Unable to load vital sign readings.",
          );
        }

        setLatestReading(result.latestReading || null);
        setReadingError("");
      } catch (error) {
        if (!isActive) return;

        setReadingError(
          error?.message ||
            (isArabic
              ? "حدث خطأ أثناء تحميل القراءات."
              : "An error occurred while loading readings."),
        );
      } finally {
        isFetching = false;

        if (isActive) {
          setReadingLoading(false);
        }
      }
    };

    loadLatestReading();

    const intervalId = setInterval(loadLatestReading, 5000);

    return () => {
      isActive = false;
      clearInterval(intervalId);
    };
  }, [expandedPatientId, currentPage, isAuthenticated, accessToken, isArabic]);
  // Load recovered patients for the authenticated doctor.
  useEffect(() => {
    if (currentPage !== "archive" || !isAuthenticated || !accessToken) return;

    let isActive = true;
    const loadArchive = async () => {
      setArchiveLoading(true);
      setArchiveError("");
      try {
        const result = await getArchivedPatients(accessToken);
        if (!isActive) return;
        if (result?.status !== "SUCCESS" || !Array.isArray(result.patients)) {
          throw new Error(
            isArabic ? "تعذر تحميل الأرشيف." : "Unable to load the archive.",
          );
        }
        setArchivedPatients(result.patients);
      } catch (error) {
        if (isActive)
          setArchiveError(
            error?.message ||
              (isArabic
                ? "حدث خطأ أثناء تحميل الأرشيف."
                : "An error occurred while loading the archive."),
          );
      } finally {
        if (isActive) setArchiveLoading(false);
      }
    };
    loadArchive();
    return () => {
      isActive = false;
    };
  }, [currentPage, isAuthenticated, accessToken, patientsReload, isArabic]);

  const formatPatientDateTime = (value) => {
    if (!value) return "—";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "—";
    return date.toLocaleString(isArabic ? "ar-EG" : "en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const resetNewPatient = () => {
    setNewPatient({
      full_name: "",
      date_of_birth: "",
      gender: "",
      phone_number: "",
      emergency_contact_phone: "",
      blood_type: "",
      allergies: "",
      medical_history: "",
      initial_case_description: "",
    });
    setPatientActionError("");
  };

  const handleCreatePatient = async (event) => {
    event.preventDefault();
    if (patientSubmitting) return;
    setPatientSubmitting(true);
    setPatientActionError("");
    try {
      const result = await createPatient(newPatient, accessToken);
      if (result?.status !== "SUCCESS") {
        throw new Error(
          result?.message ||
            (isArabic ? "تعذرت إضافة المريض." : "Unable to add patient."),
        );
      }
      setShowAddPatient(false);
      resetNewPatient();
      setPatientsReload((value) => value + 1);
    } catch (error) {
      setPatientActionError(
        error?.message ||
          (isArabic
            ? "حدث خطأ أثناء إضافة المريض."
            : "An error occurred while adding the patient."),
      );
    } finally {
      setPatientSubmitting(false);
    }
  };

  // ==========================================
  // Medical Visits
  // ==========================================

  const emptyVisitForm = {
    admission_date: "",
    department: "",
    chief_complaints: "",
    diagnosis: "",
    treatment_plan: "",
    prescribed_medications: "",
    discharge_date: "",
    current_medical_condition: "",
  };

  const resetNewVisit = () => {
    setNewVisit({ ...emptyVisitForm });
  };

  const loadPatientVisits = async (patientId) => {
    if (!patientId || !accessToken) {
      return;
    }

    setVisitsLoading((prev) => ({
      ...prev,
      [patientId]: true,
    }));

    setVisitsError((prev) => ({
      ...prev,
      [patientId]: "",
    }));

    try {
      const response = await getPatientVisits(patientId, accessToken);

      if (
        !Array.isArray(response) &&
        response?.status &&
        response.status !== "SUCCESS"
      ) {
        throw new Error(
          response?.message ||
            (isArabic
              ? "تعذر تحميل الزيارات."
              : "Failed to load medical visits."),
        );
      }

      const visits = Array.isArray(response)
        ? response
        : response?.visits || response?.medical_visits || [];

      setPatientVisits((prev) => ({
        ...prev,
        [patientId]: visits,
      }));
    } catch (error) {
      setVisitsError((prev) => ({
        ...prev,
        [patientId]:
          error?.message ||
          (isArabic
            ? "تعذر تحميل الزيارات."
            : "Failed to load medical visits."),
      }));
    } finally {
      setVisitsLoading((prev) => ({
        ...prev,
        [patientId]: false,
      }));
    }
  };

  // Returns true when the visit was saved, false otherwise.
  const handleCreateMedicalVisit = async (patientId, visitData) => {
    if (!patientId || !accessToken) {
      return false;
    }

    setVisitSubmitting((prev) => ({
      ...prev,
      [patientId]: true,
    }));

    setVisitsError((prev) => ({
      ...prev,
      [patientId]: "",
    }));

    try {
      // The backend decides the visit status (active), so status is not sent.
      const result = await createMedicalVisit(
        patientId,
        visitData,
        accessToken,
      );

      if (result?.status && result.status !== "SUCCESS") {
        throw new Error(
          result?.message ||
            (isArabic
              ? "تعذر حفظ الزيارة الطبية."
              : "Failed to create medical visit."),
        );
      }

      await loadPatientVisits(patientId);

      setShowVisitForm((prev) => ({
        ...prev,
        [patientId]: false,
      }));

      return true;
    } catch (error) {
      setVisitFormMessage({
        patientId,
        type: "error",
        text:
          error?.message ||
          (isArabic
            ? "تعذر حفظ الزيارة الطبية."
            : "Failed to create medical visit."),
      });

      return false;
    } finally {
      setVisitSubmitting((prev) => ({
        ...prev,
        [patientId]: false,
      }));
    }
  };

  const validateVisitForm = (visit) => {
    const hasAnyValue = Object.values(visit).some(
      (value) => String(value || "").trim() !== "",
    );

    if (!hasAnyValue || !visit.admission_date) {
      return isArabic
        ? "تاريخ الدخول مطلوب."
        : "Admission date is required.";
    }

    if (
      visit.discharge_date &&
      new Date(visit.discharge_date) < new Date(visit.admission_date)
    ) {
      return isArabic
        ? "تاريخ الخروج لا يمكن أن يكون قبل تاريخ الدخول."
        : "Discharge date cannot be before the admission date.";
    }

    return "";
  };

  const buildVisitPayload = (visit) => {
    const payload = { admission_date: visit.admission_date };

    [
      "department",
      "chief_complaints",
      "diagnosis",
      "treatment_plan",
      "prescribed_medications",
      "current_medical_condition",
    ].forEach((key) => {
      const value = String(visit[key] || "").trim();
      if (value) payload[key] = value;
    });

    if (visit.discharge_date) payload.discharge_date = visit.discharge_date;

    return payload;
  };

  const handleSubmitVisitForm = async (event, patientId) => {
    event.preventDefault();

    if (visitSubmitting[patientId]) return;

    const validationError = validateVisitForm(newVisit);

    if (validationError) {
      setVisitFormMessage({
        patientId,
        type: "error",
        text: validationError,
      });
      return;
    }

    setVisitFormMessage({ patientId, type: "", text: "" });

    const saved = await handleCreateMedicalVisit(
      patientId,
      buildVisitPayload(newVisit),
    );

    if (saved) {
      resetNewVisit();
      setVisitFormMessage({
        patientId,
        type: "success",
        text: isArabic
          ? "تم حفظ الزيارة الطبية بنجاح."
          : "Medical visit saved successfully.",
      });
    }
  };

  const sortVisitsNewestFirst = (visits) =>
    [...(visits || [])].sort((a, b) => {
      const first = new Date(a?.admission_date || a?.created_at || 0).getTime();
      const second = new Date(b?.admission_date || b?.created_at || 0).getTime();
      return (second || 0) - (first || 0);
    });

  const togglePatientSelection = (patientId) => {
    setSelectedPatientIds((current) =>
      current.includes(patientId)
        ? current.filter((id) => id !== patientId)
        : [...current, patientId],
    );
  };
  const togglePatientExpansion = (patientId) => {
    const isCurrentlyExpanded = String(expandedPatientId) === String(patientId);

    setExpandedPatientId(isCurrentlyExpanded ? null : patientId);
    setLatestReading(null);
    setReadingError("");
    setReadingLoading(!isCurrentlyExpanded);

    // Close any open visit form and clear its messages (patient data stays).
    setShowVisitForm({});
    setVisitFormMessage({ patientId: null, type: "", text: "" });
    resetNewVisit();

    // Load the medical visits of the patient being opened.
    if (!isCurrentlyExpanded) {
      loadPatientVisits(patientId);
    }
  };
  const handleMarkRecovered = async () => {
    if (!selectedPatientIds.length || patientSubmitting) return;
    setPatientSubmitting(true);
    setPatientActionError("");
    try {
      const result = await markPatientsRecovered(
        selectedPatientIds,
        accessToken,
      );
      if (result?.status !== "SUCCESS") {
        throw new Error(
          result?.message ||
            (isArabic
              ? "تعذر تحديث حالة المرضى."
              : "Unable to update patient status."),
        );
      }
      setSelectedPatientIds([]);
      setIsSelectingPatients(false);
      setPatientsReload((value) => value + 1);
    } catch (error) {
      setPatientActionError(
        error?.message ||
          (isArabic
            ? "حدث خطأ أثناء تحديث الحالة."
            : "An error occurred while updating status."),
      );
    } finally {
      setPatientSubmitting(false);
    }
  };

  const formatPatientDate = (value) => {
    if (!value) return "—";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return "—";

    return date.toLocaleDateString(isArabic ? "ar-EG" : "en-US", {
      year: "numeric",

      month: "short",

      day: "numeric",
    });
  };

  const getPatientGender = (gender) => {
    if (!gender) return "—";

    const normalizedGender = String(gender).toLowerCase();

    if (isArabic && normalizedGender === "male") return "ذكر";

    if (isArabic && normalizedGender === "female") return "أنثى";

    return gender;
  };

  const renderSectionHeading = (number, title) => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginBottom: "12px",
      }}
    >
      <span
        style={{
          minWidth: "30px",
          height: "30px",
          borderRadius: "50%",
          background: "#548b80",
          color: "#fff",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "13px",
          fontWeight: 700,
        }}
      >
        {number}
      </span>
      <h3 style={{ fontSize: "16px", margin: 0 }}>{title}</h3>
    </div>
  );

  const renderInfoItem = (label, value, fullWidth = false) => (
    <div style={fullWidth ? { gridColumn: "1 / -1" } : undefined}>
      <strong style={{ display: "block", fontSize: "13px", color: "#667085" }}>
        {label}
      </strong>
      <span style={{ whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}>
        {value || "—"}
      </span>
    </div>
  );

  const nextSlide = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, 2));
  };

  const previousSlide = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  const handlePointerDown = (event) => {
    startX.current = event.clientX;
  };

  const handlePointerUp = (event) => {
    if (startX.current === null) return;

    const difference = event.clientX - startX.current;

    if (Math.abs(difference) > 60) {
      if (difference < 0) {
        isArabic ? previousSlide() : nextSlide();
      } else {
        isArabic ? nextSlide() : previousSlide();
      }
    }

    startX.current = null;
  };

  const handlePointerCancel = () => {
    startX.current = null;
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goHome = () => {
    setCurrentPage("landing");

    setCurrentSlide(0);

    setFormMessage({ type: "", text: "" });
  };

  const openPage = (page) => {
    setCurrentPage(page);

    setFormMessage({ type: "", text: "" });

    setShowPassword(false);

    setShowConfirmPassword(false);
  };

  const updateLoginData = (event) => {
    const { name, value, checked, type } = event.target;

    setLoginData((prev) => ({
      ...prev,

      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const updateSignupData = (event) => {
    const { name, value } = event.target;

    setSignupData((prev) => ({
      ...prev,

      [name]: value,
    }));
  };

  const updateResetData = (event) => {
    const { name, value } = event.target;

    setResetData((prev) => ({
      ...prev,

      [name]: value,
    }));
  };

  // ==========================================

  // Login

  // ==========================================

  const handleLogin = async (event) => {
    event.preventDefault();

    if (isSubmitting) return;

    setFormMessage({ type: "", text: "" });

    if (!loginData.email.trim() || !loginData.password) {
      setFormMessage({
        type: "error",

        text: text.requiredFields,
      });

      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(loginData.email.trim())) {
      setFormMessage({
        type: "error",

        text: text.invalidEmail,
      });

      return;
    }

    setIsSubmitting(true);

    try {
      const result = await loginUser({
        email: loginData.email.trim(),

        password: loginData.password,
      });

      if (!result.accessToken) {
        throw new Error("Login response did not contain an access token.");
      }

      if (!result.user) {
        throw new Error("Login response did not contain user information.");
      }

      setAccessToken(result.accessToken);

      setAuthenticatedUser(result.user);

      setCurrentPage("dashboard");

      setFormMessage({
        type: "success",

        text: result.message || text.successLogin,
      });
    } catch (error) {
      setFormMessage({
        type: "error",

        text: error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ==========================================

  // Forgot Password

  // ==========================================

  const handleForgotPassword = async (event) => {
    event.preventDefault();

    if (isSubmitting) return;

    setFormMessage({ type: "", text: "" });

    const email = forgotEmail.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      setFormMessage({
        type: "error",

        text: text.requiredFields,
      });

      return;
    }

    if (!emailPattern.test(email)) {
      setFormMessage({
        type: "error",

        text: text.invalidEmail,
      });

      return;
    }

    setIsSubmitting(true);

    try {
      const result = await requestPasswordReset(email);

      setFormMessage({
        type: "success",

        text: result.message || text.resetEmailSent,
      });
    } catch (error) {
      setFormMessage({
        type: "error",

        text: error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ==========================================

  // Reset Password

  // ==========================================

  const handleResetPassword = async (event) => {
    event.preventDefault();

    if (isSubmitting) return;

    setFormMessage({ type: "", text: "" });

    if (!resetToken) {
      setFormMessage({
        type: "error",

        text: text.passwordResetError,
      });

      return;
    }

    const { password, confirmPassword } = resetData;

    if (!password || !confirmPassword) {
      setFormMessage({
        type: "error",

        text: text.requiredFields,
      });

      return;
    }

    if (password.length < 8) {
      setFormMessage({
        type: "error",

        text: text.passwordLength,
      });

      return;
    }

    if (new TextEncoder().encode(password).length > 72) {
      setFormMessage({
        type: "error",

        text: text.passwordResetError,
      });

      return;
    }

    if (password !== confirmPassword) {
      setFormMessage({
        type: "error",

        text: text.passwordMismatch,
      });

      return;
    }

    setIsSubmitting(true);

    try {
      const result = await resetPassword(resetToken, password);

      setFormMessage({
        type: "success",

        text: result.message || text.passwordResetSuccess,
      });

      setResetData({
        password: "",

        confirmPassword: "",
      });

      setResetToken("");
    } catch (error) {
      setFormMessage({
        type: "error",

        text: error.message || text.passwordResetError,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ==========================================

  // Logout

  // ==========================================

  const handleLogout = () => {
    setPatients([]);

    setPatientsError("");
    setArchivedPatients([]);
    setSelectedPatientIds([]);
    setIsSelectingPatients(false);
    setPatientsLoading(false);

    // Clear medical visits state
    setPatientVisits({});
    setVisitsLoading({});
    setVisitsError({});
    setShowVisitForm({});
    setVisitSubmitting({});
    setVisitFormMessage({ patientId: null, type: "", text: "" });
    resetNewVisit();

    setAccessToken(null);

    setAuthenticatedUser(null);

    setLoginData({
      email: "",

      password: "",

      remember: false,
    });

    setCurrentPage("landing");

    setCurrentSlide(0);

    setFormMessage({ type: "", text: "" });
  };

  // ==========================================

  // Doctor Registration

  // ==========================================

  const handleSignup = async (event) => {
    event.preventDefault();

    if (isSubmitting) return;

    setFormMessage({ type: "", text: "" });

    const { fullName, email, phone, specialty, password, confirmPassword } =
      signupData;

    if (
      !fullName.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !specialty ||
      !password ||
      !confirmPassword
    ) {
      setFormMessage({
        type: "error",

        text: text.requiredFields,
      });

      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.trim())) {
      setFormMessage({
        type: "error",

        text: text.invalidEmail,
      });

      return;
    }

    const phonePattern = /^[+]?[\d\s()-]{8,20}$/;

    if (!phonePattern.test(phone.trim())) {
      setFormMessage({
        type: "error",

        text: text.invalidPhone,
      });

      return;
    }

    if (password.length < 8) {
      setFormMessage({
        type: "error",

        text: text.passwordLength,
      });

      return;
    }

    if (password !== confirmPassword) {
      setFormMessage({
        type: "error",

        text: text.passwordMismatch,
      });

      return;
    }

    setIsSubmitting(true);

    try {
      const result = await registerDoctor({
        full_name: fullName.trim(),

        email: email.trim(),

        phone: phone.trim(),

        specialty,

        password,
      });

      setFormMessage({
        type: "success",

        text: result.message || text.successSignup,
      });
    } catch (error) {
      setFormMessage({
        type: "error",

        text: error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="app" dir={isArabic ? "rtl" : "ltr"}>
      {currentPage === "landing" && (
        <>
          <header className="landing-header">
            <div className="logo-lockup">
              <img src={hisnLogo} alt="HISN Logo" className="logo-image" />

              <span className="brand-name">HISN</span>
            </div>

            <div className="language-switch">
              <button
                className={`language-btn ${language === "en" ? "active" : ""}`}
                onClick={() => setLanguage("en")}
              >
                English
              </button>

              <button
                className={`language-btn ${language === "ar" ? "active" : ""}`}
                onClick={() => setLanguage("ar")}
              >
                العربية
              </button>
            </div>
          </header>

          <section
            className="carousel-viewport"
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerCancel}
            onPointerLeave={handlePointerCancel}
          >
            <div
              className="slide-track"
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
              }}
            >
              {/* SLIDE 1 */}

              <section className="landing-slide" dir={isArabic ? "rtl" : "ltr"}>
                <div className="slide-content">
                  <div className="logo-stage">
                    <img src={hisnLogo} alt="HISN Logo" />
                  </div>

                  <p className="slide-kicker">{text.welcome}</p>

                  <h1 className="welcome-title">{text.brand}</h1>

                  <p className="welcome-subtitle">{text.subtitle}</p>

                  <p className="slide-description">{text.welcomeText}</p>

                  <div className="slide-actions">
                    <button className="button-primary" onClick={nextSlide}>
                      {text.explore}
                    </button>
                  </div>
                </div>
              </section>

              {/* SLIDE 2 */}

              <section className="landing-slide" dir={isArabic ? "rtl" : "ltr"}>
                <div className="about-slide-layout">
                  <div className="about-slide-text">
                    <span className="slide-kicker">{text.aboutTag}</span>

                    <h2 className="slide-title">{text.aboutTitle}</h2>

                    <p className="slide-description about-description">
                      {text.aboutText}
                    </p>

                    <div className="slide-actions">
                      <button className="button-primary" onClick={nextSlide}>
                        {text.aboutButton}
                      </button>
                    </div>
                  </div>

                  <div className="device-illustration">
                    <div className="device-screen">
                      <img src={hisnLogo} alt="HISN" />

                      <span>HISN</span>

                      <div className="device-pulse"></div>
                    </div>
                  </div>
                </div>
              </section>

              {/* SLIDE 3 */}

              <section className="landing-slide" dir={isArabic ? "rtl" : "ltr"}>
                <div className="slide-content">
                  <span className="slide-kicker">{text.startTag}</span>

                  <h2 className="slide-title">{text.startTitle}</h2>

                  <p className="slide-description">{text.startText}</p>

                  <div className="auth-choice">
                    <article className="auth-choice-card">
                      <div className="auth-choice-icon">
                        <span>↪</span>
                      </div>

                      <h3>{text.login}</h3>

                      <p>{text.loginText}</p>

                      <button
                        className="button-primary"
                        onClick={() => openPage("login")}
                      >
                        {text.login}
                      </button>
                    </article>

                    <article className="auth-choice-card">
                      <div className="auth-choice-icon">
                        <span>+</span>
                      </div>

                      <h3>{text.signup}</h3>

                      <p>{text.signupText}</p>

                      <button
                        className="button-primary"
                        onClick={() => openPage("signup")}
                      >
                        {text.signup}
                      </button>
                    </article>
                  </div>
                </div>
              </section>
            </div>

            <div className="carousel-controls">
              <button
                className="nav-arrow"
                onClick={previousSlide}
                disabled={currentSlide === 0}
                aria-label={text.previous}
                style={{ opacity: currentSlide === 0 ? 0.35 : 1 }}
              >
                {isArabic ? "→" : "←"}
              </button>

              <div className="slide-indicators">
                {[0, 1, 2].map((index) => (
                  <button
                    key={index}
                    className={`slide-indicator ${
                      currentSlide === index ? "active" : ""
                    }`}
                    onClick={() => goToSlide(index)}
                    aria-label={`Slide ${index + 1}`}
                  />
                ))}
              </div>

              <button
                className="nav-arrow"
                onClick={nextSlide}
                disabled={currentSlide === 2}
                aria-label={text.next}
                style={{ opacity: currentSlide === 2 ? 0.35 : 1 }}
              >
                {isArabic ? "←" : "→"}
              </button>
            </div>
          </section>
        </>
      )}

      {/* LOGIN PAGE */}

      {currentPage === "login" && (
        <section className="auth-page">
          <div className="auth-container">
            <button className="button-secondary" onClick={goHome}>
              {isArabic ? "→" : "←"} {text.back}
            </button>

            <div className="auth-card">
              <div className="auth-logo">
                <img src={hisnLogo} alt="HISN Logo" />
              </div>

              <span className="slide-kicker">HISN</span>

              <h1>{text.loginTitle}</h1>

              <p className="auth-subtitle">{text.loginSubtitle}</p>

              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <label htmlFor="login-email">{text.email}</label>

                  <input
                    id="login-email"
                    type="email"
                    name="email"
                    placeholder={text.emailPlaceholder}
                    value={loginData.email}
                    onChange={updateLoginData}
                    autoComplete="email"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="login-password">{text.password}</label>

                  <div className="password-wrapper">
                    <input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder={text.passwordPlaceholder}
                      value={loginData.password}
                      onChange={updateLoginData}
                      autoComplete="current-password"
                      required
                    />

                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? text.hidePassword : text.showPassword}
                    </button>
                  </div>
                </div>

                <div className="form-options">
                  <label className="remember-option">
                    <input
                      type="checkbox"
                      name="remember"
                      checked={loginData.remember}
                      onChange={updateLoginData}
                    />

                    <span>{text.remember}</span>
                  </label>

                  <button
                    type="button"
                    className="text-link"
                    onClick={() => openPage("forgot")}
                  >
                    {text.forgot}
                  </button>
                </div>

                {formMessage.text && (
                  <div className={`form-message ${formMessage.type}`}>
                    {formMessage.text}
                  </div>
                )}

                <button
                  type="submit"
                  className="button-primary auth-submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? text.loggingIn : text.loginButton}
                </button>
              </form>

              <div className="auth-switch">
                {text.noAccount}{" "}
                <button
                  className="text-link"
                  onClick={() => openPage("signup")}
                >
                  {text.signup}
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SIGNUP PAGE */}

      {currentPage === "signup" && (
        <section className="auth-page">
          <div className="auth-container">
            <button className="button-secondary" onClick={goHome}>
              {isArabic ? "→" : "←"} {text.back}
            </button>

            <div className="auth-card signup-card">
              <div className="auth-logo">
                <img src={hisnLogo} alt="HISN Logo" />
              </div>

              <span className="slide-kicker">HISN</span>

              <h1>{text.signupTitle}</h1>

              <p className="auth-subtitle">{text.signupSubtitle}</p>

              <form onSubmit={handleSignup}>
                <div className="form-group">
                  <label htmlFor="signup-name">{text.fullName}</label>

                  <input
                    id="signup-name"
                    type="text"
                    name="fullName"
                    placeholder={text.fullNamePlaceholder}
                    value={signupData.fullName}
                    onChange={updateSignupData}
                    autoComplete="name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="signup-email">{text.email}</label>

                  <input
                    id="signup-email"
                    type="email"
                    name="email"
                    placeholder={text.emailPlaceholder}
                    value={signupData.email}
                    onChange={updateSignupData}
                    autoComplete="email"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="signup-phone">{text.phone}</label>

                  <input
                    id="signup-phone"
                    type="tel"
                    name="phone"
                    placeholder={text.phonePlaceholder}
                    value={signupData.phone}
                    onChange={updateSignupData}
                    autoComplete="tel"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="signup-specialty">{text.specialty}</label>

                  <select
                    id="signup-specialty"
                    name="specialty"
                    value={signupData.specialty}
                    onChange={updateSignupData}
                    required
                  >
                    <option value="" disabled>
                      {text.specialtyPlaceholder}
                    </option>

                    {text.specialties.map((specialty, index) => (
                      <option key={index} value={specialty}>
                        {specialty}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="signup-password">{text.password}</label>

                  <div className="password-wrapper">
                    <input
                      id="signup-password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder={text.passwordPlaceholder}
                      value={signupData.password}
                      onChange={updateSignupData}
                      autoComplete="new-password"
                      minLength={8}
                      required
                    />

                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? text.hidePassword : text.showPassword}
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="signup-confirm-password">
                    {text.confirmPassword}
                  </label>

                  <div className="password-wrapper">
                    <input
                      id="signup-confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder={text.confirmPasswordPlaceholder}
                      value={signupData.confirmPassword}
                      onChange={updateSignupData}
                      autoComplete="new-password"
                      required
                    />

                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword
                        ? text.hidePassword
                        : text.showPassword}
                    </button>
                  </div>
                </div>

                {formMessage.text && (
                  <div className={`form-message ${formMessage.type}`}>
                    {formMessage.text}
                  </div>
                )}

                <button
                  type="submit"
                  className="button-primary auth-submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? text.registering : text.createAccount}
                </button>
              </form>

              <div className="auth-switch">
                {text.haveAccount}{" "}
                <button className="text-link" onClick={() => openPage("login")}>
                  {text.login}
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* DOCTOR WELCOME PAGE */}

      {currentPage === "dashboard" &&
        (isAuthenticated ? (
          <DoctorWelcome
            doctor={authenticatedUser}
            language={language}
            accessToken={accessToken}
            onLogout={handleLogout}
            onNavigate={openPage}
          />
        ) : (
          <section className="auth-page">
            <div className="auth-container">
              <div className="auth-card">
                <h1>{text.loginTitle}</h1>

                <button
                  className="button-primary auth-submit"
                  onClick={() => openPage("login")}
                >
                  {text.loginButton}
                </button>
              </div>
            </div>
          </section>
        ))}

      {/* ARCHIVE PAGE */}
      {currentPage === "archive" && isAuthenticated && (
        <section className="auth-page">
          <div
            className="auth-container"
            style={{ width: "100%", maxWidth: "1100px" }}
          >
            <div
              className="auth-card"
              style={{ width: "100%", maxWidth: "1100px" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "16px",
                  flexWrap: "wrap",
                  marginBottom: "22px",
                }}
              >
                <div>
                  <span className="slide-kicker">HISN</span>
                  <h1 style={{ margin: "8px 0" }}>
                    {isArabic ? "أرشيف المرضى" : "Patients Archive"}
                  </h1>
                  <p className="auth-subtitle" style={{ margin: 0 }}>
                    {isArabic
                      ? `عدد الحالات المتعافية: ${archivedPatients.length}`
                      : `Recovered cases: ${archivedPatients.length}`}
                  </p>
                </div>
                <button
                  className="button-secondary"
                  onClick={() => openPage("allPatients")}
                >
                  {isArabic ? "العودة لكل المرضى" : "Back to All Patients"}
                </button>
              </div>
              <input
                type="search"
                value={archiveSearch}
                onChange={(event) => setArchiveSearch(event.target.value)}
                placeholder={
                  isArabic
                    ? "ابحث بالاسم أو رقم المريض..."
                    : "Search by name or Patient ID..."
                }
                style={{
                  width: "100%",
                  padding: "13px 15px",
                  border: "1px solid rgba(100,120,130,.3)",
                  borderRadius: "10px",
                  marginBottom: "20px",
                  font: "inherit",
                }}
              />
              {archiveLoading ? (
                <p className="auth-subtitle">
                  {isArabic ? "جارٍ تحميل الأرشيف..." : "Loading archive..."}
                </p>
              ) : archiveError ? (
                <div role="alert">
                  <p>{archiveError}</p>
                  <button
                    className="button-primary"
                    onClick={() => setPatientsReload((v) => v + 1)}
                  >
                    {isArabic ? "إعادة المحاولة" : "Try Again"}
                  </button>
                </div>
              ) : archivedPatients.filter((p) =>
                  `${p.full_name || ""} ${p.patient_code || ""}`
                    .toLowerCase()
                    .includes(archiveSearch.trim().toLowerCase()),
                ).length === 0 ? (
                <div style={{ textAlign: "center", padding: "30px 12px" }}>
                  <h2>{isArabic ? "الأرشيف فارغ" : "No Recovered Patients"}</h2>
                  <p className="auth-subtitle">
                    {isArabic
                      ? "ستظهر هنا الحالات التي تم تسجيل تعافيها."
                      : "Patients marked as recovered will appear here."}
                  </p>
                </div>
              ) : (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: "16px",
                  }}
                >
                  {archivedPatients
                    .filter((p) =>
                      `${p.full_name || ""} ${p.patient_code || ""}`
                        .toLowerCase()
                        .includes(archiveSearch.trim().toLowerCase()),
                    )
                    .map((patient) => (
                      <article
                        key={`${patient.id}-${
                          patient.visit_id || patient.recovered_at || ""
                        }`}
                        style={{
                          border: "1px solid rgba(100,120,130,.22)",
                          borderRadius: "14px",
                          padding: "18px",
                          background: "rgba(255,255,255,.7)",
                        }}
                      >
                        <h2 style={{ fontSize: "18px", margin: "0 0 12px" }}>
                          {patient.full_name ||
                            (isArabic ? "اسم غير متاح" : "Name unavailable")}
                        </h2>
                        <p>
                          <strong>
                            {isArabic ? "رقم المريض:" : "Patient ID:"}
                          </strong>{" "}
                          {patient.patient_code || `#${patient.id}`}
                        </p>
                        <p>
                          <strong>
                            {isArabic ? "تاريخ التعافي:" : "Recovered at:"}
                          </strong>{" "}
                          {formatPatientDateTime(patient.recovered_at)}
                        </p>
                      </article>
                    ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ALL PATIENTS PAGE */}
      {currentPage === "allPatients" && isAuthenticated && (
        <section className="auth-page">
          <div
            className="auth-container"
            style={{ width: "100%", maxWidth: "1100px" }}
          >
            <div
              className="auth-card"
              style={{ width: "100%", maxWidth: "1100px" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "16px",
                  flexWrap: "wrap",
                  marginBottom: "22px",
                }}
              >
                <div>
                  <span className="slide-kicker">HISN</span>
                  <h1 style={{ margin: "8px 0" }}>
                    {isArabic ? "كل المرضى" : "All Patients"}
                  </h1>
                  <p className="auth-subtitle" style={{ margin: 0 }}>
                    {isArabic
                      ? `عدد المرضى المسجلين لديك: ${patients.length}`
                      : `Patients associated with your account: ${patients.length}`}
                  </p>
                </div>
                <button
                  type="button"
                  className="button-secondary"
                  onClick={() => openPage("dashboard")}
                >
                  {isArabic ? "العودة للرئيسية" : "Back to Welcome"}
                </button>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  flexWrap: "wrap",
                  marginBottom: "18px",
                }}
              >
                <input
                  type="search"
                  value={patientSearch}
                  onChange={(event) => setPatientSearch(event.target.value)}
                  placeholder={
                    isArabic
                      ? "ابحث بالاسم أو رقم المريض..."
                      : "Search by name or Patient ID..."
                  }
                  style={{
                    flex: "1 1 260px",
                    minWidth: 0,
                    padding: "12px 14px",
                    border: "1px solid rgba(100,120,130,.3)",
                    borderRadius: "10px",
                    font: "inherit",
                  }}
                />
                <button
                  type="button"
                  className="button-primary"
                  onClick={() => {
                    resetNewPatient();
                    setShowAddPatient(true);
                  }}
                >
                  {isArabic ? "+ إضافة مريض" : "+ Add Patient"}
                </button>
                <button
                  type="button"
                  className="button-secondary"
                  onClick={() => {
                    setIsSelectingPatients((v) => !v);
                    setSelectedPatientIds([]);
                  }}
                >
                  {isSelectingPatients
                    ? isArabic
                      ? "إلغاء التحديد"
                      : "Cancel Selection"
                    : isArabic
                    ? "تحديد"
                    : "Select"}
                </button>
                <button
                  type="button"
                  className="button-secondary"
                  onClick={() => openPage("archive")}
                >
                  {isArabic ? "الأرشيف" : "Archive"}
                </button>
                {isSelectingPatients && selectedPatientIds.length > 0 && (
                  <button
                    type="button"
                    className="button-primary"
                    disabled={patientSubmitting}
                    onClick={handleMarkRecovered}
                  >
                    {patientSubmitting
                      ? isArabic
                        ? "جارٍ التحديث..."
                        : "Updating..."
                      : isArabic
                      ? `تماثل للشفاء (${selectedPatientIds.length})`
                      : `Mark Recovered (${selectedPatientIds.length})`}
                  </button>
                )}
              </div>
              {patientActionError && (
                <p role="alert" className="form-message error">
                  {patientActionError}
                </p>
              )}
              {patientsLoading ? (
                <p className="auth-subtitle" role="status">
                  {isArabic
                    ? "جارٍ تحميل قائمة المرضى..."
                    : "Loading patients..."}
                </p>
              ) : patientsError ? (
                <div
                  role="alert"
                  style={{ textAlign: "center", padding: "24px 12px" }}
                >
                  <p className="auth-subtitle">{patientsError}</p>
                  <button
                    className="button-primary auth-submit"
                    onClick={() => setPatientsReload((v) => v + 1)}
                  >
                    {isArabic ? "إعادة المحاولة" : "Try Again"}
                  </button>
                </div>
              ) : patients.filter((p) =>
                  `${p.full_name || ""} ${p.patient_code || ""}`
                    .toLowerCase()
                    .includes(patientSearch.trim().toLowerCase()),
                ).length === 0 ? (
                <div style={{ textAlign: "center", padding: "32px 12px" }}>
                  <h2>
                    {patientSearch.trim()
                      ? isArabic
                        ? "لا توجد نتائج"
                        : "No Results Found"
                      : isArabic
                      ? "لا يوجد مرضى حتى الآن"
                      : "No Patients Yet"}
                  </h2>
                  <p className="auth-subtitle">
                    {patientSearch.trim()
                      ? isArabic
                        ? "جرّب البحث باستخدام اسم أو رقم مريض آخر."
                        : "Try another patient name or ID."
                      : isArabic
                      ? "استخدم زر إضافة مريض لتسجيل أول حالة."
                      : "Use Add Patient to register your first patient."}
                  </p>
                </div>
              ) : (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: "16px",
                  }}
                >
                  {patients
                    .filter((p) =>
                      `${p.full_name || ""} ${p.patient_code || ""}`
                        .toLowerCase()
                        .includes(patientSearch.trim().toLowerCase()),
                    )
                    .map((patient) => {
                      const isExpanded =
                        String(expandedPatientId) === String(patient.id);
                      const isSelected = selectedPatientIds.includes(
                        patient.id,
                      );
                      const patientReading = isExpanded ? latestReading : null;
                      const visitsForPatient = patientVisits[patient.id];
                      const isVisitsLoading = Boolean(visitsLoading[patient.id]);
                      const visitsLoadError = visitsError[patient.id] || "";
                      const isVisitFormOpen = Boolean(showVisitForm[patient.id]);
                      const isVisitSaving = Boolean(visitSubmitting[patient.id]);
                      const visitMessage =
                        visitFormMessage.patientId === patient.id &&
                        visitFormMessage.text
                          ? visitFormMessage
                          : null;
                      const sortedVisits = sortVisitsNewestFirst(
                        visitsForPatient,
                      );

                      return (
                        <article
                          key={patient.id}
                          onClick={() =>
                            isSelectingPatients &&
                            togglePatientSelection(patient.id)
                          }
                          style={{
                            border: isSelected
                              ? "2px solid #548b80"
                              : "1px solid rgba(100,120,130,.22)",
                            borderRadius: "14px",
                            padding: "18px",
                            textAlign: isArabic ? "right" : "left",
                            background: isSelected
                              ? "rgba(84,139,128,.10)"
                              : "rgba(255,255,255,.7)",
                            cursor: isSelectingPatients ? "pointer" : "default",
                            marginBottom: "12px",
                          }}
                        >
                          {/* Compact patient header */}
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              gap: "12px",
                            }}
                          >
                            <div style={{ flex: 1 }}>
                              <h2
                                style={{ fontSize: "18px", margin: "0 0 7px" }}
                              >
                                {patient.full_name ||
                                  (isArabic
                                    ? "اسم غير متاح"
                                    : "Name unavailable")}
                              </h2>

                              <p style={{ margin: 0, color: "#667085" }}>
                                <strong>
                                  {isArabic ? "رقم المريض:" : "Patient ID:"}
                                </strong>{" "}
                                {patient.patient_code || `#${patient.id}`}
                              </p>
                            </div>

                            {isSelectingPatients ? (
                              <input
                                type="checkbox"
                                aria-label={
                                  isArabic ? "تحديد المريض" : "Select patient"
                                }
                                checked={isSelected}
                                onChange={() =>
                                  togglePatientSelection(patient.id)
                                }
                                onClick={(event) => event.stopPropagation()}
                              />
                            ) : (
                              <button
                                type="button"
                                aria-label={
                                  isExpanded
                                    ? isArabic
                                      ? "إخفاء التفاصيل"
                                      : "Collapse details"
                                    : isArabic
                                    ? "عرض التفاصيل"
                                    : "Expand details"
                                }
                                onClick={(event) => {
                                  event.stopPropagation();
                                  togglePatientExpansion(patient.id);
                                }}
                                style={{
                                  border: "1px solid rgba(84,139,128,.35)",
                                  borderRadius: "8px",
                                  background: "#fff",
                                  color: "#548b80",
                                  cursor: "pointer",
                                  padding: "7px 12px",
                                  fontSize: "18px",
                                }}
                              >
                                {isExpanded ? "▲" : "▼"}
                              </button>
                            )}
                          </div>

                          {/* Expanded patient details */}
                          {isExpanded && !isSelectingPatients && (
                            <div
                              style={{
                                marginTop: "18px",
                                paddingTop: "16px",
                                borderTop: "1px solid rgba(100,120,130,.18)",
                              }}
                            >
                              {/* 01 - Patient Information */}
                              {renderSectionHeading(
                                "01",
                                isArabic ? "بيانات المريض" : "Patient Information",
                              )}

                              <div
                                style={{
                                  display: "grid",
                                  gridTemplateColumns:
                                    "repeat(auto-fit, minmax(200px, 1fr))",
                                  gap: "12px 18px",
                                }}
                              >
                                {renderInfoItem(
                                  isArabic ? "رقم المريض" : "Patient ID",
                                  patient.patient_code || `#${patient.id}`,
                                )}
                                {renderInfoItem(
                                  isArabic ? "الاسم بالكامل" : "Full Name",
                                  patient.full_name,
                                )}
                                {renderInfoItem(
                                  isArabic ? "تاريخ الميلاد" : "Date of Birth",
                                  formatPatientDate(patient.date_of_birth),
                                )}
                                {renderInfoItem(
                                  isArabic ? "النوع" : "Gender",
                                  getPatientGender(patient.gender),
                                )}
                                {renderInfoItem(
                                  isArabic ? "رقم الهاتف" : "Phone",
                                  patient.phone_number || patient.phone,
                                )}
                                {renderInfoItem(
                                  isArabic ? "هاتف الطوارئ" : "Emergency Contact",
                                  patient.emergency_contact_phone,
                                )}
                                {renderInfoItem(
                                  isArabic ? "فصيلة الدم" : "Blood Type",
                                  patient.blood_type,
                                )}
                                {renderInfoItem(
                                  isArabic ? "تاريخ الإضافة" : "Added",
                                  formatPatientDate(patient.created_at),
                                )}
                                {renderInfoItem(
                                  isArabic ? "الحساسية" : "Allergies",
                                  patient.allergies,
                                  true,
                                )}
                                {renderInfoItem(
                                  isArabic ? "التاريخ المرضي" : "Medical History",
                                  patient.medical_history,
                                  true,
                                )}
                                {renderInfoItem(
                                  isArabic
                                    ? "وصف الحالة المبدئية"
                                    : "Initial Case Description",
                                  patient.initial_case_description,
                                  true,
                                )}
                              </div>

                              {/* Live vital readings */}
                              <div
                                style={{
                                  marginTop: "20px",
                                  padding: "16px",
                                  borderRadius: "12px",
                                  background: "rgba(84,139,128,.07)",
                                }}
                              >
                                {renderSectionHeading(
                                  "02",
                                  isArabic
                                    ? "القراءات الحيوية المباشرة"
                                    : "Live Sensor Readings",
                                )}

                                {readingLoading && !patientReading ? (
                                  <p>
                                    {isArabic
                                      ? "جاري تحميل القراءات..."
                                      : "Loading readings..."}
                                  </p>
                                ) : readingError ? (
                                  <p style={{ color: "#b42318" }}>
                                    {readingError}
                                  </p>
                                ) : !patientReading ? (
                                  <p style={{ color: "#667085" }}>
                                    {isArabic
                                      ? "لا توجد قراءات حيوية مسجلة لهذا المريض حتى الآن."
                                      : "No vital sign readings are available for this patient yet."}
                                  </p>
                                ) : (
                                  <>
                                    <div
                                      style={{
                                        display: "grid",
                                        gridTemplateColumns:
                                          "repeat(auto-fit, minmax(130px, 1fr))",
                                        gap: "12px",
                                      }}
                                    >
                                      <div>
                                        <strong>
                                          {isArabic
                                            ? "معدل القلب"
                                            : "Heart Rate"}
                                        </strong>
                                        <p>
                                          {patientReading.heart_rate ?? "—"}
                                          {patientReading.heart_rate != null &&
                                            " BPM"}
                                        </p>
                                      </div>

                                      <div>
                                        <strong>SpO₂</strong>
                                        <p>
                                          {patientReading.spo2 ?? "—"}
                                          {patientReading.spo2 != null && "%"}
                                        </p>
                                      </div>

                                      <div>
                                        <strong>
                                          {isArabic
                                            ? "درجة الحرارة"
                                            : "Temperature"}
                                        </strong>
                                        <p>
                                          {patientReading.temperature ?? "—"}
                                          {patientReading.temperature != null &&
                                            " °C"}
                                        </p>
                                      </div>

                                      <div>
                                        <strong>ECG</strong>
                                        <p>
                                          {patientReading.ecg_file_reference ||
                                            (isArabic
                                              ? "لا يوجد ملف ECG"
                                              : "No ECG file available")}
                                        </p>
                                      </div>
                                    </div>

                                    <p
                                      style={{
                                        marginBottom: 0,
                                        color: "#667085",
                                      }}
                                    >
                                      <strong>
                                        {isArabic
                                          ? "آخر تحديث:"
                                          : "Last updated:"}
                                      </strong>{" "}
                                      {formatPatientDateTime(
                                        patientReading.recorded_at ||
                                          patientReading.received_at,
                                      )}
                                    </p>
                                  </>
                                )}
                              </div>

                              {/* 03 - Medical Visits */}
                              <section
                                className="medical-visits-section"
                                style={{
                                  marginTop: "20px",
                                  padding: "16px",
                                  borderRadius: "12px",
                                  border: "1px solid rgba(100,120,130,.18)",
                                }}
                              >
                                {/* Medical Visits Header + Add Visit Button */}
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    gap: "12px",
                                    flexWrap: "wrap",
                                    marginBottom: "12px",
                                  }}
                                >
                                  {renderSectionHeading(
                                    "03",
                                    isArabic ? "الزيارات الطبية" : "Medical Visits",
                                  )}

                                  {!isVisitFormOpen && (
                                    <button
                                      type="button"
                                      className="button-primary"
                                      onClick={() => {
                                        resetNewVisit();
                                        setVisitFormMessage({
                                          patientId: null,
                                          type: "",
                                          text: "",
                                        });
                                        setShowVisitForm((prev) => ({
                                          ...prev,
                                          [patient.id]: true,
                                        }));
                                      }}
                                    >
                                      {isArabic
                                        ? "+ إضافة زيارة طبية"
                                        : "Add Medical Visit"}
                                    </button>
                                  )}
                                </div>

                                {/* Success / validation / save messages */}
                                {visitMessage && (
                                  <p
                                    role={
                                      visitMessage.type === "error"
                                        ? "alert"
                                        : "status"
                                    }
                                    className={`form-message ${visitMessage.type}`}
                                  >
                                    {visitMessage.text}
                                  </p>
                                )}

                                {/* Add Visit Form */}
                                {isVisitFormOpen && (
                                  <form
                                    onSubmit={(event) =>
                                      handleSubmitVisitForm(event, patient.id)
                                    }
                                    style={{
                                      marginBottom: "16px",
                                      padding: "14px",
                                      borderRadius: "10px",
                                      background: "rgba(255,255,255,.8)",
                                      border: "1px solid rgba(100,120,130,.18)",
                                    }}
                                  >
                                    <div
                                      style={{
                                        display: "grid",
                                        gridTemplateColumns:
                                          "repeat(auto-fit, minmax(200px, 1fr))",
                                        gap: "12px",
                                      }}
                                    >
                                      <div className="form-group">
                                        <label>
                                          {isArabic
                                            ? "تاريخ الدخول *"
                                            : "Admission Date *"}
                                        </label>
                                        <input
                                          type="date"
                                          required
                                          value={newVisit.admission_date}
                                          onChange={(e) =>
                                            setNewVisit((v) => ({
                                              ...v,
                                              admission_date: e.target.value,
                                            }))
                                          }
                                        />
                                      </div>

                                      <div className="form-group">
                                        <label>
                                          {isArabic ? "القسم" : "Department"}
                                        </label>
                                        <input
                                          value={newVisit.department}
                                          onChange={(e) =>
                                            setNewVisit((v) => ({
                                              ...v,
                                              department: e.target.value,
                                            }))
                                          }
                                        />
                                      </div>

                                      <div className="form-group">
                                        <label>
                                          {isArabic
                                            ? "تاريخ الخروج"
                                            : "Discharge Date"}
                                        </label>
                                        <input
                                          type="date"
                                          min={newVisit.admission_date || undefined}
                                          value={newVisit.discharge_date}
                                          onChange={(e) =>
                                            setNewVisit((v) => ({
                                              ...v,
                                              discharge_date: e.target.value,
                                            }))
                                          }
                                        />
                                      </div>
                                    </div>

                                    <div className="form-group">
                                      <label>
                                        {isArabic
                                          ? "الشكوى الرئيسية"
                                          : "Chief Complaints"}
                                      </label>
                                      <textarea
                                        rows="2"
                                        value={newVisit.chief_complaints}
                                        onChange={(e) =>
                                          setNewVisit((v) => ({
                                            ...v,
                                            chief_complaints: e.target.value,
                                          }))
                                        }
                                      />
                                    </div>

                                    <div className="form-group">
                                      <label>
                                        {isArabic ? "التشخيص" : "Diagnosis"}
                                      </label>
                                      <textarea
                                        rows="2"
                                        value={newVisit.diagnosis}
                                        onChange={(e) =>
                                          setNewVisit((v) => ({
                                            ...v,
                                            diagnosis: e.target.value,
                                          }))
                                        }
                                      />
                                    </div>

                                    <div className="form-group">
                                      <label>
                                        {isArabic ? "خطة العلاج" : "Treatment Plan"}
                                      </label>
                                      <textarea
                                        rows="2"
                                        value={newVisit.treatment_plan}
                                        onChange={(e) =>
                                          setNewVisit((v) => ({
                                            ...v,
                                            treatment_plan: e.target.value,
                                          }))
                                        }
                                      />
                                    </div>

                                    <div className="form-group">
                                      <label>
                                        {isArabic
                                          ? "الأدوية الموصوفة"
                                          : "Prescribed Medications"}
                                      </label>
                                      <textarea
                                        rows="2"
                                        value={newVisit.prescribed_medications}
                                        onChange={(e) =>
                                          setNewVisit((v) => ({
                                            ...v,
                                            prescribed_medications:
                                              e.target.value,
                                          }))
                                        }
                                      />
                                    </div>

                                    <div className="form-group">
                                      <label>
                                        {isArabic
                                          ? "الحالة الطبية الحالية"
                                          : "Current Medical Condition"}
                                      </label>
                                      <textarea
                                        rows="2"
                                        value={newVisit.current_medical_condition}
                                        onChange={(e) =>
                                          setNewVisit((v) => ({
                                            ...v,
                                            current_medical_condition:
                                              e.target.value,
                                          }))
                                        }
                                      />
                                    </div>

                                    <div
                                      style={{
                                        display: "flex",
                                        gap: "10px",
                                        flexWrap: "wrap",
                                      }}
                                    >
                                      <button
                                        type="submit"
                                        className="button-primary"
                                        disabled={isVisitSaving}
                                      >
                                        {isVisitSaving
                                          ? isArabic
                                            ? "جارٍ الحفظ..."
                                            : "Saving..."
                                          : isArabic
                                          ? "حفظ الزيارة"
                                          : "Save Visit"}
                                      </button>
                                      <button
                                        type="button"
                                        className="button-secondary"
                                        disabled={isVisitSaving}
                                        onClick={() => {
                                          resetNewVisit();
                                          setVisitFormMessage({
                                            patientId: null,
                                            type: "",
                                            text: "",
                                          });
                                          setShowVisitForm((prev) => ({
                                            ...prev,
                                            [patient.id]: false,
                                          }));
                                        }}
                                      >
                                        {isArabic ? "إلغاء" : "Cancel"}
                                      </button>
                                    </div>
                                  </form>
                                )}

                                {/* Loading / Error / Empty / Loaded */}
                                {isVisitsLoading && !visitsForPatient ? (
                                  <p role="status">
                                    {isArabic
                                      ? "جاري تحميل الزيارات..."
                                      : "Loading medical visits..."}
                                  </p>
                                ) : visitsLoadError ? (
                                  <div role="alert">
                                    <p style={{ color: "#b42318" }}>
                                      {isArabic
                                        ? "تعذر تحميل الزيارات"
                                        : "Unable to load medical visits"}
                                      {visitsLoadError
                                        ? ` — ${visitsLoadError}`
                                        : ""}
                                    </p>
                                    <button
                                      type="button"
                                      className="button-secondary"
                                      onClick={() => loadPatientVisits(patient.id)}
                                    >
                                      {isArabic ? "إعادة المحاولة" : "Try Again"}
                                    </button>
                                  </div>
                                ) : sortedVisits.length === 0 ? (
                                  <p style={{ color: "#667085" }}>
                                    {isArabic
                                      ? "لا توجد زيارات طبية حتى الآن."
                                      : "No medical visits yet"}
                                  </p>
                                ) : (
                                  <div style={{ display: "grid", gap: "12px" }}>
                                    {sortedVisits.map((visit, index) => (
                                      <article
                                        key={
                                          visit.id ||
                                          visit.visit_id ||
                                          `${visit.admission_date}-${index}`
                                        }
                                        style={{
                                          padding: "14px",
                                          borderRadius: "10px",
                                          background: "rgba(255,255,255,.85)",
                                          border:
                                            "1px solid rgba(100,120,130,.18)",
                                        }}
                                      >
                                        {visit.status && (
                                          <span
                                            style={{
                                              display: "inline-block",
                                              marginBottom: "10px",
                                              padding: "3px 10px",
                                              borderRadius: "999px",
                                              background: "rgba(84,139,128,.15)",
                                              color: "#2f6b60",
                                              fontSize: "12px",
                                              fontWeight: 700,
                                              textTransform: "capitalize",
                                            }}
                                          >
                                            {visit.status}
                                          </span>
                                        )}

                                        <div
                                          style={{
                                            display: "grid",
                                            gridTemplateColumns:
                                              "repeat(auto-fit, minmax(190px, 1fr))",
                                            gap: "10px 16px",
                                          }}
                                        >
                                          {renderInfoItem(
                                            isArabic
                                              ? "تاريخ الدخول"
                                              : "Admission Date",
                                            formatPatientDate(
                                              visit.admission_date,
                                            ),
                                          )}
                                          {renderInfoItem(
                                            isArabic ? "القسم" : "Department",
                                            visit.department,
                                          )}
                                          {renderInfoItem(
                                            isArabic
                                              ? "تاريخ الخروج"
                                              : "Discharge Date",
                                            formatPatientDate(
                                              visit.discharge_date,
                                            ),
                                          )}
                                          {renderInfoItem(
                                            isArabic
                                              ? "الشكوى الرئيسية"
                                              : "Chief Complaints",
                                            visit.chief_complaints,
                                            true,
                                          )}
                                          {renderInfoItem(
                                            isArabic ? "التشخيص" : "Diagnosis",
                                            visit.diagnosis,
                                            true,
                                          )}
                                          {renderInfoItem(
                                            isArabic
                                              ? "خطة العلاج"
                                              : "Treatment Plan",
                                            visit.treatment_plan,
                                            true,
                                          )}
                                          {renderInfoItem(
                                            isArabic
                                              ? "الأدوية الموصوفة"
                                              : "Prescribed Medications",
                                            visit.prescribed_medications,
                                            true,
                                          )}
                                          {renderInfoItem(
                                            isArabic
                                              ? "الحالة الطبية الحالية"
                                              : "Current Medical Condition",
                                            visit.current_medical_condition,
                                            true,
                                          )}
                                        </div>
                                      </article>
                                    ))}
                                  </div>
                                )}
                              </section>
                            </div>
                          )}
                        </article>
                      );
                    })}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ADD PATIENT MODAL */}
      {showAddPatient && (
        <div
          onClick={() => !patientSubmitting && setShowAddPatient(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            background: "rgba(15,25,30,.58)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            overflowY: "auto",
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-patient-title"
            onClick={(event) => event.stopPropagation()}
            className="auth-card"
            style={{
              width: "100%",
              maxWidth: "720px",
              maxHeight: "90vh",
              overflowY: "auto",
              margin: "auto",
            }}
          >
            <h2 id="add-patient-title">
              {isArabic ? "إضافة مريض جديد" : "Add New Patient"}
            </h2>
            <form onSubmit={handleCreatePatient}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                  gap: "14px",
                }}
              >
                <div className="form-group">
                  <label>{isArabic ? "الاسم بالكامل *" : "Full Name *"}</label>
                  <input
                    required
                    value={newPatient.full_name}
                    onChange={(e) =>
                      setNewPatient((v) => ({
                        ...v,
                        full_name: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="form-group">
                  <label>{isArabic ? "تاريخ الميلاد" : "Date of Birth"}</label>
                  <input
                    type="date"
                    value={newPatient.date_of_birth}
                    onChange={(e) =>
                      setNewPatient((v) => ({
                        ...v,
                        date_of_birth: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="form-group">
                  <label>{isArabic ? "النوع" : "Gender"}</label>
                  <select
                    value={newPatient.gender}
                    onChange={(e) =>
                      setNewPatient((v) => ({ ...v, gender: e.target.value }))
                    }
                  >
                    <option value="">
                      {isArabic ? "اختر النوع" : "Select gender"}
                    </option>
                    <option value="male">{isArabic ? "ذكر" : "Male"}</option>
                    <option value="female">
                      {isArabic ? "أنثى" : "Female"}
                    </option>
                  </select>
                </div>
                <div className="form-group">
                  <label>{isArabic ? "رقم الهاتف" : "Phone Number"}</label>
                  <input
                    type="tel"
                    value={newPatient.phone_number}
                    onChange={(e) =>
                      setNewPatient((v) => ({
                        ...v,
                        phone_number: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="form-group">
                  <label>
                    {isArabic ? "هاتف الطوارئ" : "Emergency Contact Phone"}
                  </label>
                  <input
                    type="tel"
                    value={newPatient.emergency_contact_phone}
                    onChange={(e) =>
                      setNewPatient((v) => ({
                        ...v,
                        emergency_contact_phone: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="form-group">
                  <label>{isArabic ? "فصيلة الدم" : "Blood Type"}</label>
                  <select
                    value={newPatient.blood_type}
                    onChange={(e) =>
                      setNewPatient((v) => ({
                        ...v,
                        blood_type: e.target.value,
                      }))
                    }
                  >
                    <option value="">
                      {isArabic ? "اختر فصيلة الدم" : "Select blood type"}
                    </option>
                    {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                      (type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ),
                    )}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>{isArabic ? "الحساسية" : "Allergies"}</label>
                <textarea
                  rows="2"
                  value={newPatient.allergies}
                  onChange={(e) =>
                    setNewPatient((v) => ({ ...v, allergies: e.target.value }))
                  }
                />
              </div>
              <div className="form-group">
                <label>{isArabic ? "التاريخ المرضي" : "Medical History"}</label>
                <textarea
                  rows="2"
                  value={newPatient.medical_history}
                  onChange={(e) =>
                    setNewPatient((v) => ({
                      ...v,
                      medical_history: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="form-group">
                <label>
                  {isArabic ? "وصف الحالة الأولي" : "Initial Case Description"}
                </label>
                <textarea
                  rows="3"
                  value={newPatient.initial_case_description}
                  onChange={(e) =>
                    setNewPatient((v) => ({
                      ...v,
                      initial_case_description: e.target.value,
                    }))
                  }
                />
              </div>
              {patientActionError && (
                <p role="alert" className="form-message error">
                  {patientActionError}
                </p>
              )}
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "10px",
                  flexWrap: "wrap",
                }}
              >
                <button
                  type="button"
                  className="button-secondary"
                  disabled={patientSubmitting}
                  onClick={() => {
                    setShowAddPatient(false);
                    resetNewPatient();
                  }}
                >
                  {isArabic ? "إلغاء" : "Cancel"}
                </button>
                <button
                  type="submit"
                  className="button-primary"
                  disabled={patientSubmitting}
                >
                  {patientSubmitting
                    ? isArabic
                      ? "جارٍ الحفظ..."
                      : "Saving..."
                    : isArabic
                    ? "إضافة المريض"
                    : "Create Patient"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EMAIL VERIFICATION PAGE */}

      {currentPage === "verify" && (
        <section className="auth-page">
          <div className="auth-container">
            <div className="auth-card">
              <div className="auth-logo">
                <img src={hisnLogo} alt="HISN Logo" />
              </div>

              <span className="slide-kicker">HISN</span>

              <h1>{text.verificationTitle}</h1>

              <p className="auth-subtitle">
                {isSubmitting ? text.verifyingEmail : formMessage.text}
              </p>

              {!isSubmitting && formMessage.text && (
                <div className={`form-message ${formMessage.type}`}>
                  {formMessage.text}
                </div>
              )}

              {!isSubmitting && formMessage.type === "success" && (
                <button
                  className="button-primary auth-submit"
                  onClick={() => openPage("login")}
                >
                  {text.loginButton}
                </button>
              )}

              <button className="button-secondary auth-submit" onClick={goHome}>
                {text.back}
              </button>
            </div>
          </div>
        </section>
      )}

      {/* FORGOT PASSWORD PAGE */}

      {currentPage === "forgot" && (
        <section className="auth-page">
          <div className="auth-container">
            <button
              className="button-secondary"
              onClick={() => openPage("login")}
            >
              {isArabic ? "→" : "←"} {text.login}
            </button>

            <div className="auth-card">
              <div className="auth-logo">
                <img src={hisnLogo} alt="HISN Logo" />
              </div>

              <span className="slide-kicker">HISN</span>

              <h1>{text.forgotTitle}</h1>

              <p className="auth-subtitle">{text.forgotSubtitle}</p>

              <form onSubmit={handleForgotPassword}>
                <div className="form-group">
                  <label htmlFor="forgot-email">{text.email}</label>

                  <input
                    id="forgot-email"
                    type="email"
                    placeholder={text.emailPlaceholder}
                    value={forgotEmail}
                    onChange={(event) => setForgotEmail(event.target.value)}
                    autoComplete="email"
                    required
                  />
                </div>

                {formMessage.text && (
                  <div className={`form-message ${formMessage.type}`}>
                    {formMessage.text}
                  </div>
                )}

                <button
                  type="submit"
                  className="button-primary auth-submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? text.sendingResetLink : text.sendResetLink}
                </button>
              </form>

              <div className="auth-switch">
                <button className="text-link" onClick={() => openPage("login")}>
                  {text.backToLogin}
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* RESET PASSWORD PAGE */}

      {currentPage === "reset" && (
        <section className="auth-page">
          <div className="auth-container">
            <div className="auth-card">
              <div className="auth-logo">
                <img src={hisnLogo} alt="HISN Logo" />
              </div>

              <span className="slide-kicker">HISN</span>

              <h1>{text.resetPasswordTitle}</h1>

              <p className="auth-subtitle">{text.resetPasswordSubtitle}</p>

              {resetToken ? (
                <form onSubmit={handleResetPassword}>
                  <div className="form-group">
                    <label htmlFor="reset-new-password">
                      {text.newPassword}
                    </label>

                    <div className="password-wrapper">
                      <input
                        id="reset-new-password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder={text.passwordPlaceholder}
                        value={resetData.password}
                        onChange={updateResetData}
                        autoComplete="new-password"
                        minLength={8}
                        required
                      />

                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? text.hidePassword : text.showPassword}
                      </button>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="reset-confirm-password">
                      {text.confirmNewPassword}
                    </label>

                    <div className="password-wrapper">
                      <input
                        id="reset-confirm-password"
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        placeholder={text.confirmPasswordPlaceholder}
                        value={resetData.confirmPassword}
                        onChange={updateResetData}
                        autoComplete="new-password"
                        required
                      />

                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword
                          ? text.hidePassword
                          : text.showPassword}
                      </button>
                    </div>
                  </div>

                  {formMessage.text && (
                    <div className={`form-message ${formMessage.type}`}>
                      {formMessage.text}
                    </div>
                  )}

                  {formMessage.type === "success" ? (
                    <button
                      type="button"
                      className="button-primary auth-submit"
                      onClick={() => openPage("login")}
                    >
                      {text.backToLogin}
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="button-primary auth-submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting
                        ? text.resettingPassword
                        : text.resetPasswordButton}
                    </button>
                  )}
                </form>
              ) : (
                <>
                  {formMessage.text && (
                    <div className={`form-message ${formMessage.type}`}>
                      {formMessage.text}
                    </div>
                  )}

                  <button
                    className="button-primary auth-submit"
                    onClick={() => openPage("forgot")}
                  >
                    {text.forgot}
                  </button>

                  <button
                    className="button-secondary auth-submit"
                    onClick={() => openPage("login")}
                  >
                    {text.backToLogin}
                  </button>
                </>
              )}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

export default App;
