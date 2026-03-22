import React, { useState, useRef, useEffect } from "react";
import {
  Button,
  Card,
  InputGroup,
  Form,
  Spinner,
  Alert,
} from "react-bootstrap";
// use a circle message bubble for a cleaner look; you can swap for any lucide icon you prefer
import { Send, X, MessageCircle as ChatIcon, Bot } from "lucide-react";
import { adminAPI } from "../../../api/apiConfig";
import "./ReceptionistFloatingChat.css";

interface ChatMessage {
  id?: number | string;
  sender: "user" | "ai";
  message: string;
  timestamp: string;
}

const ReceptionistFloatingChat: React.FC<{ isEnabled?: boolean }> = ({
  isEnabled = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load messages when chat opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // For receptionist, we start fresh without loading history
      setMessages([
        {
          id: "welcome",
          sender: "ai",
          message:
            "Welcome to Obeeoma! 👋\n\nI'm Sana, your AI receptionist. I can tell you about our mental health platform, explain our services, and guide you on how we're empowering Africa's workforce.\n\nAsk me anything about Obeeoma!",
          timestamp: new Date().toISOString(),
        },
      ]);
    }
  }, [isOpen, messages.length]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isLoading) {
      inputRef.current?.focus();
    }
  }, [isOpen, isLoading]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading || !isEnabled) return;

    const userMessage = inputMessage.trim();
    setInputMessage("");
    setIsLoading(true);
    setError(null);

    try {
      const response = await adminAPI.sendReceptionistMessage({
        message: userMessage,
        session_id: "landing_page",
      });

      // Add both user message and AI response
      setMessages((prev) => [
        ...prev,
        response.data.user_message,
        response.data.ai_response,
      ]);
    } catch (error: unknown) {
      console.error("Failed to send receptionist chat message:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Failed to send message";
      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as {
          response?: { data?: { error?: string } };
        };
        const axiosErrorMessage = axiosError.response?.data?.error;
        if (axiosErrorMessage) {
          setError(axiosErrorMessage);
        } else {
          setError(errorMessage);
        }
      } else {
        setError(errorMessage);
      }

      // Add error message as AI response
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: "ai",
          message: errorMessage,
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTimestamp = (timestamp: string) => {
    try {
      const date = new Date(timestamp);
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "";
    }
  };

  const renderMessage = (message: ChatMessage, index: number) => {
    const isUser = message.sender === "user";

    return (
      <div
        key={message.id || index}
        className={`receptionist-chat-message ${isUser ? "user-message" : "ai-message"}`}
      >
        <div className="receptionist-message-content">
          <div className="receptionist-message-header">
            <span className="receptionist-message-sender">
              {isUser ? <ChatIcon size={12} /> : <Bot size={12} />}
              {isUser ? "You" : "Sana (AI Receptionist)"}
            </span>
            <span className="receptionist-message-time">
              {formatTimestamp(message.timestamp)}
            </span>
          </div>
          <div className="receptionist-message-text">{message.message}</div>
        </div>
      </div>
    );
  };

  if (!isOpen) {
    return (
      <div className="receptionist-chat-float-button">
        <button
          onClick={() => isEnabled && setIsOpen(true)}
          title={
            isEnabled
              ? "AI Receptionist - Ask about Obeeoma"
              : "AI Receptionist is disabled"
          }
          aria-label="Open AI receptionist chat"
          disabled={!isEnabled}
          className={!isEnabled ? "receptionist-disabled" : ""}
        >
          {/* use upgraded chat icon */}
          <ChatIcon size={24} />
          <span className="receptionist-pulse-dot"></span>
        </button>
      </div>
    );
  }

  return (
    <div className={`receptionist-chat-container${isOpen ? " open" : ""}`}>
      <Card.Header className="receptionist-chat-header">
        <div className="d-flex align-items-center gap-2">
          <Bot className="text-white" size={20} />
          <div>
            <h5 className="mb-0">Sana</h5>
            <small>AI Receptionist</small>
          </div>
        </div>
        {/* custom close button positioned absolutely via CSS */}
        <button
          className="receptionist-close-btn"
          onClick={() => setIsOpen(false)}
          title="Close chat"
          aria-label="Close chat"
        >
          <X size={16} />
        </button>
      </Card.Header>

      <Card.Body className="receptionist-chat-body ml-2">
        {error && (
          <Alert
            variant="danger"
            className="mb-3"
            dismissible
            onClose={() => setError(null)}
          >
            {error}
          </Alert>
        )}

        <div className="receptionist-chat-messages">
          {messages.map(renderMessage)}
          {isLoading && (
            <div className="receptionist-chat-message ai-message">
              <div className="receptionist-message-content">
                <div className="receptionist-message-header">
                  <span className="receptionist-message-sender">
                    <Bot size={12} />
                    Sana (AI Receptionist)
                  </span>
                </div>
                <div className="receptionist-typing-indicator">
                  <Spinner size="sm" animation="border" variant="success" />
                  <span>Thinking...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </Card.Body>

      <Card.Footer className="receptionist-chat-footer ml-2">
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
        >
          <InputGroup>
            <Form.Control
              ref={inputRef}
              type="text"
              placeholder={
                isEnabled
                  ? "Ask about Obeeoma's services..."
                  : "AI Receptionist is disabled"
              }
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              disabled={isLoading || !isEnabled}
              maxLength={500}
              onKeyPress={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
            />
            <Button
              type="submit"
              variant="success"
              disabled={!inputMessage.trim() || isLoading || !isEnabled}
            >
              {isLoading ? (
                <Spinner size="sm" animation="border" />
              ) : (
                <Send size={16} />
              )}
            </Button>
          </InputGroup>
        </Form>
        <small>
          Learn about our AI-powered mental health platform for Africa's
          workforce
        </small>
      </Card.Footer>
    </div>
  );
};

export default ReceptionistFloatingChat;
