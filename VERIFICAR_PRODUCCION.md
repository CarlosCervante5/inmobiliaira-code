# 🔍 Verificación de Problemas en Producción

## Error 401 en Autenticación

Si estás recibiendo errores `401 (Unauthorized)` al intentar iniciar sesión en producción, sigue estos pasos:

### 1. Verificar Variables de Entorno en Vercel

Asegúrate de que estas variables estén configuradas en Vercel:

- `DATABASE_URL` - URL de conexión a Supabase PostgreSQL
- `NEXTAUTH_SECRET` - Secreto para NextAuth (genera uno con: `openssl rand -base64 32`)
- `NEXTAUTH_URL` - URL de tu aplicación (ej: `https://inmobiliaira-code.vercel.app`)

### 2. Verificar Estado de la Base de Datos

Visita este endpoint para diagnosticar problemas:

```
GET https://inmobiliaira-code.vercel.app/api/admin/check-db
```

Este endpoint te mostrará:
- ✅ Si `DATABASE_URL` está configurado
- ✅ Si `NEXTAUTH_SECRET` está configurado
- ✅ Si la conexión a la base de datos funciona
- ✅ Si el usuario admin existe
- ✅ Recomendaciones para solucionar problemas

### 3. Crear/Actualizar Admin en Producción

Si el admin no existe o necesitas resetear la contraseña, usa:

```bash
curl -X POST https://inmobiliaira-code.vercel.app/api/admin/check-db \
  -H "Content-Type: application/json" \
  -d '{
    "token": "create-admin-2024",
    "force": true
  }'
```

**Nota:** Por defecto, el token es `create-admin-2024`. Para mayor seguridad, configura `ADMIN_CREATE_TOKEN` en Vercel.

### 4. Credenciales del Admin

Después de crear el admin, usa estas credenciales:

- **Email:** `admin@test.com`
- **Password:** `Admin123456`

### 5. Verificar Logs en Vercel

Revisa los logs de Vercel para ver mensajes de error detallados:

1. Ve a tu proyecto en Vercel
2. Click en "Deployments"
3. Click en el deployment más reciente
4. Click en "Functions" y revisa los logs

Busca mensajes que empiecen con:
- `🔐 Intentando autenticar:`
- `❌ Error en autenticación:`
- `⚠️ NEXTAUTH_SECRET no está configurado`

### 6. Problemas Comunes

#### Error: "Base de datos no configurada"
- **Solución:** Verifica que `DATABASE_URL` esté configurado en Vercel y que sea correcto

#### Error: "Usuario no encontrado"
- **Solución:** Ejecuta el seeder o crea el admin usando el endpoint `/api/admin/check-db` con POST

#### Error: "Contraseña incorrecta"
- **Solución:** Usa el endpoint POST `/api/admin/check-db` con `force: true` para resetear la contraseña

#### Error: "NEXTAUTH_SECRET no está configurado"
- **Solución:** Genera un secreto y configúralo en Vercel:
  ```bash
  openssl rand -base64 32
  ```

### 7. Probar Autenticación Directamente

Puedes probar la autenticación usando el endpoint de prueba:

```bash
curl -X POST https://inmobiliaira-code.vercel.app/api/test-login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@test.com",
    "password": "Admin123456"
  }'
```

Este endpoint te dirá si las credenciales son correctas sin pasar por NextAuth.

## Error 404 en forgot-password

Este error es normal si no has implementado la funcionalidad de recuperación de contraseña. Puedes ignorarlo o implementar la página más adelante.

