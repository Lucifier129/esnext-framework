<template>
	<footer id="footer" v-show="todos.length" v-cloak>
		<span id="todo-count">
			<strong v-text="remaining"></strong> {{remaining | pluralize 'item'}} left
		</span>
		<ul id="filters">
			<li><a href="#/all" v-class="selected: activeFilter == 'all'">All</a></li>
			<li><a href="#/active" v-class="selected: activeFilter == 'active'">Active</a></li>
			<li><a href="#/completed" v-class="selected: activeFilter == 'completed'">Completed</a></li>
		</ul>
		<button id="clear-completed" v-on="click:removeCompleted" v-show="todos.length > remaining">
			Clear completed ({{todos.length - remaining}})
		</button>
	</footer>
</template>

<script lang="babel">
	export default {
		props: ['todos', 'remaining', 'activeFilter']
		methods: {
			removeCompleted() {
				this.todos = this.todos.filter(this.filters.active)
			}
		}
	}
</script>