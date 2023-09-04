import PropTypes from "prop-types";
// @mui
import { Grid } from "@mui/material";
import TourCard from "./TourCard";


// ----------------------------------------------------------------------

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
};

export default function ProductList({ tourArray, ...other }) {
  return (
    <>
    <Grid container  {...other}>
      {tourArray.map((product) => (
        <Grid key={product.id} item xs={12} sm={6} md={3} >
          <TourCard tourArray={product} />
        </Grid>
      ))}
    </Grid>
    </>
  );
}
export { default as TourList } from "./TourList.jsx";
