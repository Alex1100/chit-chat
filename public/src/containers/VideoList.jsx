import React, { Component } from 'react';
import { connect } from 'react-redux';
import VideoPreview from '../components/VideoPreview';


class VideoList extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    const {
      videos,
      dispatch,
      history
    } = this.props;

    return videos.length > 0 ? (
      <div className="video-list-container">
        {
          videos.map((vid, wi) => (
            <VideoPreview
              dispatch={dispatch}
              history={history}
              videoId={vid.id}
              title={vid.title}
              thumbnail={vid.thumbnail}
              description={vid.description}
              videoURL={vid.content}
              likes={vid.likes}
            />
          ))
        }
      </div>
    ) : (
      <div>
        <div className="app-loading-container">
          <h1 style={{color: "#fbee82", fontStyle: 'italic', fontSize: "120%"}}>Loading Videos</h1>
          <br/>
          <div className="loader">Loading Videos...</div>
        </div>
      </div>
    )
  }
};

const mapStateToProps = (state) => {
  const { videoListData } = state;
  const {
    videos,
    selectedVideo,
  } = videoListData;

  return {
    videos,
    selectedVideo,
  };
};


export default connect(mapStateToProps)(VideoList);
