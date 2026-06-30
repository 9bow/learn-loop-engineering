# Loop Engineering 완전 정복 (learn-loop-engineering)

[![Built with Starlight](https://astro.badg.es/v2/built-with-starlight/tiny.svg)](https://starlight.astro.build)

LLM 에이전트의 반복 루프(agentic loop)를 **설계·제어·검증·자기개선**하는 공학, "Loop Engineering"을 다루는 한국어/영어 심층 학습 사이트입니다. 단일 호출 프롬프팅을 넘어 ReAct·Reflexion 같은 루프 패턴부터 종료 조건, 실패 모드, 관측성, 멀티 에이전트, 자기개선 루프, 그리고 Claude Code·Codex·Ralph 같은 실제 시스템까지 12개 섹션 62개 챕터로 정리했습니다.

🔗 **사이트**: https://9bow.github.io/learn-loop-engineering/

## 학습 내용

| # | 섹션 | 핵심 주제 |
|---|------|-----------|
| 01 | 루프 엔지니어링이란 | 싱글샷의 한계, 에이전트 정의, Workflow vs Agent, 계보, 역사 |
| 02 | 루프의 해부학 | Observe-Reason-Act-Evaluate, CoT, Tool Use/ACI, 구조화 출력, 최소 루프 |
| 03 | 단일 에이전트 루프 패턴 | ReAct, Reflexion, Plan-Execute, Self-Refine, ToT/GoT, ReWOO/LLMCompiler |
| 04 | 워크플로 패턴 | Chaining, Routing, Parallelization, Orchestrator-Workers, Evaluator-Optimizer |
| 05 | 루프 안의 컨텍스트 엔지니어링 | Attention Budget·Context Rot, Lost-in-Middle, Compaction, 메모리, JIT/Fresh |
| 06 | 루프 제어와 종료 | 종료 조건, Generator-Verifier 격차, LLM-as-Judge, 테스트 주도, HITL |
| 07 | 실패 모드와 신뢰성 | 무한/둠 루프, 오류 캐스케이드, 체크포인팅·멱등성, 재시도, 샌드박싱 |
| 08 | 보안과 적대적 루프 | 프롬프트 인젝션, 보상 해킹, 사전 행동 인가, 경계된 자율성 |
| 09 | 관측성·평가·경제성 | OTel gen_ai, 궤적 평가, SWE-bench, 이터레이션 경제학, 캐싱, 라우팅 |
| 10 | 멀티 에이전트와 롱호라이즌 | Orchestrator-Worker, Handoff/Dispatch, METR 시간지평, 멜트다운, 프레임워크 |
| 11 | 자기개선 루프와 RL 프런티어 | 루프=MDP, DSPy, AlphaEvolve, Darwin Gödel Machine, GRPO/DeepSeek-R1 |
| 12 | 실전: 루프 구축과 운영 | Claude Code/Codex, SWE-agent, Ralph, 스펙 주도, 패턴 선택, Software 3.0 |

## 기술 스택

- **Astro 7** + **Starlight** (문서 프레임워크)
- **React 19** (인터랙티브 Quiz·Mermaid 컴포넌트)
- 한국어(root) / 영어(en) 이중 로캘
- GitHub Pages 자동 배포 (`.github/workflows/deploy.yml`)
- Google Analytics 4 트래킹

## 로컬 개발

| 명령 | 동작 |
| :--- | :--- |
| `pnpm install` | 의존성 설치 |
| `pnpm dev` | `localhost:4321` 개발 서버 |
| `pnpm build` | `./dist/`로 프로덕션 빌드 |
| `pnpm preview` | 빌드 결과 로컬 미리보기 |

## 기여

콘텐츠 오류·출처 보강·번역 개선 제안은 [이슈](https://github.com/9bow/learn-loop-engineering/issues)로 남겨주세요. 모든 사실 주장은 검증 가능한 일차 출처(arXiv, 공식 엔지니어링 블로그, 학회 proceedings)에 근거합니다.

## 라이선스

콘텐츠는 학습 목적으로 자유롭게 활용할 수 있습니다. 인용된 외부 자료의 저작권은 각 출처에 있습니다.
