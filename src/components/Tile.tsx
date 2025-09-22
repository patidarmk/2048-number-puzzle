import React from 'react';
import { cn } from '@/lib/utils';

interface TileProps {
  value: number;
  x: number;
  y: number;
  isNew?: boolean;
  isMerged?: boolean;
}

const Tile: React.FC<TileProps> = ({ value, x, y, isNew = false, isMerged = false }) => {
  const getTileStyle = (value: number) => {
    const styles: Record<number, { bg: string; text: string; shadow: string }> = {
      2: { bg: 'bg-slate-100', text: 'text-slate-800', shadow: 'shadow-sm' },
      4: { bg: 'bg-slate-200', text: 'text-slate-800', shadow: 'shadow-sm' },
      8: { bg: 'bg-amber-400', text: 'text-amber-900', shadow: 'shadow-amber-200/50' },
      16: { bg: 'bg-amber-500', text: 'text-amber-50', shadow: 'shadow-amber-300/50' },
      32: { bg: 'bg-amber-600', text: 'text-amber-50', shadow: 'shadow-amber-400/50' },
      64: { bg: 'bg-amber-700', text: 'text-amber-50', shadow: 'shadow-amber-500/50' },
      128: { bg: 'bg-orange-400', text: 'text-orange-50', shadow: 'shadow-orange-200/50' },
      256: { bg: 'bg-orange-500', text: 'text-orange-50', shadow: 'shadow-orange-300/50' },
      512: { bg: 'bg-orange-600', text: 'text-orange-50', shadow: 'shadow-orange-400/50' },
      1024: { bg: 'bg-orange-700', text: 'text-orange-50', shadow: 'shadow-orange-500/50' },
      2048: { bg: 'bg-yellow-500', text: 'text-yellow-900', shadow: 'shadow-yellow-300/50' },
    };
    
    return styles[value] || { bg: 'bg-yellow-600', text: 'text-yellow-50', shadow: 'shadow-yellow-400/50' };
  };

  const { bg, text, shadow } = getTileStyle(value);

  return (
    <div
      className={cn(
        'absolute flex items-center justify-center rounded-xl font-bold text-lg md:text-2xl transition-all duration-200 ease-in-out transform',
        bg,
        text,
        shadow,
        'shadow-lg',
        isNew && 'animate-pop scale-90',
        isMerged && 'animate-merge',
        value >= 128 && 'text-xl md:text-2xl',
        value >= 1024 && 'text-2xl md:text-3xl'
      )}
      style={{
        width: 'calc(25% - 8px)',
        height: 'calc(25% - 8px)',
        top: `calc(${y * 25}% + 4px)`,
        left: `calc(${x * 25}% + 4px)`,
        zIndex: value,
      }}
    >
      {value}
    </div>
  );
};

export default Tile;