import React, { useState, useRef, useEffect } from 'react';
import { Button, Card, InputGroup, Form, Spinner, Alert } from 'react-bootstrap';
import { Send, X, MessageSquare, Trash2, Bot } from 'lucide-react';
import { useAdminChat } from '../../../contexts/AdminChatContext';
import './AdminFloatingChat.css';

interface ChatMessage {
  id?: number | string;
  sender: 'admin' | 'ai';
  message: string;
  timestamp: string;
}

const AdminFloatingChat: React.FC = () => {
  const { state, toggleChat, sendMessage, clearHistory } = useAdminChat();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [state.messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (state.isOpen && !state.isLoading) {
      inputRef.current?.focus();
    }
  }, [state.isOpen, state.isLoading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || state.isSending) return;

    const messageToSend = input.trim();
    setInput('');

    await sendMessage(messageToSend);
  };

  const handleClearHistory = async () => {
    if (window.confirm('Are you sure you want to clear all chat history?')) {
      await clearHistory();
    }
  };

  const formatTimestamp = (timestamp: string) => {
    try {
      const date = new Date(timestamp);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return '';
    }
  };

  const renderMessage = (message: ChatMessage, index: number) => {
    const isUser = message.sender === 'admin';

    return (
      <div
        key={message.id || index}
        className={`admin-chat-message ${isUser ? 'admin-message' : 'ai-message'}`}
      >
        <div className="message-content">
          <div className="message-header">
            <span className="message-sender">
              {isUser ? <MessageSquare size={14} /> : <Bot size={14} />}
              {isUser ? 'You' : 'AI Assistant'}
            </span>
            <span className="message-time">
              {formatTimestamp(message.timestamp)}
            </span>
          </div>
          <div className="message-text">
            {message.message}
          </div>
        </div>
      </div>
    );
  };

  if (!state.isOpen) {
    return (
      <Button
        className="admin-chat-float-button"
        onClick={toggleChat}
        variant="success"
        size="lg"
        title="AI Assistant"
      >
        <MessageSquare size={24} />
        <span className="pulse-dot"></span>
      </Button>
    );
  }

  return (
    <Card className="admin-chat-container">
      <Card.Header className="admin-chat-header">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-2">
            <Bot className="text-primary" size={20} />
            <span className="fw-bold">AI Assistant</span>
            <small className="text-muted">Admin Insights</small>
          </div>
          <div className="d-flex gap-2">
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={handleClearHistory}
              title="Clear History"
              disabled={state.messages.length === 0}
            >
              <Trash2 size={16} />
            </Button>
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={toggleChat}
              title="Close"
            >
              <X size={16} />
            </Button>
          </div>
        </div>
      </Card.Header>

      <Card.Body className="admin-chat-body">
        {state.error && (
          <Alert variant="danger" className="mb-3" dismissible onClose={() => { }}>
            {state.error}
          </Alert>
        )}

        {state.isLoading ? (
          <div className="d-flex justify-content-center align-items-center h-100">
            <Spinner animation="border" variant="primary" />
            <span className="ms-2">Loading messages...</span>
          </div>
        ) : (
          <div className="admin-chat-messages">
            {state.messages.length === 0 ? (
              <div className="empty-state text-center text-muted">
                <Bot size={48} className="mb-3" />
                <p className="mb-2">Hello! I'm your AI assistant.</p>
                <p className="small">Ask me about platform insights, resource consumption, or growth strategies.</p>
              </div>
            ) : (
              <>
                {state.messages.map(renderMessage)}
                {state.isSending && (
                  <div className="admin-chat-message ai-message">
                    <div className="message-content">
                      <div className="message-header">
                        <span className="message-sender">
                          <Bot size={14} />
                          AI Assistant
                        </span>
                      </div>
                      <div className="message-text typing-indicator">
                        <Spinner size="sm" animation="border" />
                        <span className="ms-2">Thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </Card.Body>

      <Card.Footer className="admin-chat-footer">
        <Form onSubmit={handleSend}>
          <InputGroup>
            <Form.Control
              ref={inputRef}
              type="text"
              placeholder="Ask about platform insights..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={state.isSending}
              maxLength={500}
            />
            <Button
              type="submit"
              variant="primary"
              disabled={!input.trim() || state.isSending}
            >
              {state.isSending ? (
                <Spinner size="sm" animation="border" />
              ) : (
                <Send size={16} />
              )}
            </Button>
          </InputGroup>
        </Form>
        <small className="text-muted mt-2 d-block">
          Get insights on resource consumption, platform growth, and system optimization
        </small>
      </Card.Footer>
    </Card>
  );
};

export default AdminFloatingChat;
