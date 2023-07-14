import React, { useState } from 'react';
import { Modal, Paper, Button } from '@mui/material';

const BreachModal = ({ closeModal, isModalOpen }) => {

  return (
    <Modal
      open={isModalOpen}
      onClose={closeModal}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Paper
        style={{
          backgroundColor: 'white',
          boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)',
          padding: '16px',
          outline: 'none',
          width: '400px',
          maxWidth: '90%',
          textAlign: 'center',
        }}
      >
        <h2 id="modal-title">Modal Title</h2>
        <p id="modal-description">Modal Content</p>
        <Button variant="contained" onClick={closeModal}>
          Close
        </Button>
      </Paper>
    </Modal>
  );
};

export default BreachModal;
