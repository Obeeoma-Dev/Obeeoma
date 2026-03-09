import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button, Card, Form } from 'react-bootstrap'
import { Sparkles, X, Send, Bot } from 'lucide-react'
import { adminAPI } from '../../api/apiConfig'

import {
    FileJson,
    Atom,
    Smartphone,
    Server,
    FileType,
    Database,
    Cloud,
    Github,
    Figma,
    Cpu,
    Globe,
    Code2,
    Terminal,
} from 'lucide-react'

import './Ai.css'

/* -------------------- Tech Icons -------------------- */

const techIcons = [
    { icon: FileJson, color: '#C7AE00' },
    { icon: Atom, color: '#0E7490' },
    { icon: Smartphone, color: '#16A34A' },
    { icon: Server, color: '#15803D' },
    { icon: FileType, color: '#1E40AF' },
    { icon: Database, color: '#166534' },
    { icon: Cloud, color: '#D97706' },
    { icon: Github, color: '#000000' },
    { icon: Figma, color: '#DC2626' },
    { icon: Cpu, color: '#EA580C' },
    { icon: Globe, color: '#B91C1C' },
    { icon: Code2, color: '#0D4F8C' },
    { icon: Terminal, color: '#15803D' },
]

/* -------------------- Types -------------------- */

interface SmokeParticle {
    id: number
    iconIndex: number
    startX: number
    delay: number
    duration: number
    swayAmount: number
    scale: number
    rotation: number
}

interface AdminChatMessage {
    id: number;
    sender: 'admin' | 'ai';
    message: string;
    timestamp: string;
}

/* -------------------- Smoke Icons -------------------- */

function SmokeIcon({ particle }: { particle: SmokeParticle }) {
    const Icon = techIcons[particle.iconIndex].icon
    const color = techIcons[particle.iconIndex].color

    return (
        <motion.div
            className="ai-smoke-particle"
            initial={{
                x: particle.startX,
                y: 0,
                opacity: 0,
                scale: 0.3,
            }}
            animate={{
                x: [
                    particle.startX,
                    particle.startX + particle.swayAmount,
                    particle.startX - particle.swayAmount * 0.7,
                ],
                y: [0, -40, -80, -140],
                opacity: [0, 0.6, 0.3, 0],
                scale: [0.3, particle.scale, 0.2],
                rotate: particle.rotation,
            }}
            transition={{
                duration: particle.duration,
                delay: particle.delay,
                ease: 'easeOut',
                repeat: Infinity,
            }}
        >
            <Icon size={25} color={color} />
        </motion.div>
    )
}

/* -------------------- Main Component -------------------- */

