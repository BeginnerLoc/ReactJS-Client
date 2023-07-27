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

          // Initialize an empty array to store the graph data
          const graphData = [];

          // Loop through the mostFrequentDescriptionNames array
          for (let i = 0; i < mostFrequentDescriptionNames.length; i++) {
            // Get the current description name and its count
            const descriptionName = mostFrequentDescriptionNames[i];
            const count = sortedBreaches[i][1];

            // Define the color based on the index (you can use your own color logic here)
            const colorIndex = i % colors.length;
            const color = colors[colorIndex];

            // Create an object representing the data for the current description name
            const dataItem = {
              id: descriptionName,
              label: descriptionName,
              value: count,
              color: color,
            };

            // Add the dataItem to the graphData array
            graphData.push(dataItem);
          }

          // Now you can set the graph data using the graphData array
          setGraph(graphData);
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