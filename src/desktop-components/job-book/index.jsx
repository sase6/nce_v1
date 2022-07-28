const React = require('react');
const { useState, useEffect } = require('react');
const ExpandedJob = require('./expanded.jsx');
const JobBookTable = require('./table.jsx');
const AppendJob = require('./appendJob.jsx');

const DesktopJobBook = props => {
  if (props.page !== 'Job Book') return;
  const [addJobModal, setAddJobModal] = useState(false);

  return (
    <div className="desktop-job-book-container">
      <ExpandedJob setAddJobModal={setAddJobModal}/>
      <JobBookTable />
      <AppendJob addJobModal={addJobModal} setAddJobModal={setAddJobModal}/>
    </div>
  );
};

module.exports = DesktopJobBook