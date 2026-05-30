import Link from "next/link";

interface ToolCardProps {
  title: string;
  description: string;
  href: string;
  icon: string;
  badge?: string;
}

export default function ToolCard({ title, description, href, icon, badge }: ToolCardProps) {
  return (
    <Link
      href={href}
      className="group block bg-white rounded-xl border border-slate-200 p-6 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-200"
    >
      <div className="flex items-start gap-4">
        <span className="text-3xl">{icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-slate-800 group-hover:text-primary transition-colors">
              {title}
            </h3>
            {badge && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                {badge}
              </span>
            )}
          </div>
          <p className="text-sm text-slate-500 line-clamp-2">{description}</p>
        </div>
      </div>
    </Link>
  );
}
