const React = require('react');

const SectionComponent = props => {
  if (!props.render) return;

  return (
    <div className="section-component">
      <span className="section-component-text">{props.text}</span> 
      <span className="section-component-line"></span>
    </div>
    );
};

module.exports = SectionComponent;