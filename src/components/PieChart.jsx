import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
import ProjectContext from "../context/ProjectContext";
//import { mockPieData as data } from "../data/mockData";

import { useState, useEffect, React, useContext } from "react";
import axios from 'axios';

const URL = 'http://localhost:5000'


const PieChart = () => {
  const { projectId } = useContext(ProjectContext);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [graph, setGraph] = useState([]);

  useEffect(() => {
    axios.get( `${URL}/api/${projectId}/graph_breaches`)
        .then(response => {
          const data = response.data;
          
          // Count the most frequent breaches
          const breachCounts = {};
          data.forEach(breach => {
            const description = breach.description;
            breachCounts[description] = (breachCounts[description] || 0) + 1;
          });

          // // Sort the breaches by count in descending order
          const sortedBreaches = Object.entries(breachCounts).sort((a, b) => b[1] - a[1]);

          // // Get the description names of the most frequent breaches
          const mostFrequentDescriptionNames = sortedBreaches.map(entry => entry[0]);

          setGraph([
            {
              id: mostFrequentDescriptionNames[0],
              label: mostFrequentDescriptionNames[0],
              value: sortedBreaches[0][1],
              color: "hsl(104, 70%, 50%)",
            },
            {
              id: mostFrequentDescriptionNames[1],
              label: mostFrequentDescriptionNames[1],
              value: sortedBreaches[1][1],
              color: "hsl(162, 70%, 50%)",
            },
            {
              id: mostFrequentDescriptionNames[2],
              label: mostFrequentDescriptionNames[2],
              value: sortedBreaches[2][1],
              color: "hsl(291, 70%, 50%)",
            },
            {
              id: mostFrequentDescriptionNames[3],
              label: mostFrequentDescriptionNames[3],
              value: sortedBreaches[3][1],
              color: "hsl(229, 70%, 50%)",
            },
            {
              id: mostFrequentDescriptionNames[4],
              label: mostFrequentDescriptionNames[4],
              value: sortedBreaches[4][1],
              color: "hsl(344, 70%, 50%)",
            },
          ]);
        })
      .catch(error => {
      console.error(error);
      });
  }, []);

  return (
    <ResponsivePie
      data={graph}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
      }}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor={colors.grey[100]}
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      enableArcLabels={false}
      arcLabelsRadiusOffset={0.4}
      arcLabelsSkipAngle={7}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: 56,
          itemsSpacing: 0,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: "#999",
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
    />
  );
};

export default PieChart;