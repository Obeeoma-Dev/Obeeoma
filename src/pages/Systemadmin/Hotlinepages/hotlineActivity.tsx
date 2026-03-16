// src/pages/Systemadmin/Hotlinepages/hotlineActivity.tsx

import React, { useState, useEffect } from "react";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import SystemAdminLayout from "../../../components/admincomponents/shared/SystemAdminLayout";
import TopMetrics from "../../../components/admincomponents/Hotlinecomponents/hotLinetopmetrics";
import HourlyCallChart from "../../../components/admincomponents/Hotlinecomponents/hourlyCallChart";
import CallReasonsChart from "../../../components/admincomponents/Hotlinecomponents/callsResourcesChart";
import CallLogTable, {
  type CallLog,
} from "../../../components/admincomponents/Hotlinecomponents/callLogTable";
import CriticalCases, {
  type Case,
} from "../../../components/admincomponents/Hotlinecomponents/criticalCases";
import OperatorPerformance, {
  type Operator,
} from "../../../components/admincomponents/Hotlinecomponents/operatorPerformance";
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
  call_reasons?: Array<{ reason?: string; count?: number }>;
  recent_calls?: Array<{
    call_date?: string;
    reason?: string;
    operator_name?: string;
    status?: string;
  }>;
  critical_cases?: Array<{
    call_id?: string;
    reason?: string;
    status?: string;
    operator_name?: string;
    urgency?: string;
  }>;
  operator_performance?: Array<{
    name?: string;
    calls?: number;
    resolution_rate?: number;
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
  const callReasons = data?.call_reasons;

  const logs: CallLog[] = (data?.recent_calls ?? []).map((c) => {
    const { time, date } = formatCallDate(c.call_date ?? "");
    return {
      time,
      date,
      reason:
        (c.reason ?? "").charAt(0).toUpperCase() + (c.reason ?? "").slice(1),
      operator: c.operator_name ?? "—",
      status:
        (c.status ?? "").charAt(0).toUpperCase() + (c.status ?? "").slice(1),
    };
  });

  const criticalCasesList: Case[] = (data?.critical_cases ?? []).map((c) => ({
    id: c.call_id ?? "",
    reason:
      (c.reason ?? "").charAt(0).toUpperCase() + (c.reason ?? "").slice(1),
    status:
      (c.status ?? "").charAt(0).toUpperCase() + (c.status ?? "").slice(1),
    assignedTo: c.operator_name ?? "—",
    type: (c.urgency === "critical" ? "critical" : "warning") as
      | "critical"
      | "warning",
  }));

  const operatorList: Operator[] = (data?.operator_performance ?? []).map(
    (o) => ({
      name: o.name ?? "—",
      // eslint-disable-next-line no-constant-binary-expression
      performance: Number(o.resolution_rate) ?? 0,
      calls: o.calls,
    }),
  );

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
          <TopMetrics totalCalls={0} avgCallTime="0:00" />
          <Row>
            <Col md={6}>
              <HourlyCallChart />
            </Col>
            <Col md={6}>
              <CallReasonsChart />
            </Col>
          </Row>
          <CallLogTable />
          <Row className="g-4">
            <Col xs={12} lg={6}>
              <CriticalCases />
            </Col>
            <Col xs={12} lg={6}>
              <OperatorPerformance />
            </Col>
          </Row>
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
          activeOperators={activeOperators}
        />
        <Row>
          <Col md={6}>
            <HourlyCallChart hourlyVolume={hourlyVolume} />
          </Col>
          <Col md={6}>
            <CallReasonsChart callReasons={callReasons} />
          </Col>
        </Row>
        <CallLogTable logs={logs.length ? logs : undefined} />
        <Row className="g-4">
          <Col xs={12} lg={6}>
            <CriticalCases
              cases={criticalCasesList.length ? criticalCasesList : undefined}
            />
          </Col>
          <Col xs={12} lg={6}>
            <OperatorPerformance
              operators={operatorList.length ? operatorList : undefined}
            />
          </Col>
        </Row>
      </Container>
    </SystemAdminLayout>
  );
};

export default HotlineActivity;
