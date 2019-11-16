import React, { PureComponent } from 'react';
import { withSnackbar } from 'notistack';
import { API } from '../../lib/xhr';
import { SnackbarVisitor } from '../../lib/SnackbarVisitor';
import { PlatformPageLayout } from '../organisms';
import { SendNewsletterTemplate } from '../templates';

const apiroute = 'newsletter';

class SendNewsletterPageComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.notifier = new SnackbarVisitor(this.props);
    this.api = new API(this.notifier);

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    this.state = {
      model: {
        DateFrom: sevenDaysAgo,
        DateTo: new Date(),
        Categories: [],
        IncomingHost: `${window.location.hostname}:${window.location.port}`
      },
      categories: null
    };
  }

  componentDidMount() {
    this.loadCategories();
  }

  loadCategories = () => {
    this.api.request
      .get('sitenewscategory')
      .success(({ body: { Result: categories } }) =>
        this.setState({ categories })
      )
      .go();
  };

  onConfirm = () => {
    this.api.request.post(apiroute, this.state.model).go();
  };

  render() {
    const { model, categories } = this.state;

    return (
      <PlatformPageLayout>
        {categories && (
          <SendNewsletterTemplate
            categories={categories}
            model={model}
            onConfirm={this.onConfirm}
          />
        )}
      </PlatformPageLayout>
    );
  }
}

export const SendNewsletterPage = withSnackbar(SendNewsletterPageComponent);
