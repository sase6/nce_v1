const React = require('react');
const { useState, useEffect } = require('react');
const { TextField, Button, FormControl, InputLabel, Select, MenuItem } = require('@mui/material'); 

interface Props {
  user: string;
  page: string;
};

const fileCategories = ['Motorshop'];

const dev = {
  amtOfFiles: 10,
};

const Paperworks = (props:Props) => {
  if (props.page !== 'Paperworks') return;
  
  const [isBrowsingFiles, setIsBrowsingFiles] = useState(true);
  const [fileCategory, setFileCategory] = useState(fileCategories[0]);
  const [amtOfFiles, setAmtOfFiles] = useState(dev.amtOfFiles); //Uses Fake Value (replace later)
  const [currentFileIndex, setCurrentFileIndex] = useState(0);
  const [currentFile, setCurrentFile] = useState(null); // Replace Later!

  const createNewPaperWork = () => {
    console.log('Clicked the new button!');
    setIsBrowsingFiles(false);
  };

  const changeCategory = (e: any) => {
    setFileCategory(e.target?.value);
  };

  return (
    <div className="paperworks">
      
      <div className="paperworks-overlay">
        <div className="paperworks-new-button" hidden={!isBrowsingFiles} >
          <Button variant="outlined" sx={{width: '75px', height: '35px'}} onClick={createNewPaperWork}>New</Button>
        </div>

      <FormControl fullWidth>
        <InputLabel id="category-select-label"
        sx={{
          top: '25px',
          left: '150px'
        }}
        >
          Category
        </InputLabel>
        <Select
          labelId="category-select-label"
          id="select-category"
          value={fileCategory}
          label="Category"
          onChange={changeCategory}
          sx={{
            width: '200px',
            height: '35px',
            top: '25px',
            left: '150px'
          }}
        >
          {fileCategories.map((category) => {
            return (
              <MenuItem value={category}>{category}</MenuItem>
            );
          })}
        </Select>
      </FormControl>
        
        <div className="paperworks-page-changer"></div>
        {/* <Button variant="outlined" sx={{width: '40px', height: '50px', borderRadius: '100%'}}>E</Button> */}
      </div>
    </div>
  );
};

module.exports = Paperworks;
