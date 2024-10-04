import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { ref, get } from 'firebase/database';
import { TextField, Button, Typography, Paper, Container } from '@mui/material';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import "./facultyReportGenerator.css";

const FacultyReportGenerator = ({ onClickonReportGeneratorCloseButton }) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [facultyNames, setFacultyNames] = useState({});

    useEffect(() => {
        const fetchFacultyNames = async () => {
            try {
                const facultyRef = ref(db, 'FacultyUserData');
                const facultySnapshot = await get(facultyRef);
                const facultyData = facultySnapshot.val();

                if (facultyData) {
                    const names = Object.entries(facultyData).reduce((acc, [id, data]) => {
                        acc[id] = data.name || 'Unknown';
                        return acc;
                    }, {});
                    setFacultyNames(names);
                }
            } catch (error) {
                console.error('Error fetching faculty names:', error);
            }
        };

        fetchFacultyNames();
    }, []);

    const fetchFacultyData = async (start, end) => {
        try {
            const facultyRef = ref(db, 'facultyImpactData');
            const facultySnapshot = await get(facultyRef);
            const allData = facultySnapshot.val();

            if (!allData) {
                console.error('No faculty data found');
                throw new Error('No faculty data available');
            }

            const filteredData = {};

            Object.entries(allData).forEach(([facultyId, facultyData]) => {
                if (typeof facultyData !== 'object') {
                    console.warn(`Unexpected data format for faculty ${facultyId}`);
                    return;
                }

                const filteredEntries = Object.values(facultyData).filter(entry => {
                    if (!entry.date && !entry.startDate) {
                        console.warn(`Entry without date for faculty ${facultyId}`, entry);
                        return false;
                    }
                    const entryDate = new Date(entry.date || entry.startDate);
                    return entryDate >= new Date(start) && entryDate <= new Date(end);
                });

                if (filteredEntries.length > 0) {
                    const facultyName = facultyNames[facultyId] || 'Unknown Faculty';
                    filteredData[facultyId] = {
                        name: facultyName,
                        entries: filteredEntries
                    };
                }
            });

            if (Object.keys(filteredData).length === 0) {
                console.warn('No data found for the given date range');
            }

            return filteredData;
        } catch (error) {
            console.error('Error fetching faculty data:', error);
            throw error;
        }
    };

    const generatePDF = async () => {
        if (!startDate || !endDate) {
            setError("Please select both start and end dates.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const data = await fetchFacultyData(startDate, endDate);

            if (Object.keys(data).length === 0) {
                setError("No data found for the selected date range.");
                return;
            }

            const doc = new jsPDF();

            // Header image dimensions
            const headerImgWidth = 250;
            const headerImgHeight = 40;
            const pageWidth = doc.internal.pageSize.getWidth();
            const headerX = (pageWidth - headerImgWidth) / 2;

            // Signature image dimensions
            const signatureImgWidth = 50;
            const signatureImgHeight = 20;

            // Function to load image as data URL
            const loadImage = (url) => {
                return new Promise((resolve, reject) => {
                    const img = new Image();
                    img.crossOrigin = 'Anonymous';
                    img.onload = () => {
                        const canvas = document.createElement('canvas');
                        canvas.width = img.width;
                        canvas.height = img.height;
                        const ctx = canvas.getContext('2d');
                        ctx.drawImage(img, 0, 0);
                        resolve(canvas.toDataURL('image/png'));
                    };
                    img.onerror = reject;
                    img.src = url;
                });
            };

            // Load both images
            const [headerImageDataUrl, signatureImageDataUrl] = await Promise.all([
                loadImage('https://i.ibb.co/PNHvDGn/main-Report-Content.png'),
                loadImage('https://i.ibb.co/1Z1G1R9/hod-Signature-removebg-preview.png')
            ]);

            // Add header image
            doc.addImage(headerImageDataUrl, 'PNG', headerX, 10, headerImgWidth, headerImgHeight);

            let yPos = 60; // Start position after header image

            doc.setFontSize(18);
            doc.text('Faculty Achievements and Events Report', 14, yPos);
            yPos += 10;
            doc.setFontSize(12);
            doc.text(`Date Range: ${startDate} - ${endDate}`, 14, yPos);
            yPos += 10;

            Object.entries(data).forEach(([facultyId, facultyData]) => {
                doc.setFontSize(14);
                doc.text(`Faculty Name: ${facultyData.name}`, 14, yPos);
                yPos += 10;

                doc.autoTable({
                    startY: yPos,
                    head: [['Type', 'Details', 'Date']],
                    body: facultyData.entries.map(entry => [
                        entry.type === 'achievement' ? 'Achievement' : 'Event',
                        getEntryDetails(entry),
                        entry.date || `${entry.startDate} - ${entry.endDate}`
                    ]),
                });

                yPos = doc.lastAutoTable.finalY + 15;

                if (yPos > 250) {
                    doc.addPage();
                    yPos = 20;
                }
            });

            // Add some space after the last entry
            yPos += 20;

            // Check if there's enough space on the current page for the signature
            if (yPos + signatureImgHeight + 10 > doc.internal.pageSize.getHeight()) {
                doc.addPage();
                yPos = 20;
            }

            // Add signature image below the last entry
            const signatureX = pageWidth - signatureImgWidth - 10; // 10 is right margin
            doc.addImage(signatureImageDataUrl, 'PNG', signatureX, yPos, signatureImgWidth, signatureImgHeight);

            // Add a line for the signature
            const lineY = yPos + signatureImgHeight + 5;
            doc.setDrawColor(0);
            doc.line(signatureX, lineY, signatureX + signatureImgWidth, lineY);

            // Add "HOD Signature" text below the line
            doc.setFontSize(10);
            doc.text('HOD Signature', signatureX + signatureImgWidth / 2, lineY + 5, { align: 'center' });

            doc.save('detailed_faculty_report.pdf');
        } catch (err) {
            console.error("Detailed error in report generation:", err);
            setError("An error occurred while generating the report. Please check the console for details and try again.");
        } finally {
            setLoading(false);
        }
    };

    const getEntryDetails = (entry) => {
        try {
            if (entry.type === 'achievement') {
                switch (entry.achievement) {
                    case 'published-paper':
                        return `Published Paper: "${entry['paper-title'] || 'Untitled'}" in ${entry['journal-name'] || 'Unknown Journal'}
                        Authors: ${entry['author-name'] || 'Not specified'}
                        ISSN: ${entry['issn-number'] || 'Not provided'}
                        Link: ${entry['link-journal'] || 'Not provided'}`;
                    case 'awarded-fellowship':
                        return `Awarded Fellowship: ${entry['fellowship-title'] || 'Untitled'}
                        Grant Amount: ${entry['grant-amount'] || 'Not specified'}`;
                    case 'completed-project':
                        return `Completed Project: ${entry['project-title'] || 'Untitled'}
                        Funding Agency: ${entry['funding-agency'] || 'Not specified'}`;
                    default:
                        return 'Unknown Achievement';
                }
            } else if (entry.type === 'event') {
                switch (entry.events) {
                    case 'conference':
                        return `Attended Conference: ${entry['conference-name'] || 'Unnamed'}
                        Presentation Topic: ${entry['presentation-topic'] || 'Not specified'}`;
                    case 'workshop':
                        return `Attended Workshop: ${entry['workshop-name'] || 'Unnamed'}
                        Skills Learned: ${entry['skills-learned'] || 'Not specified'}`;
                    case 'seminar':
                        return `Attended Seminar: ${entry['seminar-topic'] || 'Untitled'}`;
                    case 'College Event':
                        return `Organized College Event: ${entry['event-name'] || 'Unnamed'}
                        Resource Persons: ${entry['person-name'] || 'Not specified'}
                        Event For: ${entry['event-conducted-for'] || 'Not specified'}
                        Place: ${entry['place-conduction'] || 'Not specified'}
                        Poster: ${entry['event-poster-link'] || 'Not provided'}
                        Report: ${entry['event-report-link'] || 'Not provided'}`;
                    default:
                        return 'Unknown Event';
                }
            }
            return 'Unknown Entry';
        } catch (error) {
            console.error('Error in getEntryDetails:', error, entry);
            return 'Error processing entry details';
        }
    };

    return (
        <Container className='reportGeneratorMainDiv' maxWidth="sm">
            <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
                <div className='ReportGeneratorCloseButton' onClick={onClickonReportGeneratorCloseButton}></div>
                <Typography variant="h5" gutterBottom>
                    Detailed Faculty Report Generator
                </Typography>
                <TextField
                    label="Start Date"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="End Date"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    fullWidth
                    margin="normal"
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={generatePDF}
                    disabled={loading || !startDate || !endDate}
                    fullWidth
                    style={{ marginTop: '20px' }}
                >
                    {loading ? 'Generating...' : 'Generate Detailed Report'}
                </Button>
                {error && (
                    <Typography color="error" style={{ marginTop: '10px' }}>
                        {error}
                    </Typography>
                )}
            </Paper>
        </Container>
    );
};

export default FacultyReportGenerator;