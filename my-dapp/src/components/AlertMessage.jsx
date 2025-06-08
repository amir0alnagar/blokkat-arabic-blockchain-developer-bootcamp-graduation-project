import { useEffect, useState } from "react";

const AlertMessage = ({ type = "info", message, duration = 5000 }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  const typeClasses = {
    info: "bg-blue-100 border-blue-400 text-blue-700",
    warning: "bg-yellow-100 border-yellow-400 text-yellow-700",
    error: "bg-red-100 border-red-400 text-red-700",
    success: "bg-green-100 border-green-400 text-green-700",
  };

  return (
    <div
      className={`fixed top-20 left-1/2 transform -translate-x-1/2 px-6 py-4 rounded-xl border text-center z-50 shadow-lg ${typeClasses[type]}`}
      role="alert"
    >
      <strong className="font-bold">{message}</strong>
    </div>
  );
};

export default AlertMessage;
