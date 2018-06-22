import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import CardMedia from '@material-ui/core/CardMedia'
import Grid from '@material-ui/core/Grid'

const styles = {
  card: {
    minWidth: 325
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
  }
}

function SimpleCard(props) {
  const {classes, state, handleClick} = props
  return (
    <div>
      <button
        onClick={() => {
          handleClick(state)
        }}
      >
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image={state.imageUrl}
            title="State Picture"
            style={{
              display: 'block',
              backgroundSize: 'contain',
              backgroundRepeat: 'no - repeat',
              backgrounPosition: 'center'
            }}
          />
          <CardContent>
            <Typography variant="headline" align="center" component="h1">
              {state.name}
            </Typography>
          </CardContent>
        </Card>
      </button>
    </div>
  )
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SimpleCard)