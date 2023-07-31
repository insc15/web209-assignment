import ModalDialog from '@/components/modalDialog';
import DialogContextType from '@/interfaces/dialogContext';
import { createContext, useState } from 'react';

export const AppContext = createContext<{ showDialog: (dialog : DialogContextType | null)=>void, isDialogOpen: DialogContextType | null }>({
    showDialog: () => {return;},
    isDialogOpen: null,
  });

export function AppContextProvider({ children }: { children: React.ReactNode}) {
  const [isDialogOpen, setDialogOpen] = useState<DialogContextType | null>(null);

  const showDialog = (dialog : DialogContextType | null) => {
    setDialogOpen(dialog);
  };

  return (
    <AppContext.Provider value={{ isDialogOpen, showDialog }}>
        {children}
        <ModalDialog isOpen={Boolean(isDialogOpen)} setIsOpen={setDialogOpen} title={(isDialogOpen as DialogContextType)?.title}>
            {
                (isDialogOpen as DialogContextType)?.content
            }
        </ModalDialog>
    </AppContext.Provider>
  );
}
