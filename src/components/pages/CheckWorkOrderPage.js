import React, { PureComponent } from 'react';
import { withSnackbar } from 'notistack';
import { API } from '../../lib/xhr';
import { SnackbarVisitor } from '../../lib/SnackbarVisitor';
import { PlatformPageLayout } from '../organisms';
import { ConfirmDialog } from '../molecules';
import { CheckWorkOrderTemplate } from '../templates';
import withLocalization from '../../localization/withLocalization';

class CheckWorkOrderPageComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.notifier = new SnackbarVisitor(this.props);
    this.api = new API(this.notifier);

    this.modelId = this.props.match.params.id;

    this.state = {
      items: null,
      dialogOpen: false,
      dialogAfterAction: null,
      dialogMessage: null
    };
  }

  componentDidMount() {
    this.onLoadModel();
  }

  onLoadModel = () => {
    this.api.request
      .getById('sample/parentSamplesOfWorkOrder', this.modelId)
      .success(res => this.setState({ items: res.body.Result }))
      .go();
  };

  onConfirmAction = () => {
    const allUnchecked = this.state.items.every(x => !x.Checked);
    if (allUnchecked) {
      this.notifier.warning(this.props.i10n['check-samples.all-unchecked']);
      return;
    }

    const anyUnchecked = this.state.items.some(x => !x.Checked);
    if (anyUnchecked) {
      this.setState({
        dialogOpen: true,
        dialogAfterAction: () => this.onConfirmConfirmed(),
        dialogMessage: this.props.i10n['check-work-order.dialog.confirm']
      });
      return;
    }

    this.onConfirmConfirmed();
  };

  onConfirmConfirmed = () => {
    const body = { CheckedSamples: this.state.items };

    this.api.request
      .put('workorder/checksamples', body, this.modelId)
      .success(() =>
        this.props.history.push(
          `/work-order/work-order/${this.modelId}/execute`
        )
      )
      .go();
  };

  onConfirmDialog = () => {
    this.state.dialogAfterAction();
    this.setState({ dialogOpen: false });
  };

  render() {
    const { items, dialogOpen, dialogMessage } = this.state;

    return (
      <PlatformPageLayout>
        {items && (
          <CheckWorkOrderTemplate
            items={items}
            onConfirm={this.onConfirmAction}
          />
        )}
        <ConfirmDialog
          open={dialogOpen}
          message={dialogMessage}
          onConfirm={() => this.onConfirmDialog()}
          onClose={() => this.setState({ dialogOpen: false })}
        />
      </PlatformPageLayout>
    );
  }
}

export const CheckWorkOrderPage = withLocalization(
  withSnackbar(CheckWorkOrderPageComponent)
);
