import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import ErrorOutlinedIcon from '@mui/icons-material/ErrorOutlined';
import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import DangerousIcon from '@mui/icons-material/Dangerous';
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import StatBox from "../../components/StatBox";

import { useState, useEffect } from "react";
import axios from 'axios';


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



  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
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
                Weekly number of breaches (7 days)
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                $59,342.32
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Box>
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