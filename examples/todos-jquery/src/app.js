import * as helper from './helper'
import jqueryHelper from './jquery.helper'
import { register } from './event.helper'
import component from './component'
import directives from './directive'
import Model from './model'
import listen from './events'

class App {
	constructor() {
		this.model = new Model('todo-jquery-esnext')
		this.register()
		listen()
	}
	render() {
		let activeFilter = '/' + location.hash.replace('#/', '')
		let data = this.model.getData(activeFilter)
		let { directive } = jqueryHelper
		'#todoapp'::directive(data, directives)
	}
	register() {
		let { model } = this
		let eventStream = {
			refresh: [::model.save, ::this.render, () => console.log('保存数据，刷新视图')],
			addTodo: [value => { console.log(value); return value;}, ::model.addTodo, 'refresh'],
			removeTodo: [::model.removeTodo, 'refresh'],
			toggleTodo: [::model.updateTodo, 'refresh'],
			editTodo: [::model.updateTodo, 'refresh'],
			clearCompleted: [::model.clearCompleted, 'refresh'],
			toggleAll: [::model.toggleAll, 'refresh']
		}
		eventStream::register()
	}
}

new App()