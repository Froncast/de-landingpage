import testWebP from './webp'
import FormHandler from './formHandler'
import "whatwg-fetch"

testWebP(function (support) {

	if (support == true) {
		document.querySelector('body').classList.add('webp')
	} else {
		document.querySelector('body').classList.add('no-webp')
	}
})

const btnOpenForm = document.querySelector('.open-form')
const popup = document.querySelector('.popup')
const form = document.querySelector('.form')
const popupClose = document.querySelector('.popup__close')
const popupMessage = document.querySelector('.popup-message-wrap')
const popupMessageText = document.querySelector('.popup-message__text')
const errorMessage = 'Something went wrong...'
const successMessage = 'Thanks! Your application is accepted'
const loadMessage = 'Loading...'

const togglePopup = () => {
	popup.classList.toggle('popup--openly')
}

btnOpenForm.addEventListener('click', () => {
	togglePopup()
	form.style.display = `block`
})
popup.addEventListener('click', e => {
	const { target } = e
	if (target.matches('.popup-overlay') || target.matches('.popup__close')) togglePopup();
})
form.addEventListener('submit', (e) => {
	const { target } = e
	const formHandler = new FormHandler(target)
	if (formHandler.submitForm()) {
		target.style.display = `none`
		popupMessage.style.display = `flex`
		popupMessageText.textContent = loadMessage
		formHandler.sendForm()
			.then(response => {
				if (response.status !== 200) throw new Error('status network not 200')
				target.reset()
				popupMessageText.textContent = successMessage
			})
			.catch(err => console.log(err))
			.finally(() => {
				const hidePopup = setTimeout(() => {
					togglePopup()
					popupMessage.style.display = `none`
					clearTimeout(hidePopup)
				}, 3000)
			})
	}
})