import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Divider
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import "./facultyDetailedWindow.css";

const FacultyDetailsWindow = ({ faculty, open, onClose }) => {
    if (!faculty) return null;

    const renderAchievementDetails = (achievement) => {
        switch (achievement.achievement) {
            case 'published-paper':
                return (
                    <>
                        <Typography variant="body2">Paper Title: {achievement['paper-title']}</Typography>
                        <Typography variant="body2">Journal Name: {achievement['journal-name']}</Typography>
                        <Typography variant="body2">Authors: {achievement['author-name']}</Typography>
                        <Typography variant="body2">ISSN Number: {achievement['issn-number']}</Typography>
                        <Typography variant="body2">
                            Link: <a href={achievement['link-journal']} target="_blank" rel="noopener noreferrer">{achievement['link-journal']}</a>
                        </Typography>
                    </>
                );
            case 'awarded-fellowship':
                return (
                    <>
                        <Typography variant="body2">Fellowship Title: {achievement['fellowship-title']}</Typography>
                        <Typography variant="body2">Grant Amount: {achievement['grant-amount']}</Typography>
                    </>
                );
            case 'completed-project':
                return (
                    <>
                        <Typography variant="body2">Project Title: {achievement['project-title']}</Typography>
                        <Typography variant="body2">Funding Agency: {achievement['funding-agency']}</Typography>
                    </>
                );
            default:
                return null;
        }
    };

    const renderEventDetails = (event) => {
        switch (event.events) {
            case 'conference':
                return (
                    <>
                        <Typography variant="body2">Conference Name: {event['conference-name']}</Typography>
                        <Typography variant="body2">Presentation Topic: {event['presentation-topic']}</Typography>
                    </>
                );
            case 'workshop':
                return (
                    <>
                        <Typography variant="body2">Workshop Name: {event['workshop-name']}</Typography>
                        <Typography variant="body2">Skills Learned: {event['skills-learned']}</Typography>
                    </>
                );
            case 'seminar':
                return (
                    <Typography variant="body2">Seminar Topic: {event['seminar-topic']}</Typography>
                );
            case 'College Event':
                return (
                    <>
                        <Typography variant="body2">Event Name: {event['event-name']}</Typography>
                        <Typography variant="body2">Resource Persons: {event['person-name']}</Typography>
                        <Typography variant="body2">Event Conducted For: {event['event-conducted-for']}</Typography>
                        <Typography variant="body2">Place of Conduction: {event['place-conduction']}</Typography>
                        <Typography variant="body2">
                            Event Poster: <a href={event['event-poster-link']} target="_blank" rel="noopener noreferrer">View Poster</a>
                        </Typography>
                        <Typography variant="body2">
                            Event Report: <a href={event['event-report-link']} target="_blank" rel="noopener noreferrer">View Report</a>
                        </Typography>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>
                <Typography variant="h6">{faculty.name}</Typography>
                <Typography variant="subtitle1" color="text.secondary">{faculty.dept}</Typography>
            </DialogTitle>
            <DialogContent dividers>
                <Typography variant="h6" gutterBottom>Achievements</Typography>
                {faculty.achievements.map((achievement, index) => (
                    <Accordion key={`achievement-${index}`}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>{achievement.achievement === 'published-paper' ? 'Published Paper' :
                                achievement.achievement === 'awarded-fellowship' ? 'Awarded Fellowship' :
                                    'Completed Project'}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {renderAchievementDetails(achievement)}
                            <Typography variant="body2" color="text.secondary">
                                Date: {achievement.date || `${achievement.startDate} to ${achievement.endDate}`}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                ))}
                <Divider style={{ margin: '16px 0' }} />
                <Typography variant="h6" gutterBottom>Events</Typography>
                {faculty.events.map((event, index) => (
                    <Accordion key={`event-${index}`}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>{event.events}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {renderEventDetails(event)}
                            <Typography variant="body2" color="text.secondary">
                                Date: {event.date || `${event.startDate} to ${event.endDate}`}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </DialogContent>
            <DialogActions>
                <Button className='' onClick={onClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default FacultyDetailsWindow;