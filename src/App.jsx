const React = require('react');
const {useState, useEffect} = require('react');
const DesktopNav = require('./desktop-components/navigation/desktopNav.jsx');
const DesktopLoginPage = require('./desktop-components/login/index.jsx');
const DesktopAdmin = require('./desktop-components/admin/index.jsx');

const App = () => {
  const [query, setQuery] = useState('');
  const [visibility, setVisibility] = useState(['Login']);
  const [page, setPage] = useState('Login');
  const [user, setUser] = useState({});

  useEffect(() => {
    if (user.visibility === undefined) return;
    setVisibility(user.visibility);
    setPage(user.visibility[0]);
  }, [user]);

  return (
    <div className="app">
      <DesktopNav setQuery={setQuery}/>

      <div className="main-content">
        <DesktopLoginPage page={page} setUser={setUser}/>
        <DesktopAdmin page={page}/>
      </div>
    </div>
  );
};

module.exports = App;
