// 任意のテキストをクリップボードにコピー
export function copyText(text: string) {
  const textArea = document.createElement('textarea')
  textArea.value = text
  document.body.appendChild(textArea)
  textArea.select()
  document.execCommand('copy')
  if (textArea.parentElement) {
    textArea.parentElement.removeChild(textArea)
  }
}
