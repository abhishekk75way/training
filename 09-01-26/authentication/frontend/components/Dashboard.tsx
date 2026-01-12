import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../src/utils/api/api";

interface BlockedIP {
  ip: string;
  ttl?: number;
}

function Dashboard() {
  const [blockedIPs, setBlockedIPs] = useState<BlockedIP[]>([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const fetchBlockedIPs = async () => {
    try {
      setLoading(true);

      const res = await api.get("/admin/blocked-ips", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (Array.isArray(res.data)) {
        setBlockedIPs(res.data);
      } else {
        setBlockedIPs([]);
      }
    } catch (err) {
      console.error("Failed to fetch blocked IPs", err);
      setBlockedIPs([]); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetchBlockedIPs();
  }, []);

  return (
    <div className="dashboard-container top-align">
      <div className="dashboard-card">
        <h2 className="dashboard-title">Admin Dashboard</h2>
        <p className="dashboard-text">
          Manage rate-limited and blocked IPs
        </p>

        {loading ? (
          <p>Loading blocked IPs…</p>
        ) : blockedIPs.length === 0 ? (
          <p>No blocked IPs </p>
        ) : (
          <ul style={{ marginTop: 16 }}>
            {blockedIPs.map((item) => (
              <li key={item.ip} style={{ marginBottom: 8 }}>
                <strong>{item.ip}</strong>
                {item.ttl && (
                  <span style={{ marginLeft: 8, opacity: 0.7 }}>
                    (TTL: {item.ttl}s)
                  </span>
                )}
                <button
                  style={{ marginLeft: 12 }}
                  onClick={async () => {
                    await api.delete(`/admin/blocked-ips/${item.ip}`, {
                      headers: { Authorization: `Bearer ${token}` },
                    });
                    fetchBlockedIPs();
                  }}
                >
                  Unblock
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
