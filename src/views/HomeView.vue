<template>
  <section class="about">
    <h1>ProjectManager</h1>
    <p class="tagline">Gestión de Proyectos y Tareas</p>

    <p class="description">
      ProjectManager es una aplicación web completa para la gestión de proyectos y tareas,
      desarrollada con Vue 3 y TypeScript. Permite organizar, seguir y colaborar en proyectos
      de manera eficiente a través de una interfaz moderna e intuitiva.
    </p>

    <p>
      Esta aplicación demuestra la implementación de conceptos avanzados de desarrollo frontend,
      incluyendo componentes reutilizables, manejo de estado, consumo de APIs, autenticación
      y un diseño responsivo con estilos modernos.
    </p>

    <h2>Características Principales</h2>
    <div class="features-grid">
      <div class="feature-card">
        <i class="fas fa-project-diagram"></i>
        <h3>Gestión de Proyectos</h3>
        <p>CRUD completo para proyectos con estados y fechas límite</p>
      </div>
      <div class="feature-card">
        <i class="fas fa-tasks"></i>
        <h3>Gestión de Tareas</h3>
        <p>Organización de tareas con prioridades y estados</p>
      </div>
      <div class="feature-card">
        <i class="fas fa-filter"></i>
        <h3>Filtros y Búsqueda</h3>
        <p>Búsqueda avanzada y filtros por estado y prioridad</p>
      </div>
      <div class="feature-card">
        <i class="fas fa-shield-alt"></i>
        <h3>Autenticación</h3>
        <p>Sistema de login y protección de rutas</p>
      </div>
    </div>

    <h2>¿Qué tecnologías usamos?</h2>
    <div class="tech-grid">
      <div class="tech-item" v-for="tech in technologies" :key="tech.name">
        <i :class="tech.icon"></i>
        <span>{{ tech.name }}</span>
      </div>
    </div>

    <h2>📚 Recursos y Documentación</h2>

    <ul class="links">
      <li v-for="link in links" :key="link.name">
        <a :href="link.url" target="_blank" rel="noopener">
          {{ link.name }}
        </a>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
  interface Link {
    name: string
    url: string
  }

  interface Technology {
    name: string
    icon: string
  }

  const technologies: Technology[] = [
    { name: 'Vue 3', icon: 'fab fa-vuejs' },
    { name: 'TypeScript', icon: 'fab fa-js' },
    { name: 'SCSS', icon: 'fab fa-sass' },
    { name: 'Vue Router', icon: 'fas fa-route' },
    { name: 'Axios', icon: 'fas fa-exchange-alt' },
    { name: 'JSON Server', icon: 'fas fa-database' }
  ]

  const links: Link[] = [
    {
      name: 'Vue 3 (Documentación oficial)',
      url: 'https://vuejs.org/'
    },
    {
      name: 'TypeScript',
      url: 'https://www.typescriptlang.org/'
    },
    {
      name: 'SCSS (Sass)',
      url: 'https://sass-lang.com/'
    },
    {
      name: 'Vue Router',
      url: 'https://router.vuejs.org/'
    },
    {
      name: 'Axios',
      url: 'https://axios-http.com/'
    },
    {
      name: 'JSON Server',
      url: 'https://github.com/typicode/json-server'
    },
    {
      name: 'JSON Server Auth',
      url: 'https://github.com/jeremyben/json-server-auth'
    },
    {
      name: 'Font Awesome',
      url: 'https://fontawesome.com/'
    }
  ]
</script>

<style scoped lang="scss">
  .about {
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;

    h1 {
      margin-bottom: 0.5rem;
      color: #2c3e50;
      font-size: 3rem;
      font-weight: 700;
      text-align: center;
    }

    .tagline {
      text-align: center;
      color: #667eea;
      font-size: 1.5rem;
      margin-bottom: 3rem;
      font-weight: 300;
    }

    .description {
      font-size: 1.1rem;
      margin-bottom: 1rem;
      line-height: 1.8;
      color: #6c757d;
    }

    h2 {
      margin-top: 3rem;
      margin-bottom: 2rem;
      color: #2c3e50;
      font-size: 2rem;
      font-weight: 600;
      text-align: center;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
      margin-bottom: 3rem;

      .feature-card {
        background: white;
        padding: 2rem;
        border-radius: 12px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        text-align: center;
        transition: transform 0.3s ease, box-shadow 0.3s ease;

        &:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }

        i {
          font-size: 3rem;
          color: #667eea;
          margin-bottom: 1rem;
        }

        h3 {
          margin: 0 0 1rem 0;
          color: #2c3e50;
          font-size: 1.25rem;
        }

        p {
          margin: 0;
          color: #6c757d;
          line-height: 1.6;
        }
      }
    }

    .tech-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 1.5rem;
      margin-bottom: 3rem;

      .tech-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 1.5rem;
        background: #f8f9fa;
        border-radius: 8px;
        transition: background 0.3s ease;

        &:hover {
          background: #e9ecef;
        }

        i {
          font-size: 2rem;
          color: #667eea;
          margin-bottom: 0.5rem;
        }

        span {
          font-weight: 500;
          color: #2c3e50;
        }
      }
    }

    .links {
      list-style: none;
      padding: 0;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1rem;

      li {
        a {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem;
          background: white;
          border-radius: 8px;
          color: #667eea;
          text-decoration: none;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          transition: all 0.3s ease;

          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(0,0,0,0.15);
            color: #764ba2;
          }

          i {
            font-size: 1.25rem;
          }
        }
      }
    }
  }

  @media (max-width: 768px) {
    .about {
      padding: 1rem;

      h1 {
        font-size: 2rem;
      }

      .tagline {
        font-size: 1.25rem;
      }

      h2 {
        font-size: 1.5rem;
      }

      .features-grid {
        grid-template-columns: 1fr;
      }

      .tech-grid {
        grid-template-columns: repeat(2, 1fr);
      }

      .links {
        grid-template-columns: 1fr;
      }
    }
  }
</style>