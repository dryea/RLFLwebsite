"use client";

import React from "react";
import { motion } from "framer-motion";
import Breadcrumb from "./Breadcrumb";
import Container from "@/components/ui/Container";
import { Heading, Text, BadgeTitle } from "@/components/ui/Typography";
import { cn } from "@/lib/utils";

interface CrumbItem {
  label: string;
  href?: string;
}

interface PageWrapperProps {
  title?: string;
  subtitle?: string;
  description?: string;
  badge?: string;
  breadcrumbs?: CrumbItem[];
  variant?: "default" | "brand" | "minimal";
  children: React.ReactNode;
  className?: string;
}

/**
 * Standardized Page Wrapper layout primitive supplying responsive hero headers,
 * automatic breadcrumb navigation, and Framer Motion transitions.
 */
export default function PageWrapper({
  title,
  subtitle,
  description,
  badge,
  breadcrumbs,
  variant = "default",
  children,
  className,
}: PageWrapperProps) {
  const sub = subtitle || description;
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={cn("min-h-screen bg-surface-alt", className)}
    >
      {/* Breadcrumbs Navigation */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Breadcrumb items={breadcrumbs} />
      )}

      {/* Page Hero Header Strip */}
      {title && (
        <div
          className={cn(
            "relative py-12 md:py-16 overflow-hidden border-b border-slate-200/80",
            variant === "brand"
              ? "bg-gradient-to-r from-primary-950 via-primary-900 to-primary-950 text-white"
              : variant === "default"
              ? "bg-gradient-to-b from-primary-50/70 via-surface-alt to-surface-alt"
              : "bg-surface"
          )}
        >
          <Container>
            <div className="max-w-3xl">
              {badge && <BadgeTitle className="mb-3">{badge}</BadgeTitle>}
              <Heading
                as="h1"
                size="xl"
                className={cn(
                  variant === "brand" ? "text-white" : "text-primary-950"
                )}
              >
                {title}
              </Heading>
              {sub && (
                <Text
                  variant="subtitle"
                  className={cn(
                    "mt-3",
                    variant === "brand" ? "text-slate-300" : "text-text-secondary"
                  )}
                >
                  {sub}
                </Text>
              )}
            </div>
          </Container>
        </div>
      )}

      {/* Main Page Content Area */}
      <main className="py-8 md:py-12">{children}</main>
    </motion.div>
  );
}
