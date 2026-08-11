type CardProps = {
  children: React.ReactNode;
  className?: string;
};

function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`bg-white rounded-3xl shadow-2xl border border-gray-100 ${className}`}
    >
      {children}
    </div>
  );
}

export default Card;
