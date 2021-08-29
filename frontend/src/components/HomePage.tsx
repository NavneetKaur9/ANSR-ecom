import React, { useState, useEffect } from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Grid, CircularProgress, Dialog, TextField, Button, InputLabel, Select, MenuItem } from "@material-ui/core";
import ProductCard from "./ProductCard";
import { api } from './Constants';
import SearchIcon from '@material-ui/icons/Search';
import {
    Link
} from 'react-router-dom';

type IListings = {
    image: Array<string>;
    product_name: string;
    discounted_price: string;
    retail_price: string;
    uniq_id: string;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        loader: {
            padding: 10
        },
        searchBtn: {
            padding: 15,
            marginLeft: 1,
        },
        searchTextField: {
            width: '100%',
        },
        cardWrapper: {
            textDecoration: 'none'
        }
    }),
);

const HomePage = () => {
    const styles = useStyles();

    const [listings, setListings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sortOrder, setSortOrder] = useState('none');
    const [search, setSearch] = useState('');
    const [searchInput, setSearchInput] = useState('');

    const getListingsCard = (listingObj: IListings, index: number) => {
        return (
            <Grid item xs={12} sm={6} md={4} key={index}>
                <Link to={`/${listingObj.uniq_id}`} className={styles.cardWrapper}>
                    <ProductCard {...listingObj} />
                </Link>
            </Grid>
        );
    };

    useEffect(() => {
        setIsLoading(true);

        fetch(api + `api/listings?search=${search}&sortOrder=${sortOrder === 'none' ? '' : sortOrder}`, {
            method: 'GET',
        }).then(res => res.json())
            .then(data => {
                setListings(data.result);
                setIsLoading(false);
            })
            .catch(error => {
                setIsLoading(false);
            });
    }, [search, sortOrder]);

    const onSearch = (event: any) => {
        if (event.key === 'Enter') {
            setSearch(event.target.value as string);
        }
    }

    const onChangeSearchInput = (event: any) => {
        setSearchInput(event.target.value as string);
    }

    const changeSortOrder = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSortOrder(event.target.value as string);
    };

    const onSearchBtnClick = () => {
        setSearch(searchInput);
    };

    return (
        <React.Fragment>
            <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
                spacing={2}
            >
                <Grid item xs={9} sm={5} md={7} >
                    <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                    >
                        <Grid item xs={9} sm={5} md={7} >
                            <TextField id="outlined-basic" label="Search for Products" variant="outlined" className={styles.searchTextField} onKeyDown={onSearch} onChange={onChangeSearchInput} />

                        </Grid>

                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
                                className={styles.searchBtn}
                                startIcon={<SearchIcon />}
                                onClick={onSearchBtnClick}
                            >
                                Search
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item>
                    <InputLabel id="demo-simple-select-label">Sort by:</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={sortOrder}
                        onChange={changeSortOrder}
                    >
                        <MenuItem value={'none'}>None</MenuItem>
                        <MenuItem value={'asc'}>Price : Low to High</MenuItem>
                        <MenuItem value={'desc'}>Price : High to Low</MenuItem>
                    </Select>
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                <Dialog aria-labelledby="simple-dialog-title" open={isLoading} className={styles.loader}>
                    <CircularProgress size={80} />
                </Dialog>

                {listings.map((listingObj, index) => getListingsCard(listingObj, index))}
            </Grid>
        </React.Fragment>
    );
};

export default HomePage;
