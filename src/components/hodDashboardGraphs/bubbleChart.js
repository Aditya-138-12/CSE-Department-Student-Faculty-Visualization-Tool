import React, { useEffect, useRef, useState } from 'react';
import Highcharts from 'highcharts';
import { ref, onValue } from 'firebase/database';
import { Studentdb } from '../firebaseStudent';

export function BubbleChart() {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const uploadsRef = ref(Studentdb, 'uploads');
        const studentRef = ref(Studentdb, 'StudentUserData');

        const fetchRealtimeData = () => {
            const eventParticipation = {};

            // Fetch data from "Uploads"
            onValue(uploadsRef, (uploadsSnapshot) => {
                if (uploadsSnapshot.exists()) {
                    const uploads = uploadsSnapshot.val();
                    console.log('Uploads Data:', uploads);

                    Object.keys(uploads).forEach((UID) => {
                        const events = uploads[UID]?.events || {};
                        Object.keys(events).forEach((eventKey) => {
                            const eventName = events[eventKey]?.eventName || 'Unknown Event';
                            if (!eventParticipation[eventName]) {
                                eventParticipation[eventName] = new Set();
                            }
                            eventParticipation[eventName].add(UID); // Track which students participated
                        });
                    });

                    // Fetch data from "StudentUserData"
                    onValue(studentRef, (studentSnapshot) => {
                        if (studentSnapshot.exists()) {
                            const studentData = studentSnapshot.val();
                            console.log('StudentUserData:', studentData);

                            const participationData = [];

                            // Combine Uploads and StudentUserData
                            Object.keys(eventParticipation).forEach((eventName, index) => {
                                const students = eventParticipation[eventName];
                                const semCount = {};

                                students.forEach((UID) => {
                                    const sem = studentData[UID]?.sem || 'Unknown';
                                    semCount[sem] = (semCount[sem] || 0) + 1;
                                });

                                // Prepare data for the bubble chart
                                Object.keys(semCount).forEach((sem) => {
                                    participationData.push({
                                        x: index, // Event name index on X-axis
                                        y: semCount[sem], // Number of students in the semester
                                        z: semCount[sem], // Bubble size = number of students
                                        name: `Sem-${sem}`,
                                        category: eventName,
                                    });
                                });
                            });

                            console.log('Prepared Chart Data:', participationData);
                            setChartData(participationData);
                        } else {
                            console.error('No data found in StudentUserData.');
                        }
                    });
                } else {
                    console.error('No data found in Uploads.');
                }
            });
        };

        fetchRealtimeData();
    }, []);

    // Render Chart
    useEffect(() => {
        if (chartRef.current && chartData.length > 0) {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }

            const categories = Array.from(
                new Set(chartData.map((data) => data.category))
            );

            chartInstance.current = Highcharts.chart(chartRef.current, {
                chart: {
                    type: 'bubble',
                    plotBorderWidth: 1,
                    zooming: {
                        type: 'xy',
                    },
                },

                title: {
                    text: 'Real-time Event Participation',
                },

                subtitle: {
                    text: 'Bubble size indicates the number of students',
                },

                xAxis: {
                    title: {
                        text: 'Event Type',
                    },
                    categories,
                    labels: {
                        style: {
                            fontSize: '12px',
                        },
                    },
                },

                yAxis: {
                    title: {
                        text: 'Number of Students',
                    },
                    labels: {
                        style: {
                            fontSize: '12px',
                        },
                    },
                },

                tooltip: {
                    useHTML: true,
                    headerFormat: '<table>',
                    pointFormat:
                        '<tr><th>Event:</th><td>{point.category}</td></tr>' +
                        '<tr><th>Students:</th><td>{point.y}</td></tr>' +
                        '<tr><th>Semester:</th><td>{point.name}</td></tr>',
                    footerFormat: '</table>',
                },

                plotOptions: {
                    bubble: {
                        minSize: '10%',
                        maxSize: '30%',
                        dataLabels: {
                            enabled: true,
                            format: '{point.name}',
                            style: {
                                fontSize: '10px',
                            },
                        },
                    },
                },

                series: [
                    {
                        name: 'Participation',
                        data: chartData,
                        colorByPoint: true,
                    },
                ],
            });
        } else {
            console.log('No chart data to render:', chartData);
        }
    }, [chartData]);

    return (
        <div id="container" style={{ width: '100%', height: '500px', borderRadius: '15px', marginTop: '50px', }} ref={chartRef}
        ></div>
    );
}
