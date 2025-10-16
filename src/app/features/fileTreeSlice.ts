import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IFile } from "../../interfaces";
interface IClickedFile {
  filename: string;
  fileContent: string | undefined;
  activeTabId: string | null;
}
interface IInitialState {
  openedFiles: IFile[];
  clickedFiles: IClickedFile;
  tabIdToRemove: string | null;
}
const initialState: IInitialState = {
  openedFiles: [],
  clickedFiles: {
    filename: "",
    fileContent: "",
    activeTabId: null,
  },
  tabIdToRemove: null,
};
const fileTreeSlice = createSlice({
  name: "fileTree",
  initialState,
  reducers: {
    setOpenedFiles: (state, action: PayloadAction<IFile[]>) => {
      state.openedFiles = action.payload;
    },
    setClickedFile: (state, action: PayloadAction<IClickedFile>) => {
      state.clickedFiles = action.payload;
    },
    setTabIdToRemove: (state, action: PayloadAction<string | null>) => {
      state.tabIdToRemove = action.payload;
    },
  },
});
export const { setOpenedFiles, setClickedFile, setTabIdToRemove } =
  fileTreeSlice.actions;
export default fileTreeSlice.reducer;
