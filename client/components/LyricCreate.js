import React, { Component } from 'react'
import fetchSong from './../queries/fetchSong'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

class LyricCreate extends Component {
  constructor(props) {
    super(props)

    this.state = { content: '' }
  }

  onSubmit(event) {
    event.preventDefault()

    this.props
      .mutate({
        variables: {
          content: this.state.content,
          songId: this.props.songId,
        },
      })
      this.setState({content: ''})
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label>Add a Lyric</label>
          <input
            value={this.state.content}
            onChange={event => this.setState({ content: event.target.value })}
          />
        </form>
      </div>
    )
  }
}

const mutation = gql`
mutation AddLyricToSong($content: String, $songId: ID) {
  addLyricToSong(content: $content, songId: $songId ) {
    id
    lyrics {
      id
      content
    }
  }
}
`
export default graphql(mutation)(LyricCreate)