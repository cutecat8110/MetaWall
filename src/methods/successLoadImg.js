// eslint-disable-next-line import/prefer-default-export
export const successLoadImg = (event) => {
  if (event.target.complete === true) {
    event.target.classList.remove('hide')
  }
}

