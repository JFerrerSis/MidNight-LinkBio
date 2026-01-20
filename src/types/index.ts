// Usamos "import type" para satisfacer la regla 'verbatimModuleSyntax'
import type { LucideIcon } from 'lucide-react';

export interface LinkItem {
    id: string;
    title: string;
    url: string;
    // Cambiamos a LucideIcon | string para mayor flexibilidad
    icon?: LucideIcon | any;
    isFeatured?: boolean;
}

export interface UserConfig {
    name: string;
    username: string;
    bio: string;
    avatar?: string;
    links: LinkItem[];
}