import React from 'react';
import ReactPlayer from 'react-player';
import { useSwipeable } from 'react-swipeable';

function VideoPlayer({ url }) {
  const handlers = useSwipeable({
    onSwipedLeft: () => handleSkip(10),
    onSwipedRight: () => handleSkip(-10),
    // Outros gestos
  });

  const handleSkip = (seconds) => {
    // Lógica para avançar ou retroceder o vídeo
  };

  return (
    <div {...handlers}>
      <ReactPlayer url={url} controls width="100%" height="100%" />
    </div>
  );
}

export default VideoPlayer;