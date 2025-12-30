# Migraciones de Base de Datos - Servicios y Personal

## 📋 Cambios en el Schema

Se han agregado los siguientes modelos al schema de Prisma:

- **ServiceCategory**: Categorías de servicios (Limpieza, Instalación, Handyman, etc.)
- **Service**: Servicios individuales con precios y duración
- **ServiceProvider**: Profesionales que prestan servicios
- **ServiceBooking**: Reservas/citas de servicios

## 🚀 Cómo Aplicar las Migraciones

### Opción 1: Usando Prisma Migrate (Recomendado)

```bash
# Generar y aplicar la migración
npx prisma migrate dev --name add_services_and_providers

# O si estás en producción
npx prisma migrate deploy
```

### Opción 2: Usando Prisma DB Push (Desarrollo rápido)

```bash
# Sincronizar el schema con la base de datos sin crear migraciones
npx prisma db push
```

## 📝 Nota Importante

Si usas `prisma db push`, las migraciones no se guardarán en el historial. Para producción, es mejor usar `prisma migrate`.

## ✅ Verificar que funcionó

Después de aplicar las migraciones, puedes verificar que las tablas se crearon correctamente:

```bash
npx prisma studio
```

O ejecutar el seed para crear datos de prueba:

```bash
DATABASE_URL="tu-url" node prisma/seed-produccion.mjs
```

## 🔑 Usuario Admin

El seed ahora incluye un usuario administrador:

- **Email**: `admin@test.com`
- **Password**: `Admin123456`
- **Panel**: `/admin`

## 📦 Archivos Modificados

- `prisma/schema.prisma` - Modelos agregados
- `prisma/seed-produccion.mjs` - Usuario admin agregado

