import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AxiosInstance from './Axios';

const MyProjects = () => {
    const userId = localStorage.getItem("userId");
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        if (!userId) {
            navigate("/login");
            return;
        }

        AxiosInstance.get("/projects/")
            .then((response) => {
                const userProjects = response.data.filter(
                    (project) => project.creator === parseInt(userId)
                );
                setProjects(userProjects);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [userId, navigate]);

    const calculateRemainingDays = (endDate) => {
        if (!endDate) return 'N/A';
        const now = new Date();
        const end = new Date(endDate);
        const diff = Math.ceil((end - now) / (1000 * 60 * 60 * 24));
        return diff > 0 ? `${diff} days left` : 'Ended';
    };

    return (
        <div style={{ padding: '2rem', backgroundColor: '#f0f4f8', minHeight: '100vh' }}>
            <h2 style={{ textAlign: 'center', color: '#333' }}>🎯 My Projects</h2>
            {projects.length > 0 ? (
                projects.map((project) => (
                    <div
                        key={project.id}
                        style={{
                            borderRadius: '12px',
                            padding: '1.5rem',
                            margin: '1.5rem auto',
                            maxWidth: '700px',
                            backgroundColor: '#ffffff',
                            boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                        }}
                    >
                        <h3 style={{ color: '#2c3e50', marginBottom: '0.5rem' }}>{project.title}</h3>
                        <div style={{ marginBottom: '0.7rem', color: '#555' }}>
                            <strong>🧩 Project Type:</strong> {project.project_type || 'N/A'}
                        </div>
                        <div style={{ marginBottom: '0.7rem' }}>
                            <strong>📅 End Date:</strong>{' '}
                            <span style={{ color: '#2c3e50' }}>{project.end_date || 'N/A'}</span>
                        </div>
                        <div style={{ marginBottom: '0.7rem' }}>
                            <strong>🎯 Funding Goal:</strong>{' '}
                            <span style={{ color: '#16a085' }}>${project.funding_goal || '0.00'}</span>
                        </div>
                        <div style={{ marginBottom: '0.7rem' }}>
                            <strong>💰 Current Funding:</strong>{' '}
                            <span style={{ color: '#2980b9' }}>${project.current_funding || '0.00'}</span>
                        </div>
                        <div style={{ marginBottom: '0.7rem' }}>
                            <strong>⏳ Remaining Time:</strong>{' '}
                            <span style={{ color: '#e67e22' }}>{calculateRemainingDays(project.end_date)}</span>
                        </div>
                        <div style={{ marginBottom: '0.7rem' }}>
                            <strong>🎁 Rewards:</strong>{' '}
                            <span style={{ color: '#8e44ad' }}>{project.rewards || 'Not specified'}</span>
                        </div>
                    </div>
                ))
            ) : (
                <p style={{ textAlign: 'center', color: '#888', marginTop: '2rem' }}>No projects found.</p>
            )}
        </div>
    );
};

export default MyProjects;
