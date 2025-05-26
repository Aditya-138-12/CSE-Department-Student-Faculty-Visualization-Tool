import React, { useEffect, useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsTreemap from 'highcharts/modules/treemap';

// Initialize Treemap module
HighchartsTreemap(Highcharts);

export function TreemapChart() {
    const chartRef = useRef(null);

    useEffect(() => {
        if (chartRef.current) {
            Highcharts.chart(chartRef.current, {
                chart: {
                    type: 'treemap',
                },
                title: {
                    text: 'Treemap of Student Achievements [Under Development]',
                },
                subtitle: {
                    text: 'Breakdown of participation in various events',
                },
                plotOptions: {
                    series: {
                        layoutAlgorithm: 'squarified',
                        dataLabels: {
                            enabled: true,
                            format: '{point.name}: {point.value}',
                            style: {
                                fontSize: '12px',
                            },
                        },
                    },
                },
                series: [
                    {
                        type: 'treemap',
                        data: [
                            {
                                name: 'Hackathons',
                                value: 25,
                                color: '#1f78b4',
                            },
                            {
                                name: 'Tech Events',
                                value: 40,
                                color: '#33a02c',
                            },
                            {
                                name: 'Coding Challenges',
                                value: 15,
                                color: '#e31a1c',
                            },
                            {
                                name: 'Workshops',
                                value: 20,
                                color: '#ff7f00',
                            },
                            {
                                name: 'Conferences',
                                value: 1,
                                color: '#6a3d9a',
                            },
                        ],
                    },
                ],
                tooltip: {
                    headerFormat: '',
                    pointFormat: '<b>{point.name}</b>: {point.value}',
                },
            });
        }
    }, []);

    return (
        <div id='container' className='cont' style={{ width: '100%', marginLeft: '20px', height: '500px', maxWidth: '800px', borderRadius: '15px' }} >
            <div ref={chartRef} style={{ height: '400px', borderRadius: '15px' }}></div>
        </ div >
    );
}
