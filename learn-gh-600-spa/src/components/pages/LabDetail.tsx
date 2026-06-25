// =========================================================================
// Captain Corgi Hub — LabDetail Page
// Renders individual lab with metadata, tools, and instructions
// =========================================================================

import { useParams, Link } from 'react-router-dom';
import { useProgress } from '@/hooks/useProgress';
import { Badge } from '@/components/ui/Badge';
import styles from './LabDetail.module.css';

const LABS = [
  { id: 0, title: 'Bootstrap corgi-greeter', description: 'Create the Go app, Docker build, Docker Hub push, and AWS deploy baseline.', weight: 'Prereq', tools: ['Go', 'Actions', 'Docker Hub', 'AWS'], domain: null, steps: ['Initialize Go module and main.go', 'Write Dockerfile and build image', 'Push to Docker Hub', 'Configure GitHub Actions workflow', 'Deploy to AWS EC2'] },
  { id: 1, title: 'SDLC architecture', description: 'Separate planning from execution with issues, PRs, CODEOWNERS, labels, and rulesets.', weight: '15-20%', tools: ['Copilot', 'PRs', 'Rulesets'], domain: 0, steps: ['Create issue templates for planning and execution', 'Set up CODEOWNERS file', 'Configure branch protection rulesets', 'Define label taxonomy', 'Create PR template with checklist'] },
  { id: 2, title: 'Tools and MCP', description: 'Configure MCP allow lists, custom agents, branch scope, retries, rollback, and escalation.', weight: '20-25%', tools: ['MCP', 'custom agents', 'firewall'], domain: 1, steps: ['Set up MCP server configuration', 'Define tool allow lists', 'Create custom agent definitions', 'Implement branch-scoped execution', 'Add retry and rollback logic', 'Configure escalation policies'] },
  { id: 3, title: 'Memory and state', description: 'Persist decisions, resume interrupted work, and detect context drift.', weight: '10-15%', tools: ['Issues', 'AGENTS.md', 'decisions'], domain: 2, steps: ['Create AGENTS.md with project conventions', 'Set up decision log in issues', 'Implement context drift detection', 'Configure memory persistence layer', 'Test resume-after-interrupt flow'] },
  { id: 4, title: 'Evaluation and tuning', description: 'Score repeated agent runs with tests, scans, traces, and root-cause buckets.', weight: '15-20%', tools: ['Actions', 'CodeQL', 'evals'], domain: 3, steps: ['Define success metrics and scoring rubric', 'Set up CodeQL scanning', 'Create evaluation workflow in Actions', 'Build root-cause classification buckets', 'Run comparative evaluation across runs'] },
  { id: 5, title: 'Multi-agent coordination', description: 'Run specialist agents in isolated branches and merge their artifacts safely.', weight: '15-20%', tools: ['matrix', 'artifacts', 'coordinator'], domain: 4, steps: ['Design coordinator agent pattern', 'Set up matrix strategy for parallel agents', 'Implement artifact passing between agents', 'Add conflict detection and resolution', 'Test end-to-end multi-agent workflow'] },
  { id: 6, title: 'Guardrails', description: 'Apply autonomy levels, least privilege, approvals, hard blocks, and audit trails.', weight: '10-15%', tools: ['environments', 'OIDC', 'audit'], domain: 5, steps: ['Define autonomy levels for different risk tiers', 'Configure least-privilege OIDC tokens', 'Set up environment protection rules', 'Implement hard blocks for dangerous operations', 'Create audit trail logging'] },
  { id: 7, title: 'Capstone', description: 'Ship one end-to-end agentic change from issue to production deployment.', weight: 'All', tools: ['issue', 'PR', 'eval', 'deploy'], domain: null, steps: ['Create a new feature issue', 'Let the agent plan and implement via PR', 'Review the agent-generated code', 'Run evaluation suite against the change', 'Deploy to production via the agent pipeline', 'Verify deployment and close the issue'] },
];

export function LabDetail() {
  const { labId } = useParams<{ labId: string }>();
  const { markLabComplete, progress } = useProgress();
  const id = parseInt(labId ?? '0', 10);
  const lab = LABS.find((l) => l.id === id);
  const isCompleted = progress.labs.completed.includes(id);

  if (!lab) {
    return (
      <div className={styles.container}>
        <h1>Lab not found</h1>
        <Link to="/labs">← Back to Labs</Link>
      </div>
    );
  }

  const prevLab = id > 0 ? LABS.find((l) => l.id === id - 1) : undefined;
  const nextLab = id < 7 ? LABS.find((l) => l.id === id + 1) : undefined;

  return (
    <div className={styles.container}>
      <Link to="/labs" className={styles.backLink}>← Back to Labs</Link>

      <div className={styles.hero}>
        <div className={styles.heroTop}>
          <span className={styles.heroNumber}>{lab.id}</span>
          <div className={styles.heroBadges}>
            <span className={styles.weightBadge}>{lab.weight}</span>
            {lab.domain !== null && (
              <Badge variant="accent" size="sm">Domain {lab.domain + 1}</Badge>
            )}
            {isCompleted && (
              <Badge variant="success" size="sm">Completed</Badge>
            )}
          </div>
        </div>
        <h1 className={styles.title}>{lab.title}</h1>
        <p className={styles.description}>{lab.description}</p>
      </div>

      <div className={styles.toolsSection}>
        <h3 className={styles.sectionTitle}>Tools</h3>
        <div className={styles.toolsList}>
          {lab.tools.map((tool) => (
            <Badge key={tool} variant="outline" size="sm">{tool}</Badge>
          ))}
        </div>
      </div>

      <div className={styles.stepsSection}>
        <h3 className={styles.sectionTitle}>Steps</h3>
        <ol className={styles.stepsList}>
          {lab.steps.map((step, i) => (
            <li key={i} className={styles.step}>
              <span className={styles.stepNumber}>{i + 1}</span>
              <span className={styles.stepText}>{step}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className={styles.actions}>
        {!isCompleted && (
          <button
            type="button"
            className={styles.completeBtn}
            onClick={() => markLabComplete(id)}
          >
            Mark as Complete
          </button>
        )}
        {isCompleted && (
          <Badge variant="success" size="md">✓ Lab Completed</Badge>
        )}
      </div>

      <div className={styles.pagination}>
        {prevLab ? (
          <Link to={`/labs/${prevLab.id}`} className={styles.prevLink}>
            ← Lab {prevLab.id}: {prevLab.title}
          </Link>
        ) : <span />}
        {nextLab ? (
          <Link to={`/labs/${nextLab.id}`} className={styles.nextLink}>
            Lab {nextLab.id}: {nextLab.title} →
          </Link>
        ) : <span />}
      </div>
    </div>
  );
}
