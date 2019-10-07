import React, { PureComponent } from 'react';
import { withSnackbar } from 'notistack';
import { PlatformPageLayout } from '../organisms';
import { SnackbarVisitor } from '../../lib/SnackbarVisitor';
import { API } from '../../lib/xhr';
import { ListRolesTemplate } from '../templates';

class ListRolesPageComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.notifier = new SnackbarVisitor(props);
    this.api = new API(this.notifier);

    this.state = {
      items: []
    };
  }

  componentDidMount() {
    this.onRefresh();
  }

  onRefresh() {
    const userNameLike = '';

    this.api.request
      .get(`role?userNameLike=${userNameLike}`)
      .success(res => {
        this.setState({
          items: res.body.Result
        });
      })
      .go();
  }

  onNewAction() {
    this.props.history.push('/security/role/new');
  }

  onEditAction(id) {
    this.props.history.push(`/security/role/${id}`);
  }

  render() {
    const { items } = this.state;

    return (
      <PlatformPageLayout>
        <ListRolesTemplate
          items={items}
          onRefresh={() => this.onRefresh()}
          onNewAction={() => this.onNewAction()}
          onEditAction={id => this.onEditAction(id)}
        />
      </PlatformPageLayout>
    );
  }
}
export const ListRolesPage = withSnackbar(ListRolesPageComponent);
