// ProjectProvider.js
import React, { useState } from 'react';
import ProjectContext from './ProjectContext';

const ProjectProvider = ({ children }) => {
  const [projectId, setProjectId] = useState(1);
  const [projectName, setProjectName] = useState("");


  const updateProjectId = (id, projectName) => {
    setProjectId(id);
    setProjectName(projectName);
  };

  return (
    <ProjectContext.Provider value={{ projectId, updateProjectId, projectName }}>
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectProvider;
