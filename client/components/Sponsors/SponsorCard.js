import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import CardMedia from '@material-ui/core/CardMedia'
import Grid from '@material-ui/core/Grid'
import Icon from '@material-ui/core/Icon'
import {addActivity} from '../../store/reducers/activityReducer'
import {connect} from 'react-redux'
import {updatePoints} from '../../store/reducers/pointsReducer'
import OpenInNewIcon from '@material-ui/icons/OpenInNew'


const styles = theme => ({
  card: {
    width: 325,
    height: 600
  },
  media: {
    paddingTop: '100%', // 16:9,
    backgroundSize: 'contain'
  },
  butttonText: {
    color: '#ffffff',
  }
})

const SponsorCard = props => {
  const {classes, sponsor, handleClick} = props

  return (
    <Grid item xs={6}>
      <Grid
        container
        className={classes.demo}
        justify="space-around"
        spacing={16}
        style={{padding: 10}}
      >
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image={sponsor.imageUrl}
            title="Sponsor Card"
          />
          <CardContent>
            <Button
              variant="extendedFab"
              onClick={() => {
                handleClick(sponsor)
              }}
              color="primary"

            >
              <Typography gutterBottom variant="body2" className={classes.butttonText}>
                {sponsor.name}
              </Typography>
            </Button>
          </CardContent>
          <hr className="divider" />
          <CardActions>
            <Button className="social-icons" size="small">
              <OpenInNewIcon className={classes.icon} color="primary" />
              <a href={sponsor.url} target="_blank">
                website
              </a>
            </Button>
          </CardActions>
          <hr className="divider" />

          <CardActions>
            <Button className="social-icons" size="small" color="primary">
              <a href={sponsor.instagramUrl} target="_blank">
                <i className="fab fa-instagram fa-lg" />
              </a>
            </Button>
            <Button className="social-icons" size="small" color="primary">
              <a href={sponsor.facebookUrl} target="_blank">
                <i className=" fab fa-facebook fa-lg" />
              </a>
            </Button>
            <Button className="social-icons" size="small" color="primary">
              <a href={sponsor.twitterUrl} target="_blank">
                <i className=" fab fa-twitter fa-lg" />
              </a>
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    addActivity: activity => {
      dispatch(addActivity(activity))
      dispatch(updatePoints({points: 5}))
    }
  }
}

export default withStyles(styles)(
  connect(null, mapDispatchToProps)(SponsorCard)
)
