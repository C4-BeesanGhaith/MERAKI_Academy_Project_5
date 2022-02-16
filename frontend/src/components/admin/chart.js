import {
  PieChart,
  Pie,
  Sector,
  Cell,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";
import React, { useState, useEffect } from "react";
import { MdDashboard } from "react-icons/md";
import "../admin/admin.css";
import axios from "axios";
// import "../../../node_modules/react-vis/dist/style.css";

// import {
//   XYPlot,
//   XAxis,
//   YAxis,
//   LineSeries,
//   VerticalGridLines,
//   HorizontalGridLines,
//   ChartLabel,
//   VerticalRectSeries,
//   VerticalBarSeries,
//   HorizontalBarSeries
// } from "react-vis";

// const info = [
//   { x: 0, y: 8 },
//   { x: 1, y: 5 },
//   { x: 2, y: 4 },
//   { x: 3, y: 9 },
//   { x: 4, y: 1 },
//   { x: 5, y: 7 },
//   { x: 6, y: 6 },
//   { x: 7, y: 3 },
//   { x: 8, y: 2 },
//   { x: 9, y: 0 },
// ];

const Chart = () => {
  const [category, setCategory] = useState();
  console.log(category);

  // setTimeout(()=>{
  //   category&&category.map((elem,i)=>{return { x: elem.type, y: i }})
  // },1000)
  const [data, setData] = useState();
  const [data1, setData1] = useState([]);
  console.log(data);
  console.log(data1);
  useEffect(() => {
    axios
      .get("/products/group")
      .then(async (res) => {
        console.log(res.data);
        const cat = await res.data.result.map((elem, i) => ({
          name: elem.type,
          value: i,
        }));
        setCategory(cat);
        setData(cat);

        // setData(category)
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("/orders/search/cart")
      .then(async (res) => {
        console.log(res.data.result);

        let value = await res.data.result.map((ele) => {
          return {
            name: ele.type,
            value: ele.quantity,
          };
        });
        setData1(value);
      })
      .catch((er) => {
        console.log(er);
      });
  }, []);

  return (
    <div>
      <div className="divChartPage">
        <div className="ChartPage">
          <MdDashboard className="dash" />
          <h1>Dashboard Page</h1>
        </div>
      </div>
      <div className="underLineChart"></div>
      <div className="chart">
        <div>
          <BarChart width={500} height={300} data={data}>
            <CartesianGrid strokeDasharray="1 1" />
            <XAxis dataKey="name" scale={"point"} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="silver" />
          </BarChart>
          {/* <XYPlot
          xDomain={[timestamp - 2 * ONE_DAY, timestamp + 30 * ONE_DAY]}
          yDomain={[0.1, 2.1]}
          xType="time"
          width={300}
          height={300}
        >
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          <VerticalRectSeries data={data1} style={{ stroke: "#fff" }} />
        </XYPlot> */}
        </div>
        <div>
          <PieChart width={300} height={300}>
            <Pie
              data={data1}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="orange"
              label
            />
            <Tooltip />
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default Chart;
