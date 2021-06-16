import React from 'react';
import Kudu from "../types/Kudu";
import {Line} from "react-chartjs-2";

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

const LineChart: React.FC<{ kudus: Kudu[] }> = ({kudus}) => {
    const weightOnSize = kudus.map(kudu => ({
        name: kudu.name, value: kudu.weight / kudu.height,
    })).sort((a,b) => a.value - b.value)
    const data = {
        labels: weightOnSize.map(kudu => kudu.name),
        datasets: [
            {
                label: 'Weight / Height',
                data: weightOnSize.map(kudu => kudu.value),
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
            },
        ],
    };
    return <Line data={data} options={options}  type="line"/>;
};

export default LineChart;