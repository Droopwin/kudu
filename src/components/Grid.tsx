import React from 'react';
import { Row, Col } from 'antd';
import Kudu from "../types/Kudu";
import KuduCard from "./KuduCard";

const KuduGrid: React.FC<{ kudus: Kudu[] }> = ({kudus}) =>
    <Row gutter={[40, 40]} key="kudus">
        {kudus.map((kudu: Kudu) =>
            <Col xs={24} sm={24} md={12} lg={8} xl={4} key={kudu.name}>
                <KuduCard kudu={kudu} />
            </Col>
        )}
    </Row>;

export default KuduGrid;