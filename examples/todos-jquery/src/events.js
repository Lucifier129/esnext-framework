import { on } from './jquery.helper'
import { trigger } from './event.helper'
import { onAdd, onEdited, onEditing, onToggle, onRemove } from './collector'


const ENTER_KEY = 13
const ESCAPE_KEY = 27


let events = {
    'change : #new-todo' (e) {
        let value = e.target::onAdd()
        if (value) {
            'addTodo'::trigger()
        }
    },
    'keyup : #new-todo' (e) {
        if (e.keyCode === ENTER_KEY) {
            'addTodo'::trigger(e.target::onAdd())
        }
    },
    'change : #todo-list .edit' (e) {
        'editTodo'::trigger(e.target::onEdited())
    },
    'dblclick : #todo-list label' (e) {
        e.target::onEditing()
    },
    'keyup : #todo-list .edit' (e) {
        let keyCode = e.keyCode
        if (keyCode === ENTER_KEY || keyCode === ESCAPE_KEY) {
            let value = e.target::onEdited()
            if (value.type === 'remove') {
                'removeTodo'::trigger(value.id)
            } else if (value.type === 'update') {
                'editTodo'::trigger({
                    id: value.id,
                    title: value.title
                })
            }
        }
    },
    'change : #todo-list .toggle' (e) {
    	'toggleTodo'::trigger(e.target::onToggle())
    },
    'click : #todo-list .destroy' (e) {
    	'removeTodo'::trigger(e.target::onRemove())
    },
    'click : #clear-completed' () {
    	'clearCompleted'::trigger()
    },
    'change : #toggle-all' (e) {
    	'toggleAll'::trigger(e.target.checked)
    }
}

let listen = () => {
    Object.keys(events).forEach(key => {
        let [type, selector] = key.split(':').map(str => str.trim())
        document::on(type, selector, events[key])
    })
    window::on('hashchange', 'refresh'::trigger)
    window::on('DOMContentLoaded', 'refresh'::trigger)
}

export default listen
