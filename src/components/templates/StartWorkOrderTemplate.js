import React, { PureComponent } from 'react';
import {
  Typography,
  Box,
  Button,
  Container,
  AppBar,
  Tabs,
  Tab
} from '@material-ui/core';
import { PlaylistAddCheck, PlaylistAdd } from '@material-ui/icons';
import { ParentSamplesSearch, ExpectedChildSamples } from '../organisms';
import withLocalization from '../../localization/withLocalization';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

class StartWorkOrderTemplateComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      tabValue: 0
    };
  }

  handleTabChange = (evt, newTab) => this.setState({ tabValue: newTab });

  render() {
    const {
      ParentSamples,
      onExpectedChildsSetup,
      samples,
      i10n,
      onConfirm,
      onParentSelection
    } = this.props;
    const { tabValue } = this.state;

    return (
      <Container maxWidth="xl">
        <Box mt={3} mb={1}>
          <Typography variant="h5">
            {i10n['start-work-order.page.title']}
          </Typography>
        </Box>
        <AppBar position="static" color="default">
          <Tabs
            value={tabValue}
            onChange={this.handleTabChange}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab
              label={i10n['start-work-order.page.select-your-samples']}
              icon={<PlaylistAdd />}
            />
            <Tab
              label={i10n['start-work-order.page.selected-samples']}
              icon={<PlaylistAddCheck />}
            />
          </Tabs>
        </AppBar>
        <TabPanel value={tabValue} index={0}>
          <ParentSamplesSearch
            samples={samples}
            onParentSelection={onParentSelection}
          />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <ExpectedChildSamples
            ParentSamples={ParentSamples}
            onExpectedChildsSetup={onExpectedChildsSetup}
          />
        </TabPanel>
        <Box mt={1}>
          {tabValue === 1 && (
            <Button
              fullWidth
              color="primary"
              variant="contained"
              onClick={onConfirm}
            >
              {i10n['global.confirm']}
            </Button>
          )}
        </Box>
      </Container>
    );
  }
}

export const StartWorkOrderTemplate = withLocalization(
  StartWorkOrderTemplateComponent
);
