const React = require('react');
const { useState, useEffect } = require('react');
const SectionComponent = require('./sectionComponent.jsx');
const PendingUser = require('./pendingUserComponent.jsx');
const axios = require('axios');

const Users = props => {

  const [users, setUsers] = useState([]);
  const [pendingUsers, setPendingUsers] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);

  // Fetch Users on Mount
  useEffect(() => {
    axios({
      method: 'get',
      url: '/users'
    })
    .then(res => {
      setUsers(res.data);
    })
    .catch(err => {
      console.log('Error fetching users!');
    })
  }, []);

  // Change Active/Pending
  useEffect(() => {
    let pending = [];
    let active = [];

    users.forEach(user => {
      if (user.pending) pending.push(user)
      else active.push(user);
    });

    setActiveUsers(active);
    setPendingUsers(pending);
  }, [users]);

  return (
    <div className="desktop-admin-subtree desktop-admin-users">
      <div className="desktop-admin-section-title-container">
        Users
      </div>

      <div className="desktop-admin-section-body-container">
        <SectionComponent render={pendingUsers.length > 0} text="Pending"/>
        {pendingUsers.map((user, i) => <PendingUser key={`pendingUser-${i}`} user={user}/>)}
        <SectionComponent render={activeUsers.length > 0} text="Active"/>
        {activeUsers.map((user, i) => <PendingUser key={`activeUser-${i}`} user={user}/>)}
      </div>
    </div>
  );
};

module.exports = Users;