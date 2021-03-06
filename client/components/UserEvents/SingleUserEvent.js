import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import CardMedia from '@material-ui/core/CardMedia'
import Grid from '@material-ui/core/Grid'

const styles = theme => ({
  card: {
    width: 325,
    height: 600
  },
  title: {
    marginBottom: 16,
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  media: {
    paddingTop: '100%',
    backgroundSize: 'contain'
  },
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: 'none'
  }
})

const SingleUserEvent = props => {
  const {userEvent, classes, selectedSponsor, handleClick} = props
  const event = userEvent.event
  console.log('props', props)

  // async function handleClick(evt) {
  //   console.log('evt', evt)
  //   const returnedEvent = await axios.put('/api/userEvents', evt)
  // }
  return (
    <Grid key={event.url} item xs={6}>
      <Grid
        container
        className={classes.demo}
        justify="center"
        spacing={24}
        style={{padding: 20}}
      >
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="headline" align="center" component="h1">
              {event.name}
            </Typography>
            <CardMedia
              className={classes.media}
              image={selectedSponsor.imageUrl}
              title="Sponsor Card"
            />
            <Typography variant="subheading" align="center">
              {event.description}
            </Typography>
            {event.date && (
              <Typography variant="subheading" align="center">
                Date: {new Date(event.date).toDateString()}
              </Typography>
            )}
            {event.date && (
              <Typography variant="subheading" align="center">
                Time: {new Date(event.date).toLocaleTimeString()}
              </Typography>
            )}
            <Typography variant="subheading" align="center">
              {event.location}
            </Typography>
            <Typography variant="body2" align="center">
              Point cost: {event.pointCost}
            </Typography>
            {userEvent.status === 'Active' && (
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                type="submit"
                justify="center"
                onClick={() => {
                  handleClick({status: 'Redeemed', event: userEvent})
                }}
              >
                CLICK TO REDEEM EVENT
              </Button>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

SingleUserEvent.propTypes = {
  classes: PropTypes.object.isRequired
}

// const mapState = state => {
//   let sum = 0
//   state.points.allPoints.forEach(point => {
//     sum += point.totalEarned
//   })
//   return {
//     totalPoints: sum - state.user.pointsSpent
//   }
// }

// const mapDispatch = dispatch => {
//   return {
//     updatePoints: points => dispatch(updatePoints(points))
//   }
// }

export default withStyles(styles)(SingleUserEvent)
