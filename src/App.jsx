const React = require('react');
const {useState, useEffect} = require('react');
const DesktopLoginPage = require('./desktop-components/login/index.jsx');
const DesktopNav = require('./desktop-components/navigation/desktopNav.jsx');

const App = () => {
  const [query, setQuery] = useState('');
  const [visibility, setVisibility] = useState(['login']);
  const [page, setPage] = useState('login');
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
      </div>
    </div>
  );
};

module.exports = App;
