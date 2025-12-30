import { 
  Sparkles, 
  Wrench, 
  Home, 
  Building2, 
  TreePine, 
  Hammer,
  Droplet,
  Zap,
  Paintbrush,
  Sofa,
  Tv,
  Lightbulb,
  Fan,
  Car,
  Scissors,
  Trash2,
  Brush,
  DoorOpen,
  Square,
  LucideIcon
} from 'lucide-react'

// Mapeo de emojis/iconos a componentes de Lucide
const iconMap: Record<string, LucideIcon> = {
  '✨': Sparkles,
  '🔧': Wrench,
  '🏠': Home,
  '🏢': Building2,
  '🌳': TreePine,
  '🔨': Hammer,
  '💧': Droplet,
  '⚡': Zap,
  '🎨': Paintbrush,
  '🛋️': Sofa,
  '📺': Tv,
  '💡': Lightbulb,
  '🌀': Fan,
  '🚗': Car,
  '✂️': Scissors,
  '🗑️': Trash2,
  '🖌️': Brush,
  '🚪': DoorOpen,
  '⬜': Square,
}

// Mapeo de nombres a iconos
const nameIconMap: Record<string, LucideIcon> = {
  'limpieza': Sparkles,
  'instalacion': Wrench,
  'handyman': Hammer,
  'exteriores': TreePine,
  'renovaciones': Home,
  'plomeria': Droplet,
  'electricidad': Zap,
  'pintura': Paintbrush,
  'muebles': Sofa,
  'tv': Tv,
  'iluminacion': Lightbulb,
  'ventilacion': Fan,
  'jardineria': TreePine,
}

export function getIconFromString(iconString: string | null | undefined): LucideIcon {
  if (!iconString) return Home
  
  // Si es un emoji, buscar en el mapa de emojis
  if (iconMap[iconString]) {
    return iconMap[iconString]
  }
  
  // Si es un nombre, buscar en el mapa de nombres
  const lowerIcon = iconString.toLowerCase()
  if (nameIconMap[lowerIcon]) {
    return nameIconMap[lowerIcon]
  }
  
  // Por defecto, usar Home
  return Home
}

// Mapeo de colores
const colorMap: Record<string, string> = {
  'blue': 'bg-blue-500',
  'green': 'bg-green-500',
  'orange': 'bg-orange-500',
  'purple': 'bg-purple-500',
  'red': 'bg-red-500',
  'yellow': 'bg-yellow-500',
  'pink': 'bg-pink-500',
  'indigo': 'bg-indigo-500',
  'emerald': 'bg-emerald-500',
}

export function getColorClass(color: string | null | undefined): string {
  if (!color) return 'bg-blue-500'
  
  const lowerColor = color.toLowerCase()
  return colorMap[lowerColor] || `bg-${lowerColor}-500` || 'bg-blue-500'
}

