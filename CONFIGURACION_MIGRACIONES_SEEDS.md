# 🔧 Configuración de Migraciones y Seeds

## 📋 Resumen de la Configuración Actual

### Archivos de Seed

1. **`prisma/seed.ts`** - Seed básico para desarrollo (sin passwords)
2. **`prisma/seed-produccion.mjs`** - Seed completo para producción (con passwords, servicios, personal)

### Configuración en `package.json`

```json
{
  "prisma": {
    "seed": "node prisma/seed-produccion.mjs"
  }
}
```

Esto significa que cuando ejecutas `prisma db seed`, se ejecuta el seed de producción.

## 🚀 Scripts Disponibles

### Migraciones

```bash
# Aplicar migraciones pendientes (producción)
npm run db:migrate

# Sincronizar schema sin crear migraciones (desarrollo)
npm run db:push

# Generar Prisma Client
npm run db:generate
```

### Seeds

```bash
# Ejecutar seed de producción (recomendado)
npm run db:seed

# Ejecutar seed de desarrollo
npm run db:seed:dev
```

### Todo en Uno

```bash
# Ejecutar migraciones + generar client + ejecutar seed
npm run db:migrate-and-seed
```

O manualmente:

```bash
DATABASE_URL="tu-url" node scripts/migrate-and-seed.mjs
```

## 📝 Cómo Funciona

### 1. Migraciones

Las migraciones se crean con:

```bash
npx prisma migrate dev --name nombre_de_la_migracion
```

Esto crea un archivo en `prisma/migrations/` con el SQL necesario.

### 2. Aplicar Migraciones

**En Desarrollo:**
```bash
npx prisma migrate dev
```

**En Producción:**
```bash
npx prisma migrate deploy
```

O usar el script:
```bash
npm run db:migrate
```

### 3. Ejecutar Seeds

**Automáticamente después de migraciones:**
```bash
npm run db:migrate-and-seed
```

**Manual:**
```bash
npm run db:seed
```

O directamente:
```bash
DATABASE_URL="tu-url" node prisma/seed-produccion.mjs
```

## 🔄 Flujo Recomendado

### Primera Vez (Setup Inicial)

```bash
# 1. Aplicar migraciones
npm run db:migrate

# 2. Generar Prisma Client
npm run db:generate

# 3. Ejecutar seed
npm run db:seed
```

O todo en uno:
```bash
npm run db:migrate-and-seed
```

### Después de Cambios en el Schema

```bash
# 1. Crear nueva migración
npx prisma migrate dev --name descripcion_del_cambio

# 2. Aplicar y ejecutar seed
npm run db:migrate-and-seed
```

## 🌐 En Vercel (Producción)

### Opción 1: Script de Build Personalizado

Agrega en `package.json`:

```json
{
  "scripts": {
    "vercel-build": "prisma generate && prisma migrate deploy && node prisma/seed-produccion.mjs && next build"
  }
}
```

⚠️ **Nota:** Esto ejecutará el seed en cada deploy, lo cual puede no ser deseable.

### Opción 2: Manual (Recomendado)

Ejecuta manualmente desde tu computadora:

```bash
# Obtener DATABASE_URL de Vercel
# Settings → Environment Variables → DATABASE_URL

# Ejecutar migraciones y seed
DATABASE_URL="tu-url-de-vercel" npm run db:migrate-and-seed
```

### Opción 3: Script Separado para Vercel

Crea un script que solo ejecute migraciones (sin seed):

```json
{
  "scripts": {
    "vercel-build": "prisma generate && prisma migrate deploy && next build"
  }
}
```

Y ejecuta el seed manualmente cuando sea necesario.

## 📊 Estructura de Archivos

```
prisma/
├── schema.prisma          # Schema de la base de datos
├── seed.ts                # Seed básico (desarrollo)
├── seed-produccion.mjs    # Seed completo (producción)
└── migrations/
    └── YYYYMMDDHHMMSS_nombre/
        └── migration.sql  # SQL de la migración

scripts/
└── migrate-and-seed.mjs   # Script para ejecutar todo
```

## ✅ Verificación

Después de ejecutar migraciones y seed:

```bash
# Abrir Prisma Studio
npm run db:studio
```

O verificar en el admin:
- `/admin` - Deberías ver estadísticas
- `/admin/services` - Deberías ver servicios
- `/admin/service-providers` - Deberías ver proveedores

## 🔑 Credenciales Creadas por el Seed

### Admin
- Email: `admin@test.com`
- Password: `Admin123456`

### Brokers
- Email: `broker1@test.com` / Password: `Test123456`
- Email: `broker2@test.com` / Password: `Test123456`

### Clientes
- Email: `cliente1@test.com` / Password: `Test123456`
- Email: `cliente2@test.com` / Password: `Test123456`

## 🎯 Comandos Rápidos

```bash
# Todo en uno (migraciones + seed)
npm run db:migrate-and-seed

# Solo migraciones
npm run db:migrate

# Solo seed
npm run db:seed

# Ver base de datos
npm run db:studio
```

## 📝 Notas Importantes

1. **El seed usa `upsert`**: Es seguro ejecutarlo múltiples veces sin duplicar datos
2. **Migraciones son idempotentes**: `migrate deploy` solo aplica migraciones pendientes
3. **En producción**: Siempre usa `migrate deploy`, nunca `migrate dev`
4. **Seed automático**: Considera si quieres que el seed se ejecute en cada deploy o solo manualmente

