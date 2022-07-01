import type { NextPage } from "next";

import styles from "../styles/Home.module.css";
import { Box } from "@mui/material";
import FilterSearch from "../components/home/filterSearch/FilterSearch";
import TableCustom from "../components/home/Table/Table";
import { useEffect, useState } from "react";
import axios from "axios";

const Home: NextPage = ({ result }: any) => {
  /////////////////////////////////////////////////////////////////////states
  const [mainData, setMainData] = useState(result);
  const [pageNumber, setpageNumber] = useState<number>(1);
  const [filterPrice, setfilterPrice] = useState<string>("TOMAN");
  const [flag, setFlag] = useState<boolean>(false);
  const [sort, setsort] = useState<any>(null);
  const [searchText, setsearchText] = useState<any>("");

  /////////////////////////////////////////////////////////////////////hooks

  useEffect(() => {
    if (pageNumber !== 1) {
      requestData("MORE");
    }
  }, [pageNumber]);
  useEffect(() => {
    if (flag) {
      setpageNumber(1);
      requestData("FILTER");
    }
    setFlag(true);
  }, [searchText, sort]);
  /////////////////////////////////////////////////////////////////////functions
  const requestData = async (type: string) => {
    await axios
      .get(
        `https://api.bitbarg.me/api/v1/currencies?page=${
          type === "MORE" ? pageNumber : 1
        }&q=${searchText.trim()}${sort ? "&sort=" + sort.value : ""}`
      )
      .then((res) => {
        if (res.data.success) {
          let { result } = res.data;
          if (type === "MORE") {
            setMainData((prev: any) => ({
              ...result,
              items: [...prev.items, ...result.items],
            }));
          } else {
            setMainData(result);
          }
        }
      })
      .catch((e) => {
        console.log("er0", e);
      });
  };
  const nextPage = () => {
    setpageNumber((prevState) => prevState + 1);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.box}>
          <Box display={"flex"} alignItems={"center"} mb={5}>
            <h2 className={styles.title}>قیمت لحظه ای</h2>
            <span className={styles.dot}></span>
            <span className={styles.textCount}>
              {mainData?.meta?.paginateHelper?.total} <span>ارز دیجیتال</span>
            </span>
          </Box>
          <FilterSearch
            searchText={searchText}
            setsearchText={setsearchText}
            sort={sort}
            setsort={setsort}
            filterPrice={filterPrice}
            setfilterPrice={setfilterPrice}
          />

          <TableCustom
            filterPrice={filterPrice}
            data={mainData}
            nextPage={nextPage}
            pageNumber={pageNumber}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
export async function getServerSideProps() {
  let result = {};

  await axios.get(`https://api.bitbarg.me/api/v1/currencies`).then((res) => {
    console.log("res", res);
    if (res.data.success) {
      result = res.data.result;
    }
  });

  return {
    props: {
      result,
    },
  };
}
