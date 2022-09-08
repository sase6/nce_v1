const React = require('react');

module.exports = FailedText = ({value, text="FAILED"}) => {
  if (value) return;
  return (
    <div className="failed-text">{text}</div>
  );
};