import React, { useState, useContext } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, FormControl, InputLabel, Select, MenuItem, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ProjectContext from '../../context/ProjectContext';
import { tokens } from "../../theme";

const ProjectModal = () => {
  const { updateProjectId } = useContext(ProjectContext);
  const navigate = useNavigate();

  const [open, setOpen] = useState(true);
  const [selectedProject, setSelectedProject] = useState('');

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  const projectOptions = [
    { id: 1, name: 'Site A' },
    { id: 2, name: 'Site B' },
    { id: 3, name: 'Site C' },
  ];

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if (selectedProject !== '') {
      setOpen(false);
    }
  };

  const handleProjectChange = (event) => {
    setSelectedProject(event.target.value);
  };

  const handleSave = () => {
    if (selectedProject !== '') {
      // Find the selected project object based on its name
      const selectedProjectObj = projectOptions.find((project) => project.name === selectedProject);

      // Update the project ID in the context
      if (selectedProjectObj) {
        updateProjectId(selectedProjectObj.id, selectedProjectObj.name);
      }

      setOpen(false);

      // Navigate to Dashboard component
      navigate('/dashboard');
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth >
        <DialogTitle  sx={{bgcolor:colors.primary[400]}}>Select a Site</DialogTitle>
        <DialogContent  sx={{bgcolor: colors.primary[400]}}>
          <FormControl fullWidth >
            <InputLabel id="project-label">Site</InputLabel>
            <Select
              labelId="project-label"
              id="project-select"
              value={selectedProject}
              onChange={handleProjectChange}
              style={{backgroundColor: colors.primary[400]}}
            >
              <MenuItem value="">Select a Site</MenuItem>
              {projectOptions.map((project) => (
                <MenuItem key={project.id} value={project.name}>
                  {project.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions  sx={{bgcolor: colors.primary[400]}}>
          <Button onClick={handleSave} disabled={selectedProject === ''} sx={{bgcolor: colors.blueAccent[700], color: colors.primary[600]}}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProjectModal;
