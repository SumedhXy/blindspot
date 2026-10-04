import { useState, type ReactNode, type FormEvent, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, AlertCircle } from "lucide-react";
import { Button } from "./Button";
import { Input } from "./Input";

export interface ChatMessage {
  id: string;
  sender: "user" | "assistant" | "system";
  content: string | ReactNode;
  timestamp?: string;
  status?: "sending" | "sent" | "error";
  sources?: string[];
}

export interface ChatPanelProps {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
  placeholder?: string;
  title?: string;
  subtitle?: string;
  className?: string;
  emptyState?: ReactNode;
}

export function ChatPanel({
  messages,
  onSendMessage,
  isLoading = false,
  placeholder = "Type your query or instruction...",
  title = "AI Assistant",
  subtitle = "Grounded conversation & execution",
  className = "",
  emptyState,
}: ChatPanelProps) {
  const [inputVal, setInputVal] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim() || isLoading) return;
    onSendMessage(inputVal.trim());
    setInputVal("");
  };

  return (
    <div className={`ui-chat-panel ${className}`.trim()} role="region" aria-label={title}>
      <header className="ui-chat-panel__header">
        <div className="ui-chat-panel__header-info">
          <div className="ui-chat-panel__avatar-ai">
            <Sparkles size={16} />
          </div>
          <div>
            <h3 className="ui-chat-panel__title">{title}</h3>
            {subtitle && <p className="ui-chat-panel__subtitle">{subtitle}</p>}
          </div>
        </div>
      </header>

      <div className="ui-chat-panel__body">
        {messages.length === 0 ? (
          emptyState || (
            <div className="ui-chat-panel__empty">
              <Bot size={36} className="ui-chat-panel__empty-icon" />
              <p>Ask a question, request an analysis, or start an AI workflow.</p>
            </div>
          )
        ) : (
          <div className="ui-chat-panel__messages" aria-live="polite">
            {messages.map((msg) => {
              const isUser = msg.sender === "user";
              const isSystem = msg.sender === "system";

              if (isSystem) {
                return (
                  <div key={msg.id} className="ui-chat-message ui-chat-message--system">
                    <span className="ui-chat-message__system-badge">System</span>
                    <div>{msg.content}</div>
                  </div>
                );
              }

              return (
                <div
                  key={msg.id}
                  className={`ui-chat-message ui-chat-message--${isUser ? "user" : "assistant"}`}
                >
                  <div className="ui-chat-message__avatar" aria-hidden="true">
                    {isUser ? <User size={14} /> : <Bot size={14} />}
                  </div>
                  <div className="ui-chat-message__bubble">
                    <div className="ui-chat-message__content">{msg.content}</div>
                    {msg.sources && msg.sources.length > 0 && (
                      <div className="ui-chat-message__sources">
                        <span className="ui-chat-message__sources-label">Sources:</span>
                        {msg.sources.map((s, idx) => (
                          <span key={idx} className="ui-chat-message__source-tag">
                            {s}
                          </span>
                        ))}
                      </div>
                    )}
                    {msg.status === "error" && (
                      <div className="ui-chat-message__error">
                        <AlertCircle size={12} /> Delivery failed
                      </div>
                    )}
                    {msg.timestamp && (
                      <time className="ui-chat-message__time">{msg.timestamp}</time>
                    )}
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div className="ui-chat-message ui-chat-message--assistant">
                <div className="ui-chat-message__avatar" aria-hidden="true">
                  <Bot size={14} />
                </div>
                <div className="ui-chat-message__bubble ui-chat-message__bubble--loading">
                  <div className="ui-typing-indicator" aria-label="AI is thinking">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <form className="ui-chat-panel__footer" onSubmit={handleSubmit}>
        <Input
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder={placeholder}
          disabled={isLoading}
          aria-label="Message input"
          className="ui-chat-panel__input"
        />
        <Button
          type="submit"
          variant="primary"
          disabled={!inputVal.trim() || isLoading}
          aria-label="Send message"
        >
          <Send size={16} />
        </Button>
      </form>
    </div>
  );
}

export default ChatPanel;
