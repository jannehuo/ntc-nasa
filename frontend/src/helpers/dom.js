/** Helper function for focusing on element. Used when there is
 *  an error in form to focus on given input with id to make screen reader
 *  functionality better
 */
export default function focusOnElement(el) {
  const elementToFocus = document.getElementById(el)
  if (elementToFocus) {
    elementToFocus.focus()
  }
}
