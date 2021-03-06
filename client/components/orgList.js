import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Textfield from './textfield'

const styles = theme => ({
  root: {
    flexGrow: 2
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  card: {
    width: 325,
    height: 350
  },
  title: {
    marginBottom: 16,
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  media: {
    paddingTop: '100%'
  },
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: 'none'
  }
})

const OrgList = props => {
  const {classes} = props

  if (props.results) {
    return (
      <div className={classes.root}>
        <Grid
          container
          className={classes.paper}
          spacing={16}
          justify="space-between"
          style={{padding: 50}}
        >
          {props.results.map(org => (
            <Grid key={org.url} item xs={3}>
              <Grid
                container
                className={classes.demo}
                justify="space-between"
                spacing={16}
                style={{padding: 20}}
              >
                <Card className={classes.card}>
                  <CardContent>
                    <Typography
                      variant="headline"
                      align="center"
                      component="h1"
                    >
                      <a href={org.url} color="textSecondary">
                        {org.charityName}
                      </a>
                    </Typography>
                    <Typography variant="subheading" align="center">
                      {org.city}
                    </Typography>
                    <Typography variant="subheading" align="center">
                      {org.state}
                    </Typography>
                    <Typography variant="body2" align="center">
                      <a target="_blank" href={org.donationUrl}>
                        Donate Here
                      </a>
                    </Typography>
                    <Textfield
                      orgName={org.charityName}
                      donationUrl={org.donationUrl}
                    />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </div>
    )
  } else {
    return null
  }
}
OrgList.propTypes = {
  classes: PropTypes.object.isRequired
}
export default withStyles(styles)(OrgList)
