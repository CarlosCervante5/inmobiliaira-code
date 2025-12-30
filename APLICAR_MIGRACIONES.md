# 🚀 Aplicar Migraciones y Seeders

## 📋 Migración: Servicios y Personal

Se ha creado la migración `20250111120000_add_services_and_providers` que agrega:

- **ServiceCategory**: Categorías de servicios
- **Service**: Servicios individuales
- **ServiceProvider**: Profesionales que prestan servicios
- **ServiceBooking**: Reservas/citas de servicios

## 🔧 Cómo Aplicar en Producción

### Opción 1: Usando Prisma Migrate (Recomendado)

```bash
# Aplicar todas las migraciones pendientes
npx prisma migrate deploy
```

### Opción 2: Usando Prisma DB Push (Desarrollo)

```bash
# Sincronizar schema sin crear migraciones
npx prisma db push
```

## 🌱 Ejecutar el Seeder

Después de aplicar las migraciones, ejecuta el seeder para crear datos de ejemplo:

```bash
DATABASE_URL="tu-url-de-produccion" node prisma/seed-produccion.mjs
```

### Datos que se crearán:

#### Usuarios:
- **Admin**: `admin@test.com` / `Admin123456`
- **Brokers**: `broker1@test.com`, `broker2@test.com` / `Test123456`
- **Clientes**: `cliente1@test.com`, `cliente2@test.com` / `Test123456`

#### Servicios:
- **5 Categorías**: Limpieza, Instalación, Handyman, Exteriores, Renovaciones
- **4 Servicios de ejemplo**: Limpieza de Hogar, Limpieza de Mudanza, Montaje de TV, Ensamblaje de Muebles

#### Proveedores:
- **3 Proveedores verificados** con especialidades y ratings

## ✅ Verificar que funcionó

```bash
# Abrir Prisma Studio
DATABASE_URL="tu-url" npx prisma studio
```

O verifica en el panel de admin:
- `/admin/services` - Deberías ver las categorías y servicios
- `/admin/service-providers` - Deberías ver los proveedores

## 📝 Notas

- El seeder usa `upsert`, por lo que es seguro ejecutarlo múltiples veces
- Las relaciones many-to-many entre servicios y proveedores se crean automáticamente
- Los proveedores se asocian con servicios según sus especialidades

