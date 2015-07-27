import $ from 'jquery'
import { isString, isFunction } from './helper'
let helper = {}
export default helper

Object.keys($.fn).forEach(key => {
	helper[key] = function(...args) {
		if (this::isString()) {
			return $(String(this))[key](...args)
		}
		return $(this)[key](...args)
	}
})

helper.directive = function(model, directive) {
	let $root = this::isString() ? $(this.toString()) : $(this)
	$root
	.find('[data-directive]')
	.each((_, node) => {
		let attrVal = node.dataset.directive
		let handler = directive[attrVal]
		if (!handler) {
			return
		}
		if (handler::isFunction()) {
			return node::handler(model[attrVal])
		}
		Object.keys(handler).forEach(key => {
			let handle = handler[key]
			node::handle(model[key])
		})
	})
}
