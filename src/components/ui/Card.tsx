import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
  icon?: ReactNode;
}

export const Card = ({ children, className = "", title, icon }: CardProps) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-md p-6 border border-gray-200 ${className}`}
    >
      {(title || icon) && (
        <div className="flex items-center gap-2 mb-4">
          {icon && <div className="text-gray-600">{icon}</div>}
          {title && (
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          )}
        </div>
      )}
      {children}
    </div>
  );
};

