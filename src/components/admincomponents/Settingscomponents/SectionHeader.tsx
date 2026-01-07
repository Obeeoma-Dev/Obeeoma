import React from "react";

const SectionHeader: React.FC<{ title: string; subtitle?: string }> = ({
  title,
  subtitle,
}) => {
  return (
    <div style={{ marginBottom: 8 }}>
      <div
        style={{ fontSize: 14, fontWeight: 700, color: "var(--obeeoma-text)" }}
      >
        {title}
      </div>
      {subtitle && (
        <div
          style={{ fontSize: 12, color: "var(--obeeoma-muted)", marginTop: 4 }}
        >
          {subtitle}
        </div>
      )}
    </div>
  );
};

export default SectionHeader;
