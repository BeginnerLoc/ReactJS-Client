import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
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
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const [topBreaches, setTopBreaches] = useState([]);

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
  
    // Apply date range filter
    if (selectedStartDate !== "" && selectedEndDate !== "") {
      filteredData = filteredData.filter((worker) => {
        const workerTime = new Date(worker.time);
        const startDate = new Date(selectedStartDate);
        const endDate = new Date(selectedEndDate);
        const workerDateString = formatDate(workerTime);
        const startDateString = formatDate(startDate);
        const endDateString = formatDate(endDate);
        return (
          workerDateString >= startDateString && workerDateString <= endDateString
        );
      });
    }
  
    // Sort the filtered data by date, name, or breach time
    if (topBreaches.length > 0) {
      filteredData = filteredData.filter((worker) =>
        topBreaches.includes(worker.id)
      );
    }
  
    setFilteredWorkerDetails(filteredData);
  }, [selectedFilter, selectedStartDate, selectedEndDate, workerDetails, topBreaches]);
  
  // Function to format date as "YYYY-MM-DD"
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  
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

  const handleStartDateChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedStartDate(selectedValue);
  };

  const handleEndDateChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedEndDate(selectedValue);
  };

  const handleTopBreachesChange = (event) => {
    const topBreachesCount = parseInt(event.target.value, 10);
    const sortedBreaches = workerDetails
      .slice()
      .sort((a, b) => new Date(b.time.replace(" ", "T")) - new Date(a.time.replace(" ", "T")))
      .slice(0, Math.ceil((topBreachesCount / 100) * workerDetails.length))
      .map((worker) => worker.id);
    setTopBreaches(sortedBreaches);
  };

  return (
    <Box m="20px">
      <Header title="Breach Management Console" subtitle="Centralized Control for Effective Breach Handling"/>
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
        <Typography variant="subtitle1">Filter by Date Range:</Typography>
        <input
          type="text"
          value={selectedStartDate}
          onChange={handleStartDateChange}
          placeholder="Start Date (YYYY-MM-DD)"
        />
        <input
          type="text"
          value={selectedEndDate} 
          onChange={handleEndDateChange}
          placeholder="End Date (YYYY-MM-DD)"
        />
        <Typography variant="subtitle1">Top % Breaches:</Typography>
        <input
          type="number"
          min="0"
          max="100"
          step="10"
          onChange={handleTopBreachesChange}
        />
      </Box>
      <Box
        m="10px 0 0 0"
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
          components={{
            Toolbar: GridToolbar, // Add a toolbar to the grid
          }}
          sortModel={[
            // Enable sorting by date, name, and breach time
            { field: "time", sort: "asc" },
            { field: "name", sort: "asc" }, 
            { field: "breach", sort: "asc" },
          ]}
        />
      </Box>
    </Box>
  );
};

export default Team;
