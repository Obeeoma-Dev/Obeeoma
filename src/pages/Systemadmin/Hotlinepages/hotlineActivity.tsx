// src/pages/Systemadmin/Hotlinepages/hotlineActivity.tsx

import React, { useState, useEffect } from "react";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";

// Importing shared layout components
import SystemAdminLayout from "../../../components/admincomponents/shared/SystemAdminLayout";

// Importing dashboard modules
import TopMetrics from "../../../components/admincomponents/Hotlinecomponents/hotLinetopmetrics";
import HourlyCallChart from "../../../components/admincomponents/Hotlinecomponents/hourlyCallChart";
import CallLogTable from "../../../components/admincomponents/Hotlinecomponents/callLogTable";

// Define CallLog interface locally since import is failing
interface CallLog {
  time: string;
  date: string;
  operator: string;
  status: string;
}
import { adminAPI } from "../../../api/apiConfig";

function formatCallDate(isoDate: string): { time: string; date: string } {
  try {
    const d = new Date(isoDate);
    return {
      time: d.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
      date: d.toLocaleDateString(),
    };
  } catch {
    return { time: "—", date: "—" };
  }
}

interface HotlineApiResponse {
  today_calls?: number;
  average_duration?: string;
  active_operators?: number;
  hourly_volume?: number[];
  recent_calls?: Array<{
    call_date?: string;
    operator_name?: string;
    status?: string;
  }>;
}

const HotlineActivity: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<HotlineApiResponse | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await adminAPI.getHotlineActivity();
        if (!cancelled) setData(res?.data ?? res ?? null);
      } catch (e: unknown) {
        if (!cancelled)
          setError(
            e instanceof Error ? e.message : "Failed to load hotline data",
          );
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const totalCalls = data?.today_calls ?? 0;
  const avgCallTime = data?.average_duration ?? "0:00";
  const activeOperators = data?.active_operators;
  const hourlyVolume = data?.hourly_volume;

  const logs: CallLog[] = (data?.recent_calls ?? []).map((c) => {
    const { time, date } = formatCallDate(c.call_date ?? "");
    return {
      time,
      date,
      operator: c.operator_name ?? "—",
      status:
        (c.status ?? "").charAt(0).toUpperCase() + (c.status ?? "").slice(1),
    };
  });

  if (loading) {
    return (
      <SystemAdminLayout title="Hotline Activity">
        <Container
          fluid
          className="py-4 d-flex justify-content-center align-items-center min-vh-50"
        >
          <Spinner animation="border" />
        </Container>
      </SystemAdminLayout>
    );
  }

  if (error) {
    return (
      <SystemAdminLayout title="Hotline Activity">
        <Container fluid className="py-4">
          <Alert variant="danger">{error}</Alert>
          <TopMetrics totalCalls={0} avgCallTime="0:00" missedCalls={0} />
          <Row>
            <Col md={12}>
              <HourlyCallChart />
            </Col>
          </Row>
          <CallLogTable />
        </Container>
      </SystemAdminLayout>
    );
  }

  return (
    <SystemAdminLayout title="Hotline Activity">
      <Container fluid>
        <TopMetrics
          totalCalls={totalCalls}
          avgCallTime={avgCallTime}
          missedCalls={0}
        />
        <Row>
          <Col md={12}>
            <HourlyCallChart />
          </Col>
        </Row>
        <CallLogTable logs={logs.length ? logs : undefined} />
      </Container>
    </SystemAdminLayout>
  );
};

export default HotlineActivity;
