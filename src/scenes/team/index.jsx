import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState, useContext } from "react";
import { tokens } from "../../theme";
import ProjectContext from "../../context/ProjectContext";

import axios from "axios";
import Header from "../../components/Header";

const URL = 'http://localhost:5000';

const Team = () => {
  const { projectId } = useContext(ProjectContext);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "worker_id", headerName: "Worker ID" },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "position", headerName: "Position", flex: 1 },
    { field: "supervisor", headerName: "Supervisor", flex: 1 },
    { field: "breach", headerName: "Breach", flex: 1 },
    { field: "time", headerName: "Time", flex: 1 },
  ];

  const [workerDetails, setWorkerDetails] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [filteredWorkerDetails, setFilteredWorkerDetails] = useState([]);
  const [uniqueNames, setUniqueNames] = useState([]);
  const [selectedDateFilter, setSelectedDateFilter] = useState("");

  useEffect(() => {
    axios
      .get(`${URL}/api/${projectId}/all_workers`)
      .then((workersResponse) => {
        const workersData = workersResponse.data;

        // Create an array of unique names
        const names = [...new Set(workersData.map((worker) => worker.name))];
        setUniqueNames(names);

        axios
          .get(`${URL}/api/${projectId}/indiv_breaches`) 
          .then((breachesResponse) => {
            const breachesData = JSON.parse(breachesResponse.data);

            // Create separate rows for workers with breaches
            const rowsWithBreaches = [];
            let uniqueIdCounter = 1; // Initialize a counter for unique identifiers
            workersData.forEach((worker) => {
              const workerBreaches = breachesData.filter(
                (breach) => breach.worker_name === worker.name
              );
              if (workerBreaches.length > 0) {
                workerBreaches.forEach((breach) => {
                  rowsWithBreaches.push({
                    worker_id: worker.worker_id,
                    name: worker.name,
                    position: worker.position,
                    supervisor: worker.supervisor,
                    breach: breach.description,
                    time: breach.datetime,
                    id: `${worker.worker_id}-${breach._id}`, // Assign unique identifier using worker_id and breach _id
                  });
                });
              } else {
                rowsWithBreaches.push({
                  worker_id: worker.worker_id,
                  name: worker.name,
                  position: worker.position,
                  supervisor: worker.supervisor,
                  breach: "",
                  time: "",
                  id: `no-breach-${uniqueIdCounter}`, // Assign a unique identifier for rows without breaches
                });
                uniqueIdCounter++; // Increment the uniqueIdCounter for each row without breaches
              }
            });

            setWorkerDetails(rowsWithBreaches);
            setFilteredWorkerDetails(rowsWithBreaches);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    let filteredData = workerDetails;

    // Apply name filter
    if (selectedFilter !== "") {
      filteredData = filteredData.filter(
        (worker) => worker.name === selectedFilter
      );
    }

    // Apply date filters
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set the time to the start of the day

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    sevenDaysAgo.setHours(0, 0, 0, 0); // Set the time to the start of the day

    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0); // Set the time to the start of the day

    if (selectedDateFilter === "today") {
      filteredData = filteredData.filter(
        (worker) => new Date(worker.time) >= today
      );
    } else if (selectedDateFilter === "sevenDays") {
      filteredData = filteredData.filter(
        (worker) => new Date(worker.time) >= sevenDaysAgo
      );
    } else if (selectedDateFilter === "month") {
      filteredData = filteredData.filter(
        (worker) => new Date(worker.time) >= startOfMonth
      );
    }

    setFilteredWorkerDetails(filteredData);
  }, [selectedFilter, selectedDateFilter, workerDetails]);

  const handleFilterChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedFilter(selectedValue);

    // Filter the worker details based on the selected name
    if (selectedValue !== "") {
      const filteredData = workerDetails.filter(
        (worker) => worker.name === selectedValue
      );
      setFilteredWorkerDetails(filteredData);
    } else {
      // If no filter is selected, show all worker details
      setFilteredWorkerDetails(workerDetails);
    }
  };

  const handleDateFilterChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedDateFilter(selectedValue);
  };

  return (
    <Box m="20px">
      <Header title="Breaches" subtitle="Managing the Workers" />
      <Box>
        <Typography variant="subtitle1">Filter by Name:</Typography>
        <select value={selectedFilter} onChange={handleFilterChange}>
          <option value="">All</option>
          {uniqueNames.map((name) => (
            <option key={name} value={name}> 
              {name}
            </option>
          ))}
        </select>
        <Typography variant="subtitle1">Filter by Date:</Typography>
        <select value={selectedDateFilter} onChange={handleDateFilterChange}>
          <option value="">All</option>
          <option value="today">Today</option>
          <option value="sevenDays">Last 7 Days</option> 
          <option value="month">This Month</option>
        </select>
      </Box>
      <Box
        m="40px 0 0 0"
        height="50vh"  
        sx={{
          "& .MuiDataGrid-root": {
            border: "none", 
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
          rows={filteredWorkerDetails}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]} 
          disableSelectionOnClick
        />
      </Box>
    </Box>
  );
};

export default Team;
