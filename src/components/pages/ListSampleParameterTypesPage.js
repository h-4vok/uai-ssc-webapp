import React, { PureComponent } from 'react';
import { withSnackbar } from 'notistack';
import { PlatformPageLayout } from '../organisms';
import { SnackbarVisitor } from '../../lib/SnackbarVisitor';
import { API } from '../../lib/xhr';
import { ConfirmDialog } from '../molecules';
import { ListSampleParameterTypesTemplate } from '../templates';

class ListSampleParameterTypesPageComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.notifier = new SnackbarVisitor(props);
    this.api = new API(this.notifier);

    this.state = {
      items: [],
      dialogOpen: false,
      dialogAfterAction: null,
      dataGridApi: null
    };
  }

  componentDidMount() {
    this.onRefresh();
  }

  onRefresh() {
    this.api.request
      .get(`sampleParameterType`)
      .success(res => {
        this.setState({
          items: res.body.Result
        });
      })
      .go();
  }

  onNewAction() {
    this.props.history.push('/security/sample-parameter-type/new');
  }

  onEditAction(id) {
    this.props.history.push(`/security/sample-parameter-type/${id}`);
  }

  onEnableAction(selectedItems, dataGridApi) {
    this.setState({
      dialogOpen: true,
      dialogAfterAction: () => this.onEnableConfirm(selectedItems),
      dataGridApi
    });
  }

  onDisableAction(selectedItems, dataGridApi) {
    this.setState({
      dialogOpen: true,
      dialogAfterAction: () => this.onDisableConfirm(selectedItems),
      dataGridApi
    });
  }

  onDeleteAction(selectedItems, dataGridApi) {
    this.setState({
      dialogOpen: true,
      dialogAfterAction: () => this.onDeleteConfirm(selectedItems),
      dataGridApi
    });
  }

  doPatchIsEnabled = (items, value) => {
    const operations = items.map(item => ({
      key: item.Id,
      op: 'replace',
      field: 'IsEnabled',
      value
    }));

    const body = {
      Operations: operations
    };

    this.api.request
      .patch('sampleparametertype', body, 0)
      .success(() => {
        this.state.dataGridApi.deselectAll();
        this.onRefresh();
      })
      .go();
  };

  onEnableConfirm = items => this.doPatchIsEnabled(items, true);

  onDisableConfirm = items => this.doPatchIsEnabled(items, false);

  onDeleteConfirm = items => {
    items.forEach(item => {
      this.api.request
        .del('sampleparametertype', item.Id)
        .success(() => this.onRefresh())
        .go();
    });
  };

  onConfirmDialog = () => {
    this.state.dialogAfterAction();
    this.setState({ dialogOpen: false });
  };

  render() {
    const { items, dialogOpen } = this.state;

    return (
      <PlatformPageLayout>
        <ListSampleParameterTypesTemplate
          items={items}
          onRefresh={() => this.onRefresh()}
          onNewAction={() => this.onNewAction()}
          onEditAction={id => this.onEditAction(id)}
          onEnableAction={(selectedItems, gridApi) =>
            this.onEnableAction(selectedItems, gridApi)
          }
          onDisableAction={(selectedItems, gridApi) =>
            this.onDisableAction(selectedItems, gridApi)
          }
          onDeleteAction={(selectedItems, gridApi) =>
            this.onDeleteAction(selectedItems, gridApi)
          }
        />
        <ConfirmDialog
          open={dialogOpen}
          onConfirm={() => this.onConfirmDialog()}
          onClose={() => this.setState({ dialogOpen: false })}
        />
      </PlatformPageLayout>
    );
  }
}
export const ListSampleParameterTypesPage = withSnackbar(
  ListSampleParameterTypesPageComponent
);
