const React = require('react');
const {useEffect} = require('react');
const bar128 = require('./bar128.js');

module.exports = ({serialNumber="43892", partNumber="", revision="", description="", setSerialNumber, setPartNumber, setRevision, setDescription}) => {

  useEffect(() => {
    document.querySelector('#serialNumber').value = serialNumber;
    document.querySelector('#partNumber').value = partNumber;
    document.querySelector('#revision').value = revision;
    document.querySelector('#description').value = description;
  }, [serialNumber, partNumber, revision, description]);

  const setValue = (e) => {
    const type = e.target.id;
    const val = e.target.value;
    if (type === 'serialNumber') setSerialNumber(val);
    else if (type === 'partNumber') setPartNumber(val);
    else if (type === 'revision') setRevision(val);
    else if (type === 'description') setDescription(val);
  };

  return (
    <div className="p2-part-and-description">
      <div className="p2-part-and-description-info">
      
        <div className="p2-part-info">
          <div className="p2-part-order-number-header p2-header">ORDER NUMBER</div>
          <div className="p2-part-part-number-header p2-header">PART NUMBER</div>
          <div className="p2-part-revision-header p2-header">REVISION</div>
          <div className="p2-part-order-number-text">
            <input type="text" id="serialNumber" className='p2-input' defaultValue={serialNumber} onChange={setValue}/>
          </div>
          <div className="p2-part-part-number-text">
            <input type="text" id="partNumber" className='p2-input' defaultValue={partNumber} onChange={setValue}/>
          </div>
          <div className="p2-part-revision-text">
            <input type="text" id="revision" className='p2-input' defaultValue={revision} onChange={setValue}/>
          </div>
        </div>
     
        <div className="p2-part-description">
          <div className="p2-part-description-header p2-header">DESCRIPTION</div>
          <div className="p2-part-description-text">
            <input type="text" id="description" className='p2-input' defaultValue={description} onChange={setValue}/>
          </div>
        </div>
      </div>

      <div className="p2-part-and-description-barcode">
        <div className="p2-job-number-barcode bar128">{bar128(serialNumber)}</div>
        <div className="p2-job-number-text">{serialNumber}</div>
      </div>
    </div>
  );
};