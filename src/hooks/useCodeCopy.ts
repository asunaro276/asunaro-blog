import { useMediaQuery } from "@reactuses/core";
import { useEffect, useState } from "react";
import tailwindConfig from "tailwind.config";

export const useCodeCopy = () => {
  const [ copied, setCopied ] = useState(false);
  const matches = useMediaQuery(`(min-width: ${tailwindConfig.theme.screens.sm})`, true)

  useEffect(() => {
    const elements = Array.from(document.getElementsByClassName('clipboard'))
    elements.forEach((element) => {
      element.addEventListener('click', async () => {
        await navigator.clipboard.writeText(String(element.nextElementSibling?.textContent))
        setCopied(true)
        await new Promise(resolve => setTimeout(resolve, 2000))
        setCopied(false)
      })
      if (matches) {
        element.parentElement?.addEventListener('mouseover', () => {
          (element as HTMLElement).style.display = 'flex'
        })
        element.parentElement?.addEventListener('mouseout', () => {
          (element as HTMLElement).style.display = 'none'
        })
      } else {
        (element as HTMLElement).style.display = 'flex'
      }
    })
  }, [])
  useEffect(() => {
    if (copied) {
      document.querySelectorAll('.copied').forEach((element) => {
        (element as HTMLElement).style.display = ''
      })
    } else {
      document.querySelectorAll('.copied').forEach((element) => {
        (element as HTMLElement).style.display = 'none'
      })
    }
  }, [copied])
}
