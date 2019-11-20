import React, { PureComponent } from 'react';
import { withSnackbar } from 'notistack';
import { PlatformPageLayout } from '../organisms';
import { SnackbarVisitor } from '../../lib/SnackbarVisitor';
import { API } from '../../lib/xhr';
import { ConfirmDialog } from '../molecules';
import { ListProductQuestionsTemplate } from '../templates';

const apiRoute = 'productquestion';

class ListProductQuestionsPageComponent extends PureComponent {
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

  onRefresh = () => {
    this.api.request
      .get(apiRoute)
      .success(res => {
        this.setState({
          items: res.body.Result
        });
      })
      .go();
  };

  onReplyAction = id => {
    this.props.history.push(`/management/product-question/reply/${id}`);
  };

  render() {
    const { items } = this.state;

    return (
      <PlatformPageLayout>
        <ListProductQuestionsTemplate
          items={items}
          onRefresh={this.onRefresh}
          onReplyAction={this.onReplyAction}
        />
      </PlatformPageLayout>
    );
  }
}
export const ListProductQuestionsPage = withSnackbar(
  ListProductQuestionsPageComponent
);
