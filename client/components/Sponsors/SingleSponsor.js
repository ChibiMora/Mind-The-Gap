import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import CardMedia from '@material-ui/core/CardMedia'
import Divider from '@material-ui/core/Divider'

import Icon from '@material-ui/core/Icon'

import {Link, withRouter} from 'react-router-dom'
import {addActivity} from '../../store/reducers/activityReducer'
import {connect} from 'react-redux'
import {updatePoints} from '../../store/reducers/pointsReducer'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import EventCard from './EventCard'

const styles = theme => ({
  root: {
    flexGrow: 2
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
})

const SingleSponsor = props => {
  console.log('props', props)
  const {selectedSponsor, events} = props.location.state
  const {classes} = props
  return (
    <div>
      <h1>{selectedSponsor.name}</h1>
      <h5>{selectedSponsor.description}</h5>
      <div className={classes.root}>
        <Grid className={classes.paper} container spacing={40}>
          {events.map(event => {
            return (
              <EventCard
                key={event.id}
                event={event}
                selectedSponsor={selectedSponsor}
              />
            )
          })}
        </Grid>
      </div>
    </div>
  )
}

SingleSponsor.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SingleSponsor)