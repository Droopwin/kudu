import React from 'react';
import {Avatar, Table, Tag, Tooltip} from 'antd';
import Kudu, {HornsType} from '../types/Kudu';
import {HORNS_COLORS} from "../consts";
import {ColumnType} from "antd/es/table";


const columns: ColumnType<Kudu>[] = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        fixed: 'left',
        width: 150,
        render: (name: string, {picture}: Kudu) =>
            <Tooltip
                key={name}
                placement="top"
                title={() =>
                    <Avatar
                        size={100}
                        icon={<img alt={name} src={picture}/>}
                    />}
            >
                <a>{name}</a>
            </Tooltip>

    },
    {
        title: 'Weight (pounds)',
        dataIndex: 'weight',
        key: 'weight',
        width: 100,
        sorter: (a: Kudu, b: Kudu): number => a.weight - b.weight,
    },
    {
        title: 'Height (inches)',
        dataIndex: 'height',
        key: 'height',
        width: 100,
        sorter: (a: Kudu, b: Kudu): number => a.height - b.height,
    },
    {
        title: 'Continent',
        dataIndex: 'continent',
        key: 'continent',
        width: 100,
    },
    {
        title: 'Horns',
        key: 'horns',
        dataIndex: 'horns',
        width: 100,
        render: (horns: HornsType, {name}: Kudu) => (
            <Tag color={HORNS_COLORS[horns] ?? 'gray'} key={name}>
                {horns}
            </Tag>
        ),
    },
];

const KuduTable: React.FC<{ kudus: Kudu[] }> = ({kudus}) =>
    <Table columns={columns} dataSource={kudus} scroll={{x: 130}}/>;

export default KuduTable;