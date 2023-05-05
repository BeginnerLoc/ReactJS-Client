import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';

const ENDPOINT = "http://localhost:5000";

function VideoStream() {
  const [socket, setSocket] = useState(null);
  const [stream, setStream] = useState(null);
  const [videoData, setVideoData] = useState(null);

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    setSocket(socket);

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!stream) {
      return;
    }

    const interval = setInterval(() => {
      const canvas = document.createElement('canvas');
      canvas.width = stream.getVideoTracks()[0].getSettings().width;
      canvas.height = stream.getVideoTracks()[0].getSettings().height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg');
      const base64Data = dataUrl.replace(/^data:image\/(png|jpeg|jpg);base64,/, "");
      setVideoData(base64Data);
    }, 1000 / 30); // Send 30 frames per second

    return () => {
      clearInterval(interval);
    };
  }, [stream]);

  const videoRef = React.useRef(null);

  const startVideoStream = async () => {
    const constraints = {
      audio: false,
      video: true
    };
    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(stream);
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    } catch (err) {
      console.error(err);
    }
  };

  const stopVideoStream = () => {
    if (stream) {
      stream.getTracks().forEach(track => {
        track.stop();
      });
      setStream(null);
      setVideoData(null);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (socket && videoData) {
        socket.emit('sendStream', { image: videoData });
      }
    }, 1000 / 30); // Send 30 frames per second

    return () => {
      clearInterval(interval);
    };
  }, [socket, videoData]);

  return (
    <div>
      <video ref={videoRef} />
      <div>
        <button onClick={startVideoStream}>Start Video Stream</button>
        <button onClick={stopVideoStream}>Stop Video Stream</button>
      </div>
    </div>
  );
}

export default VideoStream;
