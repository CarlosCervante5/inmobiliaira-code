# 🌱 Ejecutar Seed en Producción

## 📝 Usuarios que se crearán:

### 👨‍💼 Brokers (para la app móvil):
```
Email: broker1@test.com
Password: Test123456
Nombre: Juan Pérez
Compañía: Inmobiliaria ABC
```

```
Email: broker2@test.com
Password: Test123456
Nombre: María González
Compañía: Propiedades Premium
```

### 👥 Clientes:
```
Email: cliente1@test.com
Password: Test123456
Nombre: Carlos Ramírez
```

```
Email: cliente2@test.com
Password: Test123456
Nombre: Ana López
```

### 🏠 Propiedades:
- Casa moderna en Polanco (Broker 1)
- Departamento en Roma Norte (Broker 2)
- Terreno comercial en Santa Fe (Broker 1)

### 💬 Mensajes de ejemplo:
- 4 mensajes entre brokers y clientes para probar el chat

---

## 🚀 CÓMO EJECUTAR EL SEED

### **Paso 1: Obtén tu DATABASE_URL de Vercel**

1. Ve a: https://vercel.com/dashboard
2. Click en tu proyecto `inmobiliaira-code`
3. Click en **Settings** → **Environment Variables**
4. Busca **DATABASE_URL**
5. Click en el ícono del ojo 👁️
6. **Copia toda la URL**

La URL se ve algo así:
```
postgresql://usuario:password@host-xxxxx.aws.neon.tech/database?sslmode=require
```

### **Paso 2: Ejecuta el seed**

```bash
cd "/Users/strega/Desktop/catalogo inmobiliario/catalogo-inmobiliario"

# Reemplaza con tu DATABASE_URL real
DATABASE_URL="postgresql://..." node prisma/seed-produccion.mjs
```

### **Paso 3: Verifica que funcionó**

Deberías ver:
```
✅ SEED COMPLETADO EXITOSAMENTE

🔑 CREDENCIALES DE BROKERS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👨‍💼 Broker 1:
   📧 Email:    broker1@test.com
   🔒 Password: Test123456
   🏢 Compañía: Inmobiliaria ABC

👩‍💼 Broker 2:
   📧 Email:    broker2@test.com
   🔒 Password: Test123456
   🏢 Compañía: Propiedades Premium
```

---

## ✅ ANTES de ejecutar el seed

Asegúrate de que la base de datos tiene el campo `password`:

```bash
# Con tu DATABASE_URL de Vercel:
DATABASE_URL="postgresql://..." npx prisma db push
```

Verás:
```
✔ Your database is now in sync with your Prisma schema.
```

---

## 🧪 PROBAR LOS USUARIOS

### Desde la web:

1. **Login:** https://inmobiliaira-code.vercel.app/auth/signin
2. **Usa:**
   - Email: broker1@test.com
   - Password: Test123456

### Desde la app móvil:

1. Abre **"Broker Chat"** en tu dispositivo
2. **Login con:**
   - Email: broker1@test.com
   - Password: Test123456
3. Deberías ver las conversaciones con los clientes

---

## 📊 RESUMEN DE COMANDOS

```bash
# 1. Navegar al proyecto
cd "/Users/strega/Desktop/catalogo inmobiliario/catalogo-inmobiliario"

# 2. Actualizar schema en Vercel (PRIMERO)
DATABASE_URL="tu-url-de-vercel" npx prisma db push

# 3. Ejecutar seed (SEGUNDO)
DATABASE_URL="tu-url-de-vercel" node prisma/seed-produccion.mjs

# 4. Listo! Ahora prueba en la web o app móvil
```

---

## 🔍 Verificar usuarios creados

```bash
# Abrir Prisma Studio conectado a Vercel
DATABASE_URL="tu-url-de-vercel" npx prisma studio
```

Se abrirá en http://localhost:5555 donde puedes ver todos los usuarios.

---

## ⚠️ IMPORTANTE

Este seed usa **upsert**, lo que significa:
- Si el usuario ya existe → Lo actualiza
- Si no existe → Lo crea

Es seguro ejecutarlo múltiples veces sin duplicar datos.

---

## 🎯 Una vez ejecutado

Podrás:
- ✅ Hacer login en la web con los brokers
- ✅ Hacer login en la app móvil
- ✅ Ver mensajes de prueba en la app
- ✅ Probar el chat en tiempo real
- ✅ Ver propiedades asignadas a cada broker

