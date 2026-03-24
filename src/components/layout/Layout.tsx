import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Layout.module.css';

interface NavItem {
  label: string;
  to: string;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    label: '비생성형 AI',
    items: [
      { label: '개요', to: '/non-generative' },
      { label: 'ML-D-01 표본 편향', to: '/non-generative/sample-bias' },
      { label: 'ML-D-02 라벨링 편향', to: '/non-generative/labeling-bias' },
      { label: 'ML-D-03 사회적 편향', to: '/non-generative/social-bias' },
      { label: 'ML-M-01 서비스 품질', to: '/non-generative/performance' },
      { label: 'ML-M-02 모델 공정성', to: '/non-generative/fairness' },
      { label: 'ML-M-03 설명가능성', to: '/non-generative/explainability' },
    ],
  },
  {
    label: '생성형 AI',
    items: [
      { label: '개요', to: '/generative' },
      { label: 'LLM-D-01 표현 편향', to: '/generative/representation-bias' },
      { label: 'LLM-D-02 형식 편향', to: '/generative/format-bias' },
      { label: 'LLM-D-03 선호 편향', to: '/generative/preference-bias' },
      { label: 'LLM-M-01~08 성능', to: '/generative/performance' },
      { label: 'LLM-S-01~06 안전성', to: '/generative/safety' },
      { label: 'LLM-X-01 설명가능성', to: '/generative/explainability' },
    ],
  },
];

const BOTTOM_NAV: NavItem[] = [
  { label: 'AGT-01 에이전틱 태스크', to: '/agentic-task' },
  { label: '메트릭 커버리지', to: '/coverage' },
];

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    '비생성형 AI': true,
    '생성형 AI': true,
  });
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleGroup = (label: string) => {
    setOpenGroups(prev => ({ ...prev, [label]: !prev[label] }));
  };

  const isActive = (to: string) => location.pathname === to;

  return (
    <div className={styles.shell}>
      {/* Top Nav */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <button
            className={styles.mobileToggle}
            onClick={() => setMobileOpen(o => !o)}
            aria-label="메뉴"
          >
            ☰
          </button>
          <Link to="/" className={styles.logo}>
            <span className={styles.logoIcon}>⚡</span>
            <span className={styles.logoText}>
              <span className={styles.logoMain}>AI 평가검증 Lab</span>
              <span className={styles.logoSub}>부산은행</span>
            </span>
          </Link>
          <nav className={styles.topNav}>
            <Link to="/" className={isActive('/') ? styles.topLinkActive : styles.topLink}>대시보드</Link>
            <Link to="/non-generative" className={location.pathname.startsWith('/non-generative') ? styles.topLinkActive : styles.topLink}>비생성형</Link>
            <Link to="/generative" className={location.pathname.startsWith('/generative') ? styles.topLinkActive : styles.topLink}>생성형</Link>
            <Link to="/coverage" className={isActive('/coverage') ? styles.topLinkActive : styles.topLink}>커버리지</Link>
          </nav>
        </div>
      </header>

      <div className={styles.body}>
        {/* Sidebar */}
        <aside className={`${styles.sidebar} ${mobileOpen ? styles.sidebarOpen : ''}`}>
          <div className={styles.sidebarScroll}>
            <div className={styles.sidebarSection}>
              <Link
                to="/"
                className={`${styles.sidebarLink} ${isActive('/') ? styles.sidebarLinkActive : ''}`}
                onClick={() => setMobileOpen(false)}
              >
                홈 대시보드
              </Link>
            </div>

            {NAV_GROUPS.map(group => (
              <div key={group.label} className={styles.sidebarSection}>
                <button
                  className={styles.groupToggle}
                  onClick={() => toggleGroup(group.label)}
                  aria-expanded={openGroups[group.label]}
                >
                  <span>{group.label}</span>
                  <span className={styles.groupToggleIcon}>
                    {openGroups[group.label] ? '▼' : '▶'}
                  </span>
                </button>
                {openGroups[group.label] && (
                  <ul className={styles.groupItems}>
                    {group.items.map(item => (
                      <li key={item.to}>
                        <Link
                          to={item.to}
                          className={`${styles.sidebarLink} ${isActive(item.to) ? styles.sidebarLinkActive : ''}`}
                          onClick={() => setMobileOpen(false)}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            <div className={styles.sidebarSection}>
              <div className={styles.sidebarDivider}>기타</div>
              <ul className={styles.groupItems}>
                {BOTTOM_NAV.map(item => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className={`${styles.sidebarLink} ${isActive(item.to) ? styles.sidebarLinkActive : ''}`}
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {mobileOpen && (
          <div className={styles.overlay} onClick={() => setMobileOpen(false)} />
        )}

        {/* Main content */}
        <main className={styles.main}>
          {children}
        </main>
      </div>
    </div>
  );
};
