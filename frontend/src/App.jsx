import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import axios from 'axios';
const backendURL = 'https://chaiboi.me/mywebsite/api'
function Members1() {
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
            <h1>Members1 view page</h1>
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

function Members2() {
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
            <h1>members 2 view page</h1>
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

const Home = () => {
    return (
        <div>
            THIS IS HOME PAGE
        </div>
    )
}
const App = () => {
  return (
    <Router>
      
        <Routes>
           
          <Route path="/endpoint1" element={<Members1 />} />
          <Route path="/endpoint2" element={<Members2 />} />
            <Route path="*" element={<Home />} />
        </Routes>
     
    </Router>
  );
};




export default App;
