import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { tokens } from "../../theme";

import axios from "axios";
import Header from "../../components/Header";

const URL = 'http://localhost:5000';

const Download = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode)

  return (
    <Box m="20px">
      <Header title="Dowload" subtitle="Downloading PDF Report" />
    </Box>
  );
};

export default Download;
