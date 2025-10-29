# Catálogo Inmobiliario

Plataforma inmobiliaria completa desarrollada con Next.js, TypeScript y Prisma. Permite a los usuarios buscar propiedades, consultar créditos INFONAVIT y conectar con brókers profesionales.

## 🚀 Características

### Fase 1 - MVP (Actual)
- ✅ Sistema de autenticación (Clientes y Brókers)
- ✅ Gestión básica de propiedades
- ✅ Búsqueda y filtros de propiedades
- ✅ Interfaz responsive y moderna
- ✅ Base de datos con Prisma y PostgreSQL

### Fase 2 - Próximamente
- 🔄 Integración con API de INFONAVIT
- 🔄 Dashboards avanzados
- 🔄 Sistema de notificaciones
- 🔄 Búsqueda en mapa interactivo

### Fase 3 - Futuro
- 📱 Aplicación móvil con React Native
- 🎥 Tours virtuales 360°
- 🧮 Calculadora de hipotecas avanzada
- 📅 Programación de citas en línea

## 🛠️ Tecnologías

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Base de Datos**: PostgreSQL
- **Autenticación**: NextAuth.js
- **Validación**: Zod
- **UI Components**: Headless UI, Lucide React

## 📋 Prerrequisitos

- Node.js 18+ 
- PostgreSQL 13+
- npm o yarn

## 🚀 Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <repository-url>
   cd catalogo-inmobiliario
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Editar `.env.local` con tus configuraciones:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/catalogo_inmobiliario?schema=public"
   
   # NextAuth
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here"
   
   # OAuth Providers (opcional)
   GOOGLE_CLIENT_ID=""
   GOOGLE_CLIENT_SECRET=""
   ```

4. **Configurar la base de datos**
   ```bash
   # Generar el cliente de Prisma
   npx prisma generate
   
   # Ejecutar migraciones
   npx prisma db push
   ```

5. **Iniciar el servidor de desarrollo**
   ```bash
   npm run dev
   ```

6. **Abrir en el navegador**
   ```
   http://localhost:3000
   ```

## 📁 Estructura del Proyecto

```
src/
├── app/                    # App Router de Next.js
│   ├── api/               # API Routes
│   ├── auth/              # Páginas de autenticación
│   ├── properties/        # Páginas de propiedades
│   └── dashboard/         # Panel de control
├── components/            # Componentes reutilizables
│   ├── ui/               # Componentes base
│   ├── layout/           # Componentes de layout
│   ├── property/         # Componentes de propiedades
│   └── forms/            # Formularios
├── lib/                  # Utilidades y configuraciones
│   ├── auth.ts           # Configuración de NextAuth
│   ├── db.ts             # Cliente de Prisma
│   ├── validations.ts    # Esquemas de validación
│   └── utils.ts          # Utilidades generales
├── types/                # Tipos TypeScript
└── hooks/                # Custom hooks
```

## 🗄️ Base de Datos

El proyecto utiliza Prisma como ORM con PostgreSQL. El esquema incluye:

- **Users**: Clientes y Brókers
- **Properties**: Propiedades inmobiliarias
- **Favorites**: Propiedades favoritas
- **CreditInquiries**: Consultas de crédito
- **PropertyInquiries**: Consultas sobre propiedades
- **Messages**: Sistema de mensajería

### Comandos de Prisma

```bash
# Ver la base de datos en el navegador
npx prisma studio

# Resetear la base de datos
npx prisma db reset

# Generar migraciones
npx prisma migrate dev
```

## 🔐 Autenticación

El sistema soporta múltiples métodos de autenticación:

- **Credenciales**: Email y contraseña
- **Google OAuth**: Para registro rápido
- **Roles**: Cliente, Bróker, Admin

### Roles de Usuario

- **Cliente**: Puede buscar propiedades, agregar favoritos, consultar créditos
- **Bróker**: Puede gestionar propiedades, ver estadísticas, contactar clientes
- **Admin**: Acceso completo al sistema

## 🎨 Personalización

### Colores
El proyecto usa una paleta de colores azul como principal. Puedes personalizar los colores en `tailwind.config.js`.

### Componentes
Los componentes están en `src/components/ui/` y siguen el patrón de diseño de Headless UI.

## 📱 Responsive Design

La aplicación está optimizada para:
- 📱 Móviles (320px+)
- 📱 Tablets (768px+)
- 💻 Desktop (1024px+)

## 🚀 Despliegue

### Vercel (Recomendado)

1. Conectar el repositorio con Vercel
2. Configurar variables de entorno
3. Desplegar automáticamente

### Otras plataformas

El proyecto es compatible con cualquier plataforma que soporte Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean

## 🤝 Contribución

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 📞 Soporte

Para soporte técnico o preguntas:
- 📧 Email: soporte@catalogo-inmobiliario.com
- 💬 Discord: [Servidor de la comunidad]
- 📖 Documentación: [Enlace a la documentación]

## 🗺️ Roadmap

### Q1 2024
- [ ] Integración con INFONAVIT
- [ ] Dashboard avanzado
- [ ] Sistema de notificaciones

### Q2 2024
- [ ] Aplicación móvil
- [ ] Tours virtuales
- [ ] Calculadora de hipotecas

### Q3 2024
- [ ] CRM integrado
- [ ] Analytics avanzado
- [ ] API pública

---

Desarrollado con ❤️ para la comunidad inmobiliaria mexicana.