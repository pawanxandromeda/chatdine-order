// components/ui/section-header.tsx
"use client";
import { motion } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  description?: string;
  delay?: number;
}

export const SectionHeader = ({ title, description, delay = 0 }: SectionHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="mb-6"
    >
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      {description && (
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      )}
    </motion.div>
  );
};