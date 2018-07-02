import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import CardMedia from '@material-ui/core/CardMedia'
import Icon from '@material-ui/core/Icon'
import {addActivity} from '../../store/reducers/activityReducer'
import {connect} from 'react-redux'
import {updatePoints} from '../../store/reducers/pointsReducer'

const styles = {
  card: {
    maxWidth: 445
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  }
}

const SingleRep = props => {
  const {classes} = props

  const rep = props.location.state.selectedRep

  const activity = {
    name: rep.first_name + ' ' + rep.last_name,
    location: rep.roles[0].state,
    link: rep.url,
    type: 'representatives'
  }

  const buttonSubmit = () => props.addActivity(activity)
  return (
    <div className="centering-card">
      {/* <div>
        Name: {rep.first_name} {rep.last_name}
      </div>
      <div>Phone: {rep.roles[0].phone}</div>
      <div>Link: {rep.url}</div>
      <button type="button" onClick={buttonSubmit}>
        I CONTACTED THIS REP TODAY, COLLECT MY POINTS
      </button> */}
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image="/static/images/cards/contemplative-reptile.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            Name: {rep.first_name} {rep.last_name}
          </Typography>
          <Typography component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
        <hr className="divider" />
        <CardActions>
          <Button className="social-icons" size="small" color="primary">
            <Icon className={classes.icon}>open_in_new</Icon>
            <a href={rep.url} target="_blank">
              website
            </a>
          </Button>
          <Button className="social-icons" size="small" color="primary">
            <Icon className={classes.icon}>phone</Icon>
            <a href={rep.url} target="_blank">
              773.475.3283
            </a>
          </Button>
        </CardActions>
        <hr className="divider" />

        <CardActions>
          <Button className="social-icons" size="small" color="primary">
            <a href={rep.url} target="_blank">
              <Icon className={classes.icon}>email</Icon>
            </a>
          </Button>
          <Button className="social-icons" size="small" color="primary">
            <a href={rep.url} target="_blank">
              <i className=" fab fa-facebook fa-lg" />
            </a>
          </Button>
          <Button className="social-icons" size="small" color="primary">
            <a href={rep.url} target="_blank">
              <i className=" fab fa-twitter fa-lg" />
            </a>
          </Button>
        </CardActions>
        <CardActions>
          <Button
            className={classes.button}
            size="small"
            color="primary"
            onClick={buttonSubmit}
          >
            <span className="collect-points">
              {' '}
              I CONTACTED THIS REP, COLLECT MY POINTS
            </span>

            <Icon className={classes.icon}>control_point</Icon>
          </Button>
        </CardActions>
      </Card>
    </div>
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

export default withStyles(styles)(connect(null, mapDispatchToProps)(SingleRep))
