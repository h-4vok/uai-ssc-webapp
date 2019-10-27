import React, { PureComponent } from 'react';
import { withSnackbar } from 'notistack';
import { PlatformPageLayout } from '../organisms';
import { SnackbarVisitor } from '../../lib/SnackbarVisitor';
import { API } from '../../lib/xhr';
import { ReadLogTemplate } from '../templates';

class ReadLogPageComponent extends PureComponent {
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

  componentDidMount() {
    this.api.request
      .getById('log', this.modelId)
      .success(res => {
        this.setState({
          model: res.body.Result,
          allLoaded: true
        });
      })
      .go();
  }

  render() {
    const { model, allLoaded } = this.state;

    return (
      <PlatformPageLayout>
        {allLoaded && <ReadLogTemplate model={model} />}
      </PlatformPageLayout>
    );
  }
}

export const ReadLogPage = withSnackbar(ReadLogPageComponent);
