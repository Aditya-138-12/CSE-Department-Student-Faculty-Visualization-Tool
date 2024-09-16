import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { db } from './firebase';
import { ref, onValue, get } from 'firebase/database';
import './FacultyAnalytics.css';

const FacultyAnalytics = ({ onClose }) => {
    const [facultyData, setFacultyData] = useState([]);
    const [facultyNames, setFacultyNames] = useState({});
    const [timeFrame, setTimeFrame] = useState('month');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        const fetchFacultyData = () => {
            const dataRef = ref(db, 'facultyImpactData/');
            onValue(dataRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    const formattedData = Object.entries(data).map(([userId, userData]) => {
                        return Object.entries(userData).map(([key, entry]) => ({
                            userId,
                            ...entry,
                            date: entry.date || entry.startDate,
                        }));
                    }).flat();
                    setFacultyData(formattedData);
                    fetchFacultyNames(Object.keys(data));
                }
            });
        };

        const fetchFacultyNames = async (userIds) => {
            const names = {};
            for (const userId of userIds) {
                const nameRef = ref(db, `FacultyUserData/${userId}/name`);
                const snapshot = await get(nameRef);
                if (snapshot.exists()) {
                    names[userId] = snapshot.val();
                } else {
                    names[userId] = 'Unknown';
                }
            }
            setFacultyNames(names);
        };

        fetchFacultyData();
    }, []);

    const filterDataByTimeFrame = () => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        return facultyData.filter(entry => {
            const entryDate = new Date(entry.date);
            return entryDate >= start && entryDate <= end;
        });
    };

    const aggregateData = (data) => {
        const aggregated = data.reduce((acc, entry) => {
            const date = new Date(entry.date);
            let key;
            if (timeFrame === 'month') {
                key = `${date.getFullYear()}-${date.getMonth() + 1}`;
            } else if (timeFrame === 'year') {
                key = `${date.getFullYear()}`;
            } else {
                key = entry.date;
            }

            if (!acc[key]) {
                acc[key] = { date: key, achievements: 0, events: 0 };
            }

            if (entry.type === 'achievement') {
                acc[key].achievements += 1;
            } else if (entry.type === 'event') {
                acc[key].events += 1;
            }

            return acc;
        }, {});

        return Object.values(aggregated).sort((a, b) => new Date(a.date) - new Date(b.date));
    };

    const getFacultyWithinTimeFrame = () => {
        const filteredData = filterDataByTimeFrame();
        const facultyMap = new Map();
        filteredData.forEach(entry => {
            if (!facultyMap.has(entry.userId)) {
                facultyMap.set(entry.userId, {
                    userId: entry.userId,
                    name: facultyNames[entry.userId] || 'Unknown',
                    achievements: 0,
                    events: 0,
                    dept: entry.dept
                });
            }

            const facultyStats = facultyMap.get(entry.userId);
            if (entry.type === 'achievement') {
                facultyStats.achievements += 1;
            } else if (entry.type === 'event') {
                facultyStats.events += 1;
            }
        });

        return Array.from(facultyMap.values());
    };

    const chartData = aggregateData(filterDataByTimeFrame());
    const facultyList = getFacultyWithinTimeFrame();

    return (
        <div className="faculty-analytics">
            <h2>Faculty Analytics</h2>
            <div className="controls">
                <select value={timeFrame} onChange={(e) => setTimeFrame(e.target.value)}>
                    <option value="month">Monthly</option>
                    <option value="year">Yearly</option>
                </select>
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
            </div>
            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="achievements" stroke="#8884d8" />
                    <Line type="monotone" dataKey="events" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>
            <div className="faculty-list">
                <h3>Faculty Activity Within Selected Time Frame</h3>
                <table className='fa-table'>
                    <thead className='fa-thead'>
                        <tr className='fa-tr'>
                            <th className='fa-th'>Faculty Name</th>
                            <th className='fa-th'>Department</th>
                            <th className='fa-th'>Achievements</th>
                            <th className='fa-th'>Events</th>
                        </tr>
                    </thead>
                    <tbody className='fa-body'>
                        {facultyList.map(faculty => (
                            <tr className='fa-tr' key={faculty.userId}>
                                <td className='fa-td'>{faculty.name}</td>
                                <td className='fa-td'>{faculty.dept}</td>
                                <td className='fa-td'>{faculty.achievements}</td>
                                <td className='fa-td'>{faculty.events}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button className='facultyAnalyticsCloseButton' onClick={onClose}></button>
        </div>
    );
};

export default FacultyAnalytics;