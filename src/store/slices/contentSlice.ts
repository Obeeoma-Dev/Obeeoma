import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { contentMediaAPI, ContentItem } from "../../services/contentService";

// Define the state interface
interface ContentState {
  items: ContentItem[];
  selectedContent: ContentItem | null; // Cache for selected content item
  loading: boolean;
  error: string | null;
  lastFetched: number | null; // Timestamp to track when data was last fetched
}

// Initial state
const initialState: ContentState = {
  items: [],
  selectedContent: null,
  loading: false,
  error: null,
  lastFetched: null,
};

// Async thunk to fetch all content
export const fetchAllContent = createAsyncThunk<
  ContentItem[],
  void,
  { rejectValue: string }
>("content/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const data = await contentMediaAPI.getAllContent();
    return data;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Failed to fetch content";
    return rejectWithValue(errorMessage);
  }
});

// Async thunk to fetch a single content item by ID
export const fetchContentById = createAsyncThunk<
  ContentItem,
  string,
  { rejectValue: string }
>("content/fetchById", async (id, { rejectWithValue }) => {
  try {
    const allContent = await contentMediaAPI.getAllContent();
    const item = allContent.find(item => item.id === parseInt(id));
    if (!item) {
      return rejectWithValue("Content not found");
    }
    return item;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Failed to fetch content";
    return rejectWithValue(errorMessage);
  }
});

// Content slice
const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    clearContentState: (state) => {
      state.items = [];
      state.selectedContent = null;
      state.loading = false;
      state.error = null;
      state.lastFetched = null;
    },
    setSelectedContent: (state, action) => {
      state.selectedContent = action.payload;
    },
    clearSelectedContent: (state) => {
      state.selectedContent = null;
    },
    addContentItem: (state, action) => {
      state.items.unshift(action.payload);
    },
    updateContentItem: (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
      // Also update selectedContent if it's the same item
      if (state.selectedContent && state.selectedContent.id === action.payload.id) {
        state.selectedContent = action.payload;
      }
    },
    removeContentItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      // Clear selectedContent if it was the deleted item
      if (state.selectedContent && state.selectedContent.id === action.payload) {
        state.selectedContent = null;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllContent.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.error = null;
        state.lastFetched = Date.now();
      })
      .addCase(fetchAllContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchContentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContentById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedContent = action.payload;
        state.error = null;
      })
      .addCase(fetchContentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.selectedContent = null;
      });
  },
});

export const { clearContentState, addContentItem, updateContentItem, removeContentItem, setSelectedContent, clearSelectedContent } = contentSlice.actions;

// Selectors
export const selectContentItems = (state: { content: ContentState }) => state.content.items;
export const selectSelectedContent = (state: { content: ContentState }) => state.content.selectedContent;
export const selectContentLoading = (state: { content: ContentState }) => state.content.loading;
export const selectContentError = (state: { content: ContentState }) => state.content.error;
export const selectContentLastFetched = (state: { content: ContentState }) => state.content.lastFetched;

export default contentSlice.reducer;
