#!/usr/bin/env node
/**
 * Extract questions from GH-600 HTML exam files into structured JSON.
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const ROOT = join(__filename, '..', '..');
const DATA_DIR = join(ROOT, 'src', 'data');
const QUESTIONS_DIR = join(DATA_DIR, 'questions');

const DOMAIN_MAP = {
  1: { id: 0, name: 'Architecture & SDLC' },
  2: { id: 1, name: 'Tool Use & MCP' },
  3: { id: 2, name: 'Memory, State & Execution' },
  4: { id: 3, name: 'Evaluation & Tuning' },
  5: { id: 4, name: 'Multi-Agent Coordination' },
  6: { id: 5, name: 'Guardrails & Accountability' },
};

const MOCK_EXAMS = {
  'gh600-mock-exam-captain-corgi.html': { id: 'mock-1', title: 'Mock Exam 1', desc: 'Original question bank', time: 120 },
  'gh600-mock-exam-captain-corgi-1.html': { id: 'mock-2', title: 'Mock Exam 2', desc: 'Shuffled full exam', time: 120 },
  'gh600-mock-exam-captain-corgi-2.html': { id: 'mock-3', title: 'Mock Exam 3', desc: 'Shuffled full exam', time: 120 },
  'gh600-mock-exam-captain-corgi-3.html': { id: 'mock-4', title: 'Mock Exam 4', desc: 'Shuffled full exam', time: 120 },
  'gh600-mock-exam-captain-corgi-4.html': { id: 'mock-5', title: 'Mock Exam 5', desc: 'Shuffled full exam', time: 120 },
  'gh600-mock-exam-captain-corgi-5.html': { id: 'mock-6', title: 'Mock Exam 6', desc: 'Shuffled full exam', time: 120 },
};

const PRACTICE_EXAMS = {
  'gh600-practice-exam-captain-corgi-1.html': { id: 'practice-1', title: 'Practice Exam 1', desc: 'From practice-example-1.md', time: 90 },
  'gh600-practice-exam-captain-corgi-2.html': { id: 'practice-2', title: 'Practice Exam 2', desc: 'From practice-example-2.md', time: 90 },
  'gh600-practice-exam-captain-corgi-3.html': { id: 'practice-3', title: 'Practice Exam 3', desc: 'From practice-example-3.md', time: 90 },
  'gh600-practice-exam-captain-corgi-4.html': { id: 'practice-4', title: 'Practice Exam 4', desc: 'From practice-example-4.md', time: 90 },
  'gh600-practice-exam-captain-corgi-5.html': { id: 'practice-5', title: 'Practice Exam 5', desc: 'From practice-example-5.md', time: 90 },
  'gh600-practice-exam-captain-corgi-6.html': { id: 'practice-6', title: 'Practice Exam 6', desc: 'From practice-example-6.md', time: 90 },
  'gh600-practice-exam-captain-corgi-7.html': { id: 'practice-7', title: 'Practice Exam 7', desc: 'From practice-example-7.md', time: 90 },
};

function extractQuestionsFromHtml(html) {
  const match = html.match(/const\s+Q\s*=\s*\[([\s\S]*?)\];/);
  if (!match) return [];

  const arrayContent = match[1];
  const questions = [];
  const qPattern = /\{d:(\d+),dt:'((?:[^'\\]|\\.)*)',q:'((?:[^'\\]|\\.)*)',opts:\[((?:[^\]]|\\])*)\],ans:(\d+),exp:'((?:[^'\\]|\\.)*)'\}/g;

  let m;
  while ((m = qPattern.exec(arrayContent)) !== null) {
    const domainNum = parseInt(m[1]);
    const domainTag = m[2].replace(/\\'/g, "'").replace(/\\"/g, '"');
    const questionText = m[3].replace(/\\'/g, "'").replace(/\\"/g, '"').replace(/\\n/g, '\n');
    const optionsRaw = m[4];
    const correctIndex = parseInt(m[5]);
    const explanation = m[6].replace(/\\'/g, "'").replace(/\\"/g, '"').replace(/\\n/g, '\n');

    const options = [];
    const optPattern = /'((?:[^'\\]|\\.)*)'/g;
    let optMatch;
    while ((optMatch = optPattern.exec(optionsRaw)) !== null) {
      options.push(optMatch[1].replace(/\\'/g, "'").replace(/\\"/g, '"'));
    }

    const domainInfo = DOMAIN_MAP[domainNum] || { id: domainNum - 1, name: domainTag };

    questions.push({
      domain: domainInfo.id,
      domainName: domainInfo.name,
      question: questionText,
      options,
      correctIndex,
      explanation,
      tags: [domainInfo.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')],
    });
  }

  return questions;
}

function processExamFile(filename, metadata, examType) {
  const filePath = join(ROOT, '..', filename);
  let html;
  try {
    html = readFileSync(filePath, 'utf-8');
  } catch (e) {
    console.error(`  ✗ Could not read ${filename}: ${e.message}`);
    return null;
  }

  const rawQuestions = extractQuestionsFromHtml(html);
  if (rawQuestions.length === 0) {
    console.error(`  ✗ No questions found in ${filename}`);
    return null;
  }

  const questions = rawQuestions.map((q, i) => ({
    id: `${metadata.id}-q${i + 1}`,
    ...q,
    difficulty: 'medium',
  }));

  const exam = {
    id: metadata.id,
    type: examType,
    title: metadata.title,
    description: metadata.desc,
    timeLimit: metadata.time,
    questionCount: questions.length,
    questions,
    metadata: {
      source: filename,
      created: new Date().toISOString().split('T')[0],
      version: 1,
    },
  };

  const outPath = join(QUESTIONS_DIR, `${metadata.id}.json`);
  writeFileSync(outPath, JSON.stringify(exam, null, 2));
  console.log(`  ✓ ${metadata.id}: ${questions.length} questions`);
  return exam;
}

console.log('Extracting questions from HTML files...\n');
mkdirSync(QUESTIONS_DIR, { recursive: true });

const allExams = [];

console.log('Mock exams:');
for (const [filename, meta] of Object.entries(MOCK_EXAMS)) {
  const exam = processExamFile(filename, meta, 'mock');
  if (exam) allExams.push(exam);
}

console.log('\nPractice exams:');
for (const [filename, meta] of Object.entries(PRACTICE_EXAMS)) {
  const exam = processExamFile(filename, meta, 'practice');
  if (exam) allExams.push(exam);
}

const examsCatalog = allExams.map(({ questions, ...rest }) => rest);
writeFileSync(join(DATA_DIR, 'exams.json'), JSON.stringify(examsCatalog, null, 2));

console.log('\n--- Summary ---');
console.log(`Total exams: ${allExams.length}`);
console.log(`Total questions: ${allExams.reduce((sum, e) => sum + e.questionCount, 0)}`);

const domainCounts = {};
for (const exam of allExams) {
  for (const q of exam.questions) {
    const key = `Domain ${q.domain + 1} (${q.domainName})`;
    domainCounts[key] = (domainCounts[key] || 0) + 1;
  }
}
console.log('\nQuestions by domain:');
for (const [domain, count] of Object.entries(domainCounts).sort()) {
  console.log(`  ${domain}: ${count}`);
}
console.log('\nDone!');
