import { Box, Button, IconButton, Typography, useTheme, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import ErrorOutlinedIcon from '@mui/icons-material/ErrorOutlined';
import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import DangerousIcon from '@mui/icons-material/Dangerous';
import Header from "../../components/Header";
import StatBox from "../../components/StatBox"
import React, { useState, useEffect } from "react";
import axios from 'axios';
import BarChart from "../../components/BarChart";
// import MenuItem from '@mui/material/MenuItem';
// import Select from '@mui/material/Select';;


const URL = 'http://localhost:5000'

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const deadlineDate = new Date('7/20/2023');
  const currentDate = new Date();
  const timeDiff = Math.abs(currentDate.getTime() - deadlineDate.getTime());
  const deadlineCount = Math.ceil(timeDiff / (1000 * 3600 * 24));

  //retrieve data from Flask server

  //today's no of breaches
  const [todayBreaches, setTodayBreaches] = useState(0);
  useEffect(() => {
    axios.get( `${URL}/api/today_breaches`)
      .then(response => {
        console.log(response.data)
        setTodayBreaches(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);


  //most breaches
  const [mostBreaches, setMostBreaches] = useState({});
  useEffect(() => {
    axios.get( `${URL}/api/most_breaches`)
      .then(response => {
        setMostBreaches(JSON.parse(response.data));
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  
  
  const [showDropdowns, setShowDropdowns] = React.useState(false);
  const [reportType, setReportType] = useState('');
  const [days, setDays] = useState('');  
  const handleDownload = () => {
    setShowDropdowns(true);
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
  
  //Live Check-in data
  const [checkIn, setCheckIn] = useState([]);
  useEffect(() => {
    axios.get( `${URL}/api/check_in`)
      .then(response => {
        setCheckIn(JSON.parse(response.data));
      })
      .catch(error => {
        console.error(error);
        setCheckIn([
          {
            id: "1",
            name: 'Loc',
            role: "Construction Worker",
            date: "2021-09-01",
            validity: "True",
          },
          {
            id: "2",
            name: 'Astro',
            role: "Construction Worker",
            date: "2021-09-01",
            validity: "True",
          },
          {
            id: "3",
            name: 'Daren',
            role: "Construction Worker",
            date: "2021-09-01",
            validity: "True",
          }
        ])
      });
  }, []);

  const [breachesCount, setBreachesCount] = useState(0);
  const [mostFrequentBreaches, setMostFrequentBreaches] = useState([]);
  
  useEffect(() => {
    axios.get(`${URL}/api/graph_breaches`)
      .then(response => {
        const data = response.data;
  
        // Count the most frequent breaches
        const breachCounts = {};
        data.forEach(breach => {
          const description = breach.description;
          breachCounts[description] = (breachCounts[description] || 0) + 1;
        });
  
        // Sort the breaches by count in descending order
        const sortedBreaches = Object.entries(breachCounts).sort((a, b) => b[1] - a[1]);
  
        // Get the description names of the most frequent breaches
        const mostFrequentDescriptionNames = sortedBreaches.map(entry => entry[0]);
  
        // Set the breaches count and most frequent breaches state variables
        setBreachesCount(data.length);
        setMostFrequentBreaches(mostFrequentDescriptionNames);

      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        <Box display="flex" alignItems="center">
        {/* Dropdown Boxes */}
        {showDropdowns && (
          <Box display="flex" alignItems="center">
            <Typography variant="body1" sx={{ color: colors.grey[100], marginRight: '10px' }}>
              Report Type:
            </Typography>
            <Select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              sx={{ marginRight: '10px' }}
            >
              <MenuItem value="incidents">Incidents Only</MenuItem>
              <MenuItem value="breaches">Breaches Only</MenuItem>
            </Select>
            <Typography
              variant="body1"
              sx={{ color: colors.grey[100], marginRight: '10px' }}
            >
              Days:
            </Typography>
            <Select value={days} onChange={(e) => setDays(e.target.value)} sx={{ marginRight: '10px' }}>
              <MenuItem value={3}>Last 3 Day</MenuItem>
              <MenuItem value={7}>Last 7 Days</MenuItem>
              <MenuItem value={31}>Last 31 Days</MenuItem>
            </Select>
          </Box>
        )}

        {/* Download Reports Button */}
        <Button
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: '14px',
            fontWeight: 'bold',
            padding: '10px 20px',
            marginLeft: 'auto',
          }}
          onClick={handleDownload}
        >
          <DownloadOutlinedIcon sx={{ mr: '10px' }} />
          Download Reports
        </Button>
      </Box>
    </Box>

    {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={todayBreaches.toString()}
            subtitle="Today's No Of Breaches"
            icon={
              <ErrorOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="100"
            subtitle="Workers Working Today"
            icon={
              <EngineeringOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="50"
            subtitle="Number Of Hazards"
            icon={
              <DangerousIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={deadlineCount}
            subtitle="Days To Project Deadline"
            icon={
              <EventOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        {/* Graph */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Top Weekly Breaches: 
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
              {mostFrequentBreaches[0]} - {breachesCount}
              </Typography>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <BarChart isDashboard={true}/>
          </Box>
        </Box>

        {/* Live Check-in */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Live Check-in
            </Typography>
          </Box>
          {checkIn.map((checkIn, i) => (
            <Box
              key={`${checkIn.id}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {checkIn.name}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {checkIn.role}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{checkIn.date}</Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                {checkIn.validity}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;