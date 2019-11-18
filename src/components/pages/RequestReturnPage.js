import React, { PureComponent } from 'react';
import { withSnackbar } from 'notistack';
import { API } from '../../lib/xhr';
import { SnackbarVisitor } from '../../lib/SnackbarVisitor';
import { PlatformPageLayout } from '../organisms';
import { RequestReturnTemplate } from '../templates';

class RequestReturnPageComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.receiptId = this.props.match.params.receiptId;

    this.notifier = new SnackbarVisitor(this.props);
    this.api = new API(this.notifier);

    this.state = {
      data: null
    };
  }

  componentDidMount() {
    this.api.request
      .getById('clientmanagement/billdetailforreturn', this.receiptId)
      .failure(this.onCancel)
      .success(res => this.setState({ data: res.body.Result }))
      .go();
  }

  onCancel = () => this.props.history.goBack();

  onConfirm = () => {
    this.api.request
      .put('clientmanagement/returnbillrequest', null, this.receiptId)
      .success(this.onCancel)
      .go();
  };

  render() {
    const { data } = this.state;

    return (
      <PlatformPageLayout>
        {data && (
          <RequestReturnTemplate
            data={data}
            onCancel={this.onCancel}
            onConfirm={this.onConfirm}
          />
        )}
      </PlatformPageLayout>
    );
  }
}

export const RequestReturnPage = withSnackbar(RequestReturnPageComponent);
