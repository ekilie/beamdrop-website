import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface SettingsContextType {
  showHiddenFiles: boolean;
  setShowHiddenFiles: (show: boolean) => void;
}

interface SettingsProviderProps {
  children: ReactNode;
}

export const SettingContext = createContext<SettingsContextType | undefined>(
  undefined
);

export const useSettings = () => {
  const context = useContext(SettingContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};

export const SettingsProvider = ({ children }: SettingsProviderProps) => {
  const [showHiddenFiles, setShowHiddenFilesState] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("show-hidden-files") === "true";
    }
    return false;
  });
  // Persist showHiddenFiles to localStorage when it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("show-hidden-files", showHiddenFiles.toString());
    }
  }, [showHiddenFiles]);

  const setShowHiddenFiles = (show: boolean) => {
    setShowHiddenFilesState(show);
  };

  return (
    <SettingContext.Provider
      value={{
        showHiddenFiles,
        setShowHiddenFiles,
      }}
    >
      {children}
    </SettingContext.Provider>
  );
};
