---
title: "The AI Engineering Cycle: Ground the Problem Before You Ground the Model"
date: 2026-01-15
excerpt: "It's tempting to start with the model — RAG, fine-tuning, which LLM. In practice, the first questions should be about the problem, the users, and how we'll know we solved it well."
coverImage: ../../assets/blog/framework.png
coverImageAlt: "Diagram of the AI engineering cycle"
---

When I start working on a new AI application, I try not to start with the model.

It is very tempting to do that.

Should we use RAG? Should we use an agent? Which LLM should we use? Should we fine-tune? Which framework should we use? Should this run on Kubernetes or serverless infrastructure?

These are all valid questions, but in my experience, they are usually not the first questions we should be asking.

The first thing I want to understand is much simpler: **what problem are we actually solving, who are we solving it for, and how will we know whether we solved it well?**

I think of this as grounding the problem before grounding the model.

An AI application is still an engineering system. The model is one component of that system, not the definition of the system itself.

The work usually starts with requirements, stakeholders, constraints, evaluation, infrastructure, and technology choices. Then we build something, measure it, learn from it, and go back around the cycle. And importantly, we don't need to know everything before starting. That is part of the nature of AI engineering.

## Start with the problem, not the technology

The first discussions should be around the initial scope and requirements.

What are we trying to build? Who are the users? What should the application do? What should it not do? What does the first iteration need to achieve?

At this point, there will probably be things we don't know. That is normal. The purpose of the first discussion isn't to create a perfect specification that will never change. It is to get the relevant people aligned on what we currently understand and what we are going to build first.

This means getting agreement with the relevant stakeholders, product owners, customers, and engineering team on the initial scope.

I also want to distinguish between functional requirements and non-functional requirements early. The functional requirement might be: "The system should answer questions about our internal documentation." But that isn't enough. We might also need: "The response should be available within three seconds for normal requests." Or: "The system should be available to internal users during business hours." Or: "Customer data cannot leave the organization's private environment." Those constraints can completely change the architecture.

## Define how we are going to measure success

One of the conversations I want to have as early as possible is about evaluation.

It is surprisingly easy to build an AI application that appears to work. The harder question is whether it is actually good enough.

This becomes especially important because AI quality isn't always binary. For a traditional application, we might know exactly what the expected output is. With an LLM-based application, there may be several acceptable answers. One response might be more relevant than another. One might be technically correct but poorly grounded. Another might be useful but too expensive or too slow.

So we need to define what "good" means for this particular application. That could involve business metrics, such as task completion or reduction in manual work. It could involve quality metrics such as accuracy, relevance, groundedness, retrieval quality, hallucination rate, or safety. And it could involve engineering metrics such as latency, throughput, error rate, token consumption, number of model calls, and cost per request.

The exact metrics depend on the application. What matters to me is that we agree on them early enough that we can use them to compare iterations.

If someone says "the responses should be more helpful," that isn't yet a useful evaluation criterion. We need to turn that into something that can actually be measured — for example, a target such as "90% of responses should meet the agreed relevance criteria on the evaluation dataset." Now we have something that we can compare between versions. If we change the model, prompt, retrieval strategy, or architecture, we can ask whether the system actually improved.

## The evaluation dataset is part of the product

Once we have decided how to measure quality, we need something against which to measure it. This is where the evaluation dataset becomes important.

I don't think an evaluation dataset should just be a collection of examples where the system is expected to succeed. It should represent the environment in which the application will actually operate. That means including normal scenarios, difficult scenarios, edge cases, ambiguous requests, real-life examples, and failure cases. Depending on the application, it may also need adversarial cases — if the system is exposed to users who might intentionally manipulate it, those cases should be represented in evaluation as well. The dataset should also be reviewed for bias and representativeness where that matters.

For domain-specific applications, I strongly prefer having domain experts involved in evaluating the data and expected results when possible. A response can look perfectly reasonable to an engineer and still be completely wrong from a domain perspective.

The evaluation process shouldn't be something we create at the end of development. It should develop alongside the application. We also need to decide when evaluation happens: a model change might trigger it, a prompt change might trigger it, a change to the retrieval pipeline might trigger it, a significant requirements change might require a new cycle. We may also have a fixed evaluation before a production rollout, or a periodic evaluation after deployment.

This gives us something much more useful than simply asking "does it work?" We can instead ask: did this change make the system better or worse according to the criteria we agreed on? That is a much more engineering-oriented way of developing AI systems.

## Infrastructure comes from the requirements

Once the problem and its constraints are becoming clearer, we can start thinking seriously about infrastructure. This is another area where I try to avoid starting with a technology preference.

The question isn't "should we use Kubernetes?" The question is "what does this application require, and what infrastructure satisfies those requirements?"

Maybe the application is a small internal tool with relatively low traffic. Maybe it is a high-volume customer-facing application where latency and availability are critical. Maybe we need GPUs. Maybe we don't. Maybe pay-as-you-go infrastructure makes sense, or maybe the workload is predictable enough that provisioned capacity is more economical.

We also need to think about where the application is allowed to run. Is it cloud-hosted or on-premises? Does it need to run inside a private network? Does it require a VPC or private connectivity? Can it be exposed through the public internet? What authentication and authorization mechanisms are required? What are the data residency and security requirements?

These decisions aren't separate from the AI system. They are part of the system.

## Technology choices should be validated, not assumed

After understanding the requirements and constraints, we can start choosing the technologies — the foundation model, model provider, embedding model, vector database, retrieval framework, agent framework, application framework, deployment technology, observability platform, and so on.

