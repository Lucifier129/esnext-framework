let noop = () => {}
//type helper
export let isArray = function() {
    return Array.isArray(this)
}

export let isFunction = function() {
    return Object.prototype.toString.call(this) === '[object Function]'
}

export let isObject = function() {
    return Object.prototype.toString.call(this) === '[object Object]'
}

export let isString = function() {
    return Object.prototype.toString.call(this) === '[object String]'
}

export let isNumber = function() {
    return Object.prototype.toString.call(this) === '[object Number]'
}

export let isBoolean = function() {
    return Object.prototype.toString.call(this) === '[object Boolean]'
}

//function helper
export let pipe = function(next = noop) {
    if (this::isFunction()) {
        return (...args) => {
            return next(this(...args))
        }
    } else if (this::isArray()) {
        return this.reduce((prev, cur) => prev::pipe(cur))
    }

}

export let then = function(next) {
    if (this::isFunction()) {
        return (...args) => {
            return Promise.resolve(this(...args)).then(next)
        }
    } else if (this::isArray()) {
        return this.reduce((prev, cur) => prev::then(cur))
    }
}

export let currying = function(first) {
    return (...args) => {
        this(first, ...args)
    }
}

export let uncurrying = function() {
    return (context, ...args) => {
        this.apply(context, ...args)
    }
}