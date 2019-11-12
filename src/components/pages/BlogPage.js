import React, { PureComponent } from 'react';
import { withSnackbar } from 'notistack';
import { PageLayout } from '../organisms';
import { BlogTemplate } from '../templates';
import { SnackbarVisitor } from '../../lib/SnackbarVisitor';
import { API } from '../../lib/xhr';

class BlogPageComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.notifier = new SnackbarVisitor(this.props);
    this.api = new API(this.notifier);

    this.state = {
      news: null
    };
  }

  componentDidMount() {
    this.api.request
      .get('sitenews?latest=true')
      .success(res => this.setState({ news: res.body.Result }))
      .go();
  }

  onSubscribeConfirm = () => {
    this.props.history.push('newsletter/subscribe');
  };

  render() {
    const { news } = this.state;

    return (
      <PageLayout>
        {news && (
          <BlogTemplate
            news={news}
            onSubscribeConfirm={this.onSubscribeConfirm}
          />
        )}
      </PageLayout>
    );
  }
}

export const BlogPage = withSnackbar(BlogPageComponent);
