import React, { useEffect, useRef, useState } from 'react';
import Highcharts from 'highcharts';
import { ref, onChildAdded, get } from 'firebase/database';
import { Studentdb } from './firebaseStudent';
import "./chartExample.css";

export function LiveDataChart() {
    const chartRef = useRef(null);
    const [registrations, setRegistrations] = useState([]);
    const chartInstance = useRef(null);

    useEffect(() => {
        const studentsRef = ref(Studentdb, 'StudentUserData');

        const fetchInitialData = async () => {
            const snapshot = await get(studentsRef);
            const initialData = [];

            for (let i = 0; i < 5; i++) {
                initialData.push({ count: i });
            }

            if (snapshot.exists()) {
                const data = snapshot.val();
                const count = Object.keys(data).length;
                initialData.push({ count });
            }

            setRegistrations(initialData);
            renderChart(initialData);
        };

        fetchInitialData();

        const listener = onChildAdded(studentsRef, (snapshot) => {
            const newRegistration = snapshot.val();
            if (newRegistration) {
                setRegistrations(prev => {
                    const newCount = prev.length;
                    const newRegistrations = [...prev, { count: newCount + 1 }];
                    renderChart(newRegistrations);
                    return newRegistrations;
                });
            }
        });

        // Refined pulsating animation for the end point
        let animationFrame = 0;

        const animationInterval = setInterval(() => {
            if (chartInstance.current && chartInstance.current.series[0].points.length > 0) {
                const lastPoint = chartInstance.current.series[0].points[chartInstance.current.series[0].points.length - 1];

                animationFrame = (animationFrame + 1) % 90; // 90 frames for a full cycle (slightly faster)
                const scale = 1 + 0.5 * Math.sin(animationFrame * Math.PI / 45); // Adjusted for new cycle length

                lastPoint.update({
                    marker: {
                        enabled: true,
                        radius: 8 * scale,
                        fillColor: 'rgba(75, 192, 192, 0.5)', // Light blue, slightly visible
                        lineWidth: 2,
                        lineColor: '#rgba(75, 192, 192, 0.5)'
                    }
                }, false);

                chartInstance.current.redraw(false);
            }
        }, 40); // 25 fps, slightly faster animation

        return () => {
            if (listener) listener();
            clearInterval(animationInterval);
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, []);

    const renderChart = (data) => {
        if (chartRef.current) {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }

            chartInstance.current = Highcharts.chart(chartRef.current, {
                chart: {
                    type: 'area',
                    height: 400,
                    spacing: [10, 0, 0, 0],
                },
                title: {
                    text: 'Student Registrations'
                },
                xAxis: {
                    type: 'category',
                    title: {
                        text: 'Registrations'
                    },
                    labels: {
                        formatter: function () {
                            return this.value;
                        }
                    }
                },
                yAxis: {
                    title: {
                        text: 'Live Number of Registrations'
                    },
                    allowDecimals: false,
                    min: 0,
                    gridLineWidth: 1,
                    labels: {
                        formatter: function () {
                            return this.value;
                        }
                    }
                },
                plotOptions: {
                    area: {
                        animation: {
                            duration: 1000
                        }
                    }
                },
                series: [{
                    name: 'Registrations',
                    data: data.map((r, index) => [index + 1, r.count]),
                    color: 'rgba(75, 192, 192, 0.5)',
                    fillOpacity: 0.35,
                    marker: {
                        enabled: false
                    }
                }]
            });
        }
    };

    return (
        <div id='container' className='cont' style={{ width: '100%', margin: '20px auto', maxWidth: '800px' }}>
            <div ref={chartRef}></div>
        </div>
    );
}