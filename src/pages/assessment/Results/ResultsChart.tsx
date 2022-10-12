import React from 'react';
import Chart from 'react-apexcharts';
import { Card } from 'react-bootstrap';
import { ApexOptions } from 'apexcharts';

// components
import Loader from '../../../components/Loader';

// types
import { ApexLinearChartData } from '../../charts/data';

interface ResultsChartProps {
    multiRadarChartData: ApexLinearChartData;
    showLoader?: boolean;
}

const ResultsChart = ({ multiRadarChartData, showLoader }: ResultsChartProps) => {
    const options: ApexOptions = {
        plotOptions: {
            radialBar: {
                dataLabels: {
                    name: {
                        fontSize: '22px',
                    },
                    value: {
                        fontSize: '16px',
                    },
                    total: {
                        show: true,
                        label: 'Total',
                        formatter: (w: number) => {

                            let totalVal = 0;
                            for (let index = 0; index < multiRadarChartData.data.length; index++) {
                                const element = multiRadarChartData.data[index] as number;
                                totalVal = totalVal + element
                                
                            }
                            return String(totalVal);
                        },
                    },
                },
            },
        },
        labels: ['Novice', 'Emerging', 'Average', 'Above Average', 'Expert'],
    };

    const series = multiRadarChartData.data || [];

    return (
        <Card>
            <Card.Body>
                <h4 className="header-title mt-0 mb-3">Multiple RadialBars</h4>
                {showLoader ? (
                    <div style={{ height: 350, position: 'relative' }}>
                        <Loader />
                    </div>
                ) : (
                    <Chart
                        options={options}
                        series={series}
                        type="radialBar"
                        height={350}
                        className="apex-charts"
                        dir="ltr"
                    />
                )}
            </Card.Body>
        </Card>
    );
};

export default ResultsChart;
