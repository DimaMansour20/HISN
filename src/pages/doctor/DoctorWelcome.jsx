import { useCallback, useEffect, useState } from "react";
import hisnLogo from "../../assets/hisn-logo.png";
import {
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from "../../services/api";
import "./DoctorWelcome.css";

function DoctorWelcome({
  doctor,
  language,
  accessToken,
  onLogout,
  onNavigate,
}) {
  const isArabic = language === "ar";

  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notificationsLoading, setNotificationsLoading] = useState(false);
  const [notificationsError, setNotificationsError] = useState("");

  const text = {
    welcome: isArabic ? "مرحبًا" : "Welcome",
    doctor: isArabic ? "د." : "Dr.",
    emergencyCases: isArabic ? "الحالات الطارئة" : "Emergency Cases",
    patient: isArabic ? "المريض" : "Patient",
    case: isArabic ? "الحالة" : "Case",
    noCases: isArabic ? "لا توجد حالات حرجة حاليًا" : "No Emergency Cases",
    archive: isArabic ? "الأرشيف" : "Archive",
    allPatients: isArabic ? "كل المرضى" : "All Patients",
    logout: isArabic ? "تسجيل الخروج" : "Logout",
    notifications: isArabic ? "الإشعارات" : "Notifications",
    noNotifications: isArabic
      ? "لا توجد إشعارات حاليًا"
      : "No notifications yet",
    markAllRead: isArabic ? "تحديد الكل كمقروء" : "Mark all as read",
    loading: isArabic ? "جارٍ تحميل الإشعارات..." : "Loading notifications...",
    loadError: isArabic
      ? "تعذر تحميل الإشعارات"
      : "Unable to load notifications",
    markRead: isArabic ? "تحديد كمقروء" : "Mark as read",
  };
  const loadNotifications = useCallback(async () => {
    if (!accessToken) return;

    setNotificationsLoading(true);
    setNotificationsError("");

    try {
      const result = await getNotifications(accessToken);

      setNotifications(
        Array.isArray(result.notifications) ? result.notifications : [],
      );

      setUnreadCount(Number(result.unreadCount) || 0);
    } catch (error) {
      setNotificationsError(error.message);
    } finally {
      setNotificationsLoading(false);
    }
  }, [accessToken]);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadNotifications();
    }, 0);

    return () => clearTimeout(timer);
  }, [loadNotifications]);
  const handleMarkAsRead = async (notificationId) => {
    try {
      await markNotificationAsRead(notificationId, accessToken);

      setNotifications((previous) =>
        previous.map((notification) =>
          notification.id === notificationId
            ? { ...notification, is_read: true }
            : notification,
        ),
      );

      setUnreadCount((previous) => Math.max(0, previous - 1));
      setNotificationsError("");
    } catch (error) {
      setNotificationsError(error.message);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllNotificationsAsRead(accessToken);

      setNotifications((previous) =>
        previous.map((notification) => ({
          ...notification,
          is_read: true,
        })),
      );

      setUnreadCount(0);
      setNotificationsError("");
    } catch (error) {
      setNotificationsError(error.message);
    }
  };
  // Only medically confirmed critical cases should be displayed here.
  // This remains empty until connected to the real backend data.
  const emergencyCases = [];

  return (
    <section className="doctor-welcome-page" dir={isArabic ? "rtl" : "ltr"}>
      <header className="doctor-dashboard-header">
        <div className="doctor-dashboard-brand">
          <img src={hisnLogo} alt="HISN Logo" />
          <span>HISN</span>
        </div>

        <div className="doctor-dashboard-header-actions">
          <div className="doctor-notification-area">
            <button
              type="button"
              className="doctor-notification-bell"
              aria-label={text.notifications}
              aria-expanded={isNotificationsOpen}
              onClick={() => setIsNotificationsOpen((previous) => !previous)}
            >
              <span aria-hidden="true">🔔</span>

              {unreadCount > 0 && (
                <span className="doctor-notification-badge">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
            </button>

            {isNotificationsOpen && (
              <div className="doctor-notifications-dropdown">
                <div className="doctor-notifications-header">
                  <h3>{text.notifications}</h3>

                  {unreadCount > 0 && (
                    <button type="button" onClick={handleMarkAllAsRead}>
                      {text.markAllRead}
                    </button>
                  )}
                </div>

                <div className="doctor-notifications-list">
                  {notificationsLoading ? (
                    <p className="notification-empty">{text.loading}</p>
                  ) : notificationsError ? (
                    <p className="notification-error">{notificationsError}</p>
                  ) : notifications.length === 0 ? (
                    <p className="notification-empty">{text.noNotifications}</p>
                  ) : (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`doctor-notification-item ${
                          notification.is_read ? "read" : "unread"
                        }`}
                      >
                        <div className="doctor-notification-content">
                          <strong>{notification.title}</strong>
                          <p>{notification.message}</p>

                          {notification.created_at && (
                            <small>
                              {new Date(notification.created_at).toLocaleString(
                                isArabic ? "ar-EG" : "en-US",
                              )}
                            </small>
                          )}
                        </div>

                        {!notification.is_read && (
                          <button
                            type="button"
                            className="doctor-notification-mark-read"
                            onClick={() => handleMarkAsRead(notification.id)}
                          >
                            {text.markRead}
                          </button>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          <button
            type="button"
            className="doctor-dashboard-logout"
            onClick={onLogout}
          >
            {text.logout}
          </button>
        </div>
      </header>

      <main className="doctor-dashboard-content">
        <section className="doctor-dashboard-greeting">
          <span className="doctor-dashboard-eyebrow">HISN DOCTOR PORTAL</span>
          <h1>
            {text.welcome}, {text.doctor} {doctor?.full_name}
          </h1>
        </section>

        <section className="emergency-cases-section">
          <div className="emergency-cases-heading">
            <div className="emergency-status-indicator" />
            <h2>{text.emergencyCases}</h2>
          </div>

          <div className="emergency-cases-table-wrapper">
            <table className="emergency-cases-table">
              <thead>
                <tr>
                  <th>{text.patient}</th>
                  <th>{text.case}</th>
                </tr>
              </thead>

              <tbody>
                {emergencyCases.length > 0 ? (
                  emergencyCases.map((item) => (
                    <tr key={item.id}>
                      <td>{item.patientName}</td>
                      <td>{item.caseDescription}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2" className="no-emergency-cases">
                      <span className="no-cases-icon">✓</span>
                      <span>{text.noCases}</span>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <nav className="doctor-dashboard-navigation">
          <button
            type="button"
            className="doctor-dashboard-action doctor-dashboard-action-primary"
            onClick={() => onNavigate("archive")}
          >
            {text.archive}
            <span aria-hidden="true">{isArabic ? "←" : "→"}</span>
          </button>

          <button
            type="button"
            className="doctor-dashboard-action doctor-dashboard-action-secondary"
            onClick={() => onNavigate("allPatients")}
          >
            {text.allPatients}
            <span aria-hidden="true">{isArabic ? "←" : "→"}</span>
          </button>
        </nav>
      </main>
    </section>
  );
}

export default DoctorWelcome;
