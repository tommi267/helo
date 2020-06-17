import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

class Nav extends Component {
    

    render(props) {
        const{username,profilePic} = this.props.user
        return (

            <div>
                <img src={profilePic} alt='Profile Pic'/>
                <p>{username}</p>
                <Link to='/dashboard'>Home</Link>
                <Link to='new'>New Post</Link>
                <Link to='/'>Logout</Link>
            </div>
        )
    }
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps)(Nav)