import React from "react";
import Image from "next/image";
import Bounded from "@/components/landing/Bounded";
import { getProjects } from "@/supabase/rpc/content";
import type { Project } from "@/supabase/rpc/content";
import { ExternalLink, Github } from "lucide-react";
import "../../styles/projects-masonry.css";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const featuredImage = project.screenshots[0] || "/feature-1.png";

  return (
    <div className="project-card">
      <div className="project-image-container">
        <Image
          src={featuredImage}
          alt={project.title}
          className="project-image"
          width={400}
          height={300}
          unoptimized
        />
        <div className="project-overlay">
          <div className="project-info">
            <h3 className="project-title">{project.title}</h3>
            <p className="project-description">{project.description}</p>

            {project.lead_creator_info && (
              <div className="project-creator">
                {project.lead_creator_info.avatar && (
                  <Image
                    src={project.lead_creator_info.avatar}
                    alt={
                      project.lead_creator_info.displayName ||
                      project.lead_creator_info.username
                    }
                    className="creator-avatar"
                    width={24}
                    height={24}
                    unoptimized
                  />
                )}
                <span className="creator-name">
                  {project.lead_creator_info.displayName ||
                    project.lead_creator_info.username}
                </span>
              </div>
            )}
          </div>

          <div className="project-buttons">
            {project.code_url && (
              <a
                href={project.code_url}
                target="_blank"
                rel="noopener noreferrer"
                className="project-button"
              >
                <Github className="w-4 h-4" />
                Code
              </a>
            )}
            {project.deployed_url && (
              <a
                href={project.deployed_url}
                target="_blank"
                rel="noopener noreferrer"
                className="project-button"
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectsPage = async () => {
  let projects: Project[] = [];
  let error: string | null = null;

  try {
    const projectsResponse = await getProjects(50, 0, true);
    if (projectsResponse.success && projectsResponse.data?.projects) {
      projects = projectsResponse.data.projects;
    } else {
      error = projectsResponse.error || "Failed to load projects";
    }
  } catch {
    error = "Failed to load projects";
  }

  const distributeProjects = (projects: Project[], columns = 3) => {
    const cols: Project[][] = Array.from({ length: columns }, () => []);
    projects.forEach((project, index) => {
      cols[index % columns].push(project);
    });
    return cols;
  };

  const projectColumns = distributeProjects(projects, 3);

  return (
    <Bounded>
      <div className="text-center mb-12">
        <h1 className="text-6xl md:text-7xl font-medium text-foreground mb-4">
          EIT Projects
        </h1>
      </div>

      <div className="glow absolute -z-10 aspect-square w-full max-w-xl rounded-full bg-primary/20 blur-3xl filter" />

      {error ? (
        <div className="no-projects">
          <p className="text-xl mb-2">Unable to load projects</p>
          <p>{error}</p>
        </div>
      ) : projects.length === 0 ? (
        <div className="no-projects">
          <p className="text-xl mb-2">No projects found</p>
          <p>Check back later for exciting new projects from our community!</p>
        </div>
      ) : (
        <div className="projects-grid">
          {projectColumns.map((column, columnIndex) => (
            <div key={columnIndex} className="projects-column">
              {column.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ))}
        </div>
      )}
    </Bounded>
  );
};

export default ProjectsPage;
