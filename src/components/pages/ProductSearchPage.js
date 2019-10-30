import React, { PureComponent } from 'react';
import { withSnackbar } from 'notistack';
import { ProductSearchTemplate } from '../templates';
import { PageLayout } from '../organisms';
import { API } from '../../lib/xhr';
import { SnackbarVisitor } from '../../lib/SnackbarVisitor';

class ProductSearchPageComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.notifier = new SnackbarVisitor(props);
    this.api = new API(this.notifier);

    this.state = {
      items: []
    };
  }

  componentDidMount() {
    this.reload({ nameAlike: '', minPrice: 0, maxPrice: 50000, minRating: 1 });
  }

  reload = filters => {
    const route = `pricingplan?nameAlike=${filters.nameAlike}&minPrice=${filters.minPrice}&maxPrice=${filters.maxPrice}&minRating=${filters.minRating}`;

    this.api.request
      .get(route)
      .success(res =>
        this.setState({ allLoaded: true, items: res.body.Result })
      )
      .go();
  };

  onSelection = item => {
    console.log({ item });
  };

  render() {
    const { allLoaded, items } = this.state;

    return (
      <PageLayout>
        {allLoaded && (
          <ProductSearchTemplate
            items={items}
            onFilter={filters => this.reload(filters)}
            onSelection={item => this.onSelection(item)}
          />
        )}
      </PageLayout>
    );
  }
}

export const ProductSearchPage = withSnackbar(ProductSearchPageComponent);
