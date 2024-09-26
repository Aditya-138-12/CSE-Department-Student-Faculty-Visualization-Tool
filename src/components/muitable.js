import React, { useState, useMemo } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Tooltip,
    Link,
    Typography,
    TextField,
    Box,
    Skeleton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Flame from './flame';
import Flame2 from './flame2';
import Flame3 from './flame3';
import StarIcon from '@mui/icons-material/Star';
import SearchIcon from '@mui/icons-material/Search';

// Styled components for improved visuals
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    fontWeight: '600',
    fontSize: '1rem',
    color: theme.palette.text.primary,
    border: 'none',
    padding: theme.spacing(2),
    textAlign: 'center',
    borderBottom: `2px solid ${theme.palette.divider}`,
    transition: 'background-color 0.3s, transform 0.2s',
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
        transform: 'scale(1.02)',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15)',
    },
}));

const StyledTableRow = styled(TableRow)(({ theme, isOdd }) => ({
    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
    backgroundColor: isOdd ? theme.palette.grey[100] : theme.palette.background.paper,
    margin: theme.spacing(1, 0),
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    '&:hover': {
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
        transform: 'translateY(-3px)',
    },
}));

const CustomTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    '& .MuiTooltip-tooltip': {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.2)',
        fontSize: '0.9rem',
        borderRadius: '8px',
        padding: theme.spacing(1.5),
        transition: 'opacity 0.3s ease, transform 0.3s ease',
        transform: 'scale(0.9)',
        opacity: 0,
        '&[data-tooltip-show]': {
            transform: 'scale(1)',
            opacity: 1,
        },
    },
}));

const SearchInput = styled(TextField)(({ theme }) => ({
    width: '350px',
    height: '40px',
    marginTop: '10px',
    marginBottom: '10px',
    '& .MuiOutlinedInput-root': {
        borderRadius: '20px',
        '& fieldset': {
            borderRadius: '20px',
            borderColor: theme.palette.divider,
            backgroundColor: 'transparent',
        },
        '&:hover fieldset': {
            borderColor: theme.palette.primary.main,
        },
        '&.Mui-focused fieldset': {
            borderColor: theme.palette.primary.main,
        },
    },
    '& .MuiInputBase-input': {
        borderRadius: '20px',
        padding: theme.spacing(1),
    },
}));

const MUITable = ({ data, isLoading }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredData = useMemo(() => {
        return data.filter((entry) =>
            entry.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [data, searchTerm]);

    const dataWithRanks = useMemo(() => {
        const sortedData = [...data].sort((a, b) => b.score - a.score);
        return sortedData.map((entry, index) => ({
            ...entry,
            rank: index + 1,
        }));
    }, [data]);

    const filteredRankedData = useMemo(() => {
        return filteredData.map((entry) => {
            const originalEntry = dataWithRanks.find(e => e.usn === entry.usn);
            return {
                ...entry,
                rank: originalEntry ? originalEntry.rank : null,
            };
        });
    }, [filteredData, dataWithRanks]);

    return (
        <Box sx={{ width: '100%', mb: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <SearchIcon sx={{ color: 'action.active', mr: 1 }} />
                <SearchInput
                    variant="outlined"
                    placeholder="Search by Name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </Box>
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
                        <TableRow sx={{ backgroundColor: '#e3f2fd' }}>
                            <StyledTableCell>Rank In College</StyledTableCell>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell>USN</StyledTableCell>
                            <StyledTableCell>Branch</StyledTableCell>
                            <StyledTableCell>Section</StyledTableCell>
                            <StyledTableCell>Sem</StyledTableCell>
                            <StyledTableCell>Achievements</StyledTableCell>
                            <StyledTableCell>Summary</StyledTableCell>
                            <StyledTableCell>Score</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {isLoading ? (
                            [...Array(12)].map((_, index) => (
                                <TableRow key={index}>
                                    <StyledTableCell>
                                        <Skeleton variant="text" width={40} />
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <Skeleton variant="text" width={120} />
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <Skeleton variant="text" width={80} />
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <Skeleton variant="text" width={100} />
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <Skeleton variant="text" width={80} />
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <Skeleton variant="text" width={50} />
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <Skeleton variant="text" width={150} />
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <Skeleton variant="text" width={120} />
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <Skeleton variant="text" width={60} />
                                    </StyledTableCell>
                                </TableRow>
                            ))
                        ) : filteredRankedData.length > 0 ? (
                            filteredRankedData.map((entry, index) => (
                                <StyledTableRow key={entry.usn} isOdd={index % 2 !== 0}>
                                    <StyledTableCell>
                                        {entry.rank}
                                        {entry.rank === 1 && <Flame />}
                                        {entry.rank === 2 && <Flame2 />}
                                        {entry.rank === 3 && <Flame3 />}
                                    </StyledTableCell>
                                    <StyledTableCell>{entry.name}</StyledTableCell>
                                    <StyledTableCell>{entry.usn}</StyledTableCell>
                                    <StyledTableCell>{entry.branch}</StyledTableCell>
                                    <StyledTableCell>{entry.section}</StyledTableCell>
                                    <StyledTableCell>{entry.sem}</StyledTableCell>
                                    <StyledTableCell>
                                        {entry.achievements.map((achievement, i) => (
                                            <CustomTooltip
                                                key={i}
                                                title={
                                                    <React.Fragment>
                                                        {achievement.urls.map((url, j) => (
                                                            <div key={j}>
                                                                <Link style={{ fontSize: '17px', lineHeight: '22px' }}
                                                                    href={url}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    sx={{
                                                                        textDecoration: 'none',
                                                                        color: '#3f51b5',
                                                                        '&:hover': { textDecoration: 'underline' },
                                                                        transition: 'color 0.3s',
                                                                        '&:hover': { color: '#ff4081' },
                                                                    }}
                                                                >
                                                                    {achievement.name} - {j + 1} Report Link
                                                                </Link>
                                                            </div>
                                                        ))}
                                                    </React.Fragment>
                                                }
                                            >
                                                {achievement.name} - {achievement.count} {i < entry.achievements.length - 1 ? ', ' : ''}
                                            </CustomTooltip>
                                        ))}
                                    </StyledTableCell>
                                    <StyledTableCell>{entry.summary}</StyledTableCell>
                                    <StyledTableCell>{entry.score}</StyledTableCell>
                                </StyledTableRow>
                            ))
                        ) : (
                            <TableRow>
                                <StyledTableCell colSpan={9}>No results found.</StyledTableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default MUITable;