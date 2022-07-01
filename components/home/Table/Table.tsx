import React, { useEffect, useState } from "react";

import styles from "./Table.module.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { withStyles } from "@mui/styles";
import { StarOutline } from "@mui/icons-material";
import { colorChange, handleNumber } from "../../common/utils/utils";
import { Box } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import dynamic from "next/dynamic";
const MyResponsiveStream = dynamic(
  () => import("../../common/chart/MyresponsiveStream/MyResponsiveStream.js"),
  {
    ssr: false,
  }
);
const MuiTableHead = withStyles(() => ({
  root: {
    backgroundColor: "#fafafa",
  },
}))(TableHead);

const TableHeaderCell = withStyles(() => ({
  root: {
    border: "none",
    marginBottom: 15,
    padding: "14px 16px",
    whiteSpace: "nowrap",
    color: "#212121",
  },
}))(TableCell);
type TablePropsTypes = {
  filterPrice: string;
  data: any;
  nextPage: any;
  pageNumber: any;
};

const TableCustom = ({
  filterPrice,
  data,
  nextPage,
  pageNumber,
}: TablePropsTypes) => {
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
  // }, [data]);
  // useEffect(() => {
  //   console.log("chart", chart);
  // }, [chart]);

  return (
    <>
      <InfiniteScroll
        dataLength={data?.items?.length}
        next={nextPage}
        hasMore={data?.meta?.paginateHelper.lastPage !== pageNumber}
        loader={<h4>loading...</h4>}
      >
        <TableContainer className={styles.table} component={Paper}>
          <Table aria-label="table">
            <MuiTableHead>
              <TableRow>
                <TableHeaderCell align="center">نشان کردن</TableHeaderCell>
                <TableHeaderCell align="center">تغییرات</TableHeaderCell>
                <TableHeaderCell align="center">نمودار</TableHeaderCell>
                <TableHeaderCell align="center">
                  {filterPrice === "TOMAN" ? "قیمت فروش" : "ارزش بازار"}
                </TableHeaderCell>
                <TableHeaderCell align="center">
                  {filterPrice === "TOMAN" ? "قیمت خرید" : "قیمت جهانی"}
                </TableHeaderCell>
                <TableHeaderCell align="center">ارز دیجیتال</TableHeaderCell>
              </TableRow>
            </MuiTableHead>
            <TableBody>
              {data?.items.map((row: any, ind: number) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center" component="th" scope="row">
                    <StarOutline />
                  </TableCell>
                  <TableCell
                    align="center"
                    dir="ltr"
                    style={{ color: colorChange(row.percent) }}
                  >{`${row.percent}%`}</TableCell>
                  <TableCell align="center" style={{ width: "150px" }}>
                    <div style={{ width: "150px", height: "50px" }}>
                      <MyResponsiveStream data={dataChart} row={row} />
                    </div>
                  </TableCell>
                  <TableCell align="center" dir="ltr">
                    {filterPrice === "TTR" ? (
                      `${handleNumber(row.quote)} USDT`
                    ) : (
                      <>
                        <span>
                          {handleNumber(row.price * data?.meta?.prices.sell)}
                        </span>
                        {"\u00A0"}
                        <span className={styles.textLight}>تومان</span>
                      </>
                    )}
                  </TableCell>
                  <TableCell align="center" dir="ltr">
                    {filterPrice === "TTR" ? (
                      <span style={{ fontWeight: "bolder" }}>
                        {handleNumber(row.price)}
                      </span>
                    ) : (
                      <>
                        <span>
                          {handleNumber(row.price * data?.meta?.prices.buy)}
                        </span>
                        {"\u00A0"}
                        <span className={styles.textLight}>تومان</span>
                      </>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent={"end"}
                      m={"auto"}
                    >
                      <Box mr="5px">
                        <p>{row.enName}</p>
                        <p className={styles.parentnumber}>
                          <span className={styles.textLight}>{row.coin}</span>
                          <span className={styles.number}>{ind + 1}</span>
                        </p>
                      </Box>

                      <img width="36px" height="36px" src={row.icon} />
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </InfiniteScroll>
    </>
  );
};
let dataChart = [
  {
    id: "empty",
    color: "#26AB6D",
    data: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 10, y: 0 },
    ],
  },
  // {
  //   id: "japan",
  //   color: "#26AB6D",
  //   data: [
  //     {
  //       x: "plane",
  //       y: 245,
  //     },
  //     {
  //       x: "helicopter",
  //       y: 253,
  //     },
  //     {
  //       x: "boat",
  //       y: 108,
  //     },
  //     {
  //       x: "train",
  //       y: 252,
  //     },
  //     {
  //       x: "subway",
  //       y: 266,
  //     },
  //     {
  //       x: "bus",
  //       y: 7,
  //     },
  //     {
  //       x: "car",
  //       y: 242,
  //     },
  //     {
  //       x: "moto",
  //       y: 96,
  //     },
  //   ],
  // },
];

export default TableCustom;
