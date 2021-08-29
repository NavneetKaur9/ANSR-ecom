import React from "react";
import Card from "@material-ui/core/Card";
import { CardMedia, CardContent, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import percent from "../utils/calculatePercent";

type Props = {
    image: Array<string>;
    product_name: string;
    discounted_price: string;
    retail_price: string;
    uniq_id: string;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        price: {
            fontWeight: "bold",
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
        }
    }),
);

const ProductCard = (props: Props) => {
    const classes = useStyles();
    const { image,
        product_name,
        discounted_price,
        retail_price
    } = props;

    return (
        <Card>
            <CardMedia component="img" className={classes.media} height="340" image={image[0]} title={product_name} />
            <CardContent>
                <Typography variant="subtitle1" gutterBottom noWrap={true}>
                    {product_name}
                </Typography>
                {retail_price && discounted_price ? (
                    <Typography className={classes.price} variant="subtitle2" gutterBottom noWrap={true}>
                        Rs.{discounted_price.toLocaleString()}

                        {retail_price !== discounted_price && (
                            <>
                                <Typography className={classes.retailPrice} variant="caption" color="textSecondary" >
                                    Rs.{retail_price.toLocaleString()}
                                </Typography>
                                <Typography className={classes.percent} variant="caption" color="secondary" >
                                    ({percent(retail_price, discounted_price)}%) OFF
                                </Typography>
                            </>
                        )}

                    </Typography>
                ) : (
                    <Typography variant="body2" color="textSecondary" >
                        Price Not available
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
};

export default ProductCard;
