import {
    isString, isFunction, isArray, isObject, pipe, then
} from './helper'

let eventStore = {}
let identical = value => value

let resolve = function(value) {
    if (this::isArray()) {
        return this::combine()(value)
    } else if (this::isFunction()) {
        return this(value)
    } else if (this::isObject()) {
        return this::dispatch(value)
    } else if (this::isString() && eventStore.hasOwnProperty(this.toString())) {
        return eventStore[this.toString()]::resolve(value)
    }
}

let combine = function() {
    let stream = identical
    for (let event of this) {
        if (event::isFunction()) {
            stream = stream::then(event)
        } else if (event::isObject()) {
            stream = stream::then(event::dispatch)
        } else if (event::isString() && eventStore.hasOwnProperty(event)) {
            stream = stream::then(eventStore[event]::resolve)
        }
    }
    return stream
}

let dispatch = function(value) {
    let events = this.events
    let name = this.dispatch(value)
    if (!name::isString()) {
        throw new Error('dispatch 方法必须返回字符串类型')
    }
    let hasEvent = (events::isString() && name === events && eventStore.hasOwnProperty(name))
    || (events::isArray() && events.indexOf(name) !== -1 && eventStore.hasOwnProperty(name))

    return hasEvent ? eventStore[name]::resolve(value) : value
}

let trigger = function(value) {
    let events = eventStore[this.toString()]
    if (events) {
        events::resolve(value)
    }
}

let register = function() {
	if (this::isObject()) {
		Object.assign(eventStore, this)
	}
}


export default { register, trigger }