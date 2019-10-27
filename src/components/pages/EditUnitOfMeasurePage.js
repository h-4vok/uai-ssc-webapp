import React, { PureComponent } from 'react';
import { withSnackbar } from 'notistack';
import { PlatformPageLayout } from '../organisms';
import { SnackbarVisitor } from '../../lib/SnackbarVisitor';
import { API } from '../../lib/xhr';
import { EditUnitOfMeasureTemplate } from '../templates';

const apiRoute = 'unitofmeasure';
const listItemsRoute = '/configuration/unit-of-measure';

class EditUnitOfMeasurePageComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.notifier = new SnackbarVisitor(props);
    this.api = new API(this.notifier);

    this.state = {
      model: { Code: '', DefaultDescription: '' }
    };
  }

  onConfirm = () => {
    this.createModel();
  };

  createModel = () => {
    this.api.request
      .post(apiRoute, this.state.model)
      .success(() => {
        this.props.history.push(listItemsRoute);
      })
      .go();
  };

  render() {
    const { model } = this.state;

    return (
      <PlatformPageLayout>
        <EditUnitOfMeasureTemplate
          model={model}
          onConfirm={() => this.onConfirm()}
        />
      </PlatformPageLayout>
    );
  }
}

export const EditUnitOfMeasurePage = withSnackbar(
  EditUnitOfMeasurePageComponent
);
