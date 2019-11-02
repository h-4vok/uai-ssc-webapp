import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import FilterListRoundedIcon from '@material-ui/icons/FilterListRounded';
import {
  Container,
  Grid,
  Paper,
  Drawer,
  Button,
  Typography,
  Avatar,
  Box,
  Slider
} from '@material-ui/core';
import withLocalization from '../../localization/withLocalization';
import { SimpleTextField } from '../atoms';
import { ProductCard, ButtonBar } from '../molecules';

const styles = theme => ({
  header: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  gridRoot: {
    flexGrow: 1
  },
  sliderRoot: {
    width: 300
  },
  control: {
    padding: theme.spacing(2)
  },
  drawerList: {
    width: 350
  },
  drawerItem: {
    margin: theme.spacing(3, 0, 2)
  }
});

class ProductSearchTemplateComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      priceRange: [0, 50000],
      nameAlike: '',
      minRating: 1,
      filtersOpen: false
    };
  }

  toggleFilters = open => {
    this.setState({ filtersOpen: open });
  };

  onRangeChange = (event, newValue) =>
    this.setState({
      priceRange: newValue
    });

  onInputChange = event =>
    this.setState({
      [event.target.name]: event.target.value
    });

  priceSliderTextFormatter = value => `U$D ${value}`;

  render() {
    const {
      items,
      onFilter,
      classes,
      i10n,
      onSelection,
      onRemoveSelection,
      onOpenCompare,
      compareEnabled,
      selectedCompareItems,
      onViewDetails
    } = this.props;
    const { priceRange, nameAlike, minRating, filtersOpen } = this.state;

    return (
      <Container component="main" maxWidth="md">
        <div className={classes.header}>
          <Avatar className={classes.avatar}>
            <FilterListRoundedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {i10n['product-search.page.title']}
          </Typography>
        </div>

        <Box mb={3}>
          <ButtonBar>
            <Button
              variant="contained"
              color="primary"
              onClick={() => this.toggleFilters(true)}
            >
              {i10n['product-search.page.open-filters']}
            </Button>
            <Button
              variant="contained"
              color="primary"
              disabled={!compareEnabled}
              onClick={onOpenCompare}
            >
              {i10n['product-search.page.open-compare']}
            </Button>
          </ButtonBar>
        </Box>

        <Drawer
          anchor="left"
          open={filtersOpen}
          onClose={() => this.toggleFilters(false)}
        >
          <div className={classes.drawerList} role="presentation">
            <Grid container justify="center">
              <Grid item xs={11} className={classes.drawerItem}>
                <Box component="fieldset" mb={3} borderColor="transparent">
                  <SimpleTextField
                    maxLength="100"
                    id="nameAlike"
                    name="nameAlike"
                    label={i10n['product-search.page.name-filter']}
                    fullWidth
                    value={nameAlike}
                    onChange={this.onInputChange}
                  />
                </Box>
              </Grid>
              <Grid item xs={11} className={classes.drawerItem}>
                <Box component="fieldset" mb={3} borderColor="transparent">
                  <Typography component="legend">
                    {i10n['product-search.page.rating-filter']}
                  </Typography>
                  <Rating
                    name="minRating"
                    value={minRating}
                    onChange={this.onInputChange}
                  />
                </Box>
              </Grid>
              <Grid item xs={11} className={classes.drawerItem}>
                <Box
                  component="fieldset"
                  mb={3}
                  borderColor="transparent"
                  className={classes.sliderRoot}
                >
                  <Typography component="legend">
                    {i10n['product-search.page.price-range-filter']}
                  </Typography>
                  <Slider
                    name={priceRange}
                    onChange={this.onRangeChange}
                    defaultValue={[0, 50000]}
                    value={priceRange}
                    getAriaValueText={this.priceSliderTextFormatter}
                    aria-labelledby="price-slider"
                    valueLabelDisplay="auto"
                    step={1000}
                    marks
                    min={0}
                    max={50000}
                  />
                </Box>
              </Grid>
              <Grid item xs={11} className={classes.drawerItem}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    this.toggleFilters(false);
                    onFilter({
                      nameAlike,
                      minPrice: priceRange[0],
                      maxPrice: priceRange[1],
                      minRating
                    });
                  }}
                >
                  {i10n['product-search.page.apply-filter']}
                </Button>
              </Grid>
            </Grid>
          </div>
        </Drawer>

        <Grid container className={classes.gridRoot} spacing={2}>
          <Grid item={12}>
            <Grid container justify="center" spacing={2}>
              {items.map(value => (
                <Grid key={value} item>
                  <Paper className={classes.paper}>
                    <ProductCard
                      {...value}
                      onSelection={onSelection}
                      onViewDetails={onViewDetails}
                      onRemoveSelection={onRemoveSelection}
                      isSelected={selectedCompareItems.some(
                        x => x.Id === value.Id
                      )}
                    />
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export const ProductSearchTemplate = withStyles(styles)(
  withLocalization(ProductSearchTemplateComponent)
);
