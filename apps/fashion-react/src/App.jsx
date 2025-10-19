import React, { useState, useEffect } from 'react';

// Initial image: place the attached male model image at public/assets/new_m_p.jpg
const initialImage = '/assets/new_m_p.jpg';

export default function App() {
  const [activeTab, setActiveTab] = useState('tryon');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imageUrl, setImageUrl] = useState(initialImage);
  const [metadata, setMetadata] = useState(null);

  useEffect(() => {
    // Get current tab URL then call API
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      const currentUrl = tabs && tabs[0] ? tabs[0].url : '';
      setUrl(currentUrl || '');
      if (!currentUrl) return;

      setLoading(true);
      setError('');

      // Timeout controller for fetch - increased to 60s for image generation
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000); // 60s timeout
      try {
        const res = await fetch('http://localhost:8000/generate-photo-and-data', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: currentUrl }),
          signal: controller.signal,
        });
        clearTimeout(timeoutId);

        if (!res.ok) {
          const text = await res.text().catch(() => '');
          throw new Error(`API ${res.status}: ${text || res.statusText}`);
        }
        const data = await res.json();
        if (data?.image_public_url) setImageUrl(data.image_public_url);
        if (data?.metadata) setMetadata(data.metadata);
      } catch (e) {
        clearTimeout(timeoutId);
        if (e.name === 'AbortError') {
          setError('Request timed out. Please try again.');
        } else {
          setError(e?.message || 'Failed to generate image and data');
        }
      } finally {
        setLoading(false);
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
      overflow: 'hidden',
      borderRadius: '16px'
    }}>
      {/* Tab Headers */}
      <div style={{
        display: 'flex',
        padding: '16px 16px 0 16px',
        gap: '10px'
      }}>
        <button 
          onClick={() => setActiveTab('tryon')}
          style={{
            flex: 1,
            padding: '14px',
            background: activeTab === 'tryon' ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)',
            backdropFilter: activeTab === 'tryon' ? 'blur(12px)' : 'blur(8px)',
            border: activeTab === 'tryon' ? '1px solid rgba(255,255,255,0.3)' : '1px solid rgba(255,255,255,0.1)',
            borderRadius: '16px 16px 0 0',
            color: '#fff',
            fontSize: '16px',
            fontWeight: activeTab === 'tryon' ? '600' : '400',
            cursor: 'pointer',
            transition: 'all 0.3s',
            boxShadow: activeTab === 'tryon' ? '0 4px 12px rgba(0,0,0,0.1)' : 'none'
          }}>
          Try-on
        </button>
        <button 
          onClick={() => setActiveTab('about')}
          style={{
            flex: 1,
            padding: '14px',
            background: activeTab === 'about' ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)',
            backdropFilter: activeTab === 'about' ? 'blur(12px)' : 'blur(8px)',
            border: activeTab === 'about' ? '1px solid rgba(255,255,255,0.3)' : '1px solid rgba(255,255,255,0.1)',
            borderRadius: '16px 16px 0 0',
            color: '#fff',
            fontSize: '16px',
            fontWeight: activeTab === 'about' ? '600' : '400',
            cursor: 'pointer',
            transition: 'all 0.3s',
            boxShadow: activeTab === 'about' ? '0 4px 12px rgba(0,0,0,0.1)' : 'none'
          }}>
          About
        </button>
      </div>

      {/* Content Area */}
      <div style={{
        flex: 1,
        background: 'rgba(255,255,255,0.2)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.2)',
        margin: '0 16px 16px 16px',
        borderRadius: '0 0 24px 24px',
        padding: '28px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
      }}>
        {activeTab === 'tryon' ? (
          <>
            {/* Avatar Image */}
            <div style={{
              width: '100%',
              maxWidth: '280px',
              aspectRatio: '3/4',
              background: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.25)',
              borderRadius: '20px',
              padding: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
            }}>
              <img 
                src={imageUrl} 
                alt="Try-on Avatar" 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '16px'
                }} 
              />
              {loading && (
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '16px',
                  background: 'rgba(0,0,0,0.4)',
                  backdropFilter: 'blur(4px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: '15px'
                }}>
                  Generating...
                </div>
              )}
            </div>

            {error && (
              <div style={{
                color: '#fff',
                background: 'rgba(255,100,100,0.25)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,150,150,0.3)',
                padding: '10px 14px',
                borderRadius: '12px',
                marginTop: '16px',
                width: '100%',
                fontSize: '13px',
                textAlign: 'center'
              }}>
                {error}
              </div>
            )}
          </>
        ) : (
          <div style={{
            width: '100%',
            color: '#fff',
            fontSize: '14px',
            lineHeight: '1.6'
          }}>
            <h3 style={{marginTop: 0, marginBottom: '16px', fontSize: '20px', fontWeight: '700', textAlign: 'center'}}>Product Details</h3>

            {metadata ? (
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '12px'
              }}>
                {Object.entries(metadata)
                  .filter(([key]) => !['url', 'image_url', 'page_url'].includes(key.toLowerCase()))
                  .map(([key, value]) => (
                    <div key={key} style={{
                      background: 'rgba(255,255,255,0.15)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      padding: '12px 14px',
                      borderRadius: '14px',
                      wordBreak: 'break-word'
                    }}>
                      <div style={{opacity: 0.85, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px'}}>
                        {key.replace(/_/g, ' ')}
                      </div>
                      <div style={{fontSize: '14px', fontWeight: '500'}}>
                        {Array.isArray(value) ? value.join(', ') : String(value)}
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div style={{
                textAlign: 'center',
                padding: '40px 20px',
                opacity: 0.7,
                fontSize: '14px'
              }}>
                {loading ? 'Loading product details...' : 'No product information available'}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
