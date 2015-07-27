<template>
	<ul id="todo-list">
		<li
			class="todo"
			v-repeat="todos | filterTodos"
			v-class="
			completed : completed,
			editing   : this == editedTodo
			"
		>
			<div class="view">
				<input
					class="toggle"
					type="checkbox"
					v-model="completed"
				>
				<label v-text="title" v-on="dblclick: editTodo(this)"></label>
				<button class="destroy" v-on="click: removeTodo(this)"></button>
			</div>
			<input
				class="edit"
				type="text"
				v-model="title"
				v-todo-focus="this == editedTodo"
				v-on="
				blur  : doneEdit(this),
				keyup : doneEdit(this) | key 'enter',
				keyup : cancelEdit(this) | key 'esc'
				"
			>
		</li>
	</ul>
</template>

<script lang="babel">
	export default {
		props: ['todos', 'editTodo']
		method: {
			editTodo(todo) {
				this.beforeEditCache = todo.title
				this.editedTodo = todo
			},
			doneEdit(todo) {
				if (!this.editedTodo) {
					return
				}
				this.editedTodo = null
				todo.title = todo.title.trim()
				if (!todo.title) {
					this.removeTodo(todo)
				}
			},
			cancelEdit(todo) {
				this.editedTodo = null
				todo.title = this.beforeEditCache
			},
			removeTodo: function (todo) {
				this.todos.$remove(todo.$data);
			}
		}
	}
</script>