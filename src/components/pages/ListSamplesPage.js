import React, { PureComponent } from 'react';
import { withSnackbar } from 'notistack';
import { PlatformPageLayout } from '../organisms';
import { SnackbarVisitor } from '../../lib/SnackbarVisitor';
import { API } from '../../lib/xhr';
import { ListSamplesTemplate } from '../templates';

const apiRoute = 'sample';

class ListSamplesPageComponent extends PureComponent {
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
      .get(`${apiRoute}`)
      .success(res => {
        this.setState({
          items: res.body.Result
        });
      })
      .go();
  }

  render() {
    const { items } = this.state;

    return (
      <PlatformPageLayout>
        <ListSamplesTemplate items={items} onRefresh={() => this.onRefresh()} />
      </PlatformPageLayout>
    );
  }
}
export const ListSamplesPage = withSnackbar(ListSamplesPageComponent);
