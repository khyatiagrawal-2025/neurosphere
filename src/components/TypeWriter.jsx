import { useEffect, useState } from "react"

function TypeWriter({ text }) {

  const [displayedText, setDisplayedText] =
    useState("")

  useEffect(() => {

    setDisplayedText("")

    let currentIndex = 0

    const interval = setInterval(() => {

      setDisplayedText(
        text.slice(0, currentIndex + 1)
      )

      currentIndex++

      if (currentIndex >= text.length) {

        clearInterval(interval)

      }

    }, 20)

    return () =>
      clearInterval(interval)

  }, [text])

  return (

    <p className="leading-relaxed whitespace-pre-line">

      {displayedText}

    </p>

  )
}

export default TypeWriter