import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from "react";
import { adminAPI } from "../api/apiConfig";

// Types
export interface ReceptionistChatMessage {
  id: number;
  sender: "user" | "ai";
  message: string;
  timestamp: string;
}

interface ReceptionistChatState {
  messages: ReceptionistChatMessage[];
  isOpen: boolean;
  isLoading: boolean;
  error: string | null;
  isSending: boolean;
}

type ReceptionistChatAction =
  | { type: "TOGGLE_CHAT" }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_MESSAGES"; payload: ReceptionistChatMessage[] }
  | { type: "ADD_MESSAGE"; payload: ReceptionistChatMessage }
  | {
      type: "ADD_MESSAGES";
      payload: {
        userMessage: ReceptionistChatMessage;
        aiResponse: ReceptionistChatMessage;
      };
    }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_SENDING"; payload: boolean }
  | { type: "CLEAR_HISTORY" };

// Initial state
const initialState: ReceptionistChatState = {
  messages: [],
  isOpen: false,
  isLoading: false,
  error: null,
  isSending: false,
};

// Reducer
const receptionistChatReducer = (
  state: ReceptionistChatState,
  action: ReceptionistChatAction,
): ReceptionistChatState => {
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
interface ReceptionistChatContextType {
  state: ReceptionistChatState;
  toggleChat: () => void;
  sendMessage: (message: string) => Promise<void>;
  clearHistory: () => void;
}

const ReceptionistChatContext = createContext<
  ReceptionistChatContextType | undefined
>(undefined);

// Provider
interface ReceptionistChatProviderProps {
  children: ReactNode;
}

export const ReceptionistChatProvider: React.FC<
  ReceptionistChatProviderProps
> = ({ children }) => {
  const [state, dispatch] = useReducer(receptionistChatReducer, initialState);

  const toggleChat = () => {
    dispatch({ type: "TOGGLE_CHAT" });
  };

  const sendMessage = async (message: string) => {
    if (!message.trim() || state.isSending) return;

    try {
      dispatch({ type: "SET_SENDING", payload: true });
      dispatch({ type: "SET_ERROR", payload: null });

      const response = await adminAPI.sendReceptionistMessage({
        message: message.trim(),
        session_id: "landing_page", // Fixed session ID for landing page
      });

      dispatch({
        type: "ADD_MESSAGES",
        payload: {
          userMessage: response.data.user_message,
          aiResponse: response.data.ai_response,
        },
      });
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

  const clearHistory = () => {
    dispatch({ type: "CLEAR_HISTORY" });
  };

  const value: ReceptionistChatContextType = {
    state,
    toggleChat,
    sendMessage,
    clearHistory,
  };

  return (
    <ReceptionistChatContext.Provider value={value}>
      {children}
    </ReceptionistChatContext.Provider>
  );
};

// Hook
export const useReceptionistChat = () => {
  const context = useContext(ReceptionistChatContext);
  if (context === undefined) {
    throw new Error(
      "useReceptionistChat must be used within a ReceptionistChatProvider",
    );
  }
  return context;
};
