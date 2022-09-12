const React = require('react');
const {useEffect, useRef} = require('react');

module.exports = (props) => {
  let yesEl = useRef(null);
  let noEl = useRef(null);
  const {value, set} = props;

  useEffect(() => {
    yesEl.current.style.border = "none";
    noEl.current.style.border = "none";

    if (value === true)  yesEl.current.style.border = "1px solid red";
    else if (value === false) noEl.current.style.border = "1px solid red"; 
  }, [value]);

  const setState = (val) => {
    set(val===value? null : val);
  };

  return (
    <div className="yes-no-selector">
      <div 
      className="yes-selector" 
      ref={yesEl}
      onClick={() => setState(true)}
      >
        YES
      </div>
      
      <div 
      className="no-selector" 
      ref={noEl}
      onClick={() => setState(false)}
      >
        NO
      </div>
    </div>
  );
};