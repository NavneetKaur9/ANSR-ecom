import React, { useState, useEffect } from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  Link,
  useParams
} from "react-router-dom";

import {
  Grid, CircularProgress, CardMedia,
  Typography, Card, Dialog,
  Divider,
} from "@material-ui/core";
import { api } from './Constants';
import Rating from '@material-ui/lab/Rating';
import percent from "../utils/calculatePercent";

type Props = {
  productID?: string;
  product_name?: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    loader: {
      padding: 10
    },
    media: {
      objectFit: "contain"
    },
    retailPrice: {
      textDecoration: 'line-through',
      display: "inline",
      marginLeft: '6px'
    },
    percent: {
      display: "inline",
      marginLeft: '6px'
    },
    divider: {
      marginBottom: '1em',
      marginTop: '1em',
    }
  }),
);

const ProductDetailPage = (props: Props) => {
  const classes = useStyles();
  const { productID }: any = useParams();

  const [productDetail, setProductDetail] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const renderImageList = (productDetail: any) => {
    let { image, product_name } = productDetail;
    return (
      <>
        {image && image.map((item: any, index: number) => (
          <Grid item xs={12} sm={12} md={6}>
            <Card>
              <CardMedia component="img" className={classes.media} height="340" image={item} title={product_name} />
            </Card>

          </Grid>
        ))}
      </>

    );
  };

  const renderDetailSection = (productDetail: any) => {
    let {
      product_name,
      discounted_price,
      retail_price,
      brand,
      description,
      product_rating,
    } = productDetail;

    return (
      <>
        <Typography variant="h3" >
          {product_name}
        </Typography>
        <Typography variant="h6" gutterBottom color="primary">  Brand: {brand ? brand : 'Not Available'}  </Typography>
        <Typography variant="h5" gutterBottom >
          <Rating name="read-only" value={parseInt(product_rating)} readOnly />
        </Typography>
        <Divider className={classes.divider} />
        {
          retail_price && discounted_price ? (
            <>
              <Typography variant="h6" color="textPrimary">
                Price: Rs.{discounted_price.toLocaleString()}
              </Typography >
              {retail_price !== discounted_price && (
                <>
                  <Typography variant="h6" color="textSecondary">
                    MRP: <Typography className={classes.retailPrice} variant="subtitle1" color="textSecondary">
                      Rs.{retail_price.toLocaleString()}
                    </Typography>
                  </Typography>
                  <Typography className={classes.percent} variant="subtitle1" color="secondary" gutterBottom >
                    You save : Rs.{retail_price - discounted_price}

                    <Typography className={classes.percent} variant="subtitle1" gutterBottom color="primary">
                      ({percent(retail_price, discounted_price)}%) OFF
                    </Typography>
                  </Typography>
                </>
              )}
            </>
          ) : (
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Price Not available
            </Typography>
          )
        }
        <Divider className={classes.divider} />
        <Typography variant="h5" gutterBottom >  Product Description </Typography>
        <Typography variant="body2" gutterBottom>  {description} </Typography>

      </>
    );
  };

  useEffect(() => {
    setIsLoading(true);

    fetch(api + `api/listings?id=${productID}`, {
      method: 'GET',
    }).then(res => res.json())
      .then(data => {
        setProductDetail(data.result[0]);
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
      });
  }, [productID]);

  return (
    <>
      <Link to={`/`} >
        <Typography variant="subtitle1" gutterBottom> Back </Typography>
      </Link>

      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        spacing={2}>

        <Dialog aria-labelledby="simple-dialog-title" open={isLoading} className={classes.loader}>
          <CircularProgress size={80} />
        </Dialog>

        {/* IMAGE Section */}
        <Grid item md={5}>
          <Grid container spacing={1}>
            {productDetail && renderImageList(productDetail)}
          </Grid>
        </Grid>

        {/* other details */}
        <Grid item md={7}>
          {productDetail && renderDetailSection(productDetail)}
        </Grid>
      </Grid>
    </>
  );
};

export default ProductDetailPage;
