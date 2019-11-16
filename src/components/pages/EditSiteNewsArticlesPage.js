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
      model: { PublicationDate: new Date(), Categories: [] },
      categories: null,
      modelLoaded: false
    };
  }

  loadCategories = () => {
    this.api.request
      .get('sitenewscategory')
      .success(res => {
        this.setState({
          categories: res.body.Result
        });
      })
      .go();
  };

  loadModel = () => {
    this.api.request
      .getById(apiRoute, this.modelId)
      .success(res => {
        this.setState({
          model: res.body.Result,
          modelLoaded: true
        });
      })
      .go();
  };

  componentDidMount() {
    this.loadCategories();

    if (this.modelId) {
      this.loadModel();
    } else {
      this.setState({ modelLoaded: true });
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
    const { model, modelLoaded, categories } = this.state;

    return (
      <PlatformPageLayout>
        {modelLoaded && categories && (
          <EditSiteNewsArticlesTemplate
            modelId={this.modelId}
            model={model}
            categories={categories}
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
