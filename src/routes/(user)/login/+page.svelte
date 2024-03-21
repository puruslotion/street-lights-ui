<script lang="ts">
	import { goto } from "$app/navigation";
	import { ProgressRadial } from "@skeletonlabs/skeleton";

    // export let data;

    async function checkIfUserIsLoggedIn() {
        const res = await fetch('http://localhost:3000/api/v1/user/isuserloggedin', {
            method: "GET",
            credentials: 'include' 
        })

        const json = await res.json();

        return json.status === 200;        
    }

    async function showLoginSpinner(shouldShow: boolean) {
        const div = document.getElementById('loggingIn') as HTMLDivElement;

        if (shouldShow) {
            div.classList.remove('hidden')
            div.classList.add('flex')
        } else {
            div.classList.remove('flex')
            div.classList.add('hidden')
        }
    }

    async function showInvalidCredentials(shouldShow: boolean) {
        const div = document.getElementById('invalidCredentials') as HTMLDivElement;

        if (shouldShow) {
            div.classList.remove('hidden')
            div.classList.add('flex')
        } else {
            div.classList.remove('flex')
            div.classList.add('hidden')
        }
    }

    async function login(username: string, password: string) {
        if (!username || !password) {
            return false;
        }

        showInvalidCredentials(false);
        showLoginSpinner(true);

        const response = await fetch('http://localhost:3000/api/v1/user/login', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            })

        const json = await response.json();

        return json.status === 200;
    }

    async function handleSubmit(ev: SubmitEvent) {
        const data = new FormData(ev.target as HTMLFormElement);
        const username = data.get('username')?.toString() || '';
        const password = data.get('password')?.toString() || '';

        try { 
            const loginResult = await login(username, password);
            const checkIfUserIsLoggedInResult = await checkIfUserIsLoggedIn();

            if (checkIfUserIsLoggedInResult) {
                goto('/');
            }

            showLoginSpinner(false);
            showInvalidCredentials(true);
        } catch (error) {
            console.log(error);
        }
    }
</script>

<div class="container h-full mx-auto flex justify-center items-center select-none">
    <form id="loginForm" action="" method="post" on:submit|preventDefault={ handleSubmit }>
    <h1 class="h1">Street Lights</h1>
    <!-- svelte-ignore missing-declaration -->

    <div id="invalidCredentials" class="hidden select-none">
        <div class="container flex justify-center items-center mt-6">
            <div class="container flex justify-center items-center variant-ghost-error p-2">
                <p class="p">Invalid username and/or password</p>
            </div>
        </div>
    </div>

    <div id="loggingIn" class="hidden select-none">
        <div class="container flex justify-center items-center mt-6">
            <div class="mt-6">
                <h3 class="h3">Logging in...</h3>
            </div>
        </div>
        
        <div class="container flex justify-center items-center mt-6">
            <ProgressRadial width='w-12' value={undefined} />
        </div>
    </div>
    
    <div class="mt-6">
        <label class="label select-none">
            <span>Username</span>
            <input name="username" class="input" type="text" placeholder="username" />
        </label>
    </div>
    
    <div class="mt-6 select-none">
        <label class="label">
            <span>Password</span>
            <input name="password" class="input" type="password" placeholder="password" />
        </label>
    </div>
    <div class="mt-6">
        <button type="submit"  class="btn variant-ghost-primary">Login</button>
    </div>

    
    
</form>
</div>
