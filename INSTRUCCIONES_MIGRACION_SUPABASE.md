# 🚀 Aplicar Migración en Supabase

## ⚠️ Problema con PgBouncer

El pooler de Supabase (puerto 6543) no soporta todas las operaciones de Prisma. Necesitas usar la **URL directa** (puerto 5432).

## 🔧 Opción 1: Usar URL Directa (Recomendado)

### Paso 1: Obtener la URL directa de Supabase

1. Ve a tu proyecto en Supabase: https://supabase.com/dashboard
2. Ve a **Settings** → **Database**
3. Busca **Connection string** → **Direct connection**
4. Copia la URL (debe tener puerto **5432**, no 6543)

### Paso 2: Aplicar migración

```bash
# Usar la URL directa (puerto 5432)
DATABASE_URL="postgres://postgres.rptrmsouwsxybvznkrir:tqPlG6LZueKblPou@aws-1-us-east-1.pooler.supabase.com:5432/postgres?sslmode=require" npx prisma migrate deploy
```

O usar `db push`:

```bash
DATABASE_URL="postgres://postgres.rptrmsouwsxybvznkrir:tqPlG6LZueKblPou@aws-1-us-east-1.pooler.supabase.com:5432/postgres?sslmode=require" npx prisma db push
```

## 🔧 Opción 2: Ejecutar SQL Manualmente en Supabase Dashboard

### Paso 1: Abrir SQL Editor

1. Ve a: https://supabase.com/dashboard
2. Selecciona tu proyecto
3. Ve a **SQL Editor** en el menú lateral

### Paso 2: Copiar y Ejecutar SQL

1. Abre el archivo: `prisma/migrations/20250111120000_add_services_and_providers/migration.sql`
2. Copia todo el contenido
3. Pégalo en el SQL Editor de Supabase
4. Haz clic en **Run** o presiona `Cmd/Ctrl + Enter`

## 🔧 Opción 3: Usar Script Node.js

```bash
# Usar URL directa (puerto 5432)
DATABASE_URL="postgres://postgres.rptrmsouwsxybvznkrir:tqPlG6LZueKblPou@aws-1-us-east-1.pooler.supabase.com:5432/postgres?sslmode=require" node scripts/aplicar-migracion-servicios.mjs
```

## 🔧 Opción 4: Usar psql (si está instalado)

```bash
# Instalar psql en macOS
brew install postgresql

# Aplicar migración
psql "postgres://postgres.rptrmsouwsxybvznkrir:tqPlG6LZueKblPou@aws-1-us-east-1.pooler.supabase.com:5432/postgres?sslmode=require" -f prisma/migrations/20250111120000_add_services_and_providers/migration.sql
```

## ✅ Verificar que funcionó

Después de aplicar la migración, verifica en Supabase:

1. Ve a **Table Editor**
2. Deberías ver las nuevas tablas:
   - `ServiceCategory`
   - `Service`
   - `ServiceProvider`
   - `ServiceBooking`

## 🌱 Ejecutar Seeder

Una vez aplicada la migración, ejecuta el seeder:

```bash
DATABASE_URL="postgres://postgres.rptrmsouwsxybvznkrir:tqPlG6LZueKblPou@aws-1-us-east-1.pooler.supabase.com:5432/postgres?sslmode=require" node prisma/seed-produccion.mjs
```

## 📝 Nota Importante

- **Pooler (6543)**: Para queries normales, más rápido pero limitado
- **Directo (5432)**: Para migraciones y operaciones DDL, más lento pero completo

Siempre usa el puerto **5432** para migraciones.

