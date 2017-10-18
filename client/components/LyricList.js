import React, { Component } from 'react'

export default class LyricList extends Component {
  constructor(props) {
    super(props)
  }

  renderLyrics() {
    return this.props.lyrics.map(({ id, content }) => {
      return (
        <li className="collection-item" key={id}>
          {content}
        </li>
      )
    })
  }

  render() {
    console.log(this.props)
    if (!this.props.lyrics) return <div>Loading...</div>

    return <ul className="collection">{this.renderLyrics()}</ul>
  }
}
