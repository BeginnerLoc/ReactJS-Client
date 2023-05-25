import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { tokens } from "../../theme";

import axios from "axios";
import Header from "../../components/Header";

const URL = 'http://localhost:5000';

const Team = () => {
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

  useEffect(() => {
    axios
      .get(`${URL}/api/all_workers`)  
      .then((workersResponse) => {
        const workersData = workersResponse.data;

        // Create an array of unique names
        const names = [...new Set(workersData.map((worker) => worker.name))];
        setUniqueNames(names);

        axios
        .get(`${URL}/api/indiv_breaches`)
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

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);

    // Filter the worker details based on the selected name
    if (event.target.value !== "") {
      const filteredData = workerDetails.filter(
        (worker) => worker.name === event.target.value
      );
      setFilteredWorkerDetails(filteredData);
    } else {
      // If no filter is selected, show all worker details
      setFilteredWorkerDetails(workerDetails);
    }
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
      </Box>
      <Box
        m="40px 0 0 0"
        height="55vh"
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
          checkboxSelection
          rows={filteredWorkerDetails}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Team;
