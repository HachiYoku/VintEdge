import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../../api/client";

const VerifyEmail = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = params.get("token");
    if (!token) {
      navigate("/verify-failed", { replace: true });
      return;
    }

    api
      .get(`/user/verify-email?token=${encodeURIComponent(token)}`)
      .then(() => navigate("/verify-success", { replace: true }))
      .catch(() => navigate("/verify-failed", { replace: true }));
  }, [navigate, params]);

  return <div style={{ textAlign: "center", marginTop: 50 }}>Verifying...</div>;
};

export default VerifyEmail;
