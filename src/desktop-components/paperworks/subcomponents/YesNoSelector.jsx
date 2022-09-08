const React = require('react');
const {useEffect, useRef} = require('react');

module.exports = (props) => {
  let yesEl = useRef(null);
  let noEl = useRef(null);
  let value = props.value;
  let set = props.set || function(){};

  useEffect(() => {
    yesEl.current.style.border = "none";
    noEl.current.style.border = "none";

    if (value !== null) (value === true? yesEl.current : noEl.current).style.border = "1px solid red";
  }, [value]);

  return (
    <div className="yes-no-selector">
      <div 
      className="yes-selector" 
      ref={yesEl}
      onClick={() => set(true)}
      >
        YES
      </div>
      
      <div 
      className="no-selector" 
      ref={noEl}
      onClick={() => set(false)}
      >
        NO
      </div>
    </div>
  );
};