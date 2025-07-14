import React, { useState } from 'react'
import { styled, keyframes } from '@mui/system'

const AppContainer = styled('div')({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
//   background: 'linear-gradient(to bottom right, #fff8d6, #ffe082)',
  fontFamily: "'Poppins', sans-serif",
  position: 'relative',
  overflow: 'hidden',
  padding: '20px',
  textAlign: 'center',
  zIndex: 1,
});

const Title = styled('h1')({
  fontSize: '4rem',
  fontWeight: 800,
  color: '#FFD700',
  textShadow: '1px 1px 4px rgba(0,0,0,0.6)',
  marginBottom: '0.5rem',
});

const Paragraph = styled('p')({
  fontSize: '1.5rem',
  color: '#ddf528',
  fontStyle: 'italic',
  fontWeight: 'bold',
  textShadow: '0.5px 0.5px 3px rgba(0,0,0,0.3)',
  marginBottom: '2rem',
  fontFamily: "'Lucida Sans', Geneva, Verdana, sans-serif",
});

const UploadForm = styled('form')({
  border: '2px solid #a87fc5',
  borderRadius: '16px',
  padding: '2rem',
  backgroundColor: 'rgba(255, 255, 255, 0.3)',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 0 12px rgba(168, 127, 197, 0.4)',
  width: '90%',
  maxWidth: '500px',
  transition: 'transform 0.3s ease',
  position: 'relative',
  textAlign: 'center',
  '&:hover': {
    transform: 'scale(1.03)',
  },
});

const FileLabel = styled('label')({
  display: 'block',
  fontSize: '1.5rem',
  fontWeight: 'bold',
  marginBottom: '1rem',
  cursor: 'pointer',
  color: '#333',
  fontFamily: "'Times New Roman', Times, serif",
});

const SubmitButton = styled('button')({
  backgroundColor: '#FFD700',
  border: 'none',
  padding: '0.8rem 1.5rem',
  borderRadius: '30px',
  color: '#4d035e',
  fontWeight: 'bold',
  cursor: 'pointer',
  fontSize: '1rem',
  fontFamily: "'Lucida Sans', Geneva, Verdana, sans-serif",
  transition: 'background 0.3s ease, transform 0.3s ease',
  boxShadow: '0 6px 20px rgba(251, 191, 36, 0.4)',
  '&:hover': {
    backgroundColor: '#f59e0b',
    transform: 'scale(1.05)',
  },
});

const LoadingSpinner = styled('span')({
  border: '3px solid #fff',
  borderTop: '3px solid #facc15',
  borderRadius: '50%',
  width: '16px',
  height: '16px',
  display: 'inline-block',
  animation: 'spin 1s linear infinite',
  marginRight: '10px',
  verticalAlign: 'middle',
  '@keyframes spin': {
    to: {
      transform: 'rotate(360deg)',
    },
  },
});

const ResultBox = styled('div')({
  marginTop: '2rem',
  fontSize: '1.4rem',
  textAlign: 'center',
  color: '#dfd183',
  fontWeight: 'bold',
  fontFamily: "'Times New Roman', Times, serif",
  textShadow: '1px 1px 4px rgba(0,0,0,0.6)',
});

const ErrorBox = styled('div')({
  color: 'red',
  marginTop: '1.5rem',
  fontWeight: 'bold',
});

const VideoBackground = styled('video')({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  zIndex: 0,
});

const Overlay = styled('div')({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0,0,0,0.3)', // adjust opacity
  zIndex: 0.5,
});



function QueenBee() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResult(null);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    setResult(null);
    setError(null);
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await fetch('http://127.0.0.1:8000/api/queen/queen-detect', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        setResult(data);
      }
    } catch (err) {
      setError('Failed to connect to server.');
    } finally {
      setLoading(false);
    }
  };

 return (
  <>
    {/* 🔹 Background Video */}
    <VideoBackground autoPlay muted loop playsInline>
      <source src="/q.mp4" type="video/mp4" />
    </VideoBackground>

    {/* 🔹 Optional dark overlay for readability */}
    <Overlay />

    {/* 🔹 Main App Content */}
    <AppContainer>
      <Title>Queen Bee Detection</Title>
      <UploadForm onSubmit={handleSubmit}>
        <FileLabel>
          {file ? file.name : 'Choose an audio file'}
          <input
            type="file"
            accept="audio/*"
            onChange={handleFileChange}
            hidden
          />
        </FileLabel>
        {file && <div className="file-name">Selected: {file.name}</div>}
        <SubmitButton type="submit" disabled={!file || loading}>
          {loading ? (
            <>
              <LoadingSpinner />
              Analyzing...
            </>
          ) : (
            'Upload & Detect'
          )}
        </SubmitButton>
      </UploadForm>

      {result && (
        <ResultBox>
          <h2>Detection Result</h2>
          <p>
            {result.queen_present ? (
              <>
                🐝 Queen Bee is <strong>PRESENT</strong>
                <br />
                <small>Confidence: {(result.confidence * 100).toFixed(1)}%</small>
              </>
            ) : (
              <>
                ❌ Queen Bee is <strong>NOT PRESENT</strong>
                <br />
                <small>Confidence: {(result.confidence * 100).toFixed(1)}%</small>
              </>
            )}
          </p>
        </ResultBox>
      )}

      {error && <ErrorBox>Error: {error}</ErrorBox>}
    </AppContainer>
  </>
);
}
export default QueenBee
