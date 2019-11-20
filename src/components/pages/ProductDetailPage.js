import React, { PureComponent } from 'react';
import { withSnackbar } from 'notistack';
import { ProductDetailTemplate } from '../templates';
import { PageLayout } from '../organisms';
import { API } from '../../lib/xhr';
import { SnackbarVisitor } from '../../lib/SnackbarVisitor';
import withLocalization from '../../localization/withLocalization';

class ProductDetailPageComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.notifier = new SnackbarVisitor(props);
    this.api = new API(this.notifier);

    this.planCode = this.props.match.params.code;

    this.state = {
      detailModel: null,
      questions: null
    };
  }

  componentDidMount() {
    this.loadDetailsAndValorations();
    this.loadQuestionsAndAnswers();
  }

  loadDetailsAndValorations = () => {
    this.api.request
      .get(`pricingplancomment?planCode=${this.planCode}`)
      .success(res => this.setState({ detailModel: res.body.Result }))
      .go();
  };

  loadQuestionsAndAnswers = () => {
    this.api.request
      .get(`productquestion?pricingPlanCode=${this.planCode}`)
      .success(res => this.setState({ questions: res.body.Result }))
      .go();
  };

  onQuestionConfirm = (body, i10n, callback) => {
    this.api.request
      .post('productquestion', { PricingPlanCode: this.planCode, ...body })
      .preventDefaultSuccess()
      .success(() =>
        this.notifier.success(i10n['product-detail.question-sent'])
      )
      .success(callback)
      .success(this.loadQuestionsAndAnswers)
      .go();
  };

  render() {
    const { questions, detailModel } = this.state;

    return (
      <PageLayout>
        {detailModel && questions && (
          <ProductDetailTemplate
            questions={questions}
            model={detailModel}
            planCode={this.planCode}
            onQuestionConfirm={this.onQuestionConfirm}
          />
        )}
      </PageLayout>
    );
  }
}

export const ProductDetailPage = withSnackbar(
  withLocalization(ProductDetailPageComponent)
);
