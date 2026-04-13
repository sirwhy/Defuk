'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function NFTAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: '🦞 Hi! I\'m your DEFUK NFT Assistant. Ask me anything about NFTs, pricing, or the marketplace!',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/langchain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: messages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          action: 'chat',
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: data.response },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: 'Sorry, I encountered an error. Please try again.',
          },
        ]);
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, I\'m having trouble connecting. Please try again.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickQuestions = [
    'What is the floor price?',
    'How do I mint an NFT?',
    'What are the rarest NFTs?',
    'Tell me about DEFUK',
  ];

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'var(--gold)',
          border: 'none',
          boxShadow: '0 4px 12px rgba(255, 190, 14, 0.4)',
          cursor: 'pointer',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '28px',
          transition: 'all 0.2s',
        }}
        onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
        onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        🦞
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '100px',
            right: '24px',
            width: '380px',
            height: '550px',
            maxHeight: 'calc(100vh - 140px)',
            background: 'var(--bg1)',
            border: '1px solid var(--line)',
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
            zIndex: 100,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '16px 20px',
              background: 'linear-gradient(135deg, var(--gold) 0%, var(--cream) 100%)',
              borderBottom: '1px solid var(--line)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '24px' }}>🦞</span>
              <div>
                <div
                  style={{
                    fontFamily: '"Inter", sans-serif',
                    fontWeight: '600',
                    fontSize: '16px',
                    color: '#0a0a09',
                  }}
                >
                  DEFUK Assistant
                </div>
                <div
                  style={{
                    fontFamily: '"Inter", sans-serif',
                    fontSize: '11px',
                    color: '#0a0a09',
                    opacity: 0.8,
                  }}
                >
                  AI-powered NFT help
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'transparent',
                border: 'none',
                fontSize: '20px',
                cursor: 'pointer',
                color: '#0a0a09',
              }}
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            {messages.map((message, index) => (
              <div
                key={index}
                style={{
                  alignSelf: message.role === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  fontFamily: '"Inter", sans-serif',
                  fontSize: '14px',
                  lineHeight: 1.5,
                  background:
                    message.role === 'user'
                      ? 'linear-gradient(135deg, var(--gold) 0%, var(--cream) 100%)'
                      : 'var(--bg2)',
                  color: message.role === 'user' ? '#0a0a09' : 'var(--txt)',
                  boxShadow: message.role === 'user' ? '0 2px 8px rgba(255, 190, 14, 0.2)' : 'none',
                }}
              >
                {message.content}
              </div>
            ))}

            {isLoading && (
              <div
                style={{
                  alignSelf: 'flex-start',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  background: 'var(--bg2)',
                  color: 'var(--txt)',
                  fontFamily: '"Inter", sans-serif',
                  fontSize: '14px',
                }}
              >
                🦞 Thinking...
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {messages.length <= 2 && (
            <div
              style={{
                padding: '12px 16px',
                borderTop: '1px solid var(--line)',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
              }}
            >
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => setInput(question)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '6px',
                    background: 'var(--bg2)',
                    border: '1px solid var(--line)',
                    color: 'var(--txt2)',
                    fontFamily: '"Inter", sans-serif',
                    fontSize: '11px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = 'var(--bg3)';
                    e.currentTarget.style.borderColor = 'var(--txt2)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'var(--bg2)';
                    e.currentTarget.style.borderColor = 'var(--line)';
                  }}
                >
                  {question}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            style={{
              padding: '16px',
              borderTop: '1px solid var(--line)',
              display: 'flex',
              gap: '8px',
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about NFTs..."
              style={{
                flex: 1,
                padding: '12px 16px',
                borderRadius: '8px',
                background: 'var(--bg2)',
                border: '1px solid var(--line)',
                color: 'var(--txt)',
                fontFamily: '"Inter", sans-serif',
                fontSize: '14px',
                outline: 'none',
              }}
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              style={{
                padding: '12px 20px',
                borderRadius: '8px',
                background: input.trim() && !isLoading ? 'var(--gold)' : 'var(--bg2)',
                border: 'none',
                color: input.trim() && !isLoading ? '#0a0a09' : 'var(--txt3)',
                fontFamily: '"Inter", sans-serif',
                fontSize: '14px',
                fontWeight: '600',
                cursor: input.trim() && !isLoading ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s',
              }}
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
}
