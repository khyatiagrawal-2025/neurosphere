import {
  createContext,
  useContext,
  useState,
} from "react"

const MoodContext =
  createContext()

export function MoodProvider({
  children,
}) {

  const [selectedMood, setSelectedMood] =
    useState({
      emoji: "😊",
      label: "Happy",
      theme: {
        primary: "cyan",
        glow: "bg-cyan-400/20",
      },
    })

  return (

    <MoodContext.Provider
      value={{
        selectedMood,
        setSelectedMood,
      }}
    >

      {children}

    </MoodContext.Provider>
  )
}

export function useMood() {

  return useContext(MoodContext)

}