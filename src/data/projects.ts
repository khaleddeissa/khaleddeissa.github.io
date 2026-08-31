export interface Project {
  title: string;
  description: string;
  url: string;
}

export const projects: Project[] = [
  {
    title: "ops-pilot",
    description:
      "Production-grade multi-agent AI DevOps system for SRE incident response, where a central orchestrator coordinates 12 specialist agents to classify incidents, traverse service dependency graphs, analyze repositories, Terraform, and telemetry, determine root cause, and stream real-time remediation plans to operators via SSE.",
    url: "https://github.com/khaleddeissa/ops-pilot",
  },
  {
    title: "A2A Vulnerability Scanner",
    description:
      "A multi-agent AI system that scans websites for security vulnerabilities. It uses the A2A (Agent-to-Agent) protocol for orchestration and MCP (Model Context Protocol) for tool integration. Specialized agents work together: they gather threat intel, crawl the site, analyze vulnerabilities, and produce a report.",
    url: "https://github.com/khaleddeissa/A2A-Vulnerability-Scanner",
  },
  {
    title: "A2A Agent Orchestration System",
    description:
      "A distributed multi-agent system that orchestrates complex tasks across specialized AI agents using A2A (Agent-to-Agent) protocol, MCP (Model Context Protocol) and LangGraph.",
    url: "https://github.com/khaleddeissa/A2A-Agent-Orchestration-System",
  },
  {
    title: "Traffic & Vehicles Object Detection Using YOLOv5",
    description:
      "An application designed for detecting and visualizing traffic-related objects in both images and videos. Leveraging YOLOv5, it identifies traffic elements such as cars and number plates, making it suitable for traffic monitoring and analysis.",
    url: "https://github.com/khaleddeissa/Traffic-Vehicles-Object-Detection-Using-YOLOv5",
  },
  {
    title: "Car Detection Using YOLOv5",
    description:
      "A car detection system capable of identifying and drawing bounding boxes around cars in various traffic scenes, designed to work with images containing multiple vehicles and accurately localize each one.",
    url: "https://github.com/khaleddeissa/Car-Detection-Using-YOLOv5",
  },
  {
    title: "Car Logo Classification",
    description:
      "A CNN model that accurately identifies which car brand a logo belongs to among eight possible brands: Hyundai, Lexus, Mazda, Mercedes, Opel, Skoda, Toyota, and Volkswagen.",
    url: "https://github.com/khaleddeissa/Car-Logo-Classification",
  },
  {
    title: "Fake vs. Real Face Detector",
    description:
      "A deep learning model that acts as a discriminator between real and fake faces, implemented as two parallel models — one in TensorFlow and one in PyTorch.",
    url: "https://github.com/khaleddeissa/Fake-vs-Real-Face-Detector",
  },
];
