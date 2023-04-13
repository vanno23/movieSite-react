import { useState, useEffect } from 'react'
import tmdbApi from '../../api/tmdbApi'
import './videoList.scss';

interface VideoListProps {
  type: string | undefined,
  id: string | undefined
}

interface videoDataProps {
  name: string,
  key: string,
}
const VideoList = ({ type, id }: VideoListProps) => {
  const [video, setVideo] = useState<videoDataProps []>([]);

  useEffect(() => {
    const getVideos = async () => {
      const response = await tmdbApi.getVideos(type, id);
      setVideo(response.results.slice(0, 3));
    }
    getVideos();
  }, [type, id]);

  const handleIframeLoad = (event: any) => {
    const iframeElement = event.target;
    const height = iframeElement.offsetWidth * 9 / 16 + 'px';
    iframeElement.setAttribute('height', height);
  };

  return (
    <div className='videoContainer'>
      {
        video.map((item, i) => (
          <div className="video" key={i}>
            <div className="videoTitle">
              <h2>{item.name}</h2>
            </div>
            <iframe
              src={`https://www.youtube.com/embed/${item.key}`}
              ref={(iframe) => { iframe && iframe.addEventListener('load', handleIframeLoad); }}
              width="100%"
              title="video"
            ></iframe>
          </div>
        ))
      }
    </div>
  )
}

export default VideoList;