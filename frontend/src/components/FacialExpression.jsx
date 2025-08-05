import React, { useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';
import './FacialExpression.css';
import axios from 'axios';

export default function FacialExpression({ setSongs }) {
  const videoRef = useRef();

  const loadModels = async () => {
    const MODEL_URL = '/models';
    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
    await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
  };

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => console.error('Error accessing webcam:', err));
  };

  async function detectMood() {
    const detections = await faceapi
      .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceExpressions();

    if (!detections || detections.length === 0) {
      console.log('No face detected');
      return;
    }

    const expressions = detections[0].expressions;
    let maxProb = 0;
    let mostProbableExpression = '';

    for (const [expression, probability] of Object.entries(expressions)) {
      if (probability > maxProb) {
        maxProb = probability;
        mostProbableExpression = expression;
      }
    }

    console.log('Detected mood:', mostProbableExpression);

    try {
      const response = await axios.get(
        `http://localhost:3000/songs?mood=${mostProbableExpression}`
      );
      console.log('Fetched songs:', response.data);
      setSongs(response.data); // ← this should be the array of songs directly
    } catch (err) {
      console.error('Error fetching songs:', err);
    }
  }

  useEffect(() => {
    loadModels().then(startVideo);
  }, []);

  return (
    <div className="mood-element">
      <video ref={videoRef} autoPlay muted className="user-video-feed" />
      <br />
      <button onClick={detectMood} style={{ marginTop: '10px' }}>
        Detect Mood
      </button>
    </div>
  );
}
