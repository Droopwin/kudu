import React from 'react';
import {Row, Col, Select, Tag, Slider, Typography} from 'antd';
import Kudu, {HornsType} from "../types/Kudu";
import {uniqBy, minBy, maxBy} from 'lodash';
import {HORNS_COLORS, HORNS_TYPE} from "../consts";
import KuduFilters from "../types/KuduFilters";

export const initialFilters = {
        continent: undefined,
        weights: { min: 0, max: 1000 },
        heights: { min: 0, max: 500 },
        horns: []
};

const Filters: React.FC<{ kudus: Kudu[], changeFilters: React.Dispatch<React.SetStateAction<KuduFilters>> }> = ({kudus, changeFilters}) => {
        const changeHorns = (horns: HornsType[]) => {
                changeFilters((filters): KuduFilters => ({...filters, horns}));
        }

        const changeContinent = (continent: string | undefined) => {
                changeFilters((filters): KuduFilters => ({...filters, continent}));
        }

        const changeWeight = ([min, max]: number[]) => {
                changeFilters((filters): KuduFilters => ({...filters, weights: {min, max}}));
        }

        const changeHeight = ([min, max]: number[]) => {
                changeFilters((filters): KuduFilters => ({...filters, heights: {min, max}}));
        }

        return <Row gutter={[{xs: 8, sm: 16, md: 24, lg: 32}, {xs: 8, sm: 16, md: 24, lg: 32}]}>
                <Col xs={24} sm={24} md={12} lg={6} xl={6} key="horns">
                        <Select
                            mode="multiple"
                            placeholder="Select horn types"
                            allowClear
                            showArrow
                            onChange={changeHorns}
                            tagRender={({label, value, closable, onClose}) =>
                                <Tag
                                    color={HORNS_COLORS[value as HornsType]}
                                    onMouseDown={event => {
                                            event.preventDefault();
                                            event.stopPropagation();
                                    }}
                                    closable={closable}
                                    onClose={onClose}
                                    style={{marginRight: 3}}
                                >
                                        {label}
                                </Tag>
                            }
                            style={{width: '100%'}}
                            options={HORNS_TYPE.map((value: string) => ({value}))}
                        />
                </Col>
                <Col xs={24} sm={24} md={12} lg={6} xl={6} key="continent">
                        <Select
                            showSearch
                            allowClear
                            style={{width: '100%'}}
                            placeholder="Select a continent"
                            optionFilterProp="children"
                            onChange={changeContinent}
                            filterOption={(input, option) =>
                                option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            filterSort={(optionA, optionB) =>
                                optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                            }
                        >
                                {uniqBy<Kudu>(kudus, 'continent').map(
                                    ({continent}: Kudu) =>
                                        <Select.Option
                                            value={continent}
                                            key={continent}
                                        >
                                                {continent}
                                        </Select.Option>)
                                }
                        </Select>
                </Col>
                <Col xs={24} sm={24} md={24} lg={6} xl={6} key="weigth">
                    <Slider
                        range
                        min={minBy<Kudu>(kudus, 'weight')?.weight ?? 0}
                        max={maxBy<Kudu>(kudus, 'weight')?.weight ?? 500}
                        defaultValue={[minBy<Kudu>(kudus, 'weight')?.weight ?? 0, maxBy<Kudu>(kudus, 'weight')?.weight ?? 500]}
                        onChange={changeWeight}
                        style={{width: '100%'}}
                    />
                    <Typography.Text type="secondary">Weight</Typography.Text>
                </Col>
                <Col xs={24} sm={24} md={24} lg={6} xl={6} key="height">
                    <Slider
                        range
                        defaultValue={[minBy<Kudu>(kudus, 'height')?.height ?? 0, maxBy<Kudu>(kudus, 'height')?.height ?? 500]}
                        min={minBy<Kudu>(kudus, 'height')?.height ?? 0}
                        max={maxBy<Kudu>(kudus, 'height')?.height ?? 500}
                        onChange={changeHeight}
                        style={{width: '100%'}}
                    />
                    <Typography.Text type="secondary">Height</Typography.Text>
                </Col>
        </Row>;
};

export default Filters;