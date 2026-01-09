// src/components/imageSection.tsx
import React from "react";
import { Col, Image } from "react-bootstrap";
import Businesswomen from "../../assets/Businesswomen.jpg"; // adjust path

export function ImageSection() {
  return (
    <Col lg={6} className="mb-4 mb-lg-0">
      {/* Fixed-height container with cover fit */}
      <div className="card-scale" style={{ height: "500px" }}>
        <Image
          src={Businesswomen}
          alt="Joyful team celebrating and collaborating"
          fluid
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>
    </Col>
  );
}
