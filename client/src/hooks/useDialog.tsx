import { AppContext } from "@/context/appContext";
import DialogContextType from "@/interfaces/dialogContext";
import { useContext } from "react";

export function useDialog() {
  const { showDialog, isDialogOpen } = useContext<{showDialog: (dialog: DialogContextType | null)=>void, isDialogOpen: DialogContextType | null }>(AppContext);
  return { showDialog , isDialogOpen };
}