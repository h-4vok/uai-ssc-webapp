import React, { PureComponent } from 'react';
import { withSnackbar } from 'notistack';
import { API } from '../../lib/xhr';
import { SnackbarVisitor } from '../../lib/SnackbarVisitor';
import { ViewProfitReportTemplate } from '../templates';
import { PlatformPageLayout } from '../organisms';
import { dateFormatyyyyMMdd } from '../../operators';

class ViewProfitReportPageComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.notifier = new SnackbarVisitor(this.props);
    this.api = new API(this.notifier);

    this.state = {
      data: null,
    };
  }

  onRefresh = (dateFrom, dateTo) => {
    this.api.request
      .get(
        `clientmanagement/profitreport?dateFrom=${dateFormatyyyyMMdd(
          dateFrom
        )}&dateTo=${dateFormatyyyyMMdd(dateTo)}`
      )
      .success(res => this.setState({ data: res.body.Result}))
      .go();
  };

  render() {
    const { data } = this.state;

    return (
      <PlatformPageLayout>
        <ViewProfitReportTemplate
          data={data}
          onRefresh={this.onRefresh}
        />
      </PlatformPageLayout>
    );
  }
}

export const ViewProfitReportPage = withSnackbar(ViewProfitReportPageComponent);
