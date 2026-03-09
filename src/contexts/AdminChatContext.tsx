import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from "react";
import { adminAPI } from "../../src/api/apiConfig";

// Types
export interface AdminChatMessage {
  id: number;
  sender: "admin" | "ai";
  message: string;
  timestamp: string;
}

interface AdminChatState {
  messages: AdminChatMessage[];
  isOpen: boolean;
  isLoading: boolean;
  error: string | null;
  isSending: boolean;
}

type AdminChatAction =
  | { type: "TOGGLE_CHAT" }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_MESSAGES"; payload: AdminChatMessage[] }
  | { type: "ADD_MESSAGE"; payload: AdminChatMessage }
  | {
      type: "ADD_MESSAGES";
      payload: { userMessage: AdminChatMessage; aiResponse: AdminChatMessage };
    }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_SENDING"; payload: boolean }
  | { type: "CLEAR_HISTORY" };

// Initial state
const initialState: AdminChatState = {
  messages: [],
  isOpen: false,
  isLoading: false,
  error: null,
  isSending: false,
};

// Reducer
const adminChatReducer = (
  state: AdminChatState,
  action: AdminChatAction,
): AdminChatState => {
  switch (action.type) {
    case "TOGGLE_CHAT":
      return { ...state, isOpen: !state.isOpen };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_MESSAGES":
      return { ...state, messages: action.payload };
    case "ADD_MESSAGE":
      return { ...state, messages: [...state.messages, action.payload] };
    case "ADD_MESSAGES":
      return {
        ...state,
        messages: [
          ...state.messages,
          action.payload.userMessage,
          action.payload.aiResponse,
        ],
      };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_SENDING":
      return { ...state, isSending: action.payload };
    case "CLEAR_HISTORY":
      return { ...state, messages: [] };
    default:
      return state;
  }
};

// Context
interface AdminChatContextType {
  state: AdminChatState;
  toggleChat: () => void;
  sendMessage: (message: string) => Promise<void>;
  clearHistory: () => Promise<void>;
  loadMessages: () => Promise<void>;
}

const AdminChatContext = createContext<AdminChatContextType | undefined>(
  undefined,
);

// Provider
interface AdminChatProviderProps {
  children: ReactNode;
}

export const AdminChatProvider: React.FC<AdminChatProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(adminChatReducer, initialState);

  // Load messages when chat opens
  useEffect(() => {
    if (state.isOpen && state.messages.length === 0) {
      loadMessages();
    }
  }, [state.isOpen, state.messages.length]);

  const toggleChat = () => {
    dispatch({ type: "TOGGLE_CHAT" });
  };

  const loadMessages = async () => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      dispatch({ type: "SET_ERROR", payload: null });

      const response = await adminAPI.getAdminChatMessages();
      dispatch({ type: "SET_MESSAGES", payload: response.data.reverse() }); // Show oldest first
    } catch (error) {
      console.error("Failed to load admin chat messages:", error);
      dispatch({ type: "SET_ERROR", payload: "Failed to load messages" });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const sendMessage = async (message: string) => {
    if (!message.trim() || state.isSending) return;

    try {
      dispatch({ type: "SET_SENDING", payload: true });
      dispatch({ type: "SET_ERROR", payload: null });

      const response = await adminAPI.sendAdminChatMessage({
        message: message.trim(),
      });

      dispatch({
        type: "ADD_MESSAGES",
        payload: {
          userMessage: response.data.user_message,
          aiResponse: response.data.ai_response,
        },
      });
    } catch (error: unknown) {
      console.error("Failed to send admin chat message:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Failed to send message";
      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as {
          response?: { data?: { error?: string } };
        };
        const axiosErrorMessage = axiosError.response?.data?.error;
        if (axiosErrorMessage) {
          dispatch({ type: "SET_ERROR", payload: axiosErrorMessage });
        } else {
          dispatch({ type: "SET_ERROR", payload: errorMessage });
        }
      } else {
        dispatch({ type: "SET_ERROR", payload: errorMessage });
      }
    } finally {
      dispatch({ type: "SET_SENDING", payload: false });
    }
  };

  const clearHistory = async () => {
    try {
      await adminAPI.clearAdminChatHistory();
      dispatch({ type: "CLEAR_HISTORY" });
    } catch (error) {
      console.error("Failed to clear admin chat history:", error);
      dispatch({ type: "SET_ERROR", payload: "Failed to clear history" });
    }
  };

  const value: AdminChatContextType = {
    state,
    toggleChat,
    sendMessage,
    clearHistory,
    loadMessages,
  };

  return (
    <AdminChatContext.Provider value={value}>
      {children}
    </AdminChatContext.Provider>
  );
};

// Hook
export const useAdminChat = () => {
  const context = useContext(AdminChatContext);
  if (context === undefined) {
    throw new Error("useAdminChat must be used within an AdminChatProvider");
  }
  return context;
};
