import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";
import ProjectContext from "../context/ProjectContext";
// import { mockBarData as data } from "../data/mockData";
import BotContext from "../context/BotContext"


import { useState, useEffect, React, useContext } from "react";
import axios from 'axios';

const URL = 'http://localhost:5000'

const BarChart = ({ isDashboard = false }) => {
  const { projectId } = useContext(ProjectContext);
  const { updateTopBreachData } = useContext(BotContext);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  const [breachesCount, setBreachesCount] = useState(0);
  const [mostFrequentBreaches, setMostFrequentBreaches] = useState([]);
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

          // Sort the breaches by count in descending order
          const sortedBreaches = Object.entries(breachCounts).sort((a, b) => b[1] - a[1]);

          // Set the breaches count and most frequent breaches state variables
          setBreachesCount(data.length);
          setMostFrequentBreaches(sortedBreaches);

          // Create a Set to store unique worker names
          const uniqueWorkerNames = new Set();

          // Iterate over the breaches and add worker names to the Set
          data.forEach((breach) => {
            const workerName = breach.worker_name;
            uniqueWorkerNames.add(workerName);
          });

          // Convert the Set to an array of unique worker names
          const uniqueWorkerNamesArray = Array.from(uniqueWorkerNames);

          // Access the breaches count and description based on worker name
          const breachesByWorker = uniqueWorkerNamesArray.map(workerName => {
            const count = data.filter(breach => breach.worker_name === workerName).length;
            const descriptions = data
              .filter(breach => breach.worker_name === workerName)
              .reduce((acc, breach) => {
                acc[breach.description] = (acc[breach.description] || 0) + 1;
                return acc;
              }, {});
            return { workerName, count, descriptions };
          });
          breachesByWorker.sort((a, b) => a.count - b.count);
          setGraph([
            {

              country: breachesByWorker[0].workerName,
              [Object.keys(breachesByWorker[0].descriptions)[0]]: breachesByWorker[0].descriptions[Object.keys(breachesByWorker[0].descriptions)[0]],
              "hot dogColor": "hsl(229, 70%, 50%)",
              [Object.keys(breachesByWorker[0].descriptions)[1]]: breachesByWorker[0].descriptions[Object.keys(breachesByWorker[0].descriptions)[1]],
              burgerColor: "hsl(111, 70%, 50%)",
              [Object.keys(breachesByWorker[0].descriptions)[2]]: breachesByWorker[0].descriptions[Object.keys(breachesByWorker[0].descriptions)[2]],
              burgerColor: "hsl(111, 70%, 50%)",
              [Object.keys(breachesByWorker[0].descriptions)[3]]: breachesByWorker[0].descriptions[Object.keys(breachesByWorker[0].descriptions)[3]],
              burgerColor: "hsl(111, 70%, 50%)",
              [Object.keys(breachesByWorker[0].descriptions)[4]]: breachesByWorker[0].descriptions[Object.keys(breachesByWorker[0].descriptions)[4]],
              burgerColor: "hsl(111, 70%, 50%)",
              [Object.keys(breachesByWorker[0].descriptions)[5]]: breachesByWorker[0].descriptions[Object.keys(breachesByWorker[0].descriptions)[5]],
              burgerColor: "hsl(111, 70%, 50%)",
            },
            {
              country: breachesByWorker[1].workerName,
              [Object.keys(breachesByWorker[1].descriptions)[0]]: breachesByWorker[1].descriptions[Object.keys(breachesByWorker[1].descriptions)[0]],
              "hot dogColor": "hsl(229, 70%, 50%)",
              [Object.keys(breachesByWorker[1].descriptions)[1]]: breachesByWorker[1].descriptions[Object.keys(breachesByWorker[1].descriptions)[1]],
              burgerColor: "hsl(111, 70%, 50%)",
              [Object.keys(breachesByWorker[1].descriptions)[2]]: breachesByWorker[1].descriptions[Object.keys(breachesByWorker[1].descriptions)[2]],
              burgerColor: "hsl(111, 70%, 50%)",
              [Object.keys(breachesByWorker[1].descriptions)[3]]: breachesByWorker[1].descriptions[Object.keys(breachesByWorker[1].descriptions)[3]],
              burgerColor: "hsl(111, 70%, 50%)",
              [Object.keys(breachesByWorker[1].descriptions)[4]]: breachesByWorker[1].descriptions[Object.keys(breachesByWorker[1].descriptions)[4]],
              burgerColor: "hsl(111, 70%, 50%)",
              [Object.keys(breachesByWorker[0].descriptions)[5]]: breachesByWorker[1].descriptions[Object.keys(breachesByWorker[1].descriptions)[5]],
              burgerColor: "hsl(111, 70%, 50%)",
            },
            {
              country: breachesByWorker[2].workerName,
              [Object.keys(breachesByWorker[2].descriptions)[0]]: breachesByWorker[2].descriptions[Object.keys(breachesByWorker[2].descriptions)[0]],
              "hot dogColor": "hsl(229, 70%, 50%)",
              [Object.keys(breachesByWorker[2].descriptions)[1]]: breachesByWorker[2].descriptions[Object.keys(breachesByWorker[2].descriptions)[1]],
              burgerColor: "hsl(111, 70%, 50%)",
              [Object.keys(breachesByWorker[2].descriptions)[2]]: breachesByWorker[2].descriptions[Object.keys(breachesByWorker[2].descriptions)[2]],
              burgerColor: "hsl(111, 70%, 50%)",
              [Object.keys(breachesByWorker[2].descriptions)[3]]: breachesByWorker[2].descriptions[Object.keys(breachesByWorker[2].descriptions)[3]],
              burgerColor: "hsl(111, 70%, 50%)",
              [Object.keys(breachesByWorker[2].descriptions)[4]]: breachesByWorker[2].descriptions[Object.keys(breachesByWorker[2].descriptions)[4]],
              burgerColor: "hsl(111, 70%, 50%)",
              [Object.keys(breachesByWorker[0].descriptions)[5]]: breachesByWorker[2].descriptions[Object.keys(breachesByWorker[2].descriptions)[5]],
              burgerColor: "hsl(111, 70%, 50%)",
            },
            {
              country: breachesByWorker[3].workerName,
              [Object.keys(breachesByWorker[3].descriptions)[0]]: breachesByWorker[3].descriptions[Object.keys(breachesByWorker[3].descriptions)[0]],
              "hot dogColor": "hsl(229, 70%, 50%)",
              [Object.keys(breachesByWorker[3].descriptions)[1]]: breachesByWorker[3].descriptions[Object.keys(breachesByWorker[3].descriptions)[1]],
              burgerColor: "hsl(111, 70%, 50%)",
              [Object.keys(breachesByWorker[3].descriptions)[2]]: breachesByWorker[3].descriptions[Object.keys(breachesByWorker[3].descriptions)[2]],
              burgerColor: "hsl(111, 70%, 50%)",
              [Object.keys(breachesByWorker[3].descriptions)[3]]: breachesByWorker[3].descriptions[Object.keys(breachesByWorker[3].descriptions)[3]],
              burgerColor: "hsl(111, 70%, 50%)",
              [Object.keys(breachesByWorker[3].descriptions)[4]]: breachesByWorker[3].descriptions[Object.keys(breachesByWorker[3].descriptions)[4]],
              burgerColor: "hsl(111, 70%, 50%)",
              [Object.keys(breachesByWorker[0].descriptions)[5]]: breachesByWorker[3].descriptions[Object.keys(breachesByWorker[3].descriptions)[5]],
              burgerColor: "hsl(111, 70%, 50%)",
            },
          ]);
        })
      .catch(error => {
      console.error(error);
      });
  }, []);

  useEffect(() => {
    if (graph.length > 0) {
      // updateTopBreachData(graph);
      console.log(graph);
    }
  }, [graph]);

  return (
    <ResponsiveBar
      data={graph}
      layout="horizontal"
      theme={{
        // added
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
      //keys={["hot dog", "burger", "kebab", "donut"]}
      //Shows the 0-6 Options
      keys={(([...keys]) => keys.slice(0, 6))(mostFrequentBreaches.map(([description, count]) => description))}
      indexBy="country"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "nivo" }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      borderColor={{
        from: "color",
        modifiers: [["darker", "1.6"]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "country", // changed
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "food", // changed
        legendPosition: "middle",
        legendOffset: -40,
      }}
      enableLabel={false}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      barAriaLabel={function (e) {
        return e.id + ": " + e.formattedValue + " in country: " + e.indexValue;
      }}
    />
  );
};

export default BarChart;