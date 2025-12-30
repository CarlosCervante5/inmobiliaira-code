#!/bin/bash

# Script para aplicar migración usando psql directamente
# 
# Uso:
# ./scripts/aplicar-migracion-directa.sh

DATABASE_URL="${DATABASE_URL:-postgres://postgres.rptrmsouwsxybvznkrir:tqPlG6LZueKblPou@aws-1-us-east-1.pooler.supabase.com:5432/postgres?sslmode=require}"

echo "🚀 Aplicando migración de servicios..."
echo ""

# Extraer componentes de la URL
# Nota: Para Supabase, usa el puerto 5432 (directo) en lugar de 6543 (pooler)
MIGRATION_FILE="prisma/migrations/20250111120000_add_services_and_providers/migration.sql"

if [ ! -f "$MIGRATION_FILE" ]; then
  echo "❌ No se encontró el archivo de migración: $MIGRATION_FILE"
  exit 1
fi

echo "📄 Ejecutando migración SQL..."
echo ""

# Usar psql si está disponible, o sugerir ejecutar manualmente
if command -v psql &> /dev/null; then
  # Extraer credenciales de la URL
  # Formato: postgres://user:password@host:port/database
  psql "$DATABASE_URL" -f "$MIGRATION_FILE"
  
  if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Migración aplicada exitosamente!"
  else
    echo ""
    echo "❌ Error aplicando migración"
    exit 1
  fi
else
  echo "⚠️  psql no está instalado"
  echo ""
  echo "💡 OPCIONES:"
  echo ""
  echo "1. Instalar psql:"
  echo "   brew install postgresql  # macOS"
  echo "   sudo apt-get install postgresql-client  # Linux"
  echo ""
  echo "2. Ejecutar el SQL manualmente en Supabase Dashboard:"
  echo "   - Ve a: https://supabase.com/dashboard"
  echo "   - Selecciona tu proyecto"
  echo "   - Ve a SQL Editor"
  echo "   - Copia y pega el contenido de: $MIGRATION_FILE"
  echo "   - Ejecuta el SQL"
  echo ""
  echo "3. Usar el script Node.js:"
  echo "   DATABASE_URL=\"tu-url\" node scripts/aplicar-migracion-servicios.mjs"
  echo ""
  exit 1
fi

