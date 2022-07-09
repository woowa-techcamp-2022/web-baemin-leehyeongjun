const NOT_VALID = "not-valid";
const HIDDEN = "hidden";
const ERROR = "error";

/**
 * @param {HTMLElement} el
 * @param {boolean} valid
 *
 * @return {void}
 */
function setElementValidation(el, valid) {
  if (valid) {
    el.classList.remove(NOT_VALID);
  } else {
    el.classList.add(NOT_VALID);
  }
}

/**
 * @param {HTMLElement} el
 * @param {boolean} hidden
 *
 * @return {void}
 */
function setElementHidden(el, hidden) {
  if (hidden) {
    el.classList.add(HIDDEN);
  } else {
    el.classList.remove(HIDDEN);
  }
}

/**
 * @param {HTMLElement} el
 * @param {boolean} error
 *
 * @return {void}
 */
function setElementError(el, error) {
  if (error) {
    el.classList.add(ERROR);
  } else {
    el.classList.remove(ERROR);
  }
}

/**
 * @param {string[]} selectors
 *
 * @return {HTMLElement[]}
 */
function select(selectors) {
  const elements = [];

  for (let i = 0; i < selectors.length; i++)
    elements.push(document.querySelector(selectors[i]));

  return elements;
}

export { setElementValidation, setElementHidden, setElementError, select };
