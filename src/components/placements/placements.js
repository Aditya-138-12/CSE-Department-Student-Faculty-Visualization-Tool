import React, { useEffect } from 'react';
import { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Download } from "lucide-react";
import Button from '@mui/joy/Button';
import * as XLSX from "xlsx";

const Placements = () => {

    const [totalStudentsPlaced, settotalStudentsPlaced] = useState();

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        fontSize: '1rem',
        color: theme.palette.text.primary,
        border: 'none',
        padding: theme.spacing(2),
        textAlign: 'left',
        borderBottom: `2px solid ${theme.palette.divider}`,
        transition: 'background-color 0.3s, transform 0.2s',
        '&:hover': {
            backgroundColor: theme.palette.action.hover,
            transform: 'scale(1.02)',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15)',
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme, isOdd }) => ({
        backgroundColor: isOdd ? theme.palette.grey[100] : theme.palette.background.paper,
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        '&:hover': {
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
            transform: 'translateY(-3px)',
        },
    }));

    // Static array for table data
    const tableData = [
        { serialNo: 1, companyName: "Anderson Solutions", roleOffered: "-", students: 1, package: "No Info + 6.8 LPA" },
        { serialNo: 2, companyName: "Nag Interiors Pvt. Ltd", roleOffered: "-", students: 8, package: "No Info + 2.4 LPA" },
        { serialNo: 3, companyName: "HMNS Software Solutions Pvt. Ltd", roleOffered: "-", students: 3, package: "No Info + 3.6 LPA" },
        { serialNo: 4, companyName: "Tech Mahindra", roleOffered: "Internship", students: 1, package: "No Stipend" },
        { serialNo: 5, companyName: "AeroSight Technologies", roleOffered: "-", students: 2, package: "6 LPA" },
        { serialNo: 6, companyName: "MedTourEasy", roleOffered: "Data Analytics Trainee", students: 1, package: "No Info" },
        { serialNo: 7, companyName: "Primex Plastics Pvt. LTD", roleOffered: "-", students: 1, package: "2.4 LPA" },
        { serialNo: 8, companyName: "Khyath Techmedia Pvt. LTD", roleOffered: "-", students: 4, package: "No Info + 3.75 LPA" },
        { serialNo: 9, companyName: "CHATRAPATHI Greentech Software Pvt. LTD", roleOffered: "-", students: 10, package: "4 LPA" },
        { serialNo: 10, companyName: "DiFACTO Robotics and Automation Pvt. LTD", roleOffered: "-", students: 2, package: "4.5 LPA" },
        { serialNo: 11, companyName: "HALAMANEE Aerospace Pvt. LTD", roleOffered: "Internship", students: 13, package: "12K Stipend" },
        { serialNo: 12, companyName: "Succinnova Aerospace Pvt. LTD", roleOffered: "Internship", students: 2, package: "15k Stipend + 4.5 LPA PPO" },
        { serialNo: 13, companyName: "AeroSight Technologies", roleOffered: "-", students: 2, package: "6 LPA" },
        { serialNo: 14, companyName: "Dhee Coding Lab", roleOffered: "-", students: 2, package: "No Info" },
        { serialNo: 15, companyName: "CodeTech IT Solutions Pvt. LTD", roleOffered: "Internship", students: 5, package: "No Stipend" },
        { serialNo: 16, companyName: "Varcons Technologies", roleOffered: "Internship", students: 1, package: "No Info" },
        { serialNo: 17, companyName: "SLN Hitech Precision", roleOffered: "Internship", students: 9, package: "12K Stipend + No Info" },
        { serialNo: 18, companyName: "Indian Space Research Organization (ISRO)", roleOffered: "Internship", students: 1, package: "No Stipend" },
        { serialNo: 19, companyName: "Aadyah Aerospace Pvt. LTD", roleOffered: "Internship", students: 1, package: "12K Stipend + 3.8 LPA CTC" },
        { serialNo: 20, companyName: "IBM", roleOffered: "Internship", students: 1, package: "30K Stipend + No Info" },
        { serialNo: 21, companyName: "IIT Dharwad", roleOffered: "Research Internship", students: 5, package: "No Info" },
        { serialNo: 22, companyName: "Adroit Valuation", roleOffered: "Technical Coordinator", students: 1, package: "2.16 LPA CTC" },
        { serialNo: 23, companyName: "Nautical Wings", roleOffered: "Internship", students: 2, package: "12K Stipend + No Info" },
        { serialNo: 24, companyName: "Object IT Solutions", roleOffered: "Software Developers", students: 2, package: "3.6 LPA CTC" },
        { serialNo: 25, companyName: "IISC Banglore(Propulsion Lab & Cryogenics Lab)", roleOffered: "Internship", students: 4, package: "No Info" },
        { serialNo: 26, companyName: "Srikrishna Industrial Works India Pvt. Ltd", roleOffered: "-", students: 6, package: "No Info + 2.16 LPA" },
        { serialNo: 27, companyName: "Succinnova Technologies Pvt. Ltd", roleOffered: "Internship", students: 1, package: "12K Stipend + No Info" },
        { serialNo: 28, companyName: "Aditi Aerospace", roleOffered: "Internship", students: 1, package: "8K Stipend + No Info" },
        { serialNo: 29, companyName: "ConnWorld Engineering", roleOffered: "Internship", students: 2, package: "12K Stipend + No Info" },
        { serialNo: 30, companyName: "TechnoDyne Informatics", roleOffered: "Software Developer", students: 2, package: "3.75 LPA" },
        { serialNo: 31, companyName: "Aviotron Aersospace", roleOffered: "-", students: 16, package: "3.8 LPA" },
        { serialNo: 32, companyName: "InnoMech Aerospace", roleOffered: "Internship", students: 5, package: "10K Stipend + No Info" },
        { serialNo: 33, companyName: "TechMahindra", roleOffered: "-", students: 43, package: "5.5 LPA" },
        { serialNo: 34, companyName: "Manasa Consultants", roleOffered: "Internship", students: 1, package: "12K Stipend + No Info" },
        { serialNo: 35, companyName: "Artech", roleOffered: "Associate Recruiter", students: 2, package: "4.68 LPA" },
        { serialNo: 36, companyName: "Infosys", roleOffered: "-", students: 7, package: "3.6 LPA" },
        { serialNo: 37, companyName: "Valfin Advisory Indi Pvt. Ltd", roleOffered: "Internship", students: 5, package: "20 Stipend + No Info" },
        { serialNo: 38, companyName: "PurpleStar Hygiene Pvt. Ltd", roleOffered: "Internship", students: 15, package: "15K Stipend + No Info" },
        { serialNo: 39, companyName: "CodeYoung", roleOffered: "Software Developer Engineer", students: 1, package: "7.36 LPA" },
        { serialNo: 40, companyName: "SRI Maruthi Constructions", roleOffered: "Internship", students: 3, package: "6K Stipend + No Info" },
        { serialNo: 41, companyName: "Congnizant", roleOffered: "Software Developer", students: 13, package: "4.5 LPA" },
        { serialNo: 42, companyName: "Technext", roleOffered: "-", students: 12, package: "4.5 LPA" },
        { serialNo: 43, companyName: "Kanini Software Solutions Pvt. Ltd", roleOffered: "-", students: 3, package: "4.5 LPA" },
        { serialNo: 44, companyName: "Foxconn", roleOffered: "-", students: 21, package: "3 LPA" },
        { serialNo: 45, companyName: "Yokowaga", roleOffered: "-", students: 4, package: "4.6 LPA" }
        //{ serialNo: 15, companyName: "DRDO(Defence Research & Development Organization)", roleOffered: "AI Research Intern", students: 1, package: "No Stipend" }
    ];

    const handleExport = () => {
        console.log("Export Button pressed");

        const worksheet = XLSX.utils.json_to_sheet(tableData);

        worksheet['!cols'] = [
            { wch: 40 },
            { wch: 40 },
            { wch: 40 },
            { wch: 40 },
            { wch: 40 }
        ];

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Data")

        XLSX.writeFile(workbook, "SJCIT_2025_Placement_Report.xlsx");

    }

    useEffect(() => {
        let total = 0;
        for (let i = 0; i < tableData.length; i++) {
            total = total + tableData[i]["students"];
        }
        settotalStudentsPlaced(total);
    }, []);

    return (
        <>
            <div className='InfoAboutTheTable'>
                <p style={{ marginBottom: '0', marginLeft: "30px", fontSize: "15px" }}>Placements for</p>
                <h1 className='h1' style={{ marginBottom: '0', textAlign: "left", marginTop: "0", marginLeft: "30px", fontSize: "23px", fontWeight: '1000' }}>SJC Institute of Technology, 2025 Batch</h1>
                <p style={{ marginTop: '0', marginLeft: "30px", fontSize: "15px" }}>Last updated at: 11 March 2025, 01:01:00 IST</p>
                <p style={{ marginBottom: '0', marginLeft: "30px", fontSize: "15px" }}>Maintained by <u>Aditya Saroha</u></p>
            </div>
            <Button
                className="btn_uar"
                onClick={handleExport}
                sx={{
                    backgroundColor: 'white',
                    color: 'black',
                    border: '1px solid black',
                    '&:hover': {
                        backgroundColor: 'black',
                        color: "white",
                        border: "1px solid black"
                    },
                }}
                style={{ width: "7%", marginLeft: "50px", position: "absolute", left: '92%', top: "2%", transform: "translate(-50%, 0%)", verticalAlign: "center", fontSize: "15px", lineHeight: "0" }}
            >
                <Download style={{ marginRight: "15px", justifyContent: "center", verticalAlign: "center" }} />
                Export
            </Button>
            <Box sx={{ width: '100%', mb: 4, display: 'flex', justifyContent: 'center' }}>
                <TableContainer
                    component={Paper}
                    elevation={3}
                    sx={{
                        borderRadius: '16px',
                        padding: '16px',
                        backgroundColor: '#f8fafc',
                        boxShadow: '0 8px 40px rgba(0, 0, 0, 0.1)',
                        overflowX: 'auto',
                        width: 'calc(100% - 40px)',
                        margin: '0 20px',
                    }}
                >
                    <Table sx={{ minWidth: 600 }}>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#e3f2fd' }} style={{ fontWeight: "600" }}>
                                <StyledTableCell>Serial No.</StyledTableCell>
                                <StyledTableCell>Company Name</StyledTableCell>
                                <StyledTableCell>Role Offered</StyledTableCell>
                                <StyledTableCell>No. of Students</StyledTableCell>
                                <StyledTableCell>Package Offered</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tableData.map((entry, index) => (
                                <>
                                    <StyledTableRow key={entry.serialNo} isOdd={index % 2 !== 0} >
                                        <StyledTableCell style={{ fontWeight: "300" }}>{entry.serialNo}</StyledTableCell>
                                        <StyledTableCell style={{ fontWeight: "300" }}>{entry.companyName}</StyledTableCell>
                                        <StyledTableCell style={{ fontWeight: "300" }}>{entry.roleOffered}</StyledTableCell>
                                        <StyledTableCell style={{ fontWeight: "300" }}>{entry.students}</StyledTableCell>
                                        <StyledTableCell style={{ fontWeight: "300" }}>{entry.package}</StyledTableCell>
                                    </StyledTableRow>

                                </>
                            ))}
                            <StyledTableRow><StyledTableCell style={{ opacity: "0" }}></StyledTableCell ><StyledTableCell style={{ opacity: "0" }}></StyledTableCell><StyledTableCell style={{ opacity: "0" }}></StyledTableCell><StyledTableCell>Total: <u>{totalStudentsPlaced}</u></StyledTableCell><StyledTableCell style={{ opacity: "0" }}></StyledTableCell></StyledTableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            {<div className="bottom-footter">Created with <span>`</span><a className="bottom-footter-heart">♥</a> <span>`</span> By <span>`</span> <a href="https://github.com/Aditya-138-12" target="_blank" className="bottom-footter-aditya-saroha"><u>Aditya Saroha</u></a><span>''</span><p>&</p><span>''</span><a href="https://github.com/Vishnu-dutt" target="_blank" className="bottom-footter-aditya-saroha"><u>Vishnu Dutt</u></a></div >}

        </>
    );
};

export default Placements;
