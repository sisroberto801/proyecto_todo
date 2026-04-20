<script setup>
    import {isLogin} from '@/services/authService';
    import appMemory from '@/services/appMemory';

    const logout = () => {
        localStorage.clear();
        window.location.href = '/';
    };
</script>

<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary" >
        <div class="container-fluid">
            <router-link to="/" class="navbar-brand">ProjectManager</router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link to="/proyectos" class="nav-link">Proyectos</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/tareas" class="nav-link">Tareas</router-link>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Sistema
                        </a>
                        <ul class="dropdown-menu">
                            <li><router-link to="/usuarios" class="dropdown-item">Usuarios</router-link></li>
                            <li><router-link to="/notes" class="dropdown-item">Notas (Legacy)</router-link></li>
                        </ul>
                    </li>
                </ul>

              <div>
                <div class="nav-item" v-if="isLogin()">
                  {{appMemory.get('userName')}}
                  <router-link to="/" class="nav-link" @click="logout()">Cerrar sesión</router-link>
                </div>
                <div class="nav-item" v-else>
                  <router-link to="/login" class="nav-link" >Iniciar sesión</router-link>
                </div>
              </div>

            </div>


        </div>
    </nav>
</template>