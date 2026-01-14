interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
}

export function Divider({ orientation = 'horizontal' }: DividerProps = {}) {
  return (
    <div 
      className={orientation === 'vertical' ? 'w-px h-6 bg-zinc-800' : 'w-full h-px bg-zinc-800'} 
    />
  );
}