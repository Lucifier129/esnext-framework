import * as helper from './helper'
import jqueryHelper from './jquery.helper'
import * as method from './method'
import component from './component'
import directives from './directive'
import Model from './model'

const ENTER_KEY = 13
const ESCAPE_KEY = 27

class App {
	constructor() {
		this.model = new Model('todo-jquery-esnext')
		this.listen()
	}
	render() {
		let activeFilter = '/' + location.hash.replace('#/', '')
		let data = this.model.getData(activeFilter)
		let { directive } = jqueryHelper
		'#todoapp'::directive(data, directives)
	}
	listen() {
		let { pipe } = helper
		let { on }  = jqueryHelper
		let render = ::this.render
		let onAction = [::this.model.onAction, render]::pipe()
		let { onAdd, onEdited, onEditing, onToggle, onRemove } = method
		let events = {
			'change : #new-todo'(e) {
				e.target::onAdd::pipe(onAction)()
			},
			'change : #todo-list .edit'(e) {
				e.target::onEdited::pipe(onAction)()
			},
			'keyup : #new-todo'(e) {
				if (e.keyCode === ENTER_KEY) {
					e.target::onAdd::pipe(onAction)()
				}
			},
			'dblclick : #todo-list label'(e) {
				e.target::onEditing()
			},
			'keyup : #todo-list .edit'(e) {
				let keyCode = e.keyCode
				if (keyCode === ENTER_KEY || keyCode === ESCAPE_KEY) {
					e.target::onEdited()
				}
			},
			'change : #todo-list .toggle'(e) {
				e.target::onToggle::pipe(onAction)()
			},
			'click : #todo-list .destroy'(e) {
				e.target::onRemove::pipe(onAction)()
			},
			'click : #clear-completed'(e) {
				onAction({
					type: 'clear'
				})
			},
			'change : #toggle-all'(e) {
				onAction({
					type: 'toggleAll',
					completed: e.target.checked
				})
			}
		}

		Object.keys(events).forEach(key => {
			let [type, selector] = key.split(':').map(str => str.trim())
			document::on(type, selector, events[key])
		})

		window::on('hashchange', render)
		window::on('DOMContentLoaded', render)
	}
}

new App()
