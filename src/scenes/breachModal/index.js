import React, { useEffect, useState } from 'react';
import { Modal, Paper, Button, useTheme } from '@mui/material';
import { tokens } from '../../theme';

const BreachModal = ({ closeModal, isModalOpen, selectedBreachId }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [imageData, setImageData] = useState(""); // State to hold the base64 image data
  const URL = 'http://localhost:5000';

  useEffect(() => {
    // Fetch the image data from the API when the modal is opened or when the selectedBreachId changes
    if (isModalOpen && selectedBreachId) {
      fetchImage(selectedBreachId);
    }
  }, [isModalOpen, selectedBreachId]);

  const fetchImage = (breachId) => {
    // Make a GET request to the API to fetch the image data
    fetch(`${URL}/api/2/get_breach_image/${breachId}`)
      .then((response) => response.json())
      .then((data) => {
        // Update the imageData state with the fetched base64 image data
        setImageData(data.image);
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
          backgroundColor: colors.blueAccent[700], 
          boxShadow: "0 3px 5px rgba(0, 0, 0, 0.2)",
          padding: "16px",
          outline: "none",
          width: "400px",
          maxWidth: "90%",
          textAlign: "center",
        }}
      >
        <h2 id="modal-title">Modal Title</h2>
        {/* Display the image only when imageData is available */}
        {imageData && (
          <img
            src={`data:image/jpg;base64,${imageData}`} // Replace "png" with the correct image format if needed
            alt="Breach Evidence"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        )}


        <p id="modal-description">Breach ID: {selectedBreachId}</p>
        <Button variant="contained" onClick={closeModal}>
          Close
        </Button>
      </Paper>
    </Modal>
  );
};

export default BreachModal;

