import React from 'react';
import { Tabs, Tab, AppBar, Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { CreditCard, Loyalty } from '@material-ui/icons';
import { fromI10n } from '../../lib/GlobalState';
import { CreditCardFormPayment } from '../molecules';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper
  }
}));

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
      <Box p={3} height={400}>
        {children}
      </Box>
    </Typography>
  );
}

export function PaymentMethodsTabs(props) {
  const classes = useStyles();
  const { onConfirm, creditCards } = props;
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (evt, newTab) => setTabValue(newTab);

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab
            label={fromI10n('payment-methods.tab.credit-card')}
            icon={<CreditCard />}
          />
          <Tab
            label={fromI10n('payment-methods.tab.credit-note')}
            icon={<Loyalty />}
          />
        </Tabs>
      </AppBar>
      <TabPanel value={tabValue} index={0}>
        <CreditCardFormPayment
          creditCards={creditCards}
          onConfirm={onConfirm}
        />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        Sos un negro
      </TabPanel>
    </div>
  );
}
