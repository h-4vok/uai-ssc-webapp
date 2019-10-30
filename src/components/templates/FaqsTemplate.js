import React from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Container,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Typography
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { fromI10n } from '../../lib/GlobalState';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  }
}));

export function FaqsTemplate() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = panel => (event, isExpanded) =>
    setExpanded(isExpanded ? panel : false);

  const FaqExpansionPanelTemplate = props => (
    <ExpansionPanel
      expanded={expanded === props.Name}
      onChange={handleChange(props.Name)}
    >
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`${props.Name}bh-content`}
        id={`${props.Name}bh-header`}
      >
        <Typography className={classes.heading}>
          {fromI10n(props.Headeri10n)}
        </Typography>
        <Typography className={classes.secondaryHeading}>
          {fromI10n(props.SubHeaderi10n)}
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Typography>{fromI10n(props.Detailsi10n)}</Typography>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );

  const metadata = ['what-is-ssc', 'how-to-operate', 'diff-samples'];

  return (
    <Container main maxWidth="md">
      <div className={classes.root}>
        {metadata.map((item, idx) => (
          <FaqExpansionPanelTemplate
            Name={`panel${idx}`}
            Headeri10n={`faq.${item}.header`}
            SubHeaderi10n={`faq.${item}.subheader`}
            Detailsi10n={`faq.${item}.details`}
          />
        ))}
      </div>
    </Container>
  );
}
