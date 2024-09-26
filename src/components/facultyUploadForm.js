import React, { useState } from 'react';
import { auth, db } from './firebase';
import { ref, push, set } from 'firebase/database';
import './FacultyUploadForm.css';
import Snackbar from '@mui/joy/Snackbar';

const FacultyForm = ({ onClose }) => {
    const [activeTab, setActiveTab] = useState('achievement');
    const [achievement, setAchievement] = useState('');
    const [event, setEvent] = useState('');
    const [isMultipleDays, setIsMultipleDays] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [ErrorOpen, setErrorOpen] = useState(false);

    const switchTab = (tab) => {
        setActiveTab(tab);
        resetDateLabels();
    };

    const showAchievementQuestions = () => {
        if (achievement === 'published-paper') {
            return (
                <>
                    <div className="form-group">
                        <label htmlFor="paper-title">Paper Title:</label>
                        <input type="text" id="paper-title" name="paper-title" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="journal-name">Journal Name:</label>
                        <input type="text" id="journal-name" name="journal-name" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="journal-name">Name of Author's:</label>
                        <input type="text" id="author-name" name="author-name" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="journal-name">ISSN Number</label>
                        <input type="number" id="issn-number" name="issn-number" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="journal-name">Link to Paper / Link to Website of the Journal</label>
                        <input type="text" id="link-journal" name="link" required />
                    </div>
                </>
            );
        } else if (achievement === 'awarded-fellowship') {
            return (
                <>
                    <div className="form-group">
                        <label htmlFor="fellowship-title">Fellowship Title:</label>
                        <input type="text" id="fellowship-title" name="fellowship-title" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="grant-amount">Grant Amount:</label>
                        <input type="number" id="grant-amount" name="grant-amount" required />
                    </div>
                </>
            );
        } else if (achievement === 'completed-project') {
            return (
                <>
                    <div className="form-group">
                        <label htmlFor="project-title">Project Title:</label>
                        <input type="text" id="project-title" name="project-title" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="funding-agency">Funding Agency:</label>
                        <input type="text" id="funding-agency" name="funding-agency" required />
                    </div>
                </>
            );
        }
        return null;
    };

    const showEventQuestions = () => {
        if (event === 'conference') {
            return (
                <>
                    <div className="form-group">
                        <label htmlFor="conference-name">Conference Name:</label>
                        <input type="text" id="conference-name" name="conference-name" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="presentation-topic">Presentation Topic:</label>
                        <input type="text" id="presentation-topic" name="presentation-topic" required />
                    </div>
                </>
            );
        } else if (event === 'workshop') {
            return (
                <>
                    <div className="form-group">
                        <label htmlFor="workshop-name">Workshop Name:</label>
                        <input type="text" id="workshop-name" name="workshop-name" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="skills-learned">Skills Learned:</label>
                        <textarea id="skills-learned" name="skills-learned" required></textarea>
                    </div>
                </>
            );
        } else if (event === 'seminar') {
            return (
                <div className="form-group">
                    <label htmlFor="seminar-topic">Seminar Topic:</label>
                    <input type="text" id="seminar-topic" name="seminar-topic" required />
                </div>
            );
        } else if (event === 'collegeEvent') {
            return (
                <div className="form-group">
                    <label htmlFor="seminar-topic">Name of the Event:</label>
                    <input type="text" id="event-name" name="event-name" required />
                    <label htmlFor="seminar-topic">Name of the Resource Person's:</label>
                    <input type="text" id="person-name" name="person-name" required />
                    <label htmlFor="seminar-topic">Event Conducted For:</label>
                    <input type="text" id="event-conducted-for" name="event-conducted-for" required />
                    <label htmlFor="seminar-topic">Place of Conduction:</label>
                    <input type="text" id="place-conduction" name="place-conduction" required />
                    <label htmlFor="seminar-topic">Event Poster Link:</label>
                    <input type="text" id="event-poster-link" name="event-poster-link" required />
                    <label htmlFor="seminar-topic">Event Report Link:</label>
                    <input type="text" id="event-report-link" name="event-report-link" required />
                </div>
            );
        } return null;
    };

    const updateDateLabels = (section) => {
        let dateLabel = 'Date:';
        let endDateLabel = 'End Date:';

        if (section === 'achievement') {
            if (achievement === 'published-paper') {
                dateLabel = 'Research Paper Published on Date:';
                endDateLabel = 'Research Paper Work Ended on:';
            } else if (achievement === 'awarded-fellowship') {
                dateLabel = 'Fellowship Awarded on Date:';
                endDateLabel = 'Fellowship Duration End Date:';
            } else if (achievement === 'completed-project') {
                dateLabel = 'Project Completed on Date:';
                endDateLabel = 'Project End Date:';
            }
        } else if (section === 'event') {
            if (event === 'conference') {
                dateLabel = 'Conference Held on Date:';
                endDateLabel = 'Conference End Date:';
            } else if (event === 'workshop') {
                dateLabel = 'Workshop Held on Date:';
                endDateLabel = 'Workshop End Date:';
            } else if (event === 'seminar') {
                dateLabel = 'Seminar Held on Date:';
                endDateLabel = 'Seminar End Date:';
            }
        }

        return { dateLabel, endDateLabel };
    };

    const resetDateLabels = () => {
        setAchievement('');
        setEvent('');
        setIsMultipleDays(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const user = auth.currentUser;
        if (!user) {
            alert('You must be logged in to submit data.');
            setIsLoading(false);
            return;
        }

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        // Add the active tab information
        data.type = activeTab;

        // Handle dates
        if (isMultipleDays) {
            data.startDate = data.date;
            data.endDate = data['end-date'];
            delete data.date;
            delete data['end-date'];
        } else {
            data.date = data.date;
        }

        // Remove unnecessary fields
        delete data['multiple-days'];
        if (!isMultipleDays) {
            delete data['end-date'];
        }

        try {
            const facultyDataRef = ref(db, `facultyImpactData/${user.uid}`);
            const newDataRef = push(facultyDataRef);
            await set(newDataRef, data);

            alert('Data submitted successfully!');
            onClose(); // Close the form after successful submission
        } catch (error) {
            console.error('Error submitting data:', error);
            alert('An error occurred while submitting data. Please try again.');
            setErrorOpen(true);
        } finally {
            setIsLoading(false);
            setOpen(true);
        }
    };

    const { dateLabel, endDateLabel } = updateDateLabels(activeTab === 'achievement' ? 'achievement' : 'event');

    return (
        <>

            <Snackbar
                autoHideDuration={4000}
                open={open}
                size="lg"
                variant={'solid'}
                color={'primary'}
                onClose={(event, reason) => {
                    if (reason === 'clickaway') {
                        return;
                    }
                    setOpen(false);
                }}
            >
                Logged Out Sucessfully
            </Snackbar>

            <div className="form-container-fact">
                <div className="closeDiv" onClick={onClose}></div>
                <h1>Faculty Achievements & Events Submission</h1>

                <div className="tabs">
                    <div
                        className={`tab ${activeTab === 'achievement' ? 'active' : ''}`}
                        onClick={() => switchTab('achievement')}
                    >
                        Achievements
                    </div>
                    <div
                        className={`tab ${activeTab === 'event' ? 'active' : ''}`}
                        onClick={() => switchTab('event')}
                    >
                        Events
                    </div>
                </div>

                <form id="faculty-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="dept">Department:</label>
                        <select id="dept" name="dept" required>
                            <option value="CSE">Computer Science & Engineering</option>
                        </select>
                    </div>

                    {activeTab === 'achievement' && (
                        <div id="achievement-section">
                            <div className="form-group">
                                <label htmlFor="achievement">Achievements:</label>
                                <select
                                    id="achievement"
                                    name="achievement"
                                    required
                                    value={achievement}
                                    onChange={(e) => setAchievement(e.target.value)}
                                >
                                    <option value="">Select Achievement</option>
                                    <option value="published-paper">Published Research Paper</option>
                                    <option value="awarded-fellowship">Awarded Fellowship</option>
                                    <option value="completed-project">Completed a Research Project</option>
                                </select>
                            </div>
                            {showAchievementQuestions()}
                        </div>
                    )}

                    {activeTab === 'event' && (
                        <div id="event-section">
                            <div className="form-group">
                                <label htmlFor="events">Events Attended:</label>
                                <select
                                    id="events"
                                    name="events"
                                    required
                                    value={event}
                                    onChange={(e) => setEvent(e.target.value)}
                                >
                                    <option value="">Select Event</option>
                                    <option value="conference">Conference</option>
                                    <option value="workshop">Workshop</option>
                                    <option value="seminar">Seminar</option>
                                    <option value="collegeEvent">College Event</option>
                                </select>
                            </div>
                            {showEventQuestions()}
                        </div>
                    )}

                    <div className="form-group dates-container">
                        <label className="date-label" id="date-label">
                            {dateLabel}
                        </label>
                        <input type="date" id="date" name="date" required />

                        <div className="form-group checkbox-group">
                            <input
                                type="checkbox"
                                id="multiple-days"
                                name="multiple-days"
                                checked={isMultipleDays}
                                onChange={() => setIsMultipleDays(!isMultipleDays)}
                            />
                            <label htmlFor="multiple-days">Multiple Days</label>
                        </div>

                        {isMultipleDays && (
                            <div className="form-group" id="end-date-container">
                                <label className="date-label" id="end-date-label">
                                    {endDateLabel}
                                </label>
                                <input type="date" id="end-date" name="end-date" required={isMultipleDays} />
                            </div>
                        )}
                    </div>

                    <div className="form-group">
                        <button type="submit" disabled={isLoading}>
                            {isLoading ? 'Submitting...' : 'Submit'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default FacultyForm;