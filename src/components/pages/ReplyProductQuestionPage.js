import React, { PureComponent } from 'react';
import { withSnackbar } from 'notistack';
import { PlatformPageLayout } from '../organisms';
import { SnackbarVisitor } from '../../lib/SnackbarVisitor';
import { API } from '../../lib/xhr';
import { ReplyProductQuestionTemplate } from '../templates';

const apiRoute = 'productquestion';
const fallbackRoute = '/management/product-question';

class ReplyProductQuestionPageComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.modelId = this.props.match.params.id;

    this.notifier = new SnackbarVisitor(props);
    this.api = new API(this.notifier);

    this.state = {
      model: null
    };
  }

  loadModel = () => {
    this.api.request
      .getById(apiRoute, this.modelId)
      .success(res => {
        this.setState({
          model: res.body.Result
        });
      })
      .go();
  };

  componentDidMount() {
    this.loadModel();
  }

  onConfirm = () => {
    this.api.request
      .put(apiRoute, this.state.model, this.modelId)
      .success(() => {
        this.props.history.push(fallbackRoute);
      })
      .go();
  };

  render() {
    const { model } = this.state;

    return (
      <PlatformPageLayout>
        {model && (
          <ReplyProductQuestionTemplate
            modelId={this.modelId}
            model={model}
            onConfirm={this.onConfirm}
          />
        )}
      </PlatformPageLayout>
    );
  }
}

export const ReplyProductQuestionPage = withSnackbar(
  ReplyProductQuestionPageComponent
);
