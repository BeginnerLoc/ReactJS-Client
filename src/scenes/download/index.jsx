import { Box, Button, useTheme, FormControl, FormControlLabel, Checkbox } from "@mui/material";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { tokens } from "../../theme";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/Header";

const URL = 'http://localhost:5000';

const Download = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [showDropdowns, setShowDropdowns] = React.useState(false);
  const [reportType, setReportType] = useState('');
  const [days, setDays] = useState('');

  const [checkedItems, setCheckedItems] = useState([]);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      setCheckedItems([...checkedItems, name]);
    } else {
      setCheckedItems(checkedItems.filter((item) => item !== name));
    }
  };

  const handleDownload = () => {
    setShowDropdowns(true);

    // Get the start and end date values from the input fields
    const startDate = new Date(document.getElementById('Start').value);
    const endDate = new Date(document.getElementById('End').value);

    // Calculate the difference in days between the start and end dates
    const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
    const days = Math.ceil(timeDiff / (1000 * 3600 * 24));

    // Send a request to the server endpoint responsible for generating and serving the PDF
    const url = `${URL}/download_pdf?report_type=${reportType}&days=${days}`;
    axios
      .get(url, { responseType: 'blob' })
      .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Safety Report.pdf';
        a.click();
      })
      .catch(error => {
        console.error('Error requesting the PDF report', error);
      });
  };

  return (
    <Box m="20px">
      <Header title="Download" subtitle="Downloading PDF Report" />
      <Box m="20px">
      
        {/* Report Type */}
        <div>
          <h2>Report Type</h2>
          <FormControl>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkedItems.includes('incidents')}
                  onChange={handleCheckboxChange}
                  name="incidents"
                  color="success"
                />
              }
              label="Incidents"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkedItems.includes('breaches')}
                  onChange={handleCheckboxChange}
                  name="breaches"
                  color="success"
                />
              }
              label="Breaches"
            />
          </FormControl>
        </div>

        {/* Date Range Selector */}
        <div>
          <h2>Date Range</h2>
        </div>
        <div style={{ paddingBottom: '10px' }}>
          <label htmlFor="Start" style={{ fontSize: '16px', paddingLeft: '5px', paddingRight: '5px' }}>Start:</label>
          <input type="date" id="Start" name="Start Date" />
        </div>
        <div style={{ paddingBottom: '10px' }}>
          <label htmlFor="End" style={{ fontSize: '16px', paddingLeft: '5px', paddingRight: '11px' }}>End:</label>
          <input type="date" id="End" name="End Date" />
        </div>  
        
        {/* Download Button */}
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<DownloadOutlinedIcon />}
          onClick={handleDownload}
        >
          Download Report
        </Button>
      </Box>
    </Box>
  );
};

export default Download;
