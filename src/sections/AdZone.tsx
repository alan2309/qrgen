interface AdZoneProps {
  variant?: 'top' | 'mid' | 'bottom' | 'sidebar';
  className?: string;
}

export default function AdZone({ variant = 'mid', className = '' }: AdZoneProps) {
  const heights: Record<string, string> = {
    top: 'h-[90px] sm:h-[90px]',
    mid: 'h-[90px] sm:h-[90px]',
    bottom: 'h-[90px] sm:h-[90px]',
    sidebar: 'h-full min-h-[400px]',
  };

  if (variant === 'sidebar') {
    return (
      <div className={`hidden lg:flex ad-zone-dark rounded-xl ${heights[variant]} ${className}`}>
        <span className="text-xs text-[#f0f0f0]/20 [writing-mode:vertical-lr]">Advertisement</span>
      </div>
    );
  }

  return (
    <div className={`w-full ad-zone ${heights[variant]} ${className}`}>
      <span className="text-xs text-[#999]">Advertisement</span>
    </div>
  );
}
