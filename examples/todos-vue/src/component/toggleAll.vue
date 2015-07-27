<template>
	<input
		id="toggle-all"
		type="checkbox"
		v-model="isAllCompleted"
	>
</template>

<script lang="babel">
	export default {
		props: ['isAllCompleted']
	}
</script>