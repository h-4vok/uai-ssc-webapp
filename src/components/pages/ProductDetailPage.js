import React, { PureComponent } from 'react';
import { withSnackbar } from 'notistack';
import { ProductDetailTemplate } from '../templates';
import { PageLayout } from '../organisms';
import { API } from '../../lib/xhr';
import { SnackbarVisitor } from '../../lib/SnackbarVisitor';
import withLocalization from '../../localization/withLocalization';

class ProductDetailPageComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.notifier = new SnackbarVisitor(props);
    this.api = new API(this.notifier);

    this.planCode = this.props.match.params.code;

    this.state = {
      detailModel: {},
      allLoaded: false
    };
  }

  componentDidMount() {
    this.api.request
      .get(`pricingplancomment?planCode=${this.planCode}`)
      .success(res =>
        this.setState({ detailModel: res.body.Result, allLoaded: true })
      )
      .go();
  }

  render() {
    const { allLoaded, detailModel } = this.state;

    return (
      <PageLayout>
        {allLoaded && (
          <ProductDetailTemplate model={detailModel} planCode={this.planCode} />
        )}
      </PageLayout>
    );
  }
}

export const ProductDetailPage = withSnackbar(
  withLocalization(ProductDetailPageComponent)
);
