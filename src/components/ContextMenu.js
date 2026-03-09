'use client'

import { useEffect } from 'react'

export default function ContextMenu() {
    useEffect(() => {
        let selectedText = ''

        const handleContextMenu = (e) => {
            selectedText = window.getSelection().toString()

            if (selectedText.length > 0) {
                e.preventDefault()
                showCustomContextMenu(e)
            } else {
                e.preventDefault()
                return false
            }
        }

        const showCustomContextMenu = (e) => {
            const menu = document.getElementById('customContextMenu')
            menu.style.display = 'block'
            menu.style.left = e.pageX + 'px'
            menu.style.top = e.pageY + 'px'
        }

        const handleCopyClick = (e) => {
            e.preventDefault()

            if (navigator.clipboard && selectedText) {
                navigator.clipboard.writeText(selectedText).then(() => {
                    hideCustomContextMenu()
                })
            }
        }

        const handleClick = (e) => {
            if (!e.target.closest('#customContextMenu')) {
                hideCustomContextMenu()
            }
        }

        const hideCustomContextMenu = () => {
            document.getElementById('customContextMenu').style.display = 'none'
        }

        const handleKeyDown = (e) => {
            if (
                e.key === 'F12' ||
                (e.ctrlKey && e.shiftKey && e.key === 'I') ||
                (e.ctrlKey && e.shiftKey && e.key === 'J') ||
                (e.ctrlKey && e.key === 'u')
            ) {
                e.preventDefault()
                return false
            }
        }

        document.addEventListener('contextmenu', handleContextMenu)
        document.getElementById('copyOption')?.addEventListener('click', handleCopyClick)
        document.addEventListener('click', handleClick)
        document.addEventListener('keydown', handleKeyDown)
        document.addEventListener('dragstart', (e) => {
            e.preventDefault()
            return false
        })

        return () => {
            document.removeEventListener('contextmenu', handleContextMenu)
            document.getElementById('copyOption')?.removeEventListener('click', handleCopyClick)
            document.removeEventListener('click', handleClick)
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [])

    return (
        <>
            <style jsx>{`
        #customContextMenu {
          display: none;
          position: absolute;
          background-color: #2b2b2b;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
          z-index: 10000;
          padding: 4px 0;
          border-radius: 6px;
          min-width: 140px;
        }

        #customContextMenu div {
          padding: 8px 16px;
          cursor: pointer;
          font-size: 14px;
          color: #e0e0e0;
          transition: background-color 0.15s ease;
        }

        #customContextMenu div:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }
      `}</style>

            <div id="customContextMenu">
                <div id="copyOption">Copy</div>
            </div>
        </>
    )
}