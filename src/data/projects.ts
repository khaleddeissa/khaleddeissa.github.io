export interface Project {
  title: string;
  description: string;
  url: string;
}

export const projects: Project[] = [
  {
    title: "llm-refract",
    description:
      "An open execution layer for AI systems. Records model calls, tools, retrieval, decisions, state changes, checkpoints, and failures in portable .rfr files. Python and TypeScript SDKs connect to a Rust engine for inspection, recorded replay, prefix forks, and execution comparison across the CLI, browser, MCP, and GitHub regression workflows.",
    url: "https://github.com/khaleddeissa/llm-refract",
  },
  {
    title: "infra-contract",
    description:
      "Version-controlled infrastructure rules for people, CI, and AI agents. Evaluates Terraform/OpenTofu plans against a small, reviewable YAML contract covering security, architecture, reliability, and destructive-change risk, so humans and AI agents get the same answer before a change is merged or deployed. Ships as a Python package, a GitHub Action, a Docker image, and an MCP server for agent tooling.",
    url: "https://github.com/khaleddeissa/infra-contract",
  },
  {
    title: "ops-pilot",
    description:
      "Production-grade multi-agent AI DevOps system for SRE incident response, where a central orchestrator coordinates 12 specialist agents to classify incidents, traverse service dependency graphs, analyze repositories, Terraform, and telemetry, determine root cause, and stream real-time remediation plans to operators via SSE.",
    url: "https://github.com/khaleddeissa/ops-pilot",
  },
  {
    title: "a2a-vulnerability-scanner",
    description:
      "A multi-agent AI system that scans websites for security vulnerabilities. It uses the A2A (Agent-to-Agent) protocol for orchestration and MCP (Model Context Protocol) for tool integration. Specialized agents work together: they gather threat intel, crawl the site, analyze vulnerabilities, and produce a report.",
    url: "https://github.com/khaleddeissa/a2a-vulnerability-scanner",
  },
  {
    title: " a2a-agent-orchestration-system",
    description:
      "A distributed multi-agent system that orchestrates complex tasks across specialized AI agents using A2A (Agent-to-Agent) protocol, MCP (Model Context Protocol) and LangGraph.",
    url: "https://github.com/khaleddeissa/a2a-agent-orchestration-system",
  },
  {
    title: "traffic-vehicles-object-detection",
    description:
      "An application designed for detecting and visualizing traffic-related objects in both images and videos. Leveraging YOLOv5, it identifies traffic elements such as cars and number plates, making it suitable for traffic monitoring and analysis.",
    url: "https://github.com/khaleddeissa/traffic-vehicles-object-detection",
  },
  {
    title: "car-detector",
    description:
      "A car detection system capable of identifying and drawing bounding boxes around cars in various traffic scenes, designed to work with images containing multiple vehicles and accurately localize each one.",
    url: "https://github.com/khaleddeissa/car-detector",
  },
  {
    title: "car-logo-classification",
    description:
      "A CNN model that accurately identifies which car brand a logo belongs to among eight possible brands: Hyundai, Lexus, Mazda, Mercedes, Opel, Skoda, Toyota, and Volkswagen.",
    url: "https://github.com/khaleddeissa/car-logo-classification",
  },
  {
    title: "fake-vs-real-face-detector",
    description:
      "A deep learning model that acts as a discriminator between real and fake faces, implemented as two parallel models — one in TensorFlow and one in PyTorch.",
    url: "https://github.com/khaleddeissa/fake-vs-real-face-detector",
  },
];
