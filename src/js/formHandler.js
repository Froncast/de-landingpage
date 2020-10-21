class FormHander {
	constructor(form) {
		this.form = form
		this.formControls = this.form.querySelectorAll('.form-control')
		this.action = this.form.getAttribute('action')
		this.formData = new FormData(this.form)
		this.dataObj = {}
	}
	validation() {
		const invalidFields = []
		const rules = {
			fullname: {
				pattern: new RegExp('(^[а-яё -]{3,50})', 'ig'),
				errorMessage: 'error fullname'
			},
			email: {
				pattern: new RegExp('[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}', 'ig'),
				errorMessage: 'error email'
			},
			message: {
				pattern: new RegExp('(^[а-яё]{3,500})', 'igm'),
				errorMessage: 'error message'
			}
		}

		this.formData.forEach((val, key) => {
			if (!val.match(rules[key].pattern)) {
				const errorMessage = rules[key].errorMessage
				invalidFields.push({ key, errorMessage });
			}
		})

		if (invalidFields.length !== 0) {
			this.setNotValidStyle(invalidFields)
			return false
		} else {
			this.getDataObj()
			return true
		}
	}
	getDataObj() {
		new FormData(this.form).forEach((val, key) => {
			this.dataObj[key] = val
		})
	}
	sendForm() {
		return fetch(this.action, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(this.dataObj)
		})
	}
	removeNotValidStyle() {
		this.formControls.forEach(elem => { elem.classList.remove('form-control--not-valid') })
	}
	setNotValidStyle(invalidFields) {
		invalidFields.forEach(elem => {
			this.form.querySelector(`input[name="${elem.key}"], textarea[name="${elem.key}"]`)
				.classList.add('form-control--not-valid');
		})
	}
	submitForm() {
		event.preventDefault()
		this.removeNotValidStyle()
		return this.validation()
	}
}
export default FormHander