import React, { PureComponent } from 'react';
import { withSnackbar } from 'notistack';
import { PlatformPageLayout } from '../organisms';
import { SnackbarVisitor } from '../../lib/SnackbarVisitor';
import { API } from '../../lib/xhr';
import { EditLanguagesTemplate } from '../templates';

class EditLanguagesPageComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.notifier = new SnackbarVisitor(props);
    this.api = new API(this.notifier);

    this.state = {
      languages: [],
      loaded: false
    };
  }

  componentDidMount() {
    this.loadLanguages();
  }

  loadLanguages() {
    this.api.request
      .get('systemLanguage')
      .success(res => {
        this.setState({
          languages: res.body.Result,
          loaded: true
        });
      })
      .go();
  }

  render() {
    const { languages, loaded } = this.state;

    return (
      <PlatformPageLayout>
        {loaded && <EditLanguagesTemplate languages={languages} />}
      </PlatformPageLayout>
    );
  }
}

export const EditLanguagesPage = withSnackbar(EditLanguagesPageComponent);
