import { Link } from 'react-router-dom';
import { useProgress } from '@/hooks/useProgress';
import { Badge } from '@/components/ui/Badge';
import styles from './LabsIndex.module.css';

const LABS = [
  { id: 0, title: 'Bootstrap corgi-greeter', description: 'Create the Go app, Docker build, Docker Hub push, and AWS deploy baseline.', weight: 'Prereq', tools: 'Go | Actions | Docker Hub | AWS' },
  { id: 1, title: 'SDLC architecture', description: 'Separate planning from execution with issues, PRs, CODEOWNERS, labels, and rulesets.', weight: '15-20%', tools: 'Copilot | PRs | Rulesets' },
  { id: 2, title: 'Tools and MCP', description: 'Configure MCP allow lists, custom agents, branch scope, retries, rollback, and escalation.', weight: '20-25%', tools: 'MCP | custom agents | firewall' },
  { id: 3, title: 'Memory and state', description: 'Persist decisions, resume interrupted work, and detect context drift.', weight: '10-15%', tools: 'Issues | AGENTS.md | decisions' },
  { id: 4, title: 'Evaluation and tuning', description: 'Score repeated agent runs with tests, scans, traces, and root-cause buckets.', weight: '15-20%', tools: 'Actions | CodeQL | evals' },
  { id: 5, title: 'Multi-agent coordination', description: 'Run specialist agents in isolated branches and merge their artifacts safely.', weight: '15-20%', tools: 'matrix | artifacts | coordinator' },
  { id: 6, title: 'Guardrails', description: 'Apply autonomy levels, least privilege, approvals, hard blocks, and audit trails.', weight: '10-15%', tools: 'environments | OIDC | audit' },
  { id: 7, title: 'Capstone', description: 'Ship one end-to-end agentic change from issue to production deployment.', weight: 'All', tools: 'issue | PR | eval | deploy' },
];

export function LabsIndex() {
  const { progress } = useProgress();

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <h1 className={styles.title}>Hands-on Labs</h1>
        <p className={styles.description}>
          Practice every GH-600 domain by building a real agentic AI system.
        </p>
      </div>

      <div className={styles.labGrid}>
        {LABS.map((lab) => (
          <Link key={lab.id} to={`/labs/${lab.id}`} className={styles.labCard}>
            <div className={styles.cardTop}>
              <span className={styles.labNumber}>{lab.id}</span>
              <span className={styles.weight}>{lab.weight}</span>
            </div>
            <h3 className={styles.labTitle}>{lab.title}</h3>
            <p className={styles.labDescription}>{lab.description}</p>
            <div className={styles.tools}>{lab.tools}</div>
            {progress.labs.completed.includes(lab.id) && (
              <Badge variant="success" size="sm">✓ Done</Badge>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
