import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const InputModeContext = createContext(null);

export function InputModeProvider({ children }) {
  const [inputMode, setInputMode] = useState(() => {
    return localStorage.getItem("portfolio-input-mode") || "mouse";
  });

  useEffect(() => {
    localStorage.setItem("portfolio-input-mode", inputMode);
  }, [inputMode]);

  const value = useMemo(
    () => ({
      inputMode,
      setInputMode,
      isMouseMode: inputMode === "mouse",
      isControllerMode: inputMode === "controller",
    }),
    [inputMode]
  );

  return (
    <InputModeContext.Provider value={value}>
      {children}
    </InputModeContext.Provider>
  );
}

export function useInputMode() {
  const context = useContext(InputModeContext);

  if (!context) {
    throw new Error(
      "useInputMode doit être utilisé dans un InputModeProvider"
    );
  }

  return context;
}