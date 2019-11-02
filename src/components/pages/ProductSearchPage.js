import React, { PureComponent } from 'react';
import { withSnackbar } from 'notistack';
import { ProductSearchTemplate, ProductCompareTemplate } from '../templates';
import { PageLayout } from '../organisms';
import { API } from '../../lib/xhr';
import { SnackbarVisitor } from '../../lib/SnackbarVisitor';
import withLocalization from '../../localization/withLocalization';
import { CustomContentDialog } from '../molecules';

class ProductSearchPageComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.notifier = new SnackbarVisitor(props);
    this.api = new API(this.notifier);

    this.state = {
      items: [],
      compareEnabled: false,
      selectedCompareItems: []
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

  onSelection = (currentState, item) => {
    const newSelectedCompareItems = [...currentState, item];
    this.setState({
      selectedCompareItems: newSelectedCompareItems,
      compareEnabled: newSelectedCompareItems.length >= 2
    });
  };

  onRemoveSelection = (currentState, item) => {
    const newSelectedCompareItems = currentState.filter(x => x.Id !== item.Id);
    this.setState({
      selectedCompareItems: newSelectedCompareItems,
      compareEnabled: newSelectedCompareItems.length >= 2
    });
  };

  onViewDetails = code => this.props.history.push(`/service-catalog/${code}`);

  openCompare = () => this.setState({ compareDialogOpen: true });

  closeCompare = () => this.setState({ compareDialogOpen: false });

  render() {
    const {
      allLoaded,
      items,
      compareDialogOpen,
      selectedCompareItems,
      compareEnabled
    } = this.state;

    return (
      <PageLayout>
        {allLoaded && (
          <ProductSearchTemplate
            items={items}
            onFilter={filters => this.reload(filters)}
            onSelection={item => this.onSelection(selectedCompareItems, item)}
            onViewDetails={code => this.onViewDetails(code)}
            onRemoveSelection={item =>
              this.onRemoveSelection(selectedCompareItems, item)
            }
            onOpenCompare={() => this.openCompare()}
            selectedCompareItems={selectedCompareItems}
            compareEnabled={compareEnabled}
          />
        )}
        <CustomContentDialog
          onCloseClick={this.closeCompare}
          open={compareDialogOpen}
          maxWidth="lg"
          fullWidth
        >
          {compareDialogOpen && (
            <ProductCompareTemplate products={selectedCompareItems} />
          )}
        </CustomContentDialog>
      </PageLayout>
    );
  }
}

export const ProductSearchPage = withLocalization(
  withSnackbar(ProductSearchPageComponent)
);
