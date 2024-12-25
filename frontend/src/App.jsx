import React, { useState, useEffect } from 'react';
import axios from 'axios';
const backendURL = 'http://chaiboi.me/api'
function Members() {
    const [members, setMembers] = useState([]);
    const [newMember, setNewMember] = useState('');
    
    // Fetch members from the backend
    const fetchMembers = async () => {
        try {
            const response = await axios.get(`${backendURL}/members`);
            setMembers(response.data);
        } catch (error) {
            console.error("Error fetching members:", error);
        }
    };

    // Add new member to the backend
    const addMember = async () => {
        if (!newMember) return;

        try {
            await axios.post(`${backendURL}/add`, { name: newMember });
            setNewMember('');
            fetchMembers(); // Reload members list
        } catch (error) {
            console.error("Error adding member:", error);
        }
    };

    useEffect(() => {
        fetchMembers();
    }, []);

    return (
        <div>
            <h1>Members</h1>
            <ul>
                {members.map((member, index) => (
                    <li key={index}>{member}</li>
                ))}
            </ul>
            <input 
                type="text" 
                value={newMember} 
                onChange={(e) => setNewMember(e.target.value)} 
                placeholder="Add new member" 
            />
            <button onClick={addMember}>Add Member</button>
        </div>
    );
}

export default Members;
