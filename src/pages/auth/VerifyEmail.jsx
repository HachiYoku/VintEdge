import React, { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../../api/client";

const VerifyEmail = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const hasVerified = useRef(false); // prevent double execution

  useEffect(() => {
    if (hasVerified.current) return;
    hasVerified.current = true;

    const verifyEmail = async () => {
      const token = params.get("token");

      if (!token) {
        navigate("/verify-failed", { replace: true });
        return;
      }

      try {
        const response = await api.get(
          `/user/verify-email?token=${encodeURIComponent(token)}`
        );

        if (response.status === 200) {
          navigate("/verify-success", { replace: true });
        } else {
          navigate("/verify-failed", { replace: true });
        }
      } catch (error) {
        console.error("Verification error:", error.response?.data || error);
        navigate("/verify-failed", { replace: true });
      }
    };

    verifyEmail();
  }, [navigate, params]);

  return (
    <div style={{ textAlign: "center", marginTop: 50 }}>
      Verifying your email...
    </div>
  );
};

export default VerifyEmail;
