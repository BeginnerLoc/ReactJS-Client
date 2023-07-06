// ProjectProvider.js
import React, { useState } from 'react';
import ProjectContext from './ProjectContext';

const ProjectProvider = ({ children }) => {
  const [projectId, setProjectId] = useState(1);

  const updateProjectId = (id) => {
    setProjectId(id);
  };

  return (
    <ProjectContext.Provider value={{ projectId, updateProjectId }}>
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectProvider;
