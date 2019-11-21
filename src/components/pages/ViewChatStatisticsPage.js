import React, { PureComponent } from 'react';
import { withSnackbar } from 'notistack';
import { API } from '../../lib/xhr';
import { SnackbarVisitor } from '../../lib/SnackbarVisitor';
import { PlatformPageLayout } from '../organisms';
import { ViewChatStatisticsTemplate } from '../templates';

class ViewChatStatisticsPageComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.notifier = new SnackbarVisitor(this.props);
    this.api = new API(this.notifier);

    this.state = {
      data: null
    };
  }

  componentDidMount() {
    this.loadChatStatistics();
  }

  loadChatStatistics = () => {
    this.api.request
      .get('ChatCommunicationStatistics')
      .success(res => this.setState({ data: res.body.Result }))
      .go();
  };

  render() {
    const { data } = this.state;

    return (
      <PlatformPageLayout>
        {data && (
          <ViewChatStatisticsTemplate
            onRefresh={this.loadChatStatistics}
            data={data}
          />
        )}
      </PlatformPageLayout>
    );
  }
}

export const ViewChatStatisticsPage = withSnackbar(
  ViewChatStatisticsPageComponent
);
