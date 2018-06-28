import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import CardMedia from '@material-ui/core/CardMedia'
import {Link, withRouter} from 'react-router-dom'
//import EventCard from './EventCard'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import axios from 'axios'
import {connect} from 'react-redux'
import SingleUserEvent from './SingleUserEvent'

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

class UserEventList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allActiveEvents: [],
      allRedeemedEvents: [],
      allSponsors: []
    }
    this.handleClick = this.handleClick.bind(this)
  }

  async componentDidMount() {
    const {data} = await axios.get(`/api/userEvents`)
    const sponsors = await axios.get('/api/sponsors')
    const active = data.filter(event => {
      return event.status === 'Active'
    })
    const redeemed = data.filter(event => {
      return event.status === 'Redeemed'
    })
    this.setState({
      allActiveEvents: active,
      allRedeemedEvents: redeemed,
      allSponsors: sponsors.data
    })
  }
  async handleClick(evt) {
    console.log('allactiveevents', this.state.allActiveEvents)
    const returnedEvent = await axios.put('/api/userEvents', evt)
    const newActive = this.state.allActiveEvents.filter(event => {
      return event.id !== evt.event.id
    })
    //console.log('newActive', active)
    console.log('returnedevent', returnedEvent.data)
    this.setState({
      allActiveEvents: newActive,
      allRedeemedEvents: [...this.state.allRedeemedEvents, returnedEvent.data]
    })
  }

  render() {
    const {classes} = this.props

    return (
      <div className={classes.root}>
        <h1>Your Events</h1>
        <Grid className={classes.paper} container spacing={40}>
          <div>Active: </div>
          {this.state.allActiveEvents &&
            this.state.allActiveEvents.map(userEvent => {
              const selectedSponsor = this.state.allSponsors.filter(
                sponsor => sponsor.id === userEvent.event.sponsorId
              )
              return (
                <SingleUserEvent
                  key={event.id}
                  userEvent={userEvent}
                  selectedSponsor={selectedSponsor[0]}
                  handleClick={this.handleClick}
                />
              )
            })}
          <div>Redeemed: </div>
          {this.state.allRedeemedEvents &&
            this.state.allRedeemedEvents.map(userEvent => {
              const selectedSponsor = this.state.allSponsors.filter(
                sponsor => sponsor.id === userEvent.event.sponsorId
              )
              return (
                <SingleUserEvent
                  key={event.id}
                  userEvent={userEvent}
                  selectedSponsor={selectedSponsor[0]}
                  handleClick={this.handleClick}
                />
              )
            })}
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(UserEventList)