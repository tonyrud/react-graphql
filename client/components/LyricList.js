import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

class LyricList extends Component {
  constructor(props) {
    super(props)
  }

  onLike(id, likes) {

    this.props.mutate({
      variables: {
        id,
      },
      optimisticResponse: {
        __typename: 'Mutation',
        likeLyric: {
          id,
          __typename: 'LyricType',
          likes: likes + 1
        }
      }
    })
  }

  renderLyrics() {
    return this.props.lyrics.map(({ id, content, likes }) => {
      return (
        <li className="collection-item" key={id}>
          {content}
          <div className="vote-box">
            <i onClick={() => this.onLike(id, likes)} className="material-icons">
              thumb_up
            </i>
            {likes}
          </div>
        </li>
      )
    })
  }

  render() {
    if (!this.props.lyrics) return <div>Loading...</div>

    return <ul className="collection">{this.renderLyrics()}</ul>
  }
}

const mutation = gql`
  mutation LikeLyric($id: ID) {
    likeLyric(id: $id) {
      id
      likes
    }
  }
`

export default graphql(mutation)(LyricList)
