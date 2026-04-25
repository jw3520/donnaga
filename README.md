# 💸 DonnaGa (돈나가)

> **네이티브 앱 감성을 완벽히 구현한 프라이빗 PWA 가계부**
>
> 🚀 **실시간 서비스 접속:** [https://donnaga.pages.dev/](https://donnaga.pages.dev/)

개인화된 금융 데이터를 안전하게 관리하고 2인이 함께 실시간으로 지출 내역을 공유할 수 있는 오프라인 우선(Local-first) 가계부 앱입니다. PWA(Progressive Web App) 기술을 통해 앱스토어 설치 없이도 네이티브 앱과 동일한 UX를 제공하며, 포트폴리오용 게스트 모드(Sandbox)를 탑재하여 소스코드와 서비스가 공개된 상태에서도 실제 데이터 보안을 완벽하게 유지합니다.

---

## 📺 프로젝트 시연
> **Note:** 아래는 실제 앱 동작 화면입니다. (Guest 모드 더미 데이터 기준)
![DonnaGa Demo](./image.png)

---

## 🛡️ 프로젝트 배경 및 목적

*   **실시간 동기화:** 각자의 기기에서 지출/수입 내역이 입력되는 즉시 동기화되어 가계부 작성의 번거로움을 줄입니다.
*   **오프라인 사용성 보장:** 네트워크가 불안정한 환경에서도 즉각적인 내역 추가 및 수정이 가능합니다. (IndexedDB 오프라인 큐 활용)
*   **완벽한 데이터 은닉 (Sandbox 모드):** 외부인이 `0000` PIN 코드를 사용하는 Guest 모드로 접근 시, 로컬 환경에서만 작동하는 동적 더미 데이터를 제공하여 실제 금융 데이터 접근을 원천 차단하면서도 앱의 100% 기능을 체험할 수 있게 합니다.
*   **맞춤형 예산 체계 구축:** 생활 지출, 고정 지출, 변동 지출, 저축, 투자로 이어지는 5대 자산 관리 파이프라인을 시각적으로 관리합니다.

---

## ✨ 주요 기능

- **네이티브 앱 수준의 입력 UX:** 시스템 키보드에 최적화된 다이얼로그와 직관적인 파스텔톤 카테고리 태그 제공.
- **5대 예산 대시보드:** 이번 달 예산 대비 사용량을 색상별 Stacked Progress Bar(다중 색상 가로 막대 그래프)로 한눈에 시각화.
- **이중 트랩 보안 핀코드(PIN):** 4자리 입력창으로 위장한 8자리 마스터 암호 체계 및 브루트포스(Brute-force) 공격 방어 타이머(1분 잠금) 적용.
- **스마트한 필터 & 통계:** 전체 및 개별 사용자 데이터를 즉시 분리하여 조회하며, 통계 차트에서 특정 항목 탭 시 상세 내역으로 매끄럽게 연결.
- **자동 PWA 업데이트 알림:** 새 버전 배포 시 설정 탭의 Red Dot 및 애니메이션을 통해 최신 버전 캐시 갱신(Update)을 시각적으로 유도.
- **모바일 제스처 최적화:** 달력 화면 좌우 스와이프를 통한 자연스러운 월(Month) 이동.

---

## 🚀 배포 환경

이 프로젝트는 최신 CI/CD 환경과 Serverless DB를 기반으로 운영됩니다.

- **Infrastructure:** [Cloudflare Pages](https://pages.cloudflare.com/)
- **Database:** Cloudflare D1 (Serverless SQLite)
- **Live URL:** [https://donnaga.pages.dev/](https://donnaga.pages.dev/)
- **Deployment:** `main` 브랜치에 코드 Push 시 Cloudflare를 통해 자동으로 빌드 및 글로벌 에지 네트워크에 배포됩니다.

---

## 🛠 기술 스택

- **Frontend:** HTML5, CSS3, Vanilla JavaScript (프레임워크 없이 가볍고 빠른 렌더링 구현)
- **Local DB:** IndexedDB (Dexie.js 기반 로컬 데이터베이스)
- **Deployment & Backend API:** Cloudflare Pages, Cloudflare Pages Functions
- **Icons/Fonts:** Lucide Icons, Noto Sans KR (Pretendard 호환)

---

## 📄 라이선스
이 프로젝트는 MIT 라이선스 하에 배포됩니다.
