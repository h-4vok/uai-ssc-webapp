import React, { PureComponent } from 'react';
import { withSnackbar } from 'notistack';
import { API } from '../../lib/xhr';
import { SnackbarVisitor } from '../../lib/SnackbarVisitor';
import { ClientLandingTemplate } from '../templates';
import { PlatformPageLayout } from '../organisms';

class ClientLandingPageComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.notifier = new SnackbarVisitor(this.props);
    this.api = new API(this.notifier);

    this.state = {
      model: null
    };
  }

  componentDidMount() {
    this.loadClientData();
  }

  loadClientData = () => {
    this.api.request
      .get('clientmanagement')
      .success(({ body: { Result: model } }) => this.setState({ model }))
      .go();
  };

  onManage = () => this.props.history.push('/client/manage-service-plan');

  onBuy = () => this.props.history.push('/client/buy-more');

  onViewReceipt = id =>
    this.props.history.push(`/client-management/bill/${id}`);

  render() {
    const { model } = this.state;

    return (
      <PlatformPageLayout>
        {model && (
          <ClientLandingTemplate
            model={model}
            onManage={this.onManage}
            onBuy={this.onBuy}
            onRefresh={this.loadClientData}
            onViewReceipt={this.onViewReceipt}
          />
        )}
      </PlatformPageLayout>
    );
  }
}

export const ClientLandingPage = withSnackbar(ClientLandingPageComponent);
