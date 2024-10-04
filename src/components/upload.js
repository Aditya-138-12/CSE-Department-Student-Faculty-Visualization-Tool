import React, { useState } from "react";
import "./upload.css";
import { Studentdb, Studentstorage } from "./firebaseStudent";
import { ref as dbRef, get, set, update, push, child } from "firebase/database";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

const Upload = ({ onClose, studentUid }) => {
    const [imageUpload, setImageUpload] = useState(null);
    const [formData, setFormData] = useState({
        event: '',
        certificateFile: null,
        reportFile: null
    });

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let currentTime = new Date();
            let certificateURL = null;
            let reportURL = null;

            if (formData.certificateFile) {
                const certificateRef = storageRef(Studentstorage, `files/${studentUid}/${formData.event}_certificate_${currentTime}`);
                const certificateSnapshot = await uploadBytes(certificateRef, formData.certificateFile);
                certificateURL = await getDownloadURL(certificateSnapshot.ref);
            }

            if (formData.reportFile) {
                const reportRef = storageRef(Studentstorage, `files/${studentUid}/${formData.event}_report_${currentTime}`);
                const reportSnapshot = await uploadBytes(reportRef, formData.reportFile);
                reportURL = await getDownloadURL(reportSnapshot.ref);
            }

            let eventData = {
                eventName: formData.event,
                certificateURL: certificateURL,
                reportURL: reportURL,
                timestamp: currentTime.toISOString()
            };

            const userRef = dbRef(Studentdb, `uploads/${studentUid}`);
            const userSnapshot = await get(userRef);

            if (userSnapshot.exists()) {
                const newEventKey = push(child(userRef, 'events')).key;
                const updates = {};
                updates[`events/${newEventKey}`] = eventData;
                await update(userRef, updates);
            } else {
                await set(userRef, {
                    events: {
                        [push(child(userRef, 'events')).key]: eventData
                    }
                });
            }

            alert("Files Uploaded Successfully.");
            setFormData({
                event: '', certificateFile: null, reportFile: null
            });
            setImageUpload(null);

        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Error uploading files. Please try again.");
        }
    };

    return (
        <div className="uploadMainDiv">
            <div className="closingBtn" onClick={onClose}></div>
            <form onSubmit={handleSubmit} className="form-container-stud">
                <div className="form-group">
                    <label htmlFor="event">Event:</label>
                    <select
                        id="event"
                        name="event"
                        value={formData.event}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Event</option>
                        <option value="Hackathon">Hackathon</option>
                        <option value="Technical Conference">Technical Conference</option>
                        <option value="Tech Event">Tech Event</option>
                        <option value="Ideathon">Ideathon</option>
                        <option value="Technical Writings">Technical Writings</option>
                        <option value="Published Paper">Published Paper</option>
                        <option value="Makethon">Makethon</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="certificateFile">Upload Certificate (if applicable):</label>
                    <input
                        type="file"
                        id="certificateFile"
                        name="certificateFile"
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="reportFile">Upload Report:</label>
                    <input
                        type="file"
                        id="reportFile"
                        name="reportFile"
                        onChange={(event) => {
                            setImageUpload(event.target.files[0]);
                            handleChange(event);
                        }}
                        required
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Upload;