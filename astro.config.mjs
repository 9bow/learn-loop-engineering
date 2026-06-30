// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';

const GA_ID = 'G-YVGR3KHD0E';

// https://astro.build/config
export default defineConfig({
  site: 'https://9bow.github.io',
  base: '/learn-loop-engineering',
  integrations: [
    starlight({
      title: 'Loop Engineering 완전 정복',
      description: 'LLM 에이전트의 반복 루프를 설계·제어·검증·자기개선하는 공학, Loop Engineering 심층 학습 사이트',
      defaultLocale: 'root',
      locales: {
        root: { label: '한국어', lang: 'ko' },
        en: { label: 'English', lang: 'en' },
      },
      head: [
        {
          tag: 'script',
          attrs: { async: true, src: `https://www.googletagmanager.com/gtag/js?id=${GA_ID}` },
        },
        {
          tag: 'script',
          content:
            'window.dataLayer = window.dataLayer || [];\n' +
            'function gtag(){dataLayer.push(arguments);}\n' +
            "gtag('js', new Date());\n" +
            `gtag('config', '${GA_ID}');`,
        },
      ],
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/9bow/learn-loop-engineering' },
      ],
      components: {
        MarkdownContent: './src/overrides/MarkdownContent.astro',
      },
      sidebar: [
        { label: '01. 루프 엔지니어링이란', items: [{ autogenerate: { directory: '01-foundations' } }] },
        { label: '02. 루프의 해부학', items: [{ autogenerate: { directory: '02-loop-anatomy' } }] },
        { label: '03. 단일 에이전트 루프 패턴', items: [{ autogenerate: { directory: '03-single-agent-patterns' } }] },
        { label: '04. 워크플로 패턴', items: [{ autogenerate: { directory: '04-workflow-patterns' } }] },
        { label: '05. 루프 안의 컨텍스트 엔지니어링', items: [{ autogenerate: { directory: '05-context-in-loop' } }] },
        { label: '06. 루프 제어와 종료', items: [{ autogenerate: { directory: '06-loop-control' } }] },
        { label: '07. 실패 모드와 신뢰성', items: [{ autogenerate: { directory: '07-failure-reliability' } }] },
        { label: '08. 보안과 적대적 루프', items: [{ autogenerate: { directory: '08-security-adversarial' } }] },
        { label: '09. 관측성·평가·경제성', items: [{ autogenerate: { directory: '09-observability-eval-economics' } }] },
        { label: '10. 멀티 에이전트와 롱호라이즌', items: [{ autogenerate: { directory: '10-multi-agent-long-horizon' } }] },
        { label: '11. 자기개선 루프와 RL 프런티어', items: [{ autogenerate: { directory: '11-self-improving-rl' } }] },
        { label: '12. 실전: 루프 구축과 운영', items: [{ autogenerate: { directory: '12-building-loops' } }] },
      ],
      customCss: ['./src/styles/custom.css'],
    }),
    react(),
  ],
});
