import React, { PureComponent } from 'react';
import { withSnackbar } from 'notistack';
import { PlatformPageLayout } from '../organisms';
import { SnackbarVisitor } from '../../lib/SnackbarVisitor';
import { API } from '../../lib/xhr';
import { ListLanguagesTemplate } from '../templates';

class ListLanguagesPageComponent extends PureComponent {
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

  onEditAction(id) {
    this.props.history.push(`/configuration/language/${id}`);
  }

  render() {
    const { languages, loaded } = this.state;

    return (
      <PlatformPageLayout>
        {loaded && (
          <ListLanguagesTemplate
            languages={languages}
            onEditAction={id => this.onEditAction(id)}
          />
        )}
      </PlatformPageLayout>
    );
  }
}

export const ListLanguagesPage = withSnackbar(ListLanguagesPageComponent);