I don't think the objective should be to choose the most popular technology. The objective is to find something that satisfies the requirements. For well-understood problems, this might be straightforward. For new problems, it often isn't — sometimes we simply don't know whether a particular model, framework, or architecture will work well enough.

That's when I think research and small POCs are extremely valuable. A few days of experimentation might answer questions that would otherwise take weeks to discover during implementation: can the model reach the required quality? Can retrieval provide the right context? Can we meet the latency target? Is the expected cost acceptable? Can the architecture handle the expected throughput? Does the framework provide the control we need?

A POC isn't necessarily about building the final product. Sometimes its most valuable outcome is discovering that our initial assumption was wrong. Finding that out early is a success.

## Documentation is part of the engineering work

Another thing that becomes important throughout this process is documentation — not for its own sake, but to capture the decisions we have made.

During discovery, I want to be able to look back and understand: what problem were we solving, what scope did we agree on, what assumptions did we make, what were the functional and non-functional requirements, what SLAs were agreed upon, how were we going to evaluate the system, which metrics mattered, what infrastructure constraints existed, which technologies were selected and why.

As implementation progresses, that documentation needs to evolve with the technical design. Architecture, components, data flows, models, prompts, retrieval, databases, deployment, security, monitoring, and known limitations all become part of the picture. This becomes particularly useful when the project changes — and it will change.

## AI engineering is iterative by nature

I don't think AI engineering should be treated as a waterfall process where we need to know every requirement, architectural decision, and technical detail before development starts.

There will be unknowns. Some requirements will be missing. Some assumptions will turn out to be wrong. A model might perform differently than expected. A framework might not work for the use case. An evaluation metric might not capture what the business actually cares about. The architecture might need to change.

That's why I see the process as iterative. We agree on what we know, define a reasonable first scope, build something, evaluate it, learn from the results, and use those results to inform the next iteration. The important thing is not to pretend that uncertainty doesn't exist — it is to make uncertainty visible and create a process for resolving it.

## Not every change is the same

Some changes are small enough to absorb into the next sprint. Others aren't. If the business objective changes, the target users change, the expected volume changes significantly, a new compliance requirement appears, or the SLA changes, then we may need to stop and realign.

That conversation should involve the relevant stakeholders and the senior members of the technical team. We need to understand what changed and what that means for the scope, architecture, infrastructure, evaluation criteria, timeline, and cost. Sometimes the evaluation criteria themselves need to change, and sometimes the change is significant enough that we effectively need to start another cycle. That's not necessarily a failure — the worst outcome is continuing to optimize an AI system against requirements that are no longer relevant.

## An AI engineer has to speak different languages

One of the less technical parts of the job is also one of the most important: an AI engineer will often have conversations with people who care about very different things.

If I'm speaking to a CEO or another business stakeholder, I probably don't need to explain the details of an embedding model or why one orchestration framework was selected. I need to explain the problem, the expected business impact, the major risks, the high-level architecture, and the metrics we will use to determine whether the investment is working.

With a CFO, the technical conversation needs to connect to economics: expected usage, infrastructure cost, model/API cost, cost per request, scalability, and business impact.

With a product owner, the conversation is more about users, requirements, scope, acceptance criteria, quality, and release expectations.

With the engineering team, we can go deep into architecture, models, APIs, retrieval, data pipelines, deployment, observability, security, performance, and failure modes.

But there is one thing that shouldn't change between these conversations: the business problem remains the reason the system exists. Technical decisions should ultimately trace back to that problem.

## Production is where the next cycle begins

Getting an AI application into production isn't the end of the process. In many ways, it is where we start receiving the most valuable information.

The model can degrade. The underlying data can change. User behavior can change. Latency can increase. Costs can grow. Retrieval quality can decline. New failure modes can appear. Users can discover ways to manipulate the system, including things such as prompt injection.

This means production needs monitoring and controls that go beyond traditional application health metrics. We may need to monitor quality, cost, latency, token usage, model usage, infrastructure utilization, data quality, data drift, retrieval performance, safety issues, and user feedback.

For some applications, traceability is also important. When something goes wrong, we may need to know which model version generated the response, which prompt was used, which documents were retrieved, which tools were called, and what configuration was active. That information can make the difference between spending hours trying to reproduce a problem and being able to understand exactly what happened.

## Monitoring isn't always enough

For higher-risk applications, we may also need periodic audits and reviews. The exact process depends on the organization and the application, but it could include reviews of quality, safety, security, fairness, data governance, model changes, performance, cost, responsible AI requirements, and compliance.

The point isn't that every AI application needs a large governance process. The point is that the level of monitoring and governance should match the risk of the system. An internal experimentation tool and an AI system making decisions in a high-impact business process shouldn't necessarily have the same controls.

## The cycle

When I put all of this together, I don't see AI engineering as a straight line from requirements to deployment. I see it more like a loop:

Ground the problem → Define requirements → Define success → Evaluate → Design → Build → Deploy → Monitor → Learn → Refine → Repeat

And the arrows should eventually come back to the beginning. Production teaches us something. Evaluation teaches us something. Users teach us something. New requirements teach us something. And those lessons should feed back into the next version of the system.

The technology will change. Models will change. Frameworks will change. Infrastructure will change. But the engineering discipline remains: understand the problem, define what success means, make it measurable, build against the requirements, evaluate what you built, monitor it in the real world, learn from what happens, then do it again.

That, to me, is the AI engineering cycle.

And perhaps the most important part of it is this: don't start by asking which model you should use. Start by understanding what you're trying to accomplish.
