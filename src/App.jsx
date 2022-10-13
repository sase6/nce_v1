const React = require('react');
const {useState, useEffect} = require('react');
const DesktopNav = require('./desktop-components/navigation/desktopNav.jsx');
const DesktopLoginPage = require('./desktop-components/login/index.jsx');
const DesktopAdmin = require('./desktop-components/admin/index.jsx');
const DesktopJobBook = require('./desktop-components/job-book/index.jsx');
const MobileJobBook = require('./mobile-components/job-book/MobileJobBook.jsx');
const Paperworks = require('./desktop-components/paperworks/Paperworks.tsx');
const Bartender = require('./desktop-components/barcode-bartender/Bartender.jsx');
const RfidTools = require('./desktop-components/rfid/RfidTools.jsx');
const RfidLog = require('./desktop-components/rfid/RfidLog.jsx');
const SystemStatus = require('./helpers/Status.jsx');

const App = () => {
  const [query, setQuery] = useState('');
  const [pages, setPages] = useState(["Login"]);  //Login
  const [page, setPage] = useState('Login');  //Login
  const [user, setUser] = useState({});
  const [viewType, setViewType] = useState("Desktop");
  const [appStatus, setAppStatus] = useState(null);

  window.addEventListener("resize", () => {
    if (window.innerWidth < 1550) setViewType("Mobile");
    else setViewType("Desktop");
  });

  useEffect(() => {
    if (window.innerWidth < 1550) setViewType("Mobile");
    else setViewType("Desktop");
  }, []);

  useEffect(() => {
    if (user.visibility === undefined) return;
    setPages(user.visibility);
    if (user.visibility.indexOf('Admin') !== -1) {
      setPage('Admin');
      return;
    }
    setPage(user.visibility[0]);
  }, [user]);

  return (
    <div className="app">
      <DesktopNav setQuery={setQuery} page={page} pages={pages} setPage={setPage}/>

      <DesktopView page={page} setUser={setUser} user={user} query={query} viewType={viewType} appStatus={appStatus} setAppStatus={setAppStatus}/>
      {/* <MobileView page={page} setUser={setUser} user={user} query={query} viewType={viewType}/> */}
    </div>
  );
};

const DesktopView = (props) => {
  // if (props.viewType !== "Desktop") return;
  const { page, setUser, user, query, appStatus, setAppStatus } = props;

  return (
    <div className="main-content">
      <SystemStatus val={appStatus} set={setAppStatus}/>
      <DesktopLoginPage page={page} setUser={setUser}/>
      <DesktopAdmin page={page} user={user}/>
      <DesktopJobBook page={page} query={query} user={user} setAppStatus={setAppStatus}/>
      <Paperworks page={page} query={query} setAppStatus={setAppStatus}/>
      <Bartender page={page}/>
      {/* <RfidTools page={page} setAppStatus={setAppStatus}/> */}
      {/* <RfidLog page={page}/> */}
    </div>
  );
};

const MobileView = (props) => {
  if (props.viewType !== "Mobile") return;

  return (
    <div className="mobile-main-content">
      {/* <DesktopLoginPage page={page} setUser={setUser}/> */}
      <MobileJobBook />
    </div>
  );
};

module.exports = App;