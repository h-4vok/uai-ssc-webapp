import React, { PureComponent } from 'react';
import { withSnackbar } from 'notistack';
import { API } from '../../lib/xhr';
import { SnackbarVisitor } from '../../lib/SnackbarVisitor';
import { PageLayout } from '../organisms';
import { SubscribeToNewsletterTemplate } from '../templates';
import withLocalization from '../../localization/withLocalization';

const apiroute = 'newsletter';

class SubscribeToNewsletterPageComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.notifier = new SnackbarVisitor(this.props);
    this.api = new API(this.notifier);

    this.state = {
      categories: null
    };
  }

  componentDidMount() {
    this.loadCategories();
  }

  loadCategories = () => {
    this.api.request
      .get('sitenewscategory')
      .success(res => {
        this.setState({
          categories: res.body.Result
        });
      })
      .go();
  };

  onConfirm = (Email, SelectedCategories) => {
    this.api.request
      .put(apiroute, { Email, SelectedCategories }, 0)
      .preventDefaultSuccess()
      .success(() =>
        this.notifier.success(this.props.i10n['subscribe-newsletter.success'])
      )
      .success(() => this.props.history.push('/'))
      .go();
  };

  render() {
    const { categories } = this.state;

    return (
      <PageLayout>
        <SubscribeToNewsletterTemplate
          categories={categories}
          onConfirm={this.onConfirm}
        />
      </PageLayout>
    );
  }
}

export const SubscribeToNewsletterPage = withLocalization(
  withSnackbar(SubscribeToNewsletterPageComponent)
);
