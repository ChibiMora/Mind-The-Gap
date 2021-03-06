import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  State,
  CongressChoice,
  House,
  SingleRep,
  ActivityList,
  Organizations,
  PointsHome,
  AllSponsors,
  SponsorCard,
  Home,
  SingleSponsor,
  AllEvents,
  UserEventList
} from './components'
import {me} from './store'
import {fetchAllUsersPoints} from './store/reducers/pointsReducer'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" component={Home} />

        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route exact path="/home" component={UserHome} />
            <Route exact path="/account/activities" component={ActivityList} />
            <Route exact path="/account/points" component={PointsHome} />
            <Route exact path="/myEvents" component={UserEventList} />
            <Route exact path="/representatives" component={State} />
            <Route
              exact
              path="/representatives/:state"
              component={CongressChoice}
            />
            <Route
              exact
              path="/representatives/:state/senate"
              component={House}
            />
            <Route
              exact
              path="/representatives/:state/house/"
              component={House}
            />
            <Route
              exact
              path="/representatives/singleRep/:repId"
              component={SingleRep}
            />
            <Route exact path="/sponsors" component={AllSponsors} />
            <Route
              exact
              path="/sponsors/:sponsorId"
              component={SingleSponsor}
            />
            <Route exact path="/events" component={AllEvents} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/organizations" component={Organizations} />
            {/* <Route component={Home} /> */}
          </Switch>
        )}
        {!isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />

            {/* <Route component={Home} /> */}
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        {/* <Route component={Login} /> */}
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
      dispatch(fetchAllUsersPoints())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
