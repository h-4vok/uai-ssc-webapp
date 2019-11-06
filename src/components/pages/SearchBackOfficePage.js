import React, { PureComponent } from 'react';
import { withSnackbar } from 'notistack';
import { SearchBackOfficeTemplate } from '../templates';
import { SnackbarVisitor } from '../../lib/SnackbarVisitor';
import { API } from '../../lib/xhr';
import { PlatformPageLayout } from '../organisms';

class SearchBackOfficePageComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.notifier = new SnackbarVisitor(this.props);
    this.api = new API(this.notifier);

    this.state = {
      searchData: []
    };
  }

  onSearch = searchTerm => {
    this.api.request
      .get(`platformmenuitem?searchTerm=${searchTerm}`)
      .success(res => this.setState({ searchData: res.body.Result }))
      .go();
  };

  onReRoute = route => this.props.history.push(route);

  render() {
    const { searchData } = this.state;

    return (
      <PlatformPageLayout>
        <SearchBackOfficeTemplate
          searchData={searchData}
          onSearch={searchTerm => this.onSearch(searchTerm)}
          onReRoute={this.onReRoute}
        />
      </PlatformPageLayout>
    );
  }
}

export const SearchBackOfficePage = withSnackbar(SearchBackOfficePageComponent);
