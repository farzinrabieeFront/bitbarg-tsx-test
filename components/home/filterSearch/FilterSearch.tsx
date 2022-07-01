import React from "react";
import styles from "./FIlterSearch.module.css";
import {
  Autocomplete,
  Box,
  Button,
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
} from "@mui/material";
import { makeStyles, withStyles } from "@mui/styles";
import {
  AccountCircleOutlined,
  Close,
  Search,
  StarOutline,
} from "@mui/icons-material";
const CustomTextField = withStyles({
  root: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderRadius: 8,
        border: "1px solid #e0e0e0",
        height: "50px",
      },
    },
  },
})(TextField);
type filterProps = {
  filterPrice: string;
  sort: any;
  searchText: any;
  setfilterPrice: any;
  setsort: any;
  setsearchText: any;
};

const FilterSearch = ({
  filterPrice,
  setfilterPrice,
  setsort,
  sort,
  searchText,
  setsearchText,
}: filterProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("eventtt", event.target.value);
    let data = event.target.value;
    setsort({
      value: data.value,
      label: data.label,
    });
  };
  return (
    <>
      <div className={styles.filterSearch}>
        <Box display={"flex"} alignItems="center">
          <Box mr={"6px"} width={340}>
            <CustomTextField
              variant="outlined"
              fullWidth
              placeholder="جستجو"
              value={searchText}
              onChange={(e) => setsearchText(e.target.value)}
              InputProps={{
                startAdornment: (
                  <IconButton>
                    <Search />
                  </IconButton>
                ),
              }}
            />
          </Box>
        </Box>

        <Box display={"flex"} alignItems="center">
          <Box mx={"6px"} display={"flex"} alignItems={"center"}>
            <Button
              className={styles.btnFer}
              variant="outlined"
              color="inherit"
              startIcon={<StarOutline />}
            >
              <span style={{ marginRight: "5px" }}>نشان شده‌ها</span>
            </Button>
          </Box>

          <Box width={195} mx={"6px"}>
            {/*<Autocomplete*/}
            {/*  options={sortValue}*/}
            {/*  getOptionLabel={(option) => option.label}*/}
            {/*  id="controlled"*/}
            {/*  value={sort}*/}
            {/*  onChange={(event, newValue) => {*/}
            {/*    setsort(newValue);*/}
            {/*  }}*/}
            {/*  renderInput={(params) => (*/}
            {/*    <CustomTextField*/}
            {/*      {...params}*/}
            {/*      label="ترتیب بر اساس"*/}
            {/*      margin="normal"*/}
            {/*      fullWidth*/}
            {/*    />*/}
            {/*  )}*/}
            {/*  // className={classes.autocomplete}*/}
            {/*/>*/}
            <TextField
              id="outlined-select-currency"
              select
              fullWidth
              label="ترتیب بر اساس"
              value={sort?.label}
              onChange={handleChange}
              InputProps={
                sort
                  ? {
                      startAdornment: (
                        <InputAdornment position="end">
                          <Close
                            style={{ cursor: "pointer" }}
                            onClick={() => setsort(null)}
                          />
                        </InputAdornment>
                      ),
                    }
                  : ""
              }
            >
              {sortValue.map((option: any) => (
                <MenuItem key={option.value} value={option}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </Box>
        <Box>
          <Box ml={"6px"} className={styles.btns}>
            <Button
              className={
                filterPrice === "TOMAN" ? styles.btnActive : styles.btnDeActive
              }
              fullWidth
              onClick={() => setfilterPrice("TOMAN")}
            >
              تومان
            </Button>
            <Button
              className={
                filterPrice === "TTR" ? styles.btnActive : styles.btnDeActive
              }
              onClick={() => setfilterPrice("TTR")}
              fullWidth
            >
              تتر
            </Button>
          </Box>
        </Box>
      </div>
    </>
  );
};
const sortValue = [
  { label: "بیشترین قیمت", value: "2" },
  { label: "کمترین قیمت", value: "1" },
];

export default FilterSearch;
