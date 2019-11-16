import React, { PureComponent } from 'react';
import { withSnackbar } from 'notistack';
import { PlatformPageLayout } from '../organisms';
import { SnackbarVisitor } from '../../lib/SnackbarVisitor';
import { API } from '../../lib/xhr';
import { EditSiteNewsArticlesTemplate } from '../templates';
import withLocalization from '../../localization/withLocalization';

const apiRoute = 'sitenews';
const fallbackRoute = '/marketing/site-news';

class EditSiteNewsArticlesPageComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.modelId = this.props.match.params.id;
    this.notifier = new SnackbarVisitor(props);
    this.api = new API(this.notifier);

    this.state = {
      model: { PublicationDate: new Date() },
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
      if (!this.selectedThumbnail) {
        this.notifier.warning(
          this.props.i10n['site-news.validation.missing-thumbnail']
        );
        return;
      }

      this.createModel();
    }
  };

  onFileSelected = file => {
    this.selectedThumbnail = file;
  };

  uploadImage = id => {
    this.api.request
      .put('sitenewsthumbnail', this.selectedThumbnail, id)
      .setHeader('thumbnail-filename', this.selectedThumbnail.name)
      .success(() => {
        this.props.history.push(fallbackRoute);
      })
      .go();
  };

  createModel = () => {
    this.api.request
      .post(apiRoute, this.state.model)
      .preventDefaultSuccess()
      .success(res => {
        const id = res.body.Result;
        this.uploadImage(id);
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
          <EditSiteNewsArticlesTemplate
            modelId={this.modelId}
            model={model}
            onFileSelected={this.onFileSelected}
            onConfirm={this.onConfirm}
          />
        )}
      </PlatformPageLayout>
    );
  }
}

export const EditSiteNewsArticlesPage = withLocalization(
  withSnackbar(EditSiteNewsArticlesPageComponent)
);
