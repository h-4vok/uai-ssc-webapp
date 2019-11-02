import React, { PureComponent } from 'react';
import { withSnackbar } from 'notistack';
import { PlatformPageLayout } from '../organisms';
import { SnackbarVisitor } from '../../lib/SnackbarVisitor';
import { API } from '../../lib/xhr';
import withLocalization from '../../localization/withLocalization';
import {
  LeaveCommentTemplate,
  LeaveCommentUnavailableTemplate
} from '../templates';

class LeaveCommentPageComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.notifier = new SnackbarVisitor(props);
    this.api = new API(this.notifier);

    this.state = {
      allLoaded: false,
      commentEnabled: false
    };
  }

  componentDidMount() {
    this.api.request
      .getById('pricingplancomment', 0)
      .success(res => {
        if (res.body.Result) {
          this.setState({
            allLoaded: true,
            commentEnabled: false
          });
        } else {
          this.setState({
            allLoaded: true,
            commentEnabled: true
          });
        }
      })
      .go();
  }

  onConfirm = (rating, comment) => {
    this.api.request
      .post('pricingplancomment', { Rating: rating, Comment: comment })
      .success(() => this.setState({ commentEnabled: false }))
      .go();
  };

  render() {
    const { allLoaded, commentEnabled } = this.state;

    return (
      <PlatformPageLayout>
        {allLoaded &&
          (commentEnabled ? (
            <LeaveCommentTemplate
              onConfirm={(rating, comment) => this.onConfirm(rating, comment)}
            />
          ) : (
            <LeaveCommentUnavailableTemplate />
          ))}
      </PlatformPageLayout>
    );
  }
}

export const LeaveCommentPage = withSnackbar(
  withLocalization(LeaveCommentPageComponent)
);
