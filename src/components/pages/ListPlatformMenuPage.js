import React, { PureComponent } from 'react';
import { withSnackbar } from 'notistack';
import { PlatformPageLayout } from '../organisms';
import { SnackbarVisitor } from '../../lib/SnackbarVisitor';
import { API } from '../../lib/xhr';
import { ConfirmDialog } from '../molecules';
import { ListPlatformMenuTemplate } from '../templates';

const apiRoute = 'platformmenu';
const getEditRoute = (id = 'new') => `/configuration/platform-menu/${id}`;

class ListPlatformMenuPageComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.notifier = new SnackbarVisitor(props);
    this.api = new API(this.notifier);

    this.state = {
      items: [],
      dialogOpen: false,
      dialogAfterAction: null
    };
  }

  componentDidMount() {
    this.onRefresh();
  }

  onRefresh() {
    this.api.request
      .get(apiRoute)
      .success(res => {
        this.setState({
          items: res.body.Result
        });
      })
      .go();
  }

  onNewAction() {
    this.props.history.push(getEditRoute());
  }

  onEditAction(id) {
    this.props.history.push(getEditRoute(id));
  }

  onDeleteAction(selectedItems) {
    this.setState({
      dialogOpen: true,
      dialogAfterAction: () => this.onDeleteConfirm(selectedItems)
    });
  }

  onDeleteConfirm = items => {
    items.forEach(item => {
      this.api.request
        .del(apiRoute, item.Id)
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
        <ListPlatformMenuTemplate
          items={items}
          onRefresh={() => this.onRefresh()}
          onNewAction={() => this.onNewAction()}
          onEditAction={id => this.onEditAction(id)}
          onDeleteAction={selectedItems => this.onDeleteAction(selectedItems)}
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
export const ListPlatformMenuPage = withSnackbar(ListPlatformMenuPageComponent);
