import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import "./analytics.css";

const Analytics = ({ onClose, data }) => {
    const [selectedBranch, setSelectedBranch] = useState('EISE');
    const [selectedSemester, setSelectedSemester] = useState('1');
    const [studentsData, setStudentsData] = useState([]);

    const branches = ['BRANCH', 'CSE']; {/*, 'CSD', 'CI', 'AS', 'AE', 'ME', 'CV', 'AIML', 'AIDS', 'ECE', 'EE', 'ISE'];*/ }
    const semesters = ['1', '2', '3', '4', '5', '6', '7', '8'];

    const allCombinations = branches.flatMap(branch =>
        semesters.map(sem => ({ branch, sem }))
    );

    const allEventCounts = allCombinations.reduce((acc, { branch, sem }) => {
        const filteredData = data.filter(entry =>
            entry.branch === branch && entry.sem === sem
        );

        const eventCountsForCombination = filteredData.reduce((acc, entry) => {
            entry.achievements.forEach(achievement => {
                if (!acc[achievement.name]) acc[achievement.name] = 0;
                acc[achievement.name] += achievement.count;
            });
            return acc;
        }, {});

        acc[`${branch}-${sem}`] = Object.entries(eventCountsForCombination).map(([name, count]) => ({
            name,
            count
        }));

        return acc;
    }, {});

    const getBranchOptionClass = (branch) => {
        const hasDataForBranch = semesters.some(sem => allEventCounts[`${branch}-${sem}`] && allEventCounts[`${branch}-${sem}`].length > 0);
        return hasDataForBranch ? '' : 'no-data-branch';
    };

    const getSemesterOptionClass = (sem) => {
        const hasDataForSemester = allEventCounts[`${selectedBranch}-${sem}`] && allEventCounts[`${selectedBranch}-${sem}`].length > 0;
        return hasDataForSemester ? '' : 'no-data';
    };

    const filteredChartData = allEventCounts[`${selectedBranch}-${selectedSemester}`] || [];

    useEffect(() => {
        const fetchStudentData = () => {
            const filteredData = data
                .filter(entry => entry.branch === selectedBranch && entry.sem === selectedSemester)
                .sort((a, b) => b.score - a.score); // Sort by score in descending order

            const rankedData = filteredData.map((entry, index) => ({
                ...entry,
                rank: index + 1,
                reportLinks: entry.achievements.flatMap(achievement => achievement.urls),
                certificateLink: 'Not Available'
            }));

            setStudentsData(rankedData);
        };

        fetchStudentData();
    }, [selectedBranch, selectedSemester, data]);

    return (
        <div className="analyticsMainDiv">
            <div className="closingBtn" onClick={onClose}></div>
            <h2>Analytics Overview</h2>

            <div className="dropdowns">
                <label>
                    Select Branch:
                    <select value={selectedBranch} onChange={e => setSelectedBranch(e.target.value)}>
                        {branches.map(branch => (
                            <option
                                key={branch}
                                value={branch}
                                className={getBranchOptionClass(branch)}
                            >
                                {branch}
                            </option>
                        ))}
                    </select>
                </label>

                <label>
                    Select Semester:
                    <select value={selectedSemester} onChange={e => setSelectedSemester(e.target.value)}>
                        {semesters.map(sem => (
                            <option
                                key={sem}
                                value={sem}
                                className={getSemesterOptionClass(sem)}
                            >
                                Semester {sem}
                            </option>
                        ))}
                    </select>
                </label>
            </div>

            <div className="chartsContainer">
                <div className="chart">
                    <h3>Overall Data</h3>
                    <BarChart width={400} height={300} data={Object.entries(allEventCounts).flatMap(([key, value]) => value)}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="#8884d8" />
                    </BarChart>
                </div>

                <div className="chart">
                    <h3>Filtered Data (Branch: {selectedBranch}, Semester: {selectedSemester})</h3>
                    {filteredChartData.length > 0 ? (
                        <BarChart width={400} height={300} data={filteredChartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="count" fill="#82ca9d" />
                        </BarChart>
                    ) : (
                        <p>No data available</p>
                    )}
                </div>
            </div>

            {filteredChartData.length > 0 && (
                <div className="studentsDetails">
                    <h3>Student Details</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Rank in {selectedSemester} Sem</th>
                                <th>Name</th>
                                <th>Branch</th>
                                <th>Semester</th>
                                <th>Achievements</th>
                                <th>Report Links</th>
                                <th>Certificate Link</th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentsData.map(student => (
                                <tr key={student.usn}>
                                    <td>{student.rank || 'Not Available'}</td>
                                    <td>{student.name}</td>
                                    <td>{student.branch}</td>
                                    <td>{student.sem}</td>
                                    <td>
                                        {student.achievements.map(achievement => (
                                            <div key={achievement.name}>
                                                {achievement.name}: {achievement.count}
                                            </div>
                                        ))}
                                    </td>
                                    <td>
                                        {student.reportLinks.length > 0 ? (
                                            student.reportLinks.map((link, index) => (
                                                <div key={index}>
                                                    <a href={link} target="_blank" rel="noopener noreferrer">View Report {index + 1}</a>
                                                </div>
                                            ))
                                        ) : 'Not Available'}
                                    </td>
                                    <td>
                                        {student.certificateLink ? (
                                            <a rel="noopener noreferrer">Certificate Not Available</a>
                                        ) : 'Not Available'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Analytics;