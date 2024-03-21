<script lang="ts">
	import { goto } from '$app/navigation';
	import '../../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';

	async function handleLogout(event: Event) {
		const result = await fetch('http://localhost:3000/api/v1/user/logout', {
			method: "GET",
			credentials: 'include' 
    	})

		const json = await result.json();

		console.log(json);

		if (json.status === 200) {
			goto('/login');
		}
	}
</script>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<strong class="text-xl uppercase">Skeleton</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<button class="btn variant-ghost-primary" on:click={handleLogout}>Logout</button>
				<!-- <a
					class="btn btn-sm variant-ghost-surface"
					href="https://discord.gg/EXqV7W8MtY"
					target="_blank"
					rel="noreferrer"
				>
					Discord
				</a>
				<a
					class="btn btn-sm variant-ghost-surface"
					href="https://twitter.com/SkeletonUI"
					target="_blank"
					rel="noreferrer"
				>
					Twitter
				</a>
				<a
					class="btn btn-sm variant-ghost-surface"
					href="https://github.com/skeletonlabs/skeleton"
					target="_blank"
					rel="noreferrer"
				>
					GitHub
				</a> -->
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
