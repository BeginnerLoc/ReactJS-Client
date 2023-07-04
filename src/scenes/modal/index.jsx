import React, { useState, useContext } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ProjectContext from '../../context/ProjectContext';

const ProjectModal = () => {
  const { projectId, updateProjectId } = useContext(ProjectContext);
  const navigate = useNavigate();

  const [open, setOpen] = useState(true);
  const [selectedProject, setSelectedProject] = useState('');

  const projectOptions = [
    { id: 1, name: 'Project A' },
    { id: 2, name: 'Project B' },
    { id: 3, name: 'Project C' },
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
        updateProjectId(selectedProjectObj.id);
      }

      setOpen(false);

      // Navigate to Dashboard component
      navigate('/dashboard');
    }
  };

  return (
    <div>
      <Button onClick={handleOpen}>Open Modal</Button>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Select Project</DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <InputLabel id="project-label">Project</InputLabel>
            <Select
              labelId="project-label"
              id="project-select"
              value={selectedProject}
              onChange={handleProjectChange}
            >
              <MenuItem value="">Select a project</MenuItem>
              {projectOptions.map((project) => (
                <MenuItem key={project.id} value={project.name}>
                  {project.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSave} disabled={selectedProject === ''}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProjectModal;
