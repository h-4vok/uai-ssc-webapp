import React, { PureComponent } from 'react';
import { withSnackbar } from 'notistack';
import { PlatformPageLayout } from '../organisms';
import { SnackbarVisitor } from '../../lib/SnackbarVisitor';
import { API } from '../../lib/xhr';
import { EditSiteNewsCategoryTemplate } from '../templates';

const apiRoute = 'sitenewscategory';
const fallbackRoute = '/marketing/site-news-category';

class EditSiteNewsCategoryPageComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.modelId = this.props.match.params.id;
    this.notifier = new SnackbarVisitor(props);
    this.api = new API(this.notifier);

    this.state = {
      model: {},
      allLoaded: false
    };
  }

  loadModel = () => {
    this.api.request
      .getById(apiRoute, this.modelId)
      .success(res => {
        this.setState({
          model: res.body.Result,
          allLoaded: true
        });
      })
      .go();
  };

  componentDidMount() {
    if (this.modelId) {
      this.loadModel();
    } else {
      this.setState({ allLoaded: true });
    }
  }

  onConfirm = () => {
    if (this.modelId) {
      this.updateModel();
    } else {
      this.createModel();
    }
  };

  createModel = () => {
    this.api.request
      .post(apiRoute, this.state.model)
      .success(() => {
        this.props.history.push(fallbackRoute);
      })
      .go();
  };

  updateModel = () => {
    this.api.request
      .put(apiRoute, this.state.model, this.modelId)
      .success(() => {
        this.props.history.push(fallbackRoute);
      })
      .go();
  };

  render() {
    const { model, allLoaded } = this.state;

    return (
      <PlatformPageLayout>
        {allLoaded && (
          <EditSiteNewsCategoryTemplate
            modelId={this.modelId}
            model={model}
            onConfirm={() => this.onConfirm()}
          />
        )}
      </PlatformPageLayout>
    );
  }
}

export const EditSiteNewsCategoryPage = withSnackbar(
  EditSiteNewsCategoryPageComponent
);
