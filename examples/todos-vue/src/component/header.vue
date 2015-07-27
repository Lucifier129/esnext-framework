//header.vue
<temlpate>
	<header id="header">
		<h1>todos</h1>
		<input
			id="new-todo"
			autofocus
			autocomplete="off"
			placeholder="What needs to be done?"
			v-model="newTodo"
			v-on="keyup:addTodo | key 'enter'"
		>
	</header>
</temlpate>

<script lang="babel">
	export default {
		data() {
			return {
				newTodo: null
			}
		},
		props: ['newTodo'],
		methods: {
			addTodo() {
				let value = this.newTodo && this.newTodo.trim()
				if (!value) {
					return
				}
				this.newTodo = ''
				this.$dispatch('add', {
					title: value,
					completed: false
				})
			}
		}
	}
</script>