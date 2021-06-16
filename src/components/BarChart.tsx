import React from 'react';
import Kudu from "../types/Kudu";
import {Bar} from "react-chartjs-2";
import {groupBy} from 'lodash';

const options = {
    scales: {
        yAxes: [
            {
                ticks: {
                    beginAtZero: true,
                },
            },
        ],
    },
};

const BarChart: React.FC<{ kudus: Kudu[] }> = ({kudus}) => {
    const groupByHorns = groupBy(kudus, 'horns');
    const numberByCategories = Object.keys(groupByHorns)
        .sort((a, b) =>
            groupByHorns[a].length - groupByHorns[b].length)
        .map(key => ([key, groupByHorns[key].length]));
    const data = {
        labels: numberByCategories.map(v => v[0]),
        datasets: [
            {
                label: 'Species',
                data: numberByCategories.map(v => v[1]),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };
    return <Bar data={data} options={options}  type="bar"/>;
};

export default BarChart;