import React, { PureComponent } from 'react';
import { withSnackbar } from 'notistack';
import { SnackbarVisitor } from '../../lib/SnackbarVisitor';
import { API } from '../../lib/xhr';
import { PlatformPageLayout } from '../organisms';
import { ListSurveyFormsTemplate } from '../templates';
import { ConfirmDialog } from '../molecules';

const apiroute = 'surveyform';
const pageroute = '/marketing/survey-form';

class ListSurveyFormsPageComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.notifier = new SnackbarVisitor(this.props);
    this.api = new API(this.notifier);

    this.state = {
      allLoaded: false,
      items: [],
      dialogOpen: false,
      dialogAfterAction: null,
      dataGridApi: null
    };
  }

  componentDidMount() {
    this.onRefresh();
  }

  onRefresh = () => {
    this.api.request
      .get(apiroute)
      .success(res =>
        this.setState({ allLoaded: true, items: res.body.Result })
      )
      .go();
  };

  onNewAction() {
    this.props.history.push(`${pageroute}/new`);
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

  onEnableConfirm = items => this.doPatchIsEnabled(items, true);

  onDisableConfirm = items => this.doPatchIsEnabled(items, false);

  onConfirmDialog = () => {
    this.state.dialogAfterAction();
    this.setState({ dialogOpen: false });
  };

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
      .patch(apiroute, body, 0)
      .success(() => {
        this.state.dataGridApi.deselectAll();
        this.onRefresh();
      })
      .go();
  };

  render() {
    const { items, dialogOpen, allLoaded } = this.state;

    return (
      <PlatformPageLayout>
        {allLoaded && (
          <ListSurveyFormsTemplate
            items={items}
            onRefresh={() => this.onRefresh()}
            onNewAction={() => this.onNewAction()}
            onEnableAction={(selectedItems, gridApi) =>
              this.onEnableAction(selectedItems, gridApi)
            }
            onDisableAction={(selectedItems, gridApi) =>
              this.onDisableAction(selectedItems, gridApi)
            }
          />
        )}
        <ConfirmDialog
          open={dialogOpen}
          onConfirm={() => this.onConfirmDialog()}
          onClose={() => this.setState({ dialogOpen: false })}
        />
      </PlatformPageLayout>
    );
  }
}

export const ListSurveyFormsPage = withSnackbar(ListSurveyFormsPageComponent);