export function AIAssistant({ isEnabled = true }: { isEnabled?: boolean }) {
    const [isOpen, setIsOpen] = useState(false)
    const [particles, setParticles] = useState<SmokeParticle[]>([])
    const [messages, setMessages] = useState<AdminChatMessage[]>([])
    const [inputMessage, setInputMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const loadMessages = useCallback(async () => {
        if (!isEnabled) return;

        try {
            setIsLoading(true)
            setError(null)
            const response = await adminAPI.getAdminChatMessages()
            setMessages(response.data.reverse()) // Show oldest first
        } catch (error) {
            console.error('Failed to load admin chat messages:', error)
            setError('Failed to load messages')
        } finally {
            setIsLoading(false)
        }
    }, [isEnabled])

    // Load messages when chat opens
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            loadMessages()
        }
    }, [isOpen, messages.length, loadMessages])

    const sendMessage = async () => {
        if (!inputMessage.trim() || isLoading || !isEnabled) return

        const userMessage = inputMessage.trim()
        setInputMessage('')
        setIsLoading(true)
        setError(null)

        try {
            const response = await adminAPI.sendAdminChatMessage({ message: userMessage })

            // Add both user message and AI response
            setMessages(prev => [...prev, response.data.user_message, response.data.ai_response])
        } catch (error: unknown) {
            console.error('Error sending admin chat message:', error)
            const errorMessage = error instanceof Error ? error.message : 'Failed to send message';
            if (error && typeof error === 'object' && 'response' in error) {
                const axiosError = error as { response?: { data?: { error?: string } } };
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
            setMessages(prev => [...prev, {
                id: Date.now(),
                sender: 'ai',
                message: errorMessage,
                timestamp: new Date().toISOString()
            }])
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        const generateParticles = () => {
            const list: SmokeParticle[] = []

            for (let i = 0; i < 12; i++) {
                list.push({
                    id: i,
                    iconIndex: Math.floor(Math.random() * techIcons.length),
                    startX: (Math.random() - 0.5) * 30,
                    delay: i * 0.4,
                    duration: 4 + Math.random() * 2,
                    swayAmount: 15 + Math.random() * 20,
                    scale: 0.6 + Math.random() * 0.4,
                    rotation: (Math.random() - 0.5) * 60,
                })
            }

            setParticles(list)
        }

        generateParticles()
        const interval = setInterval(generateParticles, 8000)
        return () => clearInterval(interval)
    }, [])

    const formatTimestamp = (timestamp: string) => {
        try {
            const date = new Date(timestamp)
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        } catch {
            return ''
        }
    }

    return (
        <>
            {/* Floating Button */}
            <div className="ai-fab-container">
                <motion.div
                    whileHover={isEnabled ? { scale: 1.1 } : {}}
                    whileTap={isEnabled ? { scale: 0.9 } : {}}
                    animate={!isOpen && isEnabled ? {
                        y: [0, -3, 0],
                        scale: [1, 1.05, 1],
                    } : {}}
                    transition={!isOpen && isEnabled ? {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        repeatDelay: 0.5,
                    } : {}}
                >
                    <button
                        className={`ai-fab ${!isEnabled ? 'ai-fab-disabled' : ''}`}
                        onClick={() => isEnabled && setIsOpen(prev => !prev)}
                        disabled={!isEnabled}
                        title={isEnabled ? "AI Assistant" : "AI Assistant is disabled"}
                    >
                        {isOpen ? <X size={22} /> : <Sparkles size={22} />}
                    </button>
                </motion.div>
            </div>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="ai-chat-wrapper"
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    >
                        <Card className="ai-chat-card">
                            {/* Header */}
                            <Card.Header className="ai-chat-header">
                                <div className="ai-avatar">
                                    <div className="ai-logo">OA</div>
                                </div>
                                <div>
                                    <div className="ai-title">Obeeoma AI Assistant</div>
                                    <div className="ai-subtitle">
                                        Ask me about platform insights
                                    </div>
                                </div>
                            </Card.Header>

                            {/* Messages */}
                            <Card.Body className="ai-chat-body">
                                {!isEnabled ? (
                                    <div className="ai-message assistant-message" style={{ textAlign: 'center', fontStyle: 'italic', backgroundColor: '#f8d7da', color: '#721c24' }}>
                                        AI Assistant is currently disabled. Please enable it from the AI Management dashboard to use this feature.
                                    </div>
                                ) : (
                                    <>
                                        {error && (
                                            <div className="ai-message assistant-message" style={{ backgroundColor: '#f8d7da', color: '#721c24' }}>
                                                {error}
                                            </div>
                                        )}

                                        {messages.length === 0 && !isLoading ? (
                                            <div className="ai-message assistant-message" style={{ textAlign: 'center', fontStyle: 'italic' }}>
                                                Hello! I'm your AI assistant for platform insights. Ask me about resource consumption, platform growth, or system optimization.
                                            </div>
                                        ) : (
                                            messages.map((message, index) => (
                                                <div key={message.id || index} className={`ai-message ${message.sender === 'admin' ? 'user-message' : 'assistant-message'}`}>
                                                    <div className="message-content">
                                                        <div className="message-sender">
                                                            {message.sender === 'admin' ? 'You' : <><Bot size={12} /> AI Assistant</>}
                                                        </div>
                                                        <div className="message-text">{message.message}</div>
                                                        <div className="message-time">{formatTimestamp(message.timestamp)}</div>
                                                    </div>
                                                </div>
                                            ))
                                        )}

                                        {isLoading && (
                                            <div className="ai-message assistant-message">
                                                <em>Thinking...</em>
                                            </div>
                                        )}
                                    </>
                                )}
                            </Card.Body>

                            {/* Input */}
                            <Card.Footer className="ai-chat-footer">
                                <Form.Control
                                    placeholder={isEnabled ? "Ask about platform insights..." : "AI Assistant is disabled"}
                                    className="ai-input"
                                    value={inputMessage}
                                    onChange={(e) => setInputMessage(e.target.value)}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault()
                                            sendMessage()
                                        }
                                    }}
                                    disabled={isLoading || !isEnabled}
                                />
                                <Button
                                    className="ai-send-btn"
                                    onClick={sendMessage}
                                    disabled={isLoading || !inputMessage.trim() || !isEnabled}
                                >
                                    {isLoading ? <div className="spinner-border spinner-border-sm" /> : <Send size={16} />}
                                </Button>
                            </Card.Footer>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
