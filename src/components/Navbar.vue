<template>
    <b-navbar>
        <template slot="brand">
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <img
                    src="../assets/logo.svg"
                    alt="Lightweight UI components for Vue.js based on Bulma"
                >
            </b-navbar-item>
        </template>
        <template slot="start">
            <b-navbar-dropdown label="Empresas">
                <b-navbar-item>
                    Crear Cuenta
                </b-navbar-item>
            </b-navbar-dropdown>
        </template>

        <template slot="end">
            <b-navbar-item tag="div">
                <div class="buttons">
                    <router-link :to="{ name: 'login' }" class="button is-light">
                        <strong>Iniciar Sesión</strong>
                    </router-link>
                    <router-link :to="{ name: 'signup' }" class="button is-primary">
                        <strong>Crear una Cuenta</strong>
                    </router-link>
                </div>
            </b-navbar-item>
        </template>
    </b-navbar>
</template>
