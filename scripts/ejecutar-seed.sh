#!/bin/bash

# Script para ejecutar el seed de producción
# 
# Uso:
# DATABASE_URL="tu-url" ./scripts/ejecutar-seed.sh
# 
# O hacerlo ejecutable y correrlo:
# chmod +x scripts/ejecutar-seed.sh
# DATABASE_URL="tu-url" ./scripts/ejecutar-seed.sh

set -e  # Salir si hay algún error

echo ""
echo "🌱 Ejecutando seed de producción..."
echo ""

# Verificar que DATABASE_URL esté configurada
if [ -z "$DATABASE_URL" ]; then
    echo "❌ Error: DATABASE_URL no está configurada"
    echo ""
    echo "💡 Uso:"
    echo "   DATABASE_URL=\"tu-url\" ./scripts/ejecutar-seed.sh"
    echo ""
    echo "   O con npm:"
    echo "   DATABASE_URL=\"tu-url\" npm run db:seed"
    echo ""
    exit 1
fi

# Obtener el directorio del script
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT="$( cd "$SCRIPT_DIR/.." && pwd )"

cd "$PROJECT_ROOT"

# Generar Prisma Client primero
echo "🔧 Generando Prisma Client..."
npx prisma generate || echo "⚠️  Advertencia al generar Prisma Client (continuando...)"

echo ""

# Ejecutar el seed de producción
echo "🌱 Ejecutando seed de producción..."
echo ""

node prisma/seed-produccion.mjs

echo ""
echo "=================================================="
echo "✅ SEED EJECUTADO EXITOSAMENTE"
echo "=================================================="
echo ""
echo "📊 Datos creados:"
echo "   ✅ 1 Administrador (admin@test.com / Admin123456)"
echo "   ✅ 2 Brokers (broker1@test.com, broker2@test.com / Test123456)"
echo "   ✅ 2 Clientes (cliente1@test.com, cliente2@test.com / Test123456)"
echo "   ✅ 3 Propiedades de ejemplo"
echo "   ✅ 5 Categorías de servicios"
echo "   ✅ 15+ Servicios de ejemplo"
echo "   ✅ 7 Proveedores de servicios"
echo "   ✅ Mensajes y leads de ejemplo"
echo ""
echo "🎉 Tu base de datos está lista para usar!"
echo ""

