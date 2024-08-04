import { useEffect, useState } from "react";

export const useCodeCopy = () => {
  const [ copied, setCopied ] = useState<{[key: string]: boolean}>({});

  useEffect(() => {
    const elements = Array.from(document.getElementsByClassName('clipboard'))
    elements.forEach((element, index) => {
      (element as HTMLElement).style.display = 'flex'
      element.addEventListener('click', async () => {
        await navigator.clipboard.writeText(String(element.nextElementSibling?.textContent))
        setCopied((prev) => ({...prev, [index]: true}))
        await new Promise(resolve => setTimeout(resolve, 2000))
        setCopied((prev) => ({...prev, [index]: false}))
      })
    })
  }, [])
  useEffect(() => {
    document.querySelectorAll('.copied').forEach((element, index) => {
      if (copied[index]) {
        (element as HTMLElement).style.display = ''
      } else {
        (element as HTMLElement).style.display = 'none'
      }
    })
  }, [copied])
}
