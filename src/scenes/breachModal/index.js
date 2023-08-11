import React, { useEffect, useState } from 'react';
import { Modal, Paper, Button, useTheme } from '@mui/material';
import { tokens } from '../../theme';

const BreachModal = ({ closeModal, isModalOpen, selectedBreachId }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [imageData, setImageData] = useState(""); // State to hold the base64 image data
  const [workerNameData, setworkerNameData] = useState(""); // State to hold the worker name data
  const [descriptionData, setdescriptionData] = useState(""); // State to hold the description data
  // const [breachIDData, setbreachIDData] = useState(""); // State to hold the breach ID data
  const [locationData, setlocationData] = useState(""); // State to hold the location data
  const [caseResolvedData, setcaseResolvedData] = useState(""); // State to hold the case resolved data
  const [caseResolvedTimeData, setcaseResolvedTimeData] = useState(""); // State to hold the case resolved time data
  const [caseResolutionData, setcaseResolutionData] = useState(""); // State to hold the case resolution data
  const URL = 'http://localhost:5000';

  useEffect(() => {
    // Fetch the image data from the API when the modal is opened or when the selectedBreachId changes
    if (isModalOpen && selectedBreachId) {
      fetchImage(selectedBreachId);
    }
  }, [isModalOpen, selectedBreachId]);

  const fetchImage = (breachId) => {
    // Make a GET request to the API to fetch the image data and worker's data
    fetch(`${URL}/api/2/get_breach_image/${breachId}`)
      .then((response) => response.json())
      .then((data) => {
        
        setImageData(data.image);
        setworkerNameData(data.worker_name);
        setdescriptionData(data.description);
        // setbreachIDData(data.breach_id); // Not in used, but can be enabled in the future
        setlocationData(data.location);
        setcaseResolvedData(data.case_resolved);
        setcaseResolvedTimeData(data.case_resolved_time);
        setcaseResolutionData(data.case_resolution);

      })
      .catch((error) => {
        console.error("Error fetching image data:", error);
      });
  };

  return (
    <Modal
      open={isModalOpen}
      onClose={closeModal}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
    <Paper
      style={{
        backgroundColor: colors.blueAccent[900],
        boxShadow: "0 3px 5px rgba(0, 0, 0, 0.2)",
        padding: "16px",
        outline: "none",
        display: "flex", // Use flex display to arrange elements horizontally
        alignItems: "center" // Vertically align elements in the center
      }}
    >
      <div style={{ flex: 1 }}>
        {/* Display the image only when imageData is available */}
        {imageData && (
          <img
            src={`data:image/jpg;base64,${imageData}`}
            alt="Breach Evidence"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        )}
      </div> 

      <div style={{ flex: 1, marginLeft: "100px" }}>
        <h2 id="modal-title">BREACH EVIDENCE</h2>
        <p id="modal-worker_name"><b>Name: </b>{workerNameData}</p>
        <p id="modal-description"><b>Breach Type: </b> {descriptionData}</p>
        <p id="modal-location"><b>Location: </b> {locationData}</p>
        <p id="modal-location"><b>Case Resolved: </b> {caseResolvedData}</p>
        <p id="modal-location"><b>Case Resolved Time: </b> {caseResolvedTimeData}</p>
        <p id="modal-location"><b>Case Resolution: </b> {caseResolutionData}</p>

        <Button variant="contained" onClick={closeModal}>
          Close
        </Button>

      </div>
    </Paper>
    </Modal>
  );
};

export default BreachModal;

