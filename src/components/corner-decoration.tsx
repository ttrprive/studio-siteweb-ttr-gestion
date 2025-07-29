import Image from 'next/image';
import { cn } from '@/lib/utils';

type CornerDecorationProps = {
  src: string;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
};

const CornerDecoration = ({ src, position, className }: CornerDecorationProps) => {
  const positionClasses = {
    'top-left': 'top-0 left-0',
    'top-right': 'top-0 right-0',
    'bottom-left': 'bottom-0 left-0',
    'bottom-right': 'bottom-0 right-0',
  };

  return (
    <div
      className={cn(
        'absolute -z-10 opacity-50',
        positionClasses[position],
        className
      )}
      aria-hidden="true"
    >
      <Image
        src={src}
        alt="Decorative element"
        width={200}
        height={200}
        className="animate-float"
      />
    </div>
  );
};

export default CornerDecoration;
