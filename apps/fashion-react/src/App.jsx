import React, { useState, useEffect } from 'react';

const dummyImage = 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&w=400&h=400&facepad=2&q=80';

export default function App() {
  const [activeTab, setActiveTab] = useState('tryon');
  const [url, setUrl] = useState('');
  
  useEffect(() => {
    // Get current tab URL
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      if (tabs[0]) {
        setUrl(tabs[0].url);
      }
    });
  }, []);

  return (
    <div style={{
      width: '380px',
      height: '600px',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      color: '#fff',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      overflow: 'hidden'
    }}>
      {/* Tab Headers */}
      <div style={{
        display: 'flex',
        padding: '16px 16px 0 16px',
        gap: '8px'
      }}>
        <button 
          onClick={() => setActiveTab('tryon')}
          style={{
            flex: 1,
            padding: '12px',
            background: activeTab === 'tryon' ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.1)',
            border: 'none',
            borderRadius: '12px 12px 0 0',
            color: '#fff',
            fontSize: '16px',
            fontWeight: activeTab === 'tryon' ? '600' : '400',
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}>
          Try-on
        </button>
        <button 
          onClick={() => setActiveTab('about')}
          style={{
            flex: 1,
            padding: '12px',
            background: activeTab === 'about' ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.1)',
            border: 'none',
            borderRadius: '12px 12px 0 0',
            color: '#fff',
            fontSize: '16px',
            fontWeight: activeTab === 'about' ? '600' : '400',
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}>
          About
        </button>
      </div>

      {/* Content Area */}
      <div style={{
        flex: 1,
        background: 'rgba(255,255,255,0.15)',
        backdropFilter: 'blur(10px)',
        margin: '0 16px 16px 16px',
        borderRadius: '0 0 20px 20px',
        padding: '24px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        {activeTab === 'tryon' ? (
          <>
            {/* Avatar Image */}
            <div style={{
              width: '100%',
              maxWidth: '280px',
              aspectRatio: '3/4',
              background: 'linear-gradient(180deg, rgba(102,205,255,0.3) 0%, rgba(102,205,255,0.1) 100%)',
              borderRadius: '16px',
              padding: '16px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <img 
                src={dummyImage} 
                alt="Try-on Avatar" 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '12px'
                }} 
              />
            </div>

            {/* Action Buttons */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px',
              width: '100%',
              marginBottom: '16px'
            }}>
              <button style={{
                padding: '14px',
                background: 'rgba(102,205,255,0.8)',
                border: 'none',
                borderRadius: '12px',
                color: '#fff',
                fontSize: '15px',
                fontWeight: '600',
                cursor: 'pointer'
              }}>
                Try Now
              </button>
              <button style={{
                padding: '14px',
                background: 'rgba(255,255,255,0.25)',
                border: 'none',
                borderRadius: '12px',
                color: '#fff',
                fontSize: '15px',
                fontWeight: '600',
                cursor: 'pointer'
              }}>
                Add to Wardrobe
              </button>
            </div>

            {/* Gender Selection */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px',
              width: '100%'
            }}>
              <button style={{
                padding: '14px',
                background: 'rgba(255,255,255,0.2)',
                border: 'none',
                borderRadius: '12px',
                color: '#fff',
                fontSize: '15px',
                fontWeight: '500',
                cursor: 'pointer'
              }}>
                Male
              </button>
              <button style={{
                padding: '14px',
                background: 'rgba(255,255,255,0.2)',
                border: 'none',
                borderRadius: '12px',
                color: '#fff',
                fontSize: '15px',
                fontWeight: '500',
                cursor: 'pointer'
              }}>
                Female
              </button>
            </div>
          </>
        ) : (
          <div style={{
            width: '100%',
            color: '#fff',
            fontSize: '14px',
            lineHeight: '1.6'
          }}>
            <h3 style={{marginTop: 0, fontSize: '18px', fontWeight: '600'}}>Current Page</h3>
            <p style={{
              background: 'rgba(255,255,255,0.1)',
              padding: '12px',
              borderRadius: '8px',
              wordBreak: 'break-all',
              fontSize: '13px'
            }}>
              {url || 'No active tab'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
