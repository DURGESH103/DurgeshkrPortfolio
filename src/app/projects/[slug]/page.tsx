import { projects } from '@/data/portfolio';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ProjectPageClient from './ProjectPageClient';

export function generateStaticParams() {
  return projects.map(p => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find(p => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} — Durgesh Kumar`,
    description: project.description,
  };
}

export default async function ProjectPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const project = projects.find(p => p.slug === slug);
  if (!project) notFound();
  return <ProjectPageClient project={project} />;
}
