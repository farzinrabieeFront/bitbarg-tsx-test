import React, { useEffect, useState } from "react";
// import { ResponsiveStream } from "@nivo/stream";
import { ResponsiveLine } from "@nivo/line";
import { colorChange, findCurrencyColor } from "../../utils/utils";
// let data = [
//   {
//     id: "japan",
//     color: "#26AB6D",
//     data: [
//       {
//         x: "plane",
//         y: 245,
//       },
//       {
//         x: "helicopter",
//         y: 253,
//       },
//       {
//         x: "boat",
//         y: 108,
//       },
//       {
//         x: "train",
//         y: 252,
//       },
//       {
//         x: "subway",
//         y: 266,
//       },
//       {
//         x: "bus",
//         y: 7,
//       },
//       {
//         x: "car",
//         y: 242,
//       },
//       {
//         x: "moto",
//         y: 96,
//       },
//     ],
//   },
// ];
const MyResponsiveStream = ({ data, row }) => {
  // console.log("data", data);

  const [chart, setChart] = useState([]);
  const [main, setmain] = useState([
    {
      id: 778069,
      color: "#26AB6D",
      data: [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 10, y: 0 },
      ],
    },
  ]);
  // useEffect(() => {
  //   let obj = {};
  //   let dot = {};
  //   let dataChart = [];
  //   data?.items.map((itm, ind) => {
  //     let array = [];
  //     itm?.chart.map((ch, index) => {
  //       dot = {
  //         x: index,
  //         y: Number(ch),
  //       };
  //       array.push(dot);
  //       obj = {
  //         id: itm.id,
  //         color: "#26AB6D",
  //         data: array,
  //       };
  //     });
  //     dataChart.push(obj);
  //   });
  //   console.log("dataChart", dataChart);
  //   setChart(dataChart);
  // }, []);
  useEffect(() => {
    let obj = {};
    let dot = {};
    let dataChart = [];
    let array = [];
    row?.chart.map((ch, index) => {
      dot = {
        x: index,
        y: Number(ch),
      };
      array.push(dot);
      obj = {
        id: row.id,
        color: colorChange(row.percent),
        data: array,
      };
    });
    dataChart.push(obj);

    // console.log("dataChart", dataChart);
    setChart(dataChart);
  }, []);
  useEffect(() => {
    if (chart.length) {
      setmain(chart);
    }
  }, [chart]);
  useEffect(() => {
    console.log("main", main);
  }, [main]);
  return (
    <>
      <ResponsiveLine
        data={main[0]?.data?.length ? main : data}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        yFormat=" >-.2f"
        curve="basis"
        axisTop={null}
        axisRight={null}
        axisBottom={null}
        axisLeft={null}
        enableGridX={false}
        enableGridY={false}
        lineWidth={1}
        enablePoints={false}
        pointSize={10}
        // pointColor={{ theme: "background" }}
        pointBorderWidth={3}
        colors={{ datum: "color" }}
        // colors={
        //   " linear-gradient(180deg, rgba(38, 171, 109, 0.1) 0%, rgba(38, 171, 109, 0) 100%)"
        // }
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        enableArea={true}
        areaOpacity={0.1}
        useMesh={true}
        defs={
          row.percent > 0
            ? [
                {
                  id: "gradientC",
                  type: "linearGradient",
                  colors: [
                    {
                      offset: 0,
                      color: "rgb(48, 190, 129)",
                      opacity: 1,
                    },
                    {
                      offset: 100,
                      color: "rgb(48, 190, 129)",
                      opacity: 0,
                    },
                  ],
                  gradientTransform: "rotate(180deg)",
                },
              ]
            : [
                {
                  id: "gradientD",
                  type: "linearGradient",
                  colors: [
                    {
                      offset: 0,
                      color: "rgb(235, 65, 55)",
                      opacity: 1,
                    },
                    {
                      offset: 100,
                      color: "rgb(235, 65, 55)",
                      opacity: 0,
                    },
                  ],
                  gradientTransform: "rotate(180deg)",
                },
              ]
        }
        legends={[]}
        fill={
          row?.percent > 0
            ? [{ match: "*", id: "gradientC" }]
            : [{ match: "*", id: "gradientD" }]
        }
      />
    </>
  );
};

export default MyResponsiveStream;
