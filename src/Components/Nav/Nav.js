import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {logoutUser} from '../../ducks/reducer'
import {withRouter} from 'react-router-dom'

class Nav extends Component {
    logout = () => {
        axios.post('/auth/logout')
        .then(() => {
            this.props.logoutUser()
            this.props.history.push('/')
        })
    }

    render(props) {
        const{username,profilePic} = this.props.user
        return (

            <div>
                <img src={profilePic} alt='Profile Pic'/>
                <p>{username}</p>
                <Link to='/dashboard'>Home</Link>
                <Link to='new'>New Post</Link>
                <button type='submit'
                        value='Logout'
                        onClick={(e) => this.logout(e)}>Logout</button>
            </div>
        )
    }
}

const mapStateToProps = reduxState => reduxState

export default withRouter(connect(mapStateToProps,{logoutUser})(Nav))