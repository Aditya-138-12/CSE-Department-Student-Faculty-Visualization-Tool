import React from "react";

const PrivacyPolicy = () => {
    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <h1 style={styles.title}>SJCIT-Connect Privacy Policy</h1>
                <p style={styles.date}>Effective Date: January 17, 2024</p>
            </header>

            <section style={styles.section}>
                <h2 style={styles.heading}>Introduction</h2>
                <p>
                    At SJCIT-Connect, your trust is our priority. This Privacy Policy explains how we collect, use, store, and share your information when you interact with our services. By using SJCIT-Connect, you agree to the practices described in this policy.
                </p>
                <p>
                    This policy applies to all users, including students, faculty, and administrators, and governs your use of the SJCIT-Connect platform, mobile applications, and any other related services.
                </p>
            </section>

            <section style={styles.section}>
                <h2 style={styles.heading}>Information We Collect</h2>
                <p>We collect the following types of information:</p>
                <ul style={styles.list}>
                    <li>
                        <strong>Account Information:</strong> Personal details such as your name, email address, student ID, department, and profile photo.
                    </li>
                    <li>
                        <strong>Academic Data:</strong> Achievements, event participation, grades, and rankings.
                    </li>
                    <li>
                        <strong>Usage Data:</strong> Information about your activity on the platform, including pages visited, actions taken, and time spent.
                    </li>
                    <li>
                        <strong>Device Information:</strong> IP address, browser type, device identifiers, and operating system details.
                    </li>
                    <li>
                        <strong>Location Data:</strong> Approximate location data based on your device's settings.
                    </li>
                </ul>
            </section>

            <section style={styles.section}>
                <h2 style={styles.heading}>How We Use Your Information</h2>
                <p>We use your information to:</p>
                <ul style={styles.list}>
                    <li>Provide, personalize, and improve the SJCIT-Connect experience.</li>
                    <li>Analyze user data to generate academic insights and reports.</li>
                    <li>Facilitate rankings, achievement tracking, and analytics.</li>
                    <li>Communicate updates, alerts, and announcements related to academic or platform activities.</li>
                    <li>Maintain the security and integrity of our platform.</li>
                </ul>
            </section>

            <section style={styles.section}>
                <h2 style={styles.heading}>Sharing and Disclosure</h2>
                <p>We may share your information under the following circumstances:</p>
                <ul style={styles.list}>
                    <li>With authorized faculty and administrators for academic purposes.</li>
                    <li>With service providers who assist us in platform operations (e.g., cloud hosting).</li>
                    <li>As required by law, including to comply with legal obligations or respond to lawful requests.</li>
                    <li>With your consent, when you opt to share your data for collaborations or public achievements.</li>
                </ul>
                <p>We will never sell your personal information to third parties.</p>
            </section>

            <section style={styles.section}>
                <h2 style={styles.heading}>Your Rights and Choices</h2>
                <p>Depending on your location, you may have the following rights:</p>
                <ul style={styles.list}>
                    <li>Access and review your personal information.</li>
                    <li>Request corrections to inaccurate or incomplete data.</li>
                    <li>Delete your account or specific information.</li>
                    <li>Restrict the processing of your data for certain purposes.</li>
                </ul>
                <h2 style={styles.heading}>The points System are as Follows for the student ranking.</h2>
                <ul style={styles.list}>
                    <li>Hackathon - 15</li>
                    <li>Technical Conference - 8</li>
                    <li>Tech Event - 6</li>
                    <li>Ideathon - 7</li>
                    <li>Technical Writings - 9</li>
                    <li>Published Paper - 12</li>
                    <li>Makethon - 5</li>
                    <li>Other - 4</li>
                </ul>
                <p>To exercise your rights, contact us at the provided email or WhatsApp numbers.</p>
            </section>

            <section style={styles.section}>
                <h2 style={styles.heading}>Faculty Ranking System</h2>
                <p>This section tells us that how the faculty is being ranked</p>
                <ul style={styles.list}>
                    <li>The scores are based on 2 main themes, Achievemnts and Events Attended.</li>
                    <li>For Achievements the scores are as follows: <br></br>Published Research Paper - 10 Points<br></br> Awarded Fellowship - 10 Points<br></br> Completed a Research Project - 10 Points<br></br></li>
                    <li>For Events the scores are as follows: <br></br> Conference - 9 Points<br></br> Workshop - Points<br></br> Seminar - 7 Points<br></br> College Event - 5 + <b>Tie Break Point</b></li>
                    <li>Communicate updates, alerts, and announcements related to academic or platform activities.</li>
                    <li>Maintain the security and integrity of our platform.</li>
                </ul>
            </section>

            <section style={styles.section}>
                <h2 style={styles.heading}>Data Retention</h2>
                <p>
                    We retain your data only as long as necessary to provide our services and fulfill legal obligations. When no longer needed, we securely delete or anonymize your information.
                </p>
            </section>

            <section style={styles.section}>
                <h2 style={styles.heading}>Data Security</h2>
                <p>
                    We take your data security seriously. Our measures include encryption, secure access protocols, and regular security audits. However, no system is completely secure, and we cannot guarantee absolute protection.
                </p>
            </section>

            <section style={styles.section}>
                <h2 style={styles.heading}>Children’s Privacy</h2>
                <p>
                    SJCIT-Connect is not intended for use by individuals under 13 years of age. If we learn that we have collected data from a child without proper consent, we will promptly delete it.
                </p>
            </section>

            <section style={styles.section}>
                <h2 style={styles.heading}>International Users</h2>
                <p>
                    If you are accessing SJCIT-Connect from outside India, please note that your information will be processed and stored in India in accordance with local data protection laws.
                </p>
            </section>

            <section style={styles.section}>
                <h2 style={styles.heading}>Policy Updates</h2>
                <p>
                    We may update this policy from time to time to reflect changes in our practices or legal requirements. Significant updates will be communicated to you through notifications or email.
                </p>
            </section>

            <footer style={styles.footer}>
                <p>
                    For inquiries, please contact us at{" "}
                    <a href="mailto:adityasaroha456@fastmail.com">adityasaroha456@fastmail.com</a>{" / "}<a href="mailto:vishnudutt@fastmail.com">vishnudutt@fastmail.com</a>,
                    or reach us via WhatsApp at +91 87008 57698 or +91 93545 01876.
                </p>
            </footer>
        </div >
    );
};

const styles = {
    container: {
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        maxWidth: "800px",
        margin: "auto",
        color: "#333",
        lineHeight: "1.6",
    },
    header: {
        textAlign: "center",
        marginBottom: "20px",
    },
    title: {
        fontSize: "28px",
        color: "#2c3e50",
    },
    date: {
        color: "#7f8c8d",
    },
    section: {
        marginBottom: "20px",
    },
    heading: {
        fontSize: "22px",
        color: "#34495e",
        marginBottom: "10px",
    },
    list: {
        paddingLeft: "20px",
        listStyleType: "disc",
    },
    footer: {
        textAlign: "center",
        marginTop: "30px",
        fontSize: "14px",
        color: "#7f8c8d",
    },
};

export default PrivacyPolicy;
