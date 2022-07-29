const React = require('react');
const {useState, useEffect} = require('react');
const DesktopNav = require('./desktop-components/navigation/desktopNav.jsx');
const DesktopLoginPage = require('./desktop-components/login/index.jsx');
const DesktopAdmin = require('./desktop-components/admin/index.jsx');
const DesktopJobBook = require('./desktop-components/job-book/index.jsx');

const App = () => {
  const [query, setQuery] = useState('');
  const [pages, setPages] = useState(['Login']);
  const [page, setPage] = useState('Job Book');
  const [user, setUser] = useState({});

  useEffect(() => {
    if (user.page === undefined) return;
    setVisibility(user.page);
    setPage(user.pages[0]);
  }, [user]);

  return (
    <div className="app">
      <DesktopNav setQuery={setQuery} page={page}/>

      <div className="main-content">
        <DesktopLoginPage page={page} setUser={setUser}/>
        <DesktopAdmin page={page}/>
        <DesktopJobBook page={page} query={query}/>
      </div>
    </div>
  );
};

module.exports = App;
