import React, { PureComponent } from 'react';
import { withSnackbar } from 'notistack';
import { PlatformPageLayout } from '../organisms';
import { SnackbarVisitor } from '../../lib/SnackbarVisitor';
import { API } from '../../lib/xhr';
import { ListLogsTemplate } from '../templates';

class ListLogsPageComponent extends PureComponent {
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
    this.api.request
      .get('log')
      .success(res => {
        this.setState({
          items: res.body.Result
        });
      })
      .go();
  }

  onReadAction(id) {
    this.props.history.push(`/security/log/${id}`);
  }

  render() {
    const { items } = this.state;

    return (
      <PlatformPageLayout>
        <ListLogsTemplate
          items={items}
          onRefresh={() => this.onRefresh()}
          onReadAction={id => this.onReadAction(id)}
        />
      </PlatformPageLayout>
    );
  }
}
export const ListLogsPage = withSnackbar(ListLogsPageComponent);
