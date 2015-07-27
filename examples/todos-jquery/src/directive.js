import { find, addClass, removeClass, attr, text, html } from './jquery.helper'
import * as component from 'component'

export default {
	todoCount(count) {
		if (count === 0) {
			this::text('')
		} else if (count === 1) {
			this::text('1 item left')
		} else if (count > 1) {
			this::text(`${ count } items left`)
		}
	},
	clearCompleted(amount) {
		if (amount === 0) {
			this::text('')
		} else if (amount >= 1) {
			this::text(`Clear completed (${ amount })`)
		}
	},
	filters(activeFilters) {
		this
			::find('a')
			.each((i, link) => {
				if (link::attr('href') === `#${ activeFilters }`) {
					link::addClass('selected')
				} else {
					link::removeClass('selected')
				}
		})
	},
	toggleAll(checked) {
		this.checked = !!checked
	},
	todoList(data) {
		this::html(component.todos(data))
	}
}