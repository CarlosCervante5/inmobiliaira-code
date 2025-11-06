# 🗄️ Actualizar Base de Datos en Vercel

## 🔴 Problema Actual

Error 500 en `/api/auth/register` porque **la base de datos NO tiene el campo `password` todavía**.

Vercel NO ejecuta migraciones automáticamente. Necesitas hacerlo manualmente.

---

## ✅ Solución - Actualizar la BD en Vercel

### **Opción 1: Desde tu computadora (Más fácil)**

```bash
cd "/Users/strega/Desktop/catalogo inmobiliario/catalogo-inmobiliario"

# Copiar DATABASE_URL de Vercel (ver abajo cómo obtenerla)
# Luego ejecutar:

DATABASE_URL="tu-database-url-de-vercel" npx prisma db push
```

### **Cómo obtener DATABASE_URL de Vercel:**

1. Ve a: https://vercel.com/dashboard
2. Click en tu proyecto `inmobiliaira-code`
3. Click en **"Settings"** (arriba)
4. Click en **"Environment Variables"** (menú izquierdo)
5. Busca **DATABASE_URL**
6. Click en el ícono del ojo para verla
7. **Copia** toda la URL (empieza con `postgres://...`)

---

### **Opción 2: Desde Vercel Dashboard (Si tienes Vercel Postgres)**

1. Ve a: https://vercel.com/dashboard
2. Click en tu proyecto
3. Click en **"Storage"** (arriba)
4. Click en tu base de datos
5. Click en **"Query"**
6. Ejecuta este SQL:

```sql
ALTER TABLE "User" ADD COLUMN "password" TEXT;
```

---

### **Opción 3: Redeploy con postinstall script**

Actualiza `package.json`:

```json
{
  "scripts": {
    "postinstall": "prisma generate",
    "vercel-build": "prisma generate && prisma db push --accept-data-loss && next build"
  }
}
```

Pero esto es **PELIGROSO** porque `--accept-data-loss` puede borrar datos.

---

## 🎯 Pasos Recomendados (HACER AHORA)

### **1. Obtén tu DATABASE_URL de Vercel**

Sigue los pasos de arriba para copiarla.

### **2. Actualiza la base de datos**

```bash
cd "/Users/strega/Desktop/catalogo inmobiliario/catalogo-inmobiliario"

# Reemplaza con tu URL real
DATABASE_URL="postgres://user:pass@host/database?sslmode=require" npx prisma db push
```

Deberías ver:
```
✔ Your database is now in sync with your Prisma schema.
```

### **3. Verifica que funcionó**

Abre de nuevo:
```
https://inmobiliaira-code.vercel.app/auth/signup
```

Y registra un broker. Si funciona, verás el mensaje de éxito.

### **4. Usa las credenciales en la app**

Una vez registrado desde la web, usa las mismas credenciales en la app móvil.

---

## 🔍 Verificar estado del deployment

**Revisa los logs de Vercel:**

1. Ve a: https://vercel.com/dashboard
2. Click en tu proyecto
3. Click en el último deployment (el de arriba)
4. Click en **"Logs"** o **"Runtime Logs"**
5. Busca mensajes de error

Probablemente verás:
```
Error: Unknown arg `password` in data.password
```

Esto confirma que la BD no tiene el campo.

---

## 🚨 Error Común: "Unknown arg `password`"

**Causa:** Prisma Client en Vercel fue generado ANTES de que agregáramos el campo `password`.

**Solución:**

1. Actualiza la BD con `prisma db push` (Opción 1 arriba)
2. Espera a que Vercel vuelva a desplegar
3. El nuevo deployment generará Prisma Client con el campo `password`

---

## ⏰ Tiempo Estimado

- Obtener DATABASE_URL: **1 minuto**
- Ejecutar `prisma db push`: **10 segundos**
- Redespliegue de Vercel: **2-3 minutos**
- **TOTAL: ~5 minutos**

---

## ✅ Una vez actualizado

Podrás:
- ✅ Registrar brokers desde la web
- ✅ Hacer login en la web
- ✅ Hacer login en la app móvil
- ✅ Recibir mensajes de clientes

---

## 🆘 Si no funciona

Comparte la DATABASE_URL (puedes ocultar la contraseña) y te ayudo a ejecutar el comando correcto.

O ejecuta esto y compárteme el resultado:

```bash
DATABASE_URL="tu-url" npx prisma db push --help
```

