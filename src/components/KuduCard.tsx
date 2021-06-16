import React from 'react';
import {Avatar, Card, Col, Tooltip} from 'antd';
import Kudu from '../types/Kudu';
import {CompassOutlined, ColumnHeightOutlined} from "@ant-design/icons";

const KuduCard: React.FC<{ kudu: Kudu }> = ({
    kudu: {
        picture, name, continent, height, weight, horns
    }
}) =>
    <Card
        key={name}
        cover={
            <Col style={{marginTop: 8}}>
                <Avatar
                    size={100}
                    icon={<img alt={name} src={picture}/>}
                />
            </Col>
        }
        actions={[
            <Tooltip title={continent} key="continent">
                <CompassOutlined />
            </Tooltip>,
            <Tooltip title={`${height} inches`} key="height">
                <ColumnHeightOutlined />
            </Tooltip>,
        ]}
    >
        <Card.Meta
            title={name}
            description={`${weight} pounds / ${horns} horns`}
        />
    </Card>;

export default KuduCard;