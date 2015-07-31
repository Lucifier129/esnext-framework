import { closest, find, removeClass, text } from './jquery.helper'

export let onAdd = function() {
    let value = this.value.trim()
    if (!value || value === this.defaultValue) {
        return
    }
    this.value = ''
    return value
}

export let onEdited = function() {
    let $todoElem = this::closest('li').removeClass('editing')
    let $label = $todoElem.find('label')
    let id = $todoElem.data('id')
    let value = this.value.trim()
    if (!value) {
        return {
            type: 'remove',
            id
        }
    } else if (value !== $label.text()) {
        $label.text(value)
        return {
            type: 'update',
            id,
            title: value
        }
    }
    return {}
}

let blur = function() {
    this.onblur = null
    this::onEdited()
}

export let onEditing = function() {
    let $todoElem = this::closest('li').addClass('editing')
    let edit = $todoElem.find('.edit')[0]
    edit.value = this::text()
    edit.onblur = blur
    edit.focus()
}

export let onToggle = function() {
    let $todoElem = this::closest('li')
    return {
        id: $todoElem.data('id'),
        completed: this.checked
    }
}

export let onRemove = function() {
    return this::closest('li').data('id')
}