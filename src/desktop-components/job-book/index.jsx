const React = require('react');
const ExpandedJob = require('./expanded.jsx');
const JobBookTable = require('./table.jsx');

const DesktopJobBook = props => {
  if (props.page !== 'Job Book') return;

  return (
    <div className="desktop-job-book-container">
      <ExpandedJob />
      <JobBookTable />
    </div>
  );
};

module.exports = DesktopJobBook