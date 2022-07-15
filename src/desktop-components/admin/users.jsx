const React = require('react');
const { useState, useEffect } = require('react');
const SectionComponent = require('./sectionComponent.jsx');
const PendingUser = require('./pendingUserComponent.jsx');
const axios = require('axios');

const Users = props => {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);

  const fetchUsers = () => {
    axios({
      method: 'get',
      url: '/users'
    })
    .then(res => {
      let pending = [];
      let active = [];

      res.data.forEach(user => {
        if (user.pending) pending.push(user)
        else active.push(user);
      });

      console.log({active, pending});
      setActiveUsers(active);
      setPendingUsers(pending);
    })
    .catch(err => {
      console.log('Error fetching users!');
    })
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="desktop-admin-subtree desktop-admin-users">
      <div className="desktop-admin-section-title-container">
        Users
      </div>

      <div className="desktop-admin-section-body-container">
        <SectionComponent render={pendingUsers.length > 0} text="Pending"/>
        {/* {pendingUsers.map((user, i) => <PendingUser fetchUsers={fetchUsers} user={user} key={`pendinguser-${i}`}/>)} */}
        <RenderUsers fetchUsers={fetchUsers} users={pendingUsers}/>
        <SectionComponent render={activeUsers.length > 0} text="Active"/>
        <RenderUsers fetchUsers={fetchUsers} users={activeUsers}/>
      </div>
    </div>
  );
};

const RenderUsers = props => {
  console.log('users: ', props.users);
  return (
    <div className="render-users">
      {props.users.map((user, i) => {
        return <PendingUser fetchUsers={props.fetchUsers} user={user} key={`${Math.random()*100}${user}-${i}`}/>
      })}
    </div>
  );
};

module.exports = Users;